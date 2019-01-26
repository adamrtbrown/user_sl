import http from 'http';
import url from 'url';
import UserService from './lib/UserService'
import User from './lib/User';
import mysql from 'mysql';

function getResource(path) {
    let path_parts = path.split("/");
    let version = path_parts[0];
    let resource_names = [];
    for(let i = 1; i < path_parts.length; i += 2) {
        resource_name.push(path_parts[i]);
    }

    return resource_name.join(" ");
}

http.createServer(function (req, res) {
    // req.method;
    // req.url;
    let context = {};
    let query = url.parse(req.url, true).query;
    let path = url.parse(req.url, true).pathname;

    let path_parts = path.split("/");
    let version = path_parts[0];
    let resource_names = [];
    for(let i = 1; i < path_parts.length; i += 2) {
        resource_name.push(path_parts[i]);
    }

    let full_request_path = [req.method, getResource(path)].join(" ");
    let event = { "path" : path };
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        let body = JSON.parse(body);
        let event = body;
        event.headers = req.headers;
        let response = {
            "statusCode": 400,
            "headers": {"Content-Type": "application/json"},
            "body": "{\"error_message\": \"Not found.\"}"
        }
        switch (full_request_path) {
            case "POST user" :
                response = UserService.createUser(event, context);
                break;
            case "PUT user" :
                response = UserService.updateUser(event, context);
                break;
            case "POST app" :
                response = UserService.createApp(event, context);
                break;
            case "PUT app" :
                response = UserService.updateApp(event, context);
                break;
            default : 
                break;
        }

    res.writeHead(response.statusCode, response.headers);
    res.end(response.body);
    });
}).listen(8080);

