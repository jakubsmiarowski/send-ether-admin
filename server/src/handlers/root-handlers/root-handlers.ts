import {Request, Response} from 'express';

const request = require('superagent');
export const rootHandler = (_req: Request, res: Response) => {
    return res.send('API is working 🤓');
};

export const authHandler = (req: Request, res: Response) => {
    const {code} = req.body;
    request
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.REDIRECT_URI
        })
        .set('Accept', 'application/json')
        .then((result: any) => res.send(result.body));
}
