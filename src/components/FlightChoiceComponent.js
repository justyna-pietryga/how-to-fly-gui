import * as React from "react";
import 'antd/dist/antd.css';
import {store} from '../store'
import {connect} from "react-redux";
import '../styles/ChoiceFlightContainer.css'
import {Table, Button} from 'antd';
import moment from 'moment'
import {setFirstStep, setReservations} from "../actions/index";
import {AirplanesComponent} from "./AirplanesComponent";
import $ from "jquery";

const columns = [
    {title: 'Department Time', dataIndex: 'depTime', key: 'depTime'},
    {title: 'Arrival Time', dataIndex: 'arrivalTime', key: 'arrivalTime'},
    {title: 'Department Airport', dataIndex: 'departAirport', key: 'departAirport'},
    {title: 'Arrival Airport', dataIndex: 'arrivalAirport', key: 'arrivalAirport'},
    {title: 'Count of transfers', dataIndex: 'cot', key: 'cot'},
    {title: 'Price', dataIndex: 'price', key: 'price'},
];

export class FlightChoiceComponent extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
       this.getNotFreePlaces();
    }

    getNotFreePlaces(){
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

    getRows() {
        let i = 0;
        const flights = store.getState().flights.map(flight => {
            const flightLegs = flight.flightLegs;
            let description = flightLegs[0].departureAirport.city.name + '(' + flightLegs[0].departureAirport.code + ') ' + '->' +
                flightLegs[0].arrivalAirport.city.name + '(' + flightLegs[0].arrivalAirport.code + ')';
            for (let j = 0; j < flightLegs.length - 1; j++) {
                description += '->';
                description += flightLegs[j + 1].arrivalAirport.city.name + '(' + flightLegs[j + 1].arrivalAirport.code + ')';
            }
            // let description2 = flightLegs.map(f => f.departureAirport.city.name + '(' + f.departureAirport.code + ')' +
            //     moment(f.departureTimeLocale.slice(0, 16)).format('DD.MM.YYYY hh:mm') + '->' +
            //     f.arrivalAirport.city.name + '(' + f.arrivalAirport.code + ')' +
            //     moment(f.arrivalTimeLocale.slice(0, 16)).format('DD.MM.YYYY hh:mm'));
            // console.log(description2.toString().replace(/,/g, '\n'));
            return {
                key: i++,
                depTime: moment(flightLegs[0].departureTimeLocale.slice(0, 16)).format('DD.MM.YY hh:mm'),
                arrivalTime: moment(flightLegs[flightLegs.length - 1].arrivalTimeUTC).format('DD.MM.YY hh:mm'),
                departAirport: flightLegs[0].departureAirport.code + "(" + flightLegs[0].departureAirport.name + ")",
                arrivalAirport: flightLegs[flightLegs.length - 1].arrivalAirport.code + "(" +
                flightLegs[flightLegs.length - 1].arrivalAirport.name + ")",
                cot: flightLegs.length - 1,
                price: '100$',
                description: <AirplanesComponent leg={i - 1} disabled={true} places={this.getPlaces()}/>
            }
        });

        return flights;
    }

    getPlaces() {
        const list = store.getState().flights.map(flight => {
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
            <Table columns={this.getColumns()}
                   expandedRowRender={record => record.description}
                   dataSource={this.getRows()}/>
            <Button type='neutral' onClick={() => this.props.setFirstStep(0)}>Back</Button>
            <Button type='primary' onClick={() => this.props.setFirstStep(2)}>Next</Button>
        </div>;

    }

}

const mapStateToProps = (state) => {
    return {
        cities: state.cities
    }
};
const mapDispatchToProps = {setFirstStep, setReservations};

export default connect(mapStateToProps, mapDispatchToProps)(FlightChoiceComponent);