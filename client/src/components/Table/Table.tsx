import React, {useContext} from "react";

import {columns} from '../../data/columns'
import {TransactionContext} from "../../AppContext";
import TableHeadItem from "./TableHeadItem/TableHeadItem";
import TableRow from "./TableRow/TableRow";

import './Table.scss';

const Table: React.FC = () => {

    const {transactionState} = useContext(TransactionContext);

    return (
        <table className="table-container">
            <thead>
            <tr className="table-container-head__row">
                {columns.map((col) => {
                    return <TableHeadItem key={col.id} column={col}/>;
                })}
            </tr>
            </thead>
            <tbody>
            {transactionState.map((item) => {
                return <TableRow key={item.id} receipt={item}/>;
            })}
            </tbody>
        </table>
    );
}


export default Table;
