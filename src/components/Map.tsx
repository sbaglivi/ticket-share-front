import styles from './Map.module.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM, Vector as VectorSource} from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer, VectorImage } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Fill, Stroke, Circle, Icon } from 'ol/style';
import { Point } from 'ol/geom';
import { Feature } from 'ol/index';
import { Overlay } from 'ol';
import { useEffect } from 'react';


const MapComponent = () => {
    let count = 0;
    useEffect(()=> {
    let imageStyle = new Circle({
        fill: new Fill({
            color: [80,80,80,1],
        }),
        radius: 8,
        stroke: new Stroke({
            color: [50,50,50,1],
            width: 2,
        })
    })
    let vector = new VectorImage({
        source: new VectorSource(),
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
            center: fromLonLat([ 11.251255335400126, 43.77682851721575 ]),
            zoom: 14,
        })
    })
    count++;
    console.log(count);

    }, [])
    return (
        <div id='map' className={styles.map}></div>
    )
}

export default MapComponent;