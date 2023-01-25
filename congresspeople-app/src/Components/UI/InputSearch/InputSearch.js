import {InputText} from "primereact/inputtext";
/* eslint react/prop-types: 0 */
const InputSearch = ({query, onSearchingByCriteria}) => {
    const onInputSearch = searchQuery => {
        onSearchingByCriteria(searchQuery.target.value)
    }
    return (
        <span className="p-input-icon-right m-2 w-full">
                    <InputText value={query} onChange={onInputSearch}
                               placeholder="Search...(ex. name, party, gender, etc)"
                               className="w-full"
                    />
             <i className="pi pi-search"/>
        </span>
    );
}
export default InputSearch;
