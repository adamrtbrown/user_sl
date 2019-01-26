import User from './lib/User';

const BASIC_AUTH = 'basic';
const BEARER_AUTH = 'bearer';
const AUTH_FAILED = "failed";

let response = {
    "statusCode": 200,
    "headers": {"Content-Type": "application/json"},
    "body": "{}"  // JSON.stringify()
  }
let exports = {};

let processAuthorization = function(event){
    let auth = {};
    if(event.headers["Authorization"]) {
        var key_val = String(event.headers["Authorization"]).split(" ");
        if(key_val.length == 2) {
            if(key_val[0].trim().toLowerCase() === BASIC_AUTH){
                let credentials = Buffer.from(key_val[1].trim(), 'base64').toString('utf8').split(":");
                if (credentials.length > 1) {
                    auth.type = BASIC_AUTH;
                    auth.username = credentials.shift();
                    auth.password = credentials.join(":");
                }
            }
            else if (key_val[0].trim().toLowerCase() === BEARER_AUTH) {
                let jwt_parts = key_val[1].trim().split(".");
                let jwt = {
                    header : Buffer.from(jwt_parts[0], 'base64').toString('utf8'),
                    claims : Buffer.from(jwt_parts[1], 'base64').toString('utf8'),
                    signature : jwt_parts[2]
                }
                
                if(claims.exp > (Date.now() * .001)) {
                    auth.type = AUTH_FAILED;
                } else if(false) {

                } else {
                    auth.type = BEARER_AUTH;
                    auth.jwt = jwt;
                }
            }
        }
    }
}

let getResourceIdentifier = function(resource_name, path) {
    return path.split(resource_name + "/")[1].split("/")[0];
}


exports.createUser = async function (event, context) {
    let u = new User();
    
    if(event.username && event.password && event.appid) {
        response.msg = u.createUser(event.username, event.password, event.appid);
    } else {
        response = {msg : "Invalid parameters"};
        responseCode = 400;
    }
    return response;
}
exports.updateUser = async function (event, context) {
    let u = new User();
    let user_id = getResourceIdentifier("user", event.path);
    if(event.username && event.password) {
        response.msg = u.updateUser(event.username, event.password);
    } else {
        response = {msg : "Invalid parameters"};
        responseCode = 400;
    }
    return response;
}
exports.createApp = async function (event, context) {
    let a = new App();
    
    if(event.name) {
        response.msg = a.createApp(event.name);
    } else {
        response = {msg : "Invalid parameters"};
        responseCode = 400;
    }
    return response;
}
exports.updateApp = async function (event, context) {
    let a = new App();
    let app_id = getResourceIdentifier("app", event.path);
    if(event.name && event.appid) {
        response.msg = u.updateApp(event.username, event.password);
    } else {
        response = {msg : "Invalid parameters"};
        responseCode = 400;
    }
    return response;
}

export default exports
/**
Lambda expected response:
body is json object stringified 
{
  "statusCode": 200,
  "headers": {"Content-Type": "application/json"},
  "body": "{\"durationSeconds\": 8.345243, \"max\": 1000000, \"loops\": 1}"
}
 */