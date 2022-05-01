import styles from './ResultsRow.module.css'

type ResultRowProps = {
    text: string,
    coordinates: number[],
    onClick: Function
}
const ResultRow: React.FC<ResultRowProps> = ({ text, coordinates, onClick }) => {
    return (
        <p className={styles.resultsRow} onClick={() => onClick()}><span className='coordinates' hidden>{coordinates}</span>{text}</p>
    )
}

export default ResultRow;