import styles from './SmallMap.module.css';
import 'ol/ol.css';
import 'ol-geocoder/dist/ol-geocoder.min.css'
import './SmallMap.css';
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
import Search from './Search';
import AddressSearchBar from './AddressSearchBar';
import ResultsDiv from './ResultsDiv';
import { useState } from 'react';

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
let vectorSource = new VectorSource();
let vector = new VectorImage({
    source: vectorSource,
    style: new Style({
        image: imageStyle,
    })
})
let tile = new TileLayer({
    source: new OSM(),
})
let olMap: Map;
let currentFeature: Feature | null = null;

type MapComponentProps = {
    setCoordinates: Function
}

const MapComponent: React.FC<MapComponentProps> = ({ setCoordinates }) => {

    const setMapPositionAndUpdateFeature = (coordinates: number[]) => {
        setMapPosition(coordinates);
        removeOldFeatureAndAddNew(coordinates);
        setCoordinates(coordinates);
    }
    const removeOldFeatureAndAddNew = (coordinates: number[]) => {
        if (currentFeature) {
            vectorSource.removeFeature(currentFeature);
        }
        currentFeature = new Feature(new Point(fromLonLat([coordinates[1], coordinates[0]])))
        vectorSource.addFeature(currentFeature);
    }

    const setMapPosition = (coordinates: number[]) => {
        olMap.setView(new View({
            center: fromLonLat([coordinates[1], coordinates[0]]),
            zoom: 18,
        }))
    }
    useEffect(() => {

        olMap = new Map({
            layers: [tile, vector],
            target: 'map',
            view: new View({
                center: fromLonLat([11.25404, 43.77162]),
                zoom: 14,
            })
        })
        olMap.on('click', e => {
            if (currentFeature) {
                vectorSource.removeFeature(currentFeature);
            }
            currentFeature = new Feature(new Point(e.coordinate));
            vectorSource.addFeature(currentFeature);
            let coordinates = toLonLat(e.coordinate).reverse();
            setCoordinates(coordinates);
        })
    }, [])

    // let geocoder = new Geocoder('nominatim', {
    //     provider: 'osm',
    //     countryCodes: 'IT',
    //     lang: 'en-US', //en-US, fr-FR
    //     placeholder: 'Search for ...',
    //     targetType: 'text-input', // or glass-button
    //     limit: 5,
    //     keepOpen: true
    // })
    // olMap.addControl(geocoder);

    return (
        <div id='map' className={styles.map}>
            <Search setMapPosition={setMapPositionAndUpdateFeature} />
        </div>
    )
}

export default MapComponent;