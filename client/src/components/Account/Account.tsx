import React, {useCallback, useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";

import {AuthContext} from "../../AppContext";
import useUserApi from "../../hooks/useUserApi";
import Header from "../Header/Header";
import AccountInfo from "./AccountInfo/AccountInfo";
import AddPaymentGateModal from "../Modals/AddPaymentGateModal/AddPaymentGateModal";

import './Account.scss';

const Account = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {state: {isLoggedIn, accessToken, githubUser}} = useContext(AuthContext);
    const {getUserData: {getGithubUser}} = useUserApi();

    const fetchGithubUser = useCallback(async () => {
        try {
            await getGithubUser(accessToken);
        } catch (err) {
            console.error(err);
        }
    }, [])

    useEffect(() => {
        const asyncWrapper = async () => {
            await fetchGithubUser().then();
        }
        asyncWrapper().then();
    }, [])

    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }
    const toggleModal = () => setIsOpen(prevIsOpen => !prevIsOpen);

    const handleClearData = () => {
        toast.error('Sorry, this feature is not ready yet. Keep an eye out');
    }

    return (
        <div className='container-account'>
            <Header/>
            <main className='container-account__info' id='page-wrap'>
                <h3>Account Information</h3>
                <div className='container-account__info-wrapper'>
                    <img className='container-account__info-wrapper--img' src={githubUser.avatar_url} alt='user'/>
                    <AccountInfo/>
                    <div className='container-account__info-buttons'>
                        <button className='container-account__info-buttons--btn' onClick={toggleModal}>Create payment
                            gate
                        </button>
                        <button className='container-account__info-buttons--btn' onClick={handleClearData}>Clear all the
                            data
                        </button>
                    </div>
                    <AddPaymentGateModal show={isOpen} close={toggleModal}/>
                </div>
            </main>
        </div>
    )
}
export default Account;
