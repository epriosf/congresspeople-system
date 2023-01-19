import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-dark-teal/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Banner from "./Components/Banner/Banner";
import {useCallback, useEffect, useState} from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import CongressPeopleList from "./Components/CongressPeopleList/CongressPeopleList";
import Pagination from "./Components/Pagination/Pagination";
import InputSearch from "./Components/UI/InputSearch/InputSearch";

function App() {
    const [congressPeople, setCongressPeople] = useState([]);
    const [items, setItems] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    const filtersCongressPerson= ['firstName', 'party', 'nextElectionYear','gender'];
    const fetchCongressPeopleHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const headers = {
                'X-API-Key': '7blJ75wWn7Le4734oIsCQEehKgWrbB56lbcHIJPJ'
            }
            const response = await fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {headers});
            if (!response.status) {
                throw  new Error('Something went wrong!');
            }

            const data = await response.json();

            const transformedCongressPeople = data.results[0].members.map(congressPeopleData => {
                return {
                    id: congressPeopleData.congress,
                    title: congressPeopleData.title,
                    shortTitle: congressPeopleData.short_title,
                    apiUrl: congressPeopleData.api_uri,
                    firstName: congressPeopleData.first_name,
                    middleName: congressPeopleData.middle_name,
                    lastName: congressPeopleData.last_name,
                    birthday: congressPeopleData.date_of_birth,
                    party: congressPeopleData.party,
                    gender: congressPeopleData.gender,
                    twitterAccount: congressPeopleData.twitter_account,
                    facebookAccount: congressPeopleData.facebook_account,
                    youtubeAccount: congressPeopleData.youtube_account,
                    totalVotes: congressPeopleData.total_votes,
                    nextElectionYear: congressPeopleData.next_election
                };

            });
            setCongressPeople(transformedCongressPeople);
            setItems(transformedCongressPeople.splice(first, rows));
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchCongressPeopleHandler();
    }, [fetchCongressPeopleHandler]);

    let content = <p>Found no congressPeople</p>;

    if (congressPeople.length > 0) {
        content = <CongressPeopleList congressPeople={items} query={query} filtersCongressPerson={filtersCongressPerson}/>;
    }
    if (error) {
        content = <p>{error}</p>
    }
    if (isLoading) {
        content = <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8"
                                   fill="var(--surface-ground)" animationDuration=".5s"/>
    }

    const loadingPaginationHandler = ({rows, first}) => {
        setRows(rows);
        setFirst(first);
        setItems([...congressPeople].splice(first, rows));
    };
    const searchingCriteriaHandler = (searchQuery) => {
        setQuery(searchQuery);
    };
    return (
        <div className="grid">
            <div className="col-12 md:col-12 lg:col-12 h-5rem">
                <Banner/>
            </div>
            <div className="col-12 md:col-12 lg:col-12 p-0">
                <Header/>
            </div>
            <div className="col-12 md:col-12 lg:col-12">
                <InputSearch query={query}
                             onSearchingByCriteria={searchingCriteriaHandler}/>
            </div>
            <div className="col-12 md:col-12 lg:col-12">
                {content}
            </div>
            <div className="col-12 md:col-12 lg:col-12">
                <Pagination congressPeopleNumber={congressPeople.length} onLoadPagination={loadingPaginationHandler}
                            first={first} rows={rows}/>
            </div>
            <div className="col-12 md:col-12 lg:col-12">
                <Footer/>
            </div>
        </div>

    );
}

export default App;
