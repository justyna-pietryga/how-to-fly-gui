import React from 'react';
import {connect} from "react-redux";
import {setFirstStep, itinerateSubmit} from "../actions/index";
import {Button} from "antd";
import PersonalForm from "./PersonalDataForm";

export class PersonalDataComponent extends React.Component {
    constructor() {
        super();

        this.state = {}
    }

    render() {
        let arrayTmp = [];
        for (let i = 0; i < this.props.amountOfPassengers; i++) {
            arrayTmp.push(i);
        }

        return (
            <div>
                {arrayTmp.map((item) => <PersonalForm psnSeq={item}/>)}
                <Button style={{marginRight: 4}} type='neutral' onClick={() => this.props.setFirstStep(2)}>Back</Button>
                <Button type='primary' onClick={() => {
                    this.props.itinerateSubmit();
                    // this.props.setFirstStep(4)
                }}>Next</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataComponent);