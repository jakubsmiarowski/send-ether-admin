import React, {useState} from "react";
import ReactDOM from "react-dom";
import {ToastContainer, toast} from 'react-toastify';

import usePaymentGateApi from "../../../hooks/usePaymentGateApi";

import './AddPaymentGateModal.scss';

interface IModalProps {
    show: boolean;
    close: () => void;
}

const modalRoot = document.getElementById("paymentGateModal") as HTMLElement;

const AddPaymentGateModal: React.FC<IModalProps> = ({show, close}) => {

    const [paymentGateName, setPaymentGateName] = useState<string>('');
    const {addPaymentGate} = usePaymentGateApi();

    const onSubmit = (e: any) => {
        e.preventDefault();
        addPaymentGate(paymentGateName)
            .then(() => {
                close();
                toast.dark('Payment Gate added successfully');
            })
            .catch(() => {
                close();
                toast.warn('Adding Payment Gate failed')
            })
        setPaymentGateName('');
    }

    return ReactDOM.createPortal(
        <>
            {
                show ?
                    <div className="modal-container">
                        <div className="modal">
                            <header className="modal__header">
                                <div className="modal__header--title">
                                    <h2>Add Payment Gate</h2>
                                </div>
                                <div className="modal__header--close" onClick={close}>X</div>
                            </header>
                            <ToastContainer/>
                            <main className="modal__content">
                                <form className="modal__content--form"
                                      onSubmit={onSubmit}
                                >
                                    <input type="text"
                                           value={paymentGateName}
                                           className="modal__content--input"
                                           placeholder="Payment Gate Name"
                                           onChange={e => setPaymentGateName(e.target.value)}/>
                                    <button type="submit"
                                            className="modal__content--button">Submit
                                    </button>
                                </form>
                            </main>
                        </div>
                    </div>
                    :
                    null
            }
        </>
        , modalRoot
    )
}
export default AddPaymentGateModal;
