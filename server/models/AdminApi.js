var db = require("../dbconnection");

var AdminApi = {  
  userRegister: function(data , callback) {
    return db.query("insert into tbl_user(Name, Email, Password , Status) values ('"+data.Name+"', '"+data.Email+"', '"+data.Password+"','"+1+"')", callback);
  },

  userRegisterByID: function(Id, callback) {
    return db.query('SELECT * FROM tbl_user WHERE UserID = "'+Id+'"', callback);
  } ,

  savePatient: function(data , callback) {
    if (data.PatientID === 0 ) {
      qry = "insert into tbl_patient(Name, Email, Phone , Gender, Notes) values ('"+data.Name+"', '"+data.Email+"', '"+data.Phone+"','"+data.Gender+"' , '"+data.Notes+"')"
    } else {
      qry = " UPDATE `tbl_patient` SET   `Name` = '"+data.Name+"', `Email` = '"+data.Email+"', `Phone` = '"+data.Phone+"', `Gender` = '"+data.Gender+"', `Notes` = '"+data.Notes+"' where  `PatientID` = '" + data.PatientID + "'";
    }
    return db.query( qry , callback);
  },

  updatePlanName: function(data , callback) {
    qry = " UPDATE `tbl_plan` SET   `PlanName` = '"+data.PlanName+"'  where  `PlanID` = '" + data.PlanID + "'";
    return db.query( qry , callback);
  },

  updatePatientNamebyPlan: function(data , callback) {
    qry = " UPDATE `tbl_plan` SET   `PatientName` = '"+data.PatientName+"'  where  `PatientID` = '" + data.PatientID + "'";
    return db.query( qry , callback);
  },

  getPatientList: function(callback) {
    return db.query("select * from tbl_patient", callback);
  },

  getPatientByID: function( id , callback) {
    return db.query("select * from tbl_patient where PatientID = ? ", [id], callback);
  },

  searchPatient: function( SerachKey , callback) {
    queryString = "SELECT * FROM `tbl_patient` WHERE `PatientID` LIKE '%"+SerachKey+"%' OR `Name` LIKE '%"+SerachKey+"%' OR  `Email` LIKE '%"+SerachKey+"%' OR  `Phone` LIKE '%"+SerachKey+"%';";
    return db.query(queryString, callback);
  },

  deletePatient: function( id , callback) {
    return db.query("delete from  tbl_patient where PatientID = ? ", [id], callback);
  },

  savePlan: function(data , callback) {
    qry = "insert into tbl_plan(PatientID,PatientName, PlanName, Status, CreatedAt) values ('"+data.PatientID+"', '"+data.PatientName+"','"+data.PlanName+"', '"+1+"' , now())"
    // if (data.PlanID === 0 ) {
    //   qry = "insert into tbl_plan(PatientID, PlanName, Status) values ('"+data.PatientID+"', '"+data.PlanName+"', '"+1+"')"
    // } else {
    //   qry = " UPDATE `tbl_plan` SET   `PatientID` = '"+data.PatientID+"', `PlanName` = '"+data.PlanName+"', `Status` = '"+1+"' where  `PlanID` = '" + data.PlanID + "'";
    // }
    return db.query( qry , callback);
  },
  savePlanCopy: function(data , callback) {
    qry = "insert into tbl_plan(PatientID,PatientName, PlanName, Status, CreatedAt) values ('"+data.PatientID+"', '"+data.PatientName+"','"+data.PlanName+"(copy)', '"+1+"' , now())"
    return db.query( qry , callback);
  },

  getPlanList: function(callback) {
    return db.query("select * from tbl_plan", callback);
  },

  getPlanByID: function( id , callback) {
    return db.query("select * from tbl_plan where PlanID = ? ", [id], callback);
  },
  deletePlan: function( id , callback) {
    return db.query("delete from  tbl_plan where PlanID = ? ", [id], callback);
  },
  deletePlanByPatientID: function( id , callback) {
    return db.query("delete from  tbl_plan where PatientID = ? ", [id], callback);
  },

  saveTeethDiagnose: function(data , PatientID , Condition , selectedTeeth,  callback) {
    qry = "insert into caries(PatientID, SelectedTeeth, Buccal , Distal, Lingual,Mesial,Occlusal ) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.Buccal)+"','"+Number(data.Distal)+"' , '"+Number(data.Lingual)+"', '"+Number(data.Mesial)+"', '"+Number(data.Occlusal)+"')";
    return db.query( qry , callback);
  },

  saveTeethDiagnosefracture: function(data , PatientID , Condition , selectedTeeth,  callback) {
    qry = "insert into fracture(PatientID, SelectedTeeth, FractureValue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.Fracturevalue+"')";
  return db.query( qry , callback);
},

saveTeethDiagnoseSeverelyDamaged: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into severelydamanged(PatientID, SelectedTeeth, severelydamaged) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.SeverelyDamaged)+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseWear: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into wear(PatientID, SelectedTeeth, Wearvalue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.Wearvalue+"')";
return db.query( qry , callback);
},

saveTeethDiagnosePlaqueHygiene: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into plaquehygiene(PatientID, SelectedTeeth, PlaqueHygienevalue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.PlaqueHygienevalue+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseGingivitis: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into gingivitis(PatientID, SelectedTeeth, Gingivitisvalue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.Gingivitisvalue+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseGingivalRecession: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into gingivalrecession(PatientID, SelectedTeeth, GingivalRecessionvalue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.GingivalRecessionvalue+"')";
return db.query( qry , callback);
},

saveTeethDiagnosePeriodontitis: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into periodontitis(PatientID, SelectedTeeth, Periodontitisvalue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.Periodontitisvalue+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseMobility: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into mobility(PatientID, SelectedTeeth, Mobilityvalue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.Mobilityvalue+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseGummySmile: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into gummysmile(PatientID, SelectedTeeth, GummySmile) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.GummySmile)+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseGingivalOvergrowth: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into gingivalovergrowth(PatientID, SelectedTeeth, GingivalOvergrowth) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.GingivalOvergrowth)+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseLargeMaxillarySinus: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into largemaxillarysinus(PatientID, SelectedTeeth, LargeMaxillarySinus) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.LargeMaxillarySinus)+"')";
return db.query( qry , callback);
},

// 
saveTeethDiagnoseNecrosis: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into Necrosis(PatientID, SelectedTeeth, Necrosis) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.Necrosis)+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseRootCanalTreatment: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into RootCanalTreatment(PatientID, SelectedTeeth, RootCanalTreatmentvalue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.RootCanalTreatmentvalue+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseApicalLesio: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into ApicalLesion(PatientID, SelectedTeeth, ApicalLesiovalue) values ('"+PatientID+"', '"+selectedTeeth+"', '"+data.ApicalLesiovalue+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseBrokenInstrumentinCanal: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into BrokenInstrumentinCanal(PatientID, SelectedTeeth, BrokenInstrumentinCanal) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.BrokenInstrumentinCanal)+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseRootResorption: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into RootResorption(PatientID, SelectedTeeth, External, Internal) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.External)+"', '"+Number(data.Internal)+"')";
return db.query( qry , callback);
},

// 
saveTeethDiagnoseMissingTeeth: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into MissingTeeth(PatientID, SelectedTeeth, MissingTeeth) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.MissingTeeth)+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseImpactedTeeth: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into ImpactedTeeth(PatientID, SelectedTeeth, ImpactedTeeth) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.ImpactedTeeth)+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseImpactedInfectedTeeth: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into ImpactedInfectedTeeth(PatientID, SelectedTeeth, ImpactedInfectedTeeth) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.ImpactedInfectedTeeth)+"')";
return db.query( qry , callback);
},

saveTeethDiagnoseLargeMaxillarySinus: function(data , PatientID , Condition , selectedTeeth,  callback) {
  qry = "insert into LargeMaxillarySinus(PatientID, SelectedTeeth, LargeMaxillarySinus) values ('"+PatientID+"', '"+selectedTeeth+"', '"+Number(data.LargeMaxillarySinus)+"')";
return db.query( qry , callback);
},

getDiagnosisByPatientID: function(Id, tblName, callback) {
  return db.query('SELECT * FROM '+tblName+' WHERE PatientID = '+Id+'', callback);
} ,

pl_form: function(body , callback) {
  return db.query("insert into pl_Forms (PatientID, TableName, SelectedTeeth, Price, RelizationDate, Observations, Stage) values ('"+body.PatientID+"' , '"+body.tablename+"','"+body.SelectedTeeth+"', '"+body.price+"', '"+body.date+"', '"+body.message+"', '"+body.stage+"')", callback);
} ,

}

module.exports = AdminApi;
