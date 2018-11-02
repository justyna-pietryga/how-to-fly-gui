import React from 'react';
import {connect} from "react-redux";
import {AirplanesComponent} from "./AirplanesComponent";
import {setFirstStep} from "../actions/index";
import {Button} from "antd";

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

                <Button style={{marginRight: 4}} type='neutral' onClick={() => this.props.setFirstStep(1)}>Back</Button>
                <Button disabled={this.props.chosenFlight === -1} type='primary' onClick={() => this.props.setFirstStep(3)}>Next</Button>
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
const mapDispatchToProps = {setFirstStep};

export default connect(mapStateToProps, mapDispatchToProps)(PlacesChoiceComponent);