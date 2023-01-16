import CongressPerson from "../CongressPerson/CongressPerson";
/* eslint react/prop-types: 0 */
const CongressPeopleList = (props) => {
    return (
        <div className="grid">
            {props.congressPeople.map((congressPerson) => (
                <div className="col lg:col-3 md:col-4 sm:col-12 xl:col-2" key={congressPerson.id}>
                    <CongressPerson congressPerson={congressPerson}/>
                </div>
            ))}
        </div>
    );
};
export default CongressPeopleList;