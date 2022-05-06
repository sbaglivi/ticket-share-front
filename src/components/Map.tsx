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
import mapPin from './Untitled(1).png';
import { FeatureLike } from 'ol/Feature';
type Ticket = {
    latitude: number,
    longitude: number,
    author_id: number,
    price: number,
    id: number,
    datetime: string,
}
const MapComponent = () => {
    let popupElement: HTMLElement;
    let count = 0;
    let tickets: Ticket[] = [];
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
    function findTicketCorrespondingToFeature(featureId: number) {
        // let match = tickets.filter(ticket => { console.log(ticket.latitude, ticket.longitude); return ticket.latitude === coordinates[0] && ticket.longitude === coordinates[1] })
        let match = tickets.filter(ticket => ticket.id === featureId);
        if (match.length !== 1) {
            console.log(`Found more than 1 or 0 matches for feature with id ${featureId}`);
            return;
        }
        console.log(`Found a match: ${match[0]}`)
        return match[0];

    }
    async function getTickets() {
        let response = await fetch(`http://localhost:5000/api/tickets`);
        if (response.ok) {
            let results = await response.json();
            console.log('hello?')
            console.log(results)
            return results;
        } else {
            console.log(response)
        }

    }
    async function getFeaturesAndDisplayThem(vectorSource: VectorSource) {
        tickets = await getTickets();
        let ticketFeatures = tickets.map(ticket => new Feature({ geometry: new Point(fromLonLat([ticket.longitude, ticket.latitude])), ticketId: ticket.id }))
        console.log(ticketFeatures)
        vectorSource.addFeatures(ticketFeatures);
    }
    function getFeaturesFromCoordinatesArray(coordinates: number[][]): Feature[] {
        let features = coordinates.map(coordinate =>
            new Feature({ geometry: new Point(fromLonLat([coordinate[1], coordinate[0]])) })
        )
        return features;
    }
    function createPopupContent(ticket: Ticket, reset = true) {
        if (reset)
            popupElement.innerHTML = '';
        let p = document.createElement('p');
        p.textContent = `expires at: ${ticket.datetime.substring(11, 16)}`
        // p.textContent = `expires at: |${ticket.datetime}|`
        popupElement.append(p)
        p = document.createElement('p');
        p.textContent = `price: ${ticket.price}E`
        popupElement.append(p)
    }
    useEffect(() => {
        // let ticketCoordinates = getTicketCoordinates();
        // let ticketFeatures = getFeaturesFromCoordinatesArray(ticketCoordinates);
        popupElement = document.getElementById('popup')!;
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
        let iconStyle = new Style({
            image: new Icon({
                src: mapPin,
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                // scale: 0.2,
                color: 'lightgrey'
            })
        })
        let vectorSource = new VectorSource();
        getFeaturesAndDisplayThem(vectorSource);
        let vector = new VectorImage({
            source: vectorSource,
            style: iconStyle
            // style: new Style({
            //     image: imageStyle,
            // })
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
            console.log(`Registered a click at (lon,lat): ${toLonLat(e.coordinate)}`);
            let features: Feature[] = []
            olMap.forEachFeatureAtPixel(e.pixel, (feature: FeatureLike) => {
                if (feature instanceof Feature)
                    features.push(feature);
            })
            if (features.length === 1) {
                let geometry = features[0].getGeometry();
                if (geometry instanceof Point) {
                    console.log(`cordinates of feature clicked(lat, lon) ${toLonLat(geometry.getCoordinates()).reverse()}`)
                    let id: string | number | undefined = features[0].get('ticketId');
                    if (typeof id !== 'undefined') {
                        if (typeof id === 'string')
                            id = parseInt(id);
                        let featureTicket: Ticket | undefined = findTicketCorrespondingToFeature(id);
                        if (typeof featureTicket !== 'undefined') {
                            createPopupContent(featureTicket);
                            popup.setPosition(geometry.getCoordinates());
                        }


                    } else {
                        console.log(`${id} is undefined`)
                    }
                }
                // vectorSource.removeFeature(features[0])
            } else if (features.length > 1) {
                popupElement.innerHTML = '';
                for (let feature of features) {
                    let geometry = feature.getGeometry();
                    if (geometry instanceof Point) {

                        let id: string | number | undefined = feature.get('ticketId');
                        if (typeof id !== 'undefined') {
                            if (typeof id === 'string')
                                id = parseInt(id);
                            let featureTicket: Ticket | undefined = findTicketCorrespondingToFeature(id);
                            if (typeof featureTicket !== 'undefined') {
                                createPopupContent(featureTicket, false);
                            }

                        }
                    }
                }
                popup.setPosition(e.coordinate);
            } else {
                popupElement.innerHTML = ''
            }
        })
        let popup = new Overlay({
            element: popupElement,
        })
        olMap.addOverlay(popup);
        count++;
        console.log(count);

    }, [])
    return (
        <div id='map' className={styles.map}>
            <div id='popup' style={{ backgroundColor: 'white' }}></div>
        </div>
    )
}

export default MapComponent;