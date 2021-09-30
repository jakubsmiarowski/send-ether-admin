import React, {useContext} from "react";

import {AuthContext} from "../../../AppContext";
import {convertTime} from "../../../utils/format-time/formatTime";
import './AccountInfo.scss';

const AccountInfo: React.FC = () => {

    const {state: {githubUser}} = useContext(AuthContext);

    return (
        <div className='account-info-container'>
            <div>Login: <p>{githubUser.login}</p></div>
            <div>Public Repos: <p>{githubUser.public_repos}</p></div>
            <div>Private Repos: <p>{githubUser.total_private_repos}</p></div>
            <div>Github account created at: <p>{convertTime(githubUser.created_at)}</p></div>
            <div>Github link: <p><a href={githubUser.html_url} target='_blank'
                                    rel="noreferrer">{githubUser.html_url}</a></p></div>
        </div>
    )
}
export default AccountInfo;
