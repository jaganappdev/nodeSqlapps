//  lll-lr to using System.SQL;
const sql = require('mssql/msnodesqlv8')
const http = require('http');
const fs = require('fs');
const dbconfig = require('./dbConfigEntries');


//Declare all the Queries for the Smoke-Test related.


//#1 LOB Types

  //  console.log(cmccounts);
var medicarecounts = ' SELECT  COUNT (b.IdentityKey ) as Active_MediCare_Count FROM [Member].[BenefitCoverage]  b  WHERE b.TerminationDate IS NULL and b.GroupNumber =\'H5355\''; 

var mclcounts = 'SELECT Distinct COUNT(distinct  dd.IdentityKey) AS Active_MediCal_Count FROM [Member].[BenefitCoverage]  dd WITH(NOLOCK)'
                 + 'WHERE TerminationDate IS NULL and(dd.GroupNameKey like(\'%MED\') or dd.GroupNameKey like(\'%MMD\') or dd.GroupNameKey like(\'%CCI\'))  and dd.LineOfBusiness lIKE(\'MCL\') ';

var cmccounts = ' SELECT  COUNT (b.IdentityKey ) as Active_DualChoice_Count FROM [Member].[BenefitCoverage]  b  WHERE b.TerminationDate IS NULL and b.GroupNumber =\'H5355\''; 
var s_mcl = 'SELECT  distinct dd.IdentityKey FROM[Member].[BenefitCoverage]  dd WHERE TerminationDate IS NULL and '
            +  '(dd.GroupNameKey like(\'%MED\') or dd.GroupNameKey like(\'%MMD\') or dd.GroupNameKey like(\'%CCI\')) and dd.LineOfBusiness LIKE(\'MCL\') ';

// GEt  Active dual Choice Members  Counts 
var dualchoice = cmccounts + ' AND b.IdentityKey IN (' + s_mcl + ')'; 


//GET Medi-Medi MEmebrs

var medimedicounts = 'SELECT COUNT(distinct bbb.IdentityKey) as \'Total Active MEDI-MEDI Counts\' FROM [Member].[BenefitCoverage]  bbb  WITH(NOLOCK)'
                    + ' WHERE TerminationDate IS NULL and (bbb.GroupNameKey like(\'%MMD\') or bbb.GroupNameKey like(\'%CCI\')) and bbb.LineOfBusiness lIKE(\'MCL\')  AND bbb.IdentityKey NOT IN'
                    + '  ( SELECT  distinct b.IdentityKey  FROM [Member].[BenefitCoverage]  b   WITH(NOLOCK)  WHERE  b.GroupNumber = \'H5355\'   AND b.TerminationDate IS NULL)'
                    + ' AND bbb.IdentityKey In ( SELECT  distinct  cb.IdentityKey FROM [Ebm].[Member].[CoordinationOfBenefits] cb WHERE ( cb.CoverageName LIke(\'%Part A%\') or cb.CoverageName LIke(\'%Part B%\')'
                    + ' and cb.CoordinationOfBenefitsSourceTypeKey = (\'EXT\'))) ';


//Get Open access Memebrs 

//????????

//get Long Term Care(LTC) - which needs to qualify only one of following conditions

//????????


//console.log(dualchoice);

//#2. MEdical External Groups  

   /* GET KAISER Counts  */
var kaisercounts = 'SELECT  COUNT(distinct ap.IdentityKey) AS Total_KAISER_Members_Count FROM [Ebm].[Member].[AssignedProvider] ap'
                   + ' WHERE ap.RiskGroupName like(\'kaiser%\')  AND ap.IdentityKey NOT IN(SELECT  cb.IdentityKey  FROM[Ebm].[Member].[CoordinationOfBenefits] cb '
                   + ' WHERE  cb.CoverageName LIke(\'Medicare Part D%\') and cb.CoordinationOfBenefitsSourceTypeKey = (\'EXT\') )'

  /* GET PARTD Counts  */
var partdcounts = 'SELECT  COUNT(distinct  cb.IdentityKey ) AS Total_PARTD_Members_Count FROM [Ebm].[Member].[CoordinationOfBenefits] cb'
                   + ' WHERE  cb.CoverageName LIke(\'Medicare Part D%\') and cb.CoordinationOfBenefitsSourceTypeKey = ( \'EXT\') and cb.IdentityKey NOT IN'
                   + ' (SELECT   ap.IdentityKey FROM[Ebm].[Member].[AssignedProvider] ap WHERE ap.RiskGroupName like(\'kaiser%\'))';


//#3. 411 Benefits

      /* GET LIS -all levels Counts  */
var liscounts = 'SELECT COUNT (distinct IdentityKey) as \'LIS_Indicators_all_level_Members_Counts\' FROM [EBM].[Member].[Indicator] dd'
                 + ' WHERE dd.IndicatorName like(\'LIS Level %\') and dd.Metadata like(\'%DTRR%\') ';

      /* GET ESRD counts having alteast one LIS level Counts  */
var esrdcounts = 'SELECT COUNT (distinct IdentityKey) as \'ESRD_Indicators_Members_Counts\' FROM [EBM].[Member].[Indicator] dd '
                   +'WHERE dd.IndicatorName like(\'ESRD\') and dd.Metadata like (\'%DTRR%\')' 


      /* GET Hospice Counts  */

var hospcounts = 'SELECT COUNT (distinct IdentityKey) as \'Hospice_Indicators_Members_Counts\' FROM [EBM].[Member].[Indicator] dd '
                  + ' WHERE dd.IndicatorName like (\'Hospice\') and dd.Metadata like (\'%DTRR%\')';


     /*  GET Transplant */
var xplantcounts = 'SELECT COUNT (distinct IdentityKey) as \'transplant_Indicators_Members_Counts\' FROM [EBM].[Member].[Indicator] dd '
                  + ' WHERE dd.IndicatorName like(\'transplant\')  and dd.Metadata like(\'%DTRR%\') ';

// -----------------------------All Count queires in 1 variable
//all db counts by LOB types 
var allcounts = medicarecounts + ';' + mclcounts + ';' + dualchoice + ';';

//all benefits counts by Benefit type 
var allbenefitscounts = kaisercounts + ';' + partdcounts + ';' + liscounts + ';' + esrdcounts + ';' + hospcounts + ';' + xplantcounts;


//Expose  dbqueriesjs
//module.exports = './dbqueries.js'

exports.dualchoice = dualchoice;
//exports.cmccounts = cmccounts;
exports.mclcounts = mclcounts;
exports.medicarecounts = medicarecounts;
exports.partdcounts = partdcounts;
exports.kaisercounts = kaisercounts;
exports.liscounts = liscounts;
exports.esrdcounts = esrdcounts;
exports.hospcounts = hospcounts;
exports.xplantcounts = xplantcounts;
exports.medimedicounts = medimedicounts;
exports.allcounts = allcounts;
exports.allbenefitscounts = allbenefitscounts;