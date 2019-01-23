import * as React from "react";
import 'antd/dist/antd.css';
import {store} from '../store'
import {connect} from "react-redux";
import '../styles/ChoiceFlightContainer.css'
import {Table, Button, Switch} from 'antd';
import moment from 'moment'
import {setFirstStep, setReservations, setFlightToReserve, setPlacesToReserve, setTimeMode} from "../actions/index";
import {AirplanesComponent} from "./AirplanesComponent";
import {FaCheck} from 'react-icons/fa'
import $ from "jquery";

const columns = [
    {title: 'Department Time', dataIndex: 'depTime', key: 'depTime'},
    {title: 'Arrival Time', dataIndex: 'arrivalTime', key: 'arrivalTime'},
    {title: 'Department Airport', dataIndex: 'departAirport', key: 'departAirport'},
    {title: 'Arrival Airport', dataIndex: 'arrivalAirport', key: 'arrivalAirport'},
    {title: 'Count of transfers', dataIndex: 'cot', key: 'cot'},
    {title: 'Price', dataIndex: 'price', key: 'price'},
    {title: 'Choose me', dataIndex: 'check', key: 'check'},
];

export class FlightChoiceComponent extends React.Component {

    constructor() {
        super();
        this.state = {};

        this.timeModeChange = this.timeModeChange.bind(this)
    }

    componentDidMount() {
        this.getNotFreePlaces();
    }

    getNotFreePlaces() {
        let flightLegsIds = new Set();
        store.getState().flights.forEach(flight =>
            flight.flightLegs.forEach(flightLeg => flightLegsIds.add(flightLeg.id)));

        flightLegsIds.forEach(flightLegsId => {
                const path = 'http://localhost:8085/api/reservation/places/' + flightLegsId;
                fetch(path)
                    .then(res => res.json())
                    .then(json => this.props.setReservations(
                        $.extend({places: json}, {flightLegId: flightLegsId})));

            }
        );
    }

    getColumns() {
        return columns;
    }

    timeModeChange(time) {
        this.props.setTimeMode(time)
    }

    getRows() {
        let i = 0;
        const {timeMode} = this.props;
        const flights = store.getState().flights.map(flight => {
            const id = flight.id;
            const flightLegs = flight.flightLegs;
            let description = flightLegs[0].departureAirport.city.name + '(' + flightLegs[0].departureAirport.code + ') ' + '->' +
                flightLegs[0].arrivalAirport.city.name + '(' + flightLegs[0].arrivalAirport.code + ')';
            for (let j = 0; j < flightLegs.length - 1; j++) {
                description += '->';
                description += flightLegs[j + 1].arrivalAirport.city.name + '(' + flightLegs[j + 1].arrivalAirport.code + ')';
            }

            const deptTime = timeMode ? flightLegs[0].departureTimeUTC : flightLegs[0].departureTimeLocale;
            const arrivalTime = timeMode ? flightLegs[flightLegs.length - 1].arrivalTimeUTC :
                flightLegs[flightLegs.length - 1].arrivalTimeLocale;
            return {
                key: i++,
                id: id,
                depTime: moment(deptTime.slice(0, 16)).format('DD.MM.YY hh:mm'),
                arrivalTime: moment(arrivalTime.slice(0, 16)).format('DD.MM.YY hh:mm'),
                departAirport: flightLegs[0].departureAirport.code + "(" + flightLegs[0].departureAirport.name + ")",
                arrivalAirport: flightLegs[flightLegs.length - 1].arrivalAirport.code + "(" +
                flightLegs[flightLegs.length - 1].arrivalAirport.name + ")",
                cot: flightLegs.length - 1,
                price: '100$',
                check: this.props.chosenFlight === id ? <FaCheck color="green"/> : '',
                description: <AirplanesComponent leg={i - 1} disabled={true} places={this.getPlaces()}/>
            }
        });

        return flights;
    }

    getPlaces() {
        const list = this.props.flights.map(flight => {
            const flightLegs = flight.flightLegs;
            let sth = [];
            for (let i = 0; i < flightLegs.length; i++) {
                sth[i] = {flightLegId: flightLegs[i].id, places: flightLegs[i].airplane.places};
            }
            return sth;
        });

        return list;
    }

    render() {

        return <div className="choiceFlightContainer">
            Choose Time Mode: <Switch checkedChildren="UTC" unCheckedChildren="Local"
                                      onChange={this.timeModeChange}
                                      defaultChecked={this.props.timeMode} style={{marginBottom: "10px"}}/>
            <Table className="myTable"
                   columns={this.getColumns()}
                   expandedRowRender={record => record.description}
                   dataSource={this.getRows()}
                   locale={{emptyText: 'No flights found'}}
                   onRow={(record) => {
                       return {
                           onClick: () => {
                               this.props.setFlightToReserve(record.id);
                               // this.props.setPlacesToReserve([{id: 993, places: [21, 22]}, {id: 992, places: [23, 24]}]);
                           },
                       };
                   }}
            />
            <Button style={{marginRight: 4}} type='neutral' onClick={() => this.props.setFirstStep(0)}>Back</Button>
            <Button disabled={this.props.chosenFlight === -1} type='primary' onClick={() => this.props.setFirstStep(2)}>Next</Button>
        </div>;

    }

}

const mapStateToProps = (state) => {
    return {
        cities: state.cities,
        flights: state.flights,
        chosenFlight: state.reservedFlight.chosenFlight,
        chosenPlaces: state.reservedFlight.chosenPlaces,
        timeMode: state.ui.timeMode
    }
};
const mapDispatchToProps = {setFirstStep, setReservations, setFlightToReserve, setPlacesToReserve, setTimeMode};

export default connect(mapStateToProps, mapDispatchToProps)(FlightChoiceComponent);