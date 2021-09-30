import {Reducer, useCallback, useReducer} from "react";

import {TransactionType} from '../types/transactionType'
import {ReducerActions} from "../types/authReducerActions";

const ACTIONS = {
    GET_TRANSACTIONS_BY_PAYMENT_GATE_ID: 'getTransactionsByPaymentGateId',
}

const transactionInitialState: TransactionType[] = [] as TransactionType[];

const reducer: Reducer<TransactionType[], ReducerActions> = (state, actions) => {
    const {type, payload} = actions;
    switch (type) {
        case ACTIONS.GET_TRANSACTIONS_BY_PAYMENT_GATE_ID: {
            return state = payload.transactions;
        }
    }
}

function useTransactionController() {
    const [transactionState, dispatch] = useReducer(reducer, transactionInitialState);

    const handleTransactions = useCallback((e) => {
        dispatch({type: ACTIONS.GET_TRANSACTIONS_BY_PAYMENT_GATE_ID, payload: e});
    }, [])

    return {
        transactionState,
        transactionActions: {
            handleTransactions
        }
    }
}

export default useTransactionController;
