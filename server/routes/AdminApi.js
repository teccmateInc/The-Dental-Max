var express = require('express');
var router = express.Router();
var AdminApi=require('../models/AdminApi');

router.get('/',function(req,res,next){
    if(req.query.mode){
        switch (req.query.mode){
            
            case 'getPatientList' :              
            AdminApi.getPatientList(function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;

            case 'getPatientByID' :              
            AdminApi.getPatientByID( req.query.id , function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;

            case 'searchPatient' :              
            AdminApi.searchPatient( req.query.searchTerm , function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;

            case 'getPlanList' :              
            AdminApi.getPlanList(function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;

            case 'getPlanByID' :              
            AdminApi.getPlanByID( req.query.id , function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;

            case 'getDiagnosisByPatientID' :              
            AdminApi.getDiagnosisByPatientID( req.query.id , req.query.tblName , function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;
           
        }
    }
 });
router.post('/',function(req,res,next){
    if(req.query.mode){
        switch (req.query.mode){
            
            case 'userRegister' :              
            AdminApi.userRegister(req.body,function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    Id = rows.insertId;
                    AdminApi.userRegisterByID(Id,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else{
                            res.json(rows);
                        }
                    });
                }
            });
            break;

            case 'savePatient' :              
            AdminApi.savePatient(req.body,function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;

            case 'caries' :  
            AdminApi.saveTeethDiagnose(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{ 
                    res.json(rows);
                }
            });
            break;
            
            case 'fracture':
                AdminApi.saveTeethDiagnosefracture(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'SeverelyDamaged':
                AdminApi.saveTeethDiagnoseSeverelyDamaged(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;
                

                case 'Wear':
                AdminApi.saveTeethDiagnoseWear(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Plaque & Hygiene':
                AdminApi.saveTeethDiagnosePlaqueHygiene(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Gingivitis':
                AdminApi.saveTeethDiagnoseGingivitis(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Gingival Recession':
                AdminApi.saveTeethDiagnoseGingivalRecession(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Periodontitis':
                AdminApi.saveTeethDiagnosePeriodontitis(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Mobility':
                AdminApi.saveTeethDiagnoseMobility(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Gummy Smile':
                AdminApi.saveTeethDiagnoseGummySmile(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Gingival Overgrowth':
                AdminApi.saveTeethDiagnoseGingivalOvergrowth(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Large Maxillary Sinus':
                AdminApi.saveTeethDiagnoseLargeMaxillarySinus(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Necrosis':
                AdminApi.saveTeethDiagnoseNecrosis(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Root Canal Treatment':
                AdminApi.saveTeethDiagnoseRootCanalTreatment(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Apical Lesio':
                AdminApi.saveTeethDiagnoseApicalLesio(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Broken Instrument in Canal':
                AdminApi.saveTeethDiagnoseBrokenInstrumentinCanal(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Root Resorption':
                AdminApi.saveTeethDiagnoseRootResorption(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                // 
                case 'Missing Teeth':
                AdminApi.saveTeethDiagnoseMissingTeeth(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Impacted Teeth':
                AdminApi.saveTeethDiagnoseImpactedTeeth(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Impacted & Infected Teeth':
                AdminApi.saveTeethDiagnoseImpactedInfectedTeeth(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'Large Maxillary Sinus':
                AdminApi.saveTeethDiagnoseLargeMaxillarySinus(req.body, req.query.PatientID , req.query.mode , req.query.selectedTeeth , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

                case 'pl_form':
                    console.log(req.body , 'req.query.mode');
                AdminApi.pl_form(req.body , function(err,rows){
                    if(err)
                    {
                        res.json(err);
                    }
                    else{ 
                        res.json(rows);
                    }
                });
                break;

            case 'updatePlanName' :              
            AdminApi.updatePlanName(req.body,function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    AdminApi.updatePatientNamebyPlan(req.body,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else{
                            res.json(req.body);
                        }
                    });
                }
            });
            break;

            case 'savePlan' :              
            AdminApi.savePlan(req.body,function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;
            case 'savePlanCopy' :              
            AdminApi.savePlanCopy(req.body,function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;
           
        }
    }
 });
router.delete('/',function(req,res,next){
    if(req.query.mode){
        switch (req.query.mode){
            
            case 'deletePatient' :              
            AdminApi.deletePatient(req.query.id,function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    // res.json(rows);
                    AdminApi.deletePlanByPatientID(req.query.id,function(err,rows){
                        if(err)
                        {
                            res.json(err);
                        }
                        else{
                            res.json(rows);
                        }
                    });
                }
            });
            break;

            case 'deletePlan' :              
            AdminApi.deletePlan(req.query.id,function(err,rows){
                if(err)
                {
                    res.json(err);
                }
                else{
                    res.json(rows);
                }
            });
            break;
           
        }
    }
 });

module.exports=router;