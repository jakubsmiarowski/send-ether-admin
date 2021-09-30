import React, {useCallback, useContext} from "react";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";

import {PaymentGateType} from "../../../types/paymentGateType";
import usePaymentGateApi from "../../../hooks/usePaymentGateApi";
import {AuthContext} from "../../../AppContext";

import './PaymentGate.scss';

interface IPaymentGateProps {
    paymentGate: PaymentGateType;
}

const PaymentGate: React.FC<IPaymentGateProps> = ({paymentGate}) => {

    const {
        disablePaymentGate,
        activatePaymentGate,
        deletePaymentGate,
        getTransactionByPaymentGateId
    } = usePaymentGateApi();
    const {state: {paymentGateOwner}} = useContext(AuthContext);

    const togglePaymentGateStatus = useCallback((e: any) => {
        e.preventDefault();
        if (typeof paymentGate.id !== "number") {
            toast.error('Error: PaymentGate id must be a number');
        }

        async function asyncWrapper(params: any) {
            try {
                if (typeof paymentGate.id === 'number') {
                    if (paymentGate.status === 'ACTIVE') {
                        await disablePaymentGate(paymentGate.id);
                        toast.error('PaymentGate disabled');
                    } else {
                        await activatePaymentGate(paymentGate.id)
                        toast.success('PaymentGate enabled');
                    }
                }
            } catch (err) {
                toast.error('Could not change status of Payment Gate');
                throw new Error();
            }
        }

        return asyncWrapper(e)
    }, [paymentGate.id, paymentGate.status])

    const handleDeletePaymentGate = useCallback((e) => {
        e.preventDefault();

        async function asyncWrapper(params: any) {
            if (typeof paymentGate.id === 'number') {
                const transactions = await getTransactionByPaymentGateId(paymentGate.id);
                if (transactions.length > 0) {
                    toast.error('You have some transactions in this Payment Gate, you can\'t delete it!');
                } else {
                    await deletePaymentGate(paymentGate.id)
                    toast('Payment Gate deleted successfully');
                }
            }
        }

        return asyncWrapper(e);
    }, [])

    return (
        <div className="payment-gate-info">
            <div className="payment-gate-info--text">
                <div>Payment Gate Name: <p>{paymentGate.name}</p></div>
                <ClipboardCopy copyText={paymentGate.widgetToken} status={paymentGate.status}/>
                <div data-tip='You will need it to setup send-ether button' className='user-id-container'>Your id in
                    send-ether-admin: <p>{paymentGateOwner.id}</p></div>
                <div>Gate's status: <p>{paymentGate.status}</p></div>
                <ReactTooltip effect="solid" place='left'/>
            </div>
            <div className="payment-gate-info--button">
                <button
                    onClick={togglePaymentGateStatus}>{paymentGate.status === 'ACTIVE' ? 'Disable' : 'Activate'}</button>
                <button onClick={handleDeletePaymentGate}>Delete</button>
            </div>
        </div>
    )
}

const ClipboardCopy: React.FC<{ copyText: string | undefined, status: string }> = ({copyText, status}) => {
    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        if (typeof copyText === 'string') {
            copyTextToClipboard(copyText)
                .then(() => {
                    toast.success('Widget Token copied!')
                })
                .catch((err) => {
                    toast.error('Something went wrong and token was not copied to your clipboard')
                });
        }
    }

    return (
        <div data-tip={copyText} className="copy-token">
            <div>Widget token:
                <p className='truncate'>{copyText}</p>
            </div>
            <button onClick={handleCopyClick} disabled={status === 'DISABLED'}
                    className={status === 'DISABLED' ? 'disabled' : ''}>
                <span>Copy</span>
            </button>
            <ReactTooltip effect="solid" place='left'/>
        </div>
    );
}

export default React.memo(PaymentGate);
