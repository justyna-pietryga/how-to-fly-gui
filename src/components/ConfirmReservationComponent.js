import React from 'react';
import {connect} from "react-redux";
import {setFirstStep, itinerateSubmit} from "../actions/index";
import {Button} from "antd";

export class ConfirmReservationComponent extends React.Component {
    constructor() {
        super();

        this.state = {};
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        console.log('confirm')
    }

    render() {
        return (
            <div>
                <Button style={{marginRight: 4}} type='neutral' onClick={() => this.props.setFirstStep(3)}>Back</Button>
                <Button style={{marginRight: 4}} type='primary' onClick={this.onClick()}>Confirm</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chosenFlight: state.reservedFlight.chosenFlight,
        flights: state.flights,
        amountOfPassengers: state.search.amountOfPassengers,
    }
};
const mapDispatchToProps = {setFirstStep, itinerateSubmit};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmReservationComponent);