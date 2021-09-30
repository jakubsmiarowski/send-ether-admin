import {useContext} from "react";

import userApiController from "../controllers/UserApiController";
import {AuthContext} from "../AppContext";

function useUserApi() {

    const {
        state: {paymentGateOwner},
        actions: {
            handleGithubUser, handlePaymentGateOwner, handleLoading
        }
    } = useContext(AuthContext);

    async function getGithubUser(token: string) {
        handleLoading({isLoading: true});
        try {
            const response = await userApiController.getGithubUser(token);
            handleGithubUser({githubUser: response});
            await getPaymentGateOwner(response.id);
            if (!paymentGateOwner) {
                await userApiController.addPaymentGateOwner(response.id);
            }
        } catch (err) {
            throw new Error();
        } finally {
            handleLoading({isLoading: false});
        }
    }

    async function getPaymentGateOwner(githubId: number) {
        handleLoading({isLoading: true});
        try {
            const response = await userApiController.getPaymentGateOwner(githubId);
            const userId = response.id;
            await handlePaymentGateOwner({paymentGateOwner: response});
            return userId;
        } catch (err) {
            throw new Error();
        } finally {
            handleLoading({isLoading: false});
        }
    }

    return {
        getUserData: {
            getGithubUser,
            getPaymentGateOwner
        }
    }
}

export default useUserApi;

