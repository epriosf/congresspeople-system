import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-dark-teal/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Banner from "./Components/Banner/Banner";
import {useEffect, useState} from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import CongressPeopleList from "./Components/CongressPeopleList/CongressPeopleList";
import Pagination from "./Components/Pagination/Pagination";
import InputSearch from "./Components/UI/InputSearch/InputSearch";
import SliderWithInput from "./Components/UI/Slider/SliderWithInput";
import useHttp from "./Components/hooks/use-http";

function App() {
    const [congressPeople, setCongressPeople] = useState([]);
    const [items, setItems] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);
    const [query, setQuery] = useState('');
    const [queryByVotes, setQueryByVotes] = useState('');
    const initialFilters = ['firstName', 'party', 'nextElectionYear', 'gender'];
    const filterTotalVotes = 'totalVotes';
    const [filters, setFilters] = useState([]);
    const [valueForSlider, setValueForSlider] = useState(null);
    const minValueSlider = 0;
    const maxValueSlider = 800;

    const {isLoading, error, sendRequest: fetchCongressPeople} = useHttp();

    useEffect(() => {
        const transformCongressPeople = (congressPeopleObj => {
            const memberCongressPeople = congressPeopleObj.results[0].members;
            const loadedCongressPeople = [];
            for (const congressPeopleKey in memberCongressPeople) {
                loadedCongressPeople.push({
                    id: memberCongressPeople[congressPeopleKey].id,
                    title: memberCongressPeople[congressPeopleKey].title,
                    shortTitle: memberCongressPeople[congressPeopleKey].short_title,
                    apiUrl: memberCongressPeople[congressPeopleKey].api_uri,
                    firstName: memberCongressPeople[congressPeopleKey].first_name,
                    middleName: memberCongressPeople[congressPeopleKey].middle_name,
                    lastName: memberCongressPeople[congressPeopleKey].last_name,
                    birthday: memberCongressPeople[congressPeopleKey].date_of_birth,
                    party: memberCongressPeople[congressPeopleKey].party,
                    gender: memberCongressPeople[congressPeopleKey].gender,
                    twitterAccount: memberCongressPeople[congressPeopleKey].twitter_account,
                    facebookAccount: memberCongressPeople[congressPeopleKey].facebook_account,
                    youtubeAccount: memberCongressPeople[congressPeopleKey].youtube_account,
                    totalVotes: memberCongressPeople[congressPeopleKey].total_votes,
                    nextElectionYear: memberCongressPeople[congressPeopleKey].next_election
                })
            }
            setCongressPeople(loadedCongressPeople);
            setItems(loadedCongressPeople.splice(first, rows));
        });

        fetchCongressPeople(
            {
                url: `https://api.propublica.org/congress/v1/116/senate/members.json`,
                method: 'GET',
                headers: {
                    'X-API-Key': '7blJ75wWn7Le4734oIsCQEehKgWrbB56lbcHIJPJ'
                }
            },
            transformCongressPeople
        );
    }, []);

    let content = <p>Found no congressPeople</p>;
    if (congressPeople.length > 0) {
        content =
            <CongressPeopleList congressPeople={items} query={query} queryByVotes={queryByVotes}
                                filtersCongressPerson={filters}
            />;
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
        setFilters(initialFilters);
        setValueForSlider(null);
        setQueryByVotes('');
    };
    const searchingByVotesHandler = (votesQueryAmount) => {
        if (votesQueryAmount === null) {
            setQueryByVotes('');
            setFilters(initialFilters);
        } else {
            setQueryByVotes(votesQueryAmount);
            setValueForSlider(votesQueryAmount);
            filters.push(filterTotalVotes);
            setFilters(filters);
        }
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
                <div className="grid">
                    <div className="col-6 md:col-6 lg:col-6 sm:col-12">
                        <InputSearch query={query}
                                     onSearchingByCriteria={searchingCriteriaHandler}/>
                    </div>
                    <div className="col-3 md:col-3 lg:col-3 sm:col-12"></div>
                    <div className="col-3 md:col-3 lg:col-3 sm:col-12">
                        <SliderWithInput value={valueForSlider} minVotes={minValueSlider} maxVotes={maxValueSlider}
                                         onSliderSelect={searchingByVotesHandler}/>
                    </div>
                </div>

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

