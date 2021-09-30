import React, {useCallback, useContext, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";

import {AuthContext, PaymentGateContext} from "../../AppContext";
import usePaymentGateApi from "../../hooks/usePaymentGateApi";
import TabsList from "../Tabs/Tabs";

import Header from "../Header/Header";
import './TransactionList.scss';

const TransactionList = () => {

    const {state: {isLoggedIn, paymentGateOwner}} = useContext(AuthContext);
    const {paymentGateState} = useContext(PaymentGateContext);
    const {getPaymentGatesByUserId} = usePaymentGateApi();

    const fetchPaymentGates = useCallback(async () => {
        try {
            await getPaymentGatesByUserId(paymentGateOwner.id);
        } catch (err) {
            toast.error('Couldn\'t get payment gates :(');
        }
    }, [])

    useEffect(() => {
        const asyncWrapper = async () => {
            try {
                await fetchPaymentGates();
            } catch (err) {
                toast.error('Couldn\'t get transactions :(');
            }
        }
        asyncWrapper().then();
    }, []);


    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }

    return (
        <>
            <Header/>
            {paymentGateState.length > 0 ?
                <div className='transaction-list-container'>
                    <TabsList/>
                </div>
                :
                <div className='transaction-list-container'>
                    There is nothing here yet, add Payment Gate in Account section and make some transactions through
                    send-ether widget!
                </div>
            }
        </>

    )
};
export default TransactionList;
