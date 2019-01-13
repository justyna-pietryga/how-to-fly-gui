import React from 'react';
import {connect} from "react-redux";
import {AirplanesComponent} from "./AirplanesComponent";
import {setFirstStep, setTimeMode} from "../actions/index";
import {Button, Switch} from "antd";

export class PlacesChoiceComponent extends React.Component {
    constructor() {
        super();

        this.timeModeChange = this.timeModeChange.bind(this)
    }

    componentDidMount() {
        console.log('chosen flight places', this.getPlaces())
    }

    getPlaces() {
        if (this.props.flights !== undefined) {
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

    timeModeChange(time) {
        this.props.setTimeMode(time)
    }

    render() {
        return (
            <div>
                Choose Time Mode: <Switch checkedChildren="UTC" unCheckedChildren="Local"
                                          onChange={this.timeModeChange}
                                          defaultChecked={this.props.timeMode} style={{marginBottom: "10px"}}/>
                <AirplanesComponent leg={0} disabled={false} places={this.getPlaces()}/>

                <Button style={{marginRight: 4}} type='neutral' onClick={() => this.props.setFirstStep(1)}>Back</Button>
                <Button disabled={this.props.chosenFlight === -1} type='primary'
                        onClick={() => this.props.setFirstStep(3)}>Next</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chosenFlight: state.reservedFlight.chosenFlight,
        flights: state.flights,
        timeMode: state.ui.timeMode
    }
};
const mapDispatchToProps = {setFirstStep, setTimeMode};

export default connect(mapStateToProps, mapDispatchToProps)(PlacesChoiceComponent);