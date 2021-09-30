import bodyParser from 'body-parser';
import express, {Request} from 'express';
import {rootHandler, authHandler} from './handlers/root-handlers/root-handlers';
import {
    addPGOwnerHandler,
    getPGOwnerHandler
} from './handlers/payment-gate-owner-handlers/payment-gate-owner-handlers';
import {
    addPaymentGateHandler,
    getPaymentGatesByUserIdHandler,
    updatePaymentGateHandler,
    deletePaymentGateHandler,
    getPaymentGatesTransactionsHandler,
    checkPaymentGateStatus
} from './handlers/payment-gates-handlers/payment-gates-handlers'
import {
    addTransactionHandler,
    getTransactionsHandler,
    getTransactionByPaymentGateIdHandler,
    updateTransactionHandler,
    deleteTransactionHandler
} from './handlers/transaction-handlers/transaction-handlers'

const app = express();
const port = process.env.SERVER_PORT || '5000';
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.json({type: "text/*"}));
app.use(bodyParser.urlencoded({extended: false}));

app.use((req: Request, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// Root Handlers
app.get('/', rootHandler);
app.post('/authenticate', authHandler);

// Payment Gate Owner Handlers
app.post('/user', addPGOwnerHandler);
app.get('/user/:githubId', getPGOwnerHandler);

// Payment Gates Handlers
app.post('/payment-gates', addPaymentGateHandler);
app.get('/payment-gates/:id', getPaymentGatesByUserIdHandler);
app.get('/payment-gates/status/:widgetToken', checkPaymentGateStatus);
app.get('/payment-gates/:id/transactions', getPaymentGatesTransactionsHandler);
app.put('/payment-gates/:id', updatePaymentGateHandler);
app.delete('/payment-gates/:id', deletePaymentGateHandler);

// Transaction Handlers
app.post('/transactions', addTransactionHandler);
app.get('/get-transactions', getTransactionsHandler);
app.get('/transactions/:id', getTransactionByPaymentGateIdHandler);
app.put('/transactions/:id', updateTransactionHandler);
app.delete('/transactions/:id', deleteTransactionHandler);

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
