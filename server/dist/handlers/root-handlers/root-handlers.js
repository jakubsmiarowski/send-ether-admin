"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = exports.rootHandler = void 0;
const request = require('superagent');
const rootHandler = (_req, res) => {
    return res.send('API is working 🤓');
};
exports.rootHandler = rootHandler;
const authHandler = (req, res) => {
    const { code } = req.body;
    request
        .post('https://github.com/login/oauth/access_token')
        .send({
        client_id: "b14f89a480e159559436",
        client_secret: "953c61ce407a64d0c3b20b2e26d4d21629850546",
        code: code,
        redirect_uri: "http://localhost:3000/login"
    })
        .set('Accept', 'application/json')
        .then((result) => res.send(result.body));
};
exports.authHandler = authHandler;
//# sourceMappingURL=root-handlers.js.map