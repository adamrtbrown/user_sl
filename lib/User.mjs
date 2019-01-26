import mysql from 'mysql'
import config from './Config'
import bcrypt from 'bcrypt'

const USER_DB = "user_db";
const SALTROUNDS = 10;
class User {
    createUser(username, password) {

        let hash = bcrypt.hashSync(password, 10);
        
        var con = mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
            database: USER_DB
        });
          
        con.connect(function(err) {
            if (err) {
                con.end();
                throw err;
            }
            console.log("Connected!");
            var sql = "INSERT INTO users (username, hash) VALUES (?, ?)";
            con.query(sql, [username, password], function (err, result) {
              if (err) {
                  con.end();
                  throw err;
              }
              console.log("1 record inserted");
              con.end();
              return "Success";
            });
        });

    }
}

export default User