import {InputText} from "primereact/inputtext";
/* eslint react/prop-types: 0 */
const InputSearch = ({query, onSearchingByCriteria}) => {
    const onInputSearch = searchQuery => {
        onSearchingByCriteria(searchQuery.target.value)
    }
    return (
        <div className="grid">
            <div className="col-6 md:col-6 lg:col-6 sm:col-12">
                <span className="p-input-icon-right m-2 w-full">
                    <InputText value={query} onChange={onInputSearch}
                               placeholder="Search...(ex. name, party, gender, etc)"
                               className="w-full"
                    />
             <i className="pi pi-search"/>
        </span>
            </div>
            <div className="col-3 md:col-3 lg:col-3 sm:col-12"></div>
            <div className="col-3 md:col-3 lg:col-3 sm:col-12"></div>
        </div>
    );
}
export default InputSearch;