"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = exports.rootHandler = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const form_data_1 = __importDefault(require("form-data"));
const rootHandler = (_req, res) => {
    return res.send('API is working 🤓');
};
exports.rootHandler = rootHandler;
const authHandler = (req, res) => {
    const { code } = req.body;
    const data = new form_data_1.default();
    data.append("client_id", "b14f89a480e159559436");
    data.append("client_secret", "953c61ce407a64d0c3b20b2e26d4d21629850546");
    data.append("code", code);
    data.append("redirect_uri", "http://localhost:3000/login");
    (0, node_fetch_1.default)(`https://github.com/login/oauth/access_token`, {
        method: "POST",
        body: data,
    })
        .then(response => response.text())
        .then(paramsString => {
        let params = new URLSearchParams(paramsString);
        const access_token = params.get("access_token");
        return (0, node_fetch_1.default)(`https://api.github.com/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        });
    })
        .then(response => response.json())
        .then(response => {
        return res.status(200).json(response);
    })
        .catch(error => {
        return res.status(400).json(error);
    });
};
exports.authHandler = authHandler;
//# sourceMappingURL=handlers.js.map