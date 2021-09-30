import React, {useCallback, useContext, useEffect} from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {toast} from "react-toastify";

import useTransactionApi from "../../hooks/useTransactionApi";
import usePaymentGateApi from "../../hooks/usePaymentGateApi";
import {AuthContext, PaymentGateContext} from "../../AppContext";

import Table from "../Table/Table";
import 'react-tabs/style/react-tabs.scss';
import './Tabs.scss';

const TabsList = () => {

    const {state: {paymentGateOwner}} = useContext(AuthContext);
    const {paymentGateState} = useContext(PaymentGateContext);

    const {getPaymentGatesByUserId} = usePaymentGateApi();
    const {getTransactionByPaymentGateId} = useTransactionApi();

    const fetchPaymentGates = useCallback(async () => {
        try {
            await getPaymentGatesByUserId(paymentGateOwner.id);
        } catch (err) {
            toast.error('Couldn\'t get payment gates :(');
        }
    }, [])

    const fetchTransactions = useCallback(async (id: number | undefined) => {
        try {
            await getTransactionByPaymentGateId(id);
        } catch (err) {
            toast.error('Couldn\'t get transactions :(');
        }
    }, [])

    useEffect(() => {
        const asyncWrapper = async () => {
            try {
                await fetchPaymentGates();
                if (paymentGateState[0].id !== undefined) {
                    await fetchTransactions(paymentGateState[0].id);
                }
            } catch (err) {
                toast.error('Fetch failed :(');
            }
        }
        asyncWrapper().then();
    }, [])

    return (
        <Tabs>
            <TabList>
                {paymentGateState.map(item => {
                    if (typeof item.id === "number") {
                        return <Tab onClick={async () => await fetchTransactions(item.id)}
                                    key={item.id}>{item.name}</Tab>
                    }
                    return null
                })}
            </TabList>
            {paymentGateState.map(item => {
                return (
                    <TabPanel key={item.id}>
                        <h3>Transaction's List</h3>
                        <Table/>
                    </TabPanel>
                )
            })}
        </Tabs>

    )
};
export default TabsList;
