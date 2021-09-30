import {Reducer, useCallback, useReducer} from "react";

import {AuthStateContextType} from "../types/authStateContextType";
import {ReducerActions} from "../types/authReducerActions";
import {GithubUser} from "types/githubUser";

const ACTIONS = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    SET_LOADING: 'setLoading',
    GET_GITHUB_USER: 'getGithubUser',
    GET_PAYMENT_GATE_OWNER: 'getPaymentGateOwner'
};

export const initialState: AuthStateContextType = {
    isLoggedIn: false,
    accessToken: '',
    proxy_url: process.env.REACT_APP_PROXY_URL as RequestInfo,
    isLoading: false,
    githubUser: {} as GithubUser,
    paymentGateOwner: {} as PaymentGateOwnerType,
};

export const reducer: Reducer<AuthStateContextType, ReducerActions> = (state, actions) => {
    const {type, payload} = actions;
    switch (type) {
        case ACTIONS.LOGIN: {
            localStorage.setItem("isLoggedIn", JSON.stringify(payload.isLoggedIn))
            localStorage.setItem("accessToken", JSON.stringify(payload.accessToken))
            return {
                ...state,
                isLoggedIn: payload.isLoggedIn,
                accessToken: payload.accessToken
            };
        }
        case ACTIONS.LOGOUT: {
            localStorage.clear()
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        case ACTIONS.GET_GITHUB_USER: {
            return {
                ...state,
                githubUser: payload.githubUser
            };
        }
        case ACTIONS.GET_PAYMENT_GATE_OWNER: {
            return {
                ...state,
                paymentGateOwner: payload.paymentGateOwner
            };
        }
        case ACTIONS.SET_LOADING: {
            return {
                ...state,
                isLoading: payload.isLoading
            };
        }
        default:
            return state;
    }
};

function useAuth() {
    const [authState, dispatch] = useReducer(reducer, initialState);

    const handleLogin = useCallback((e) => {
        dispatch({type: ACTIONS.LOGIN, payload: e});
    }, [])

    const handleLogout = useCallback((e) => {
        dispatch({type: ACTIONS.LOGOUT, payload: e});
    }, [])

    const handleGithubUser = useCallback((e) => {
        dispatch({type: ACTIONS.GET_GITHUB_USER, payload: e});
    }, [])

    const handlePaymentGateOwner = useCallback((e) => {
        dispatch({type: ACTIONS.GET_PAYMENT_GATE_OWNER, payload: e});
    }, [])

    const handleLoading = useCallback((e) => {
        dispatch({type: ACTIONS.SET_LOADING, payload: e});
    }, [])

    return {
        state: authState,
        actions: {
            handleLogin,
            handleLogout,
            handleGithubUser,
            handlePaymentGateOwner,
            handleLoading
        }
    }
}

export default useAuth;
