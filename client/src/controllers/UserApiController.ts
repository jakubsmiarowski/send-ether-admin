import axios from "axios";
import {GithubUser} from "../types/githubUser";

class UserApiController {

    async getGithubUser(token: string): Promise<GithubUser> {
        const headers = {
            Authorization: `token ${token}`
        };
        try {
            const result = await axios.get('https://api.github.com/user', {headers});
            return result.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getPaymentGateOwner(githubId: number): Promise<PaymentGateOwnerType> {
        try {
            const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${githubId}`);
            if (result.data === 'Can\'t find paymentGateOwner with that username') {
                return await this.addPaymentGateOwner(githubId);
            }
            return result.data;
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async addPaymentGateOwner(id: number): Promise<PaymentGateOwnerType> {
        try {
            return await axios.post(`${process.env.REACT_APP_BASE_URL}/user`, {githubId: id});
        } catch (error: any) {
            throw new Error(error);
        }
    }

}

const userApiController = new UserApiController();
export default userApiController;
