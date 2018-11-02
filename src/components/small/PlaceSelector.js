import * as React from "react";
import 'antd/dist/antd.css';
import {Select} from 'antd';
import {connect} from "react-redux";
import {setSpecificReservation, addSpecificReservation} from "../../actions/index";

const Option = Select.Option;

export class PlaceSelector extends React.Component {

    constructor() {
        super();
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const places = this.getPlaces();
        const defaultPlace = places[0] !== undefined ? places[0].place : undefined;
        const objToPut = {placeId: defaultPlace, legId: this.props.legId, psnSeq: this.props.psnSeq};

        this.props.addSpecificReservation([objToPut]);
    }

    handleChange(e) {
        const specificReservation = this.props.specificReservation;
        const objToPut = {placeId: e, legId: this.props.legId, psnSeq: this.props.psnSeq};

        if (specificReservation.filter(row => row.legId === this.props.legId && row.psnSeq === this.props.psnSeq).length === 0) {
            this.props.setSpecificReservation(specificReservation.concat([objToPut]));
        } else {
            const toDelete = this.props.specificReservation.find(row => row.legId === this.props.legId && row.psnSeq === this.props.psnSeq);
            this.props.setSpecificReservation(specificReservation.filter(row => row !== toDelete).concat([objToPut]));
        }
    }

    getPlaces() {
        const specificReservation = this.props.specificReservation;
        return this.props.chosenPlaces.filter(row => row.id === this.props.legId)
            .filter(row => !specificReservation.find
            (res => res.placeId === row.id && res.psnSeq !== this.props.psnSeq));
    }

    render() {
        const places = this.getPlaces();
        const defaultPlace = places[0] !== undefined ? places[0].code : undefined;
        return (
            <div>
                <Select defaultValue={defaultPlace} style={{width: 120}} onSelect={this.handleChange}>
                    {places.map(place => <Option key={place.place} value={place.place}>{place.code}</Option>)}
                </Select>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chosenPlaces: state.reservedFlight.chosenPlaces,
        amountOfPassengers: state.search.amountOfPassengers,
        specificReservation: state.reservedFlight.specificReservation,
        flights: state.flights,
        chosenFlight: state.reservedFlight.chosenFlight,
    }
};

const mapDispatchToProps = {setSpecificReservation, addSpecificReservation};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceSelector);
