import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import AppProvider from "./AppContext";
import Login from "./components/Login/Login";
import TransactionList from "./components/TransactionList/TransactionList";
import PaymentGatesList from "./components/PaymentGatesList/PaymentGatesList";
import Account from "./components/Account/Account";

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <AppProvider>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" exact component={Account} />
                    <Route path="/payment-gates" component={PaymentGatesList} />
                    <Route path="/transactions" component={TransactionList} />
                </Switch>
            </Router>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
            />
        </AppProvider>


    );
}

export default App;
