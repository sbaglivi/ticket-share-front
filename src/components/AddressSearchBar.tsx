import styles from './AddressSearchBar.module.css';
import { useState } from 'react';

const AddressSearchBar = () => {
    let [query, setQuery] = useState('');
    let [results, setResults] = useState([]);
    async function searchAddress(address: string) {
        let response = await fetch(`https://nominatim.openstreetmap.org/search?${address}`, { mode: 'cors' })
        if (response.ok) {
            let results = await response.json();
            console.log(results);
            return;
        }
        console.log('response was not ok :(')
    }
    const submitIfEnter = (keyDownEvent: { code: string, preventDefault: Function }) => {
        if (keyDownEvent.code === 'Enter') {

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