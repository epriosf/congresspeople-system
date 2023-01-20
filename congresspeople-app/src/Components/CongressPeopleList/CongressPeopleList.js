import CongressPerson from "../CongressPerson/CongressPerson";
/* eslint react/prop-types: 0 */
const CongressPeopleList = ({
                                congressPeople,
                                filtersCongressPerson,
                                query,
                                queryByVotes
                            }) => {
    return (
        <div className="grid">
            {query !== '' && congressPeople.filter((congressPerson) =>
                filtersCongressPerson.some(filterCongressPerson => congressPerson[filterCongressPerson].toLowerCase().includes(query.toLowerCase()))
            ).map((congressPerson) => (
                <div className="col lg:col-3 md:col-4 sm:col-12 xl:col-2" key={congressPerson.id}>
                    <CongressPerson congressPerson={congressPerson}/>
                </div>
            ))}
            {queryByVotes !== '' && congressPeople.filter((congressPerson) =>
                filtersCongressPerson.some(filterCongressPerson => congressPerson[filterCongressPerson].toString().includes(queryByVotes))
            ).map((congressPerson) => (
                <div className="col lg:col-3 md:col-4 sm:col-12 xl:col-2" key={congressPerson.id}>
                    <CongressPerson congressPerson={congressPerson}/>
                </div>
            ))}
            {query === '' && queryByVotes === '' && congressPeople.map((congressPerson) => (
                <div className="col lg:col-3 md:col-4 sm:col-12 xl:col-2" key={congressPerson.id}>
                    <CongressPerson congressPerson={congressPerson}/>
                </div>
            ))}
        </div>
    );
};
export default CongressPeopleList;
