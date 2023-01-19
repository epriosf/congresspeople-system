import {Paginator} from "primereact/paginator";
import {useState} from "react";
/* eslint react/prop-types: 0 */
const Pagination = ({first, rows, onLoadPagination, congressPeopleNumber}) => {
    const [basicFirst, setBasicFirst] = useState(first || 0);
    const [basicRows, setBasicRows] = useState(rows || 12);
    const onBasicPageChange = (event) => {
        setBasicFirst(event.first);
        setBasicRows(event.rows);
        onLoadPagination(event);
    }
    return (
        <Paginator first={basicFirst} rows={basicRows} totalRecords={congressPeopleNumber}
                   rowsPerPageOptions={[12, 24, 36, congressPeopleNumber]}
                   onPageChange={onBasicPageChange}></Paginator>
    );

}
export default Pagination;