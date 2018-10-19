import React from 'react';
import {store} from '../store'
import history from '.././history';
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {AirplanesComponent} from "./AirplanesComponent";

export class PlacesChoiceComponent extends React.Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        console.log('chosen flight places', this.getPlaces())
    }

    componentWillUnmount() {

    }

    getPlaces() {
        if(this.props.flights !== undefined){
            console.log("test", this.props.flights.filter(flight => flight.id === this.props.chosenFlight));
            return this.props.flights.filter(flight => flight.id === this.props.chosenFlight).map(flight => {
                const flightLegs = flight.flightLegs;
                let sth = [];
                for (let i = 0; i < flightLegs.length; i++) {
                    sth[i] = {flightLegId: flightLegs[i].id, places: flightLegs[i].airplane.places};
                }
                return sth;
            });
        }
    }


    render() {
        return (
            <div>
                <AirplanesComponent leg={0} disabled={false} places={this.getPlaces()}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chosenFlight: state.reservedFlight.chosenFlight,
        flights: state.flights,
    }
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlacesChoiceComponent);