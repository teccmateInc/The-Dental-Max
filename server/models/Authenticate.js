var db = require("../dbconnection");

var Authenticate = {
  validateUser: function(name, password,callback) {
    
    return db.query('SELECT * FROM tbl_user WHERE Email = ? AND Password = ?',[name, password], callback);
  }
};
module.exports = Authenticate;
