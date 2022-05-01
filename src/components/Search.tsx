import { useState } from "react";
import AddressSearchBar from "./AddressSearchBar";
import ResultsDiv from "./ResultsDiv";
import styles from "./Search.module.css"

type SearchProps = {
    setMapPosition: Function
}
const Search: React.FC<SearchProps> = ({ setMapPosition }) => {
    let [searchResults, setSearchResults] = useState([]);
    return (
        <div className={styles.searchDiv}>
            <AddressSearchBar setSearchResults={setSearchResults} />
            <ResultsDiv results={searchResults} setMapPosition={setMapPosition} />
        </div>
    )
}

export default Search;