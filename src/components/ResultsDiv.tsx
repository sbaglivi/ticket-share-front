import ResultRow from "./ResultsRow";
import styles from './ResultsDiv.module.css'

type ResultsDivProps = {
    results: { street: string, latLng: { lat: number, lng: number } }[],
    setMapPosition: Function

}
const ResultsDiv: React.FC<ResultsDivProps> = ({ results, setMapPosition }) => {
    return (
        <div className={styles.resultsDiv}>
            {results.map((result, index) => <ResultRow text={result.street} coordinates={[result.latLng.lat, result.latLng.lng]} onClick={setMapPosition.bind(null, [result.latLng.lat, result.latLng.lng])} key={index} />)}
        </div>
    )
}

export default ResultsDiv;