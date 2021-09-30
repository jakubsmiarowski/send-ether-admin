import React, {useState, useEffect, useContext} from "react";
import {Redirect} from "react-router-dom";
import {PacmanLoader} from "react-spinners";
import GithubIcon from "mdi-react/GithubIcon";

import {AuthContext} from "../../AppContext";
import Ethereum from "../../assets/img/ethereum-brands.svg";
import './Login.scss';

export default function Login() {
    const {state, actions: {handleLogin}} = useContext(AuthContext);
    const [data, setData] = useState({errorMessage: "", isLoading: false});

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, '', newUrl[0]);
            setData({...data, isLoading: true});

            const requestData = {
                code: newUrl[1]
            };

            fetch(`${process.env.REACT_APP_BASE_URL}/authenticate`, {
                method: "POST",
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    handleLogin({accessToken: data.access_token, isLoggedIn: true});
                })
                .catch(error => {
                    setData({
                        isLoading: false,
                        errorMessage: "Sorry! Login failed"
                    });
                });
        }

    }, []);

    if (state.isLoggedIn) {
        return <Redirect to="/"/>;
    }

    return (
        <section className="section">
            <div className="section-wrapper">
                <h1 className="section-wrapper__title">Welcome</h1>
                <div className='section-wrapper__logo'>
                    <img className='section-wrapper__logo-img' src={Ethereum} alt='ethereum logo'/>
                    send-ether-admin
                </div>
                <span className='section-wrapper__error'>{data.errorMessage}</span>
                <div className="login-container">
                    {state.isLoading ? (
                        <div className="loader-container">
                            <PacmanLoader loading={state.isLoading} color='#f1c40f'/>
                        </div>
                    ) : (
                        <>
                            <a
                                className="login-link"
                                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/login`}
                                onClick={() => {
                                    setData({...data, errorMessage: ""});
                                }}
                            >
                                <GithubIcon/>
                                <span>Login with GitHub</span>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
