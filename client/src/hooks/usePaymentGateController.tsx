import {Reducer, useCallback, useReducer} from "react";

import {PaymentGateType} from "../types/paymentGateType";
import {ReducerActions} from "../types/authReducerActions";

const ACTIONS = {
    GET_PAYMENT_GATES_BY_USER_ID: 'getPaymentGatesByUserId',
    ADD_PAYMENT_GATE: 'addPaymentGate',
    DISABLE_PAYMENT_GATE: 'togglePaymentGateStatus',
    ACTIVATE_PAYMENT_GATE: 'activatePaymentGate',
    DELETE_PAYMENT_GATE: 'deletePaymentGate',
    CHECK_STATE: 'check-state'
}

const paymentGatesInitialState: PaymentGateType[] = [] as PaymentGateType[]

const reducer: Reducer<PaymentGateType[], ReducerActions> = (state, actions) => {
    const {type, payload} = actions;
    switch (type) {
        case ACTIONS.GET_PAYMENT_GATES_BY_USER_ID: {
            return state = payload.paymentGates;
        }
        case ACTIONS.ADD_PAYMENT_GATE: {
            return [...state, addPaymentGate(payload.paymentGate)];
        }
        case ACTIONS.DISABLE_PAYMENT_GATE: {
            return state.map(pg => {
                if (pg.id === payload.id) {
                    return {...pg, status: 'DISABLED'};
                }
                return pg;
            })
        }
        case ACTIONS.ACTIVATE_PAYMENT_GATE: {
            return state.map(pg => {
                if (pg.id === payload.id) {
                    return {...pg, status: 'ACTIVE'}
                }
                return pg;
            });
        }
        case ACTIONS.DELETE_PAYMENT_GATE: {
            return state.filter(pg => pg.id !== payload.id);
        }
        default:
            return state;
    }
}

function addPaymentGate(paymentGate: PaymentGateType) {
    return {
        id: paymentGate.id,
        status: paymentGate.status,
        name: paymentGate.name,
        url: paymentGate.url,
        widgetToken: paymentGate.widgetToken,
        userId: paymentGate.userId,
        githubId: paymentGate.githubId
    }
}

function usePaymentGateController() {
    const [paymentGateState, dispatch] = useReducer(reducer, paymentGatesInitialState);

    const handleGetPaymentGateByUserId = useCallback((e) => {
        dispatch({type: ACTIONS.GET_PAYMENT_GATES_BY_USER_ID, payload: e});
    }, [])

    const handleAddPaymentGate = useCallback((e) => {
        dispatch({type: ACTIONS.ADD_PAYMENT_GATE, payload: e});
    }, [])

    const handleDisablePaymentGate = useCallback((e) => {
        dispatch({type: ACTIONS.DISABLE_PAYMENT_GATE, payload: e});
    }, [])
    const handleActivatePaymentGate = useCallback((e) => {
        dispatch({type: ACTIONS.ACTIVATE_PAYMENT_GATE, payload: e});
    }, [])

    const handleDeletePaymentGate = useCallback((e) => {
        dispatch({type: ACTIONS.DELETE_PAYMENT_GATE, payload: e});
    }, [])

    return {
        paymentGateState,
        paymentGateActions: {
            handleGetPaymentGateByUserId,
            handleAddPaymentGate,
            handleDisablePaymentGate,
            handleActivatePaymentGate,
            handleDeletePaymentGate,
        }
    }

}

export default usePaymentGateController;
