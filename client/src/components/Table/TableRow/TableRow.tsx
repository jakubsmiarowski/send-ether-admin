import React from "react";
import ReactTooltip from 'react-tooltip';
import {toast} from "react-toastify";

import {convertTime, calculateDistance} from '../../../utils/format-time/formatTime'
import {TransactionType} from "../../../types/transactionType";

import './TableRow.scss';

interface ITableRowProps {
    receipt: TransactionType;
}

const TableRow: React.FC<ITableRowProps> = ({receipt}) => {

    const handleReturn = () => {
        toast.error('Sorry, this feature is not ready yet. Keep an eye out');
    }

    return (
        <tr className="table-body-item">
            <td className='text-truncate' data-tip={receipt.to}>{receipt.to}</td>
            <td className='text-truncate' data-tip={receipt.from}>{receipt.from}</td>
            <td className='text-truncate'
                data-tip={convertTime(receipt.createdAt)}>{calculateDistance(receipt.createdAt)}</td>
            <td className='text-truncate'>{receipt.product}</td>
            <td className='text-truncate'>{receipt.value} Ether</td>
            <td className='text-truncate'>{receipt.gasUsed}</td>
            <td className='text-truncate'>{receipt.status}</td>
            <td className='table-body-item__button-container text-truncate'>
                <button className='table-body-item__button' onClick={handleReturn}>Return</button>
            </td>
            <td><ReactTooltip effect="solid"/></td>
        </tr>
    );
};

export default React.memo(TableRow);
