import React from 'react';
import {connect} from "react-redux";
import {setFirstStep, itinerateSubmit} from "../actions/index";
import {Button} from "antd";
import history from '.././history';
import AuthService from "./web-structure/login-logout/AuthService";

export class ConfirmReservationComponent extends React.Component {
    constructor() {
        super();

        this.state = {};
        // this.onClick = this.onClick.bind(this);
        this.Auth = new AuthService();
    }

    getFlightLegsIds = () => {
        let ids = new Set();
        this.props.flights.filter(flight => flight.id === this.props.chosenFlight).map(flight => {
            const flightLegs = flight.flightLegs;
            console.log(flightLegs);
            for (let i = 0; i < flightLegs.length; i++) {
                ids.add(flightLegs[i].id)
            }
        });
        return ids;
    };

    getSpecificReservationForLegIds = (ids) => {
        const {specificReservation, passengersData} = this.props;
        let reservationObj = {};
        let resForLegId = {};
        ids.forEach(legId => {
            let allForLegId = new Set;
            const reservations = specificReservation.filter(e => e.legId === legId);
            reservations.forEach(reservation => {
                const personalData = passengersData.filter(p => p.psnSeq === reservation.psnSeq)[0];
                resForLegId = {...resForLegId,
                    passenger: {
                        name: personalData.name, surname: personalData.surname, pesel: personalData.pesel,
                        telephone: personalData.phone
                    }, placeId: reservation.placeId
                };
                allForLegId.add(resForLegId);
            });
            reservationObj[legId] = [...allForLegId];
        });
        return reservationObj
    };

    onClick() {
        console.log("here i am");
        if(!this.Auth.loggedIn()){
            history.replace('/login');
        } else{
            let url = "http://localhost:8085/api/reservation/";
            const ids = this.getFlightLegsIds();
            const result = this.getSpecificReservationForLegIds(ids);
            ids.forEach(id => {
                this.Auth.fetch(url+id, {
                    method: "POST",
                    credentials: "same-origin", // include, *same-origin, omit
                    body: JSON.stringify(result[id])
                })
            })
        }
    }

    render() {
        return (
            <div>
                <Button style={{marginRight: 4}} type='neutral' onClick={() => this.props.setFirstStep(3)}>Back</Button>
                <Button style={{marginRight: 4}} type='primary' onClick={this.onClick.bind(this)}>Confirm</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chosenFlight: state.reservedFlight.chosenFlight,
        flights: state.flights,
        amountOfPassengers: state.search.amountOfPassengers,
        specificReservation: state.reservedFlight.specificReservation,
        passengersData: state.reservedFlight.passengersData,
    }
};
const mapDispatchToProps = {setFirstStep, itinerateSubmit};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmReservationComponent);