import * as React from "react";
import 'antd/dist/antd.css';
import '../styles/ChoiceFlightContainer.css'
import {store} from '../store'
import {Button} from 'antd';
import {connect} from "react-redux";
import {reservations} from "../reducers/reservations";
import {PlaceButton, PlaceButtonComponent} from "./PlaceButton";
import Typography from '@material-ui/core/Typography';

export class AirplaneComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            free: '#99e286',
            notFree: '#858482'
        }
    }

    componentDidMount() {
    }

    getTheFlightLeg(id) {
        return this.props.flightLegs.filter(flightLeg => flightLeg.id === id)[0];
    }

    getNotFreePlacesCodes(flightLegId) {
        const reservations = store.getState().reservations.reservations.filter(reservation => reservation.flightLegId === flightLegId);
        if (reservations !== undefined) {
            console.log('ff', reservations[0].places.map(place => place.code))
            return reservations[0].places.map(place => place.code)
        }
    }

    isThisPlaceFree(notFree, place) {
        notFree.find(one => {
            console.log('one, place', one.code, place.code);
            return one.code === place.code
        });
        return notFree.find(one => one === place.code) === undefined;
    }

    getPlaceButtons() {
        const row1 = [];
        const row2 = [];
        const row3 = [];
        const row4 = [];
        const flight = this.props.leg;
        const j = this.props.j;
        let flightLeg;
        let legId;

        if (this.props.places[0] !== undefined && this.props.places[flight][0] !== undefined) {
            console.log(this.props.places[flight][0]);
            const placesPerRow = this.props.places[flight][0].places.length / 4;
            legId = this.props.places[flight][j].flightLegId;
            flightLeg = this.getTheFlightLeg(legId);
            const notFreePlaces = this.getNotFreePlacesCodes(legId);

            console.log('not free places', notFreePlaces);
            console.log('flightLegId', flightLeg);
            console.log('reservations', this.props.reservations.filter(reservation => reservation.flightLegId === flightLeg));

            console.log(this.props.places[flight][j].places);
            for (let i = 0; i < placesPerRow; i++) {
                const place = this.props.places[flight][j].places[i];
                this.isThisPlaceFree(notFreePlaces, place) ?
                    row1[i] = {place: place, color: this.state.free} : row1[i] = {
                        place: place,
                        color: this.state.notFree
                    };
            }
            for (let i = placesPerRow; i < placesPerRow * 2; i++) {
                const place = this.props.places[flight][j].places[i];
                this.isThisPlaceFree(notFreePlaces, place) ?
                    row2[i] = {place: place, color: this.state.free} : row2[i] = {
                        place: place,
                        color: this.state.notFree
                    };
            }
            for (let i = placesPerRow * 2; i < placesPerRow * 3; i++) {
                const place = this.props.places[flight][j].places[i];
                this.isThisPlaceFree(notFreePlaces, place) ?
                    row3[i] = {place: place, color: this.state.free} : row3[i] = {
                        place: place,
                        color: this.state.notFree
                    };
            }
            for (let i = placesPerRow * 3; i < placesPerRow * 4; i++) {
                const place = this.props.places[flight][j].places[i];
                this.isThisPlaceFree(notFreePlaces, place) ?
                    row4[i] = {place: place, color: this.state.free} : row4[i] = {
                        place: place,
                        color: this.state.notFree
                    };
            }
        }

        return <div style={{display: "flex", alignItems: 'center'}}>
            <div className="oneAirplane">
                <div className="flightLegRowDetail">
                    <div className="flightLegColumnDetail">
                        <div>{flightLeg.departureAirport.code}</div>
                        <div>{flightLeg.departureAirport.name}</div>
                        <div>{flightLeg.departureTimeLocale}</div>
                    </div>
                    <div className="flightLegColumnDetail" style={{justifyContent: 'center'}}> -></div>
                    <div className="flightLegColumnDetail">
                        <div>{flightLeg.arrivalAirport.code}</div>
                        <div>{flightLeg.arrivalAirport.name}</div>
                        <div>{flightLeg.arrivalTimeLocale}</div>
                    </div>
                </div>
                <div className="flightLegRowDetail">airplane: {flightLeg.airplane.code}</div>

                <div className="labelsInAirplane">|--left wing--|</div>
                <div>{row1.map(row => this.renderProperButton(row.place.code, row.place.id, row.color, legId))}</div>
                <div>{row2.map(row => this.renderProperButton(row.place.code, row.place.id, row.color, legId))}</div>
                <div className="labelsInAirplane">Here is a corridor</div>
                <div>{row3.map(row => this.renderProperButton(row.place.code, row.place.id, row.color, legId))}</div>
                <div>{row4.map(row => this.renderProperButton(row.place.code, row.place.id, row.color, legId))}</div>
                <div className="labelsInAirplane">|-right wing--|</div>
            </div>

            {this.props.step > 1 ?
                <div style={{marginLeft: 5, fontSize: 20}}>{flightLeg !== undefined && this.props.chosenPlaces.filter(row => row.id === flightLeg.id).length} places choosed from {this.props.amountOfPassengers}</div>
                : ''}
        </div>

    }

    renderProperButton(code, id, color, legId) {
        if (this.props.disabled || color === this.state.notFree) {
            return <div className="back" style={{backgroundColor: color, border: '1px solid black'}}>
                <Button ghost={true} disabled={true} className="placeButton" key={id} size="small"
                        type={"neutral"}>{code}</Button>
            </div>
        }
        else {
            return <PlaceButtonComponent code={code} id={id} legId={legId}/>
        }
    }

    render() {
        return <div className="airplane">
            {this.getPlaceButtons()}
        </div>

    }
}

const mapStateToProps = (state) => {
    return {
        flightLegs: state.flightLegs,
        reservations: state.reservations.reservations,
        chosenPlaces: state.reservedFlight.chosenPlaces,
        amountOfPassengers: state.search.amountOfPassengers,
        step: state.stepper.step,
    }
};
const mapDispatchToProps = {};

export const AirplaneContainer = connect(mapStateToProps, null)(AirplaneComponent);
