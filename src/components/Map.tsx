import styles from './Map.module.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer, VectorImage } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Fill, Stroke, Circle, Icon } from 'ol/style';
import { Point } from 'ol/geom';
import { Feature } from 'ol/index';
import { Overlay } from 'ol';
import { useEffect } from 'react';


const MapComponent = () => {
    let count = 0;
    function getTicketCoordinates() {
        let ticketCoordinates = [
            [11.249581636974833, 43.77583693783308],
            [11.252499880383036, 43.766788016389086],
            [11.239453615734599, 43.769143346919435],
            [11.261941256115458, 43.77193243417858],
            [11.25541812379124, 43.770320977404566],
        ]
        return ticketCoordinates;
    }
    function getFeaturesFromCoordinatesArray(coordinates: number[][]): Feature[] {
        let features = coordinates.map(coordinate =>
            new Feature(new Point(fromLonLat(coordinate)))
        )
        return features;
    }
    useEffect(() => {
        let ticketCoordinates = getTicketCoordinates();
        let ticketFeatures = getFeaturesFromCoordinatesArray(ticketCoordinates);
        let imageStyle = new Circle({
            fill: new Fill({
                color: [80, 80, 80, 1],
            }),
            radius: 8,
            stroke: new Stroke({
                color: [50, 50, 50, 1],
                width: 2,
            })
        })
        /* From what I understand the vector layer is only responsible for showing points and things that I draw on the map. 
        The map image is all from the tile layer  */
        let vector = new VectorImage({
            source: new VectorSource({
                features: ticketFeatures
            }),
            style: new Style({
                image: imageStyle,
            })
        })
        let tile = new TileLayer({
            source: new OSM(),
        })
        let olMap = new Map({
            layers: [tile, vector],
            target: 'map',
            view: new View({
                center: fromLonLat([11.251255335400126, 43.77682851721575]),
                zoom: 14,
            })
        })
        olMap.on('click', e => {
            console.log(toLonLat(e.coordinate));
        })
        count++;
        console.log(count);

    }, [])
    return (
        <div id='map' className={styles.map}></div>
    )
}

export default MapComponent;