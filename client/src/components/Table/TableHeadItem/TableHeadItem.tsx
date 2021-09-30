import React from "react";

import {ColumnType} from "../../../types/columnType";
import './TableHeadItem.scss';

interface ITableHeadItemProps {
    column: ColumnType;
}

const TableHeadItem: React.FC<ITableHeadItemProps> = ({column}) => {
    return (
        <td className="table-head-item">
            {column.header}
        </td>
    );
}
export default TableHeadItem;
