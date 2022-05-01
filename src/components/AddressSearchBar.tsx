import styles from './AddressSearchBar.module.css';
import { useState } from 'react';
type AddressProps = {
    setSearchResults: Function
}
const geocodingCache = new Map();
const AddressSearchBar: React.FC<AddressProps> = ({ setSearchResults }) => {
    let [query, setQuery] = useState('');
    async function searchAddress(address: string) {
        let results;
        if (geocodingCache.has(address)) {
            console.log(`Thanks to a cache we didn't have to bother external services for these!`)
            results = geocodingCache.get(address);
        } else {
            let response = await fetch(`http://localhost:5000/api/geocoding/${address}`);
            if (response.ok) {
                results = await response.json();
                geocodingCache.set(address, results);
                console.log(`data for search: ${address}`)
                console.log(results);
            } else {
                console.log(response);
                return;
            }
        }
        setSearchResults(results.results[0].locations);
    }
    const submitIfEnter = (keyDownEvent: { code: string, preventDefault: Function }) => {
        if (keyDownEvent.code === 'Enter') {
            console.log('enter was pressed')
            searchAddress(query);
            keyDownEvent.preventDefault();
        }
    }
    return (
        <div className={styles.addressSearch}>
            <input type='text' placeholder='Search for an address' value={query} onChange={e => setQuery(e.target.value)} onKeyDown={submitIfEnter} />
            <button type='button' onClick={() => searchAddress(query)}>Go</button>
        </div>
    )
}

export default AddressSearchBar;