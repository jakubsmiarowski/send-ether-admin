import {Redirect} from "react-router-dom";
import React, {useCallback, useContext, useEffect} from "react";
import {toast} from "react-toastify";

import {AuthContext, PaymentGateContext} from "../../AppContext";
import Header from "../Header/Header";
import PaymentGate from "../PaymentGatesList/PaymentGate/PaymentGate";

import usePaymentGateApi from "../../hooks/usePaymentGateApi";
import './PaymentGatesList.scss';

const PaymentGatesList = () => {
    const {state: {isLoggedIn, paymentGateOwner}} = useContext(AuthContext);
    const {paymentGateState} = useContext(PaymentGateContext);
    const {getPaymentGatesByUserId} = usePaymentGateApi();

    const fetchPaymentGates = useCallback(async () => {
        try {
            await getPaymentGatesByUserId(paymentGateOwner.id);
        } catch (err) {
            toast.error('Couldn\'t get your data from Github :(');
        }
    }, [])

    useEffect(() => {
        const asyncWrapper = async () => {
            try {
                await fetchPaymentGates();
            } catch (err) {
                toast.error('Couldn\'t get your data from Github :(');
            }
        };
        asyncWrapper().then()
    }, [])

    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }
    return (
        <>
            <Header/>
            {paymentGateState.length > 0 ?
                paymentGateState.map(item => {
                    return (
                        <div
                            className={item.status === 'ACTIVE' ? 'payment-gates-container' : 'payment-gates-container--disabled'}
                            key={item.id}>
                            <PaymentGate paymentGate={item} key={item.id}/>
                        </div>
                    )
                })
                :
                <div className='information-container'>There is nothing here yet, add Payment Gate in Account
                    section!</div>}
        </>
    )
}
export default PaymentGatesList;
