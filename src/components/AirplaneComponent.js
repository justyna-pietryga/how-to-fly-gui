import * as React from "react";
import 'antd/dist/antd.css';
import '../styles/ChoiceFlightContainer.css'
import {store} from '../store'
import {Button} from 'antd';

export class AirplaneComponent extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
    }

    getNotFreePlacesCodes(flightLegId){
        const reservations = store.getState().reservations.reservations.filter(reservation => reservation.flightLegId === flightLegId);
        if(reservations !== undefined){
            console.log('ff', reservations[0].places.map(place => place.code))
            return reservations[0].places.map(place => place.code)
        }
    }

    isThisPlaceFree(notFree, place){
        notFree.find(one => {console.log('one, place', one.code,  place.code); return one.code === place.code});
       return notFree.find(one => one === place.code) === undefined;
    }

    getPlaceButtons(){
        const row1 = [];
        const row2 = [];
        const row3 = [];
        const row4 = [];
        const flight = this.props.leg;
        const j = this.props.j;
        const free ='#99e286';
        const notFree ='#858482';

        console.log(this.props.places);
        if (this.props.places[0]!== undefined && this.props.places[flight][0] !== undefined) {
            const placesPerRow = this.props.places[flight][0].places.length / 4;

            const notFreePlaces = this.getNotFreePlacesCodes(this.props.places[flight][0].flightLegId);

            console.log(this.props.places[flight][j].places);
            for (let i = 0; i < placesPerRow; i++) {
                const place = this.props.places[flight][j].places[i];
                this.isThisPlaceFree(notFreePlaces, place) ?
                    row1[i] = {place: place, color: free} : row1[i] = {place: place, color: notFree};
            }
            for (let i = placesPerRow; i < placesPerRow * 2; i++) {
                const place = this.props.places[flight][j].places[i];
                this.isThisPlaceFree(notFreePlaces, place) ?
                    row2[i] = {place: place, color: free} : row2[i] = {place: place, color: notFree};
            }
            for (let i = placesPerRow * 2; i < placesPerRow * 3; i++) {
                const place = this.props.places[flight][j].places[i];
                this.isThisPlaceFree(notFreePlaces, place) ?
                    row3[i] = {place: place, color: free} : row3[i] = {place: place, color: notFree};
            }
            for (let i = placesPerRow * 3; i < placesPerRow * 4; i++) {
                const place = this.props.places[flight][j].places[i];
                this.isThisPlaceFree(notFreePlaces, place) ?
                    row4[i] = {place: place, color: free} : row4[i] = {place: place, color: notFree};
            }
        }

                return <div className="oneAirplane">
                    <div className="labelsInAirplane">|--left wing--|</div>
                    <div>{row1.map(row => <div className="back" style={{backgroundColor: row.color}}>
                        <Button ghost={true} disabled={this.props.disabled} className="placeButton" key={row.id} size="small"
                             type={"neutral"}>{row.place.code}</Button></div>)}</div>
                    <div>{row2.map(row => <div className="back" style={{backgroundColor: row.color}}>
                        <Button ghost={true} disabled={this.props.disabled} className="placeButton" key={row.id} size="small"
                             type={"neutral"}>{row.place.code}</Button></div>)}</div>
                    <div className="labelsInAirplane">Here is a corridor</div>
                    <div>{row3.map(row => <div className="back" style={{backgroundColor: row.color}}>
                        <Button ghost={true} disabled={this.props.disabled} className="placeButton" key={row.id} size="small"
                              type={"neutral"}>{row.place.code}</Button></div>)}</div>
                    <div>{row4.map(row => <div className="back" style={{backgroundColor: row.color}}>
                        <Button ghost={true} disabled={this.props.disabled} className="placeButton" key={row.id} size="small"
                              type={"neutral"}>{row.place.code}</Button></div>)}</div>
                    <div className="labelsInAirplane">|-right wing--|</div>
                </div>

    }

    render() {
        return <div className="airplane">
            {this.getPlaceButtons()}
        </div>

    }

}

