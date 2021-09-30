import React, {createContext} from "react";
import useAuth, {initialState} from "./hooks/useAuth";
import usePaymentGateController from "./hooks/usePaymentGateController";
import useTransactionController from "./hooks/useTransactionController";

import {AuthContextType} from "./types/authContextType";
import {AuthContextActionsType} from "./types/authContextActionsType";
import {TransactionContextActionsType} from "./types/transactionContextActionsType";
import {PaymentGateContextActionsType} from './types/paymentGateContextActionsType'
import {PaymentGateContextType} from "./types/paymentGateContextType";
import {TransactionContextType} from "./types/transactionContextType";

export const AuthContext = createContext<AuthContextType>({
    state: initialState,
    actions: {} as AuthContextActionsType
});

export const PaymentGateContext = createContext<PaymentGateContextType>({
    paymentGateState: [],
    paymentGateActions: {} as PaymentGateContextActionsType
});

export const TransactionContext = createContext<TransactionContextType>({
    transactionState: [],
    transactionActions: {} as TransactionContextActionsType
});


const AppProvider: React.FC = ({children}) => {
    const {state, actions} = useAuth();
    const {paymentGateState, paymentGateActions} = usePaymentGateController();
    const {transactionState, transactionActions} = useTransactionController();

    return (
        <AuthContext.Provider value={{state, actions}}>
            <PaymentGateContext.Provider value={{paymentGateState, paymentGateActions}}>
                <TransactionContext.Provider value={{transactionState, transactionActions}}>
                    {children}
                </TransactionContext.Provider>
            </PaymentGateContext.Provider>
        </AuthContext.Provider>
    )
}

export default AppProvider;
