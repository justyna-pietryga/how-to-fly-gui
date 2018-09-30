import * as React from "react";
import 'antd/dist/antd.css';
import {store} from '../store'
import {connect} from "react-redux";
import '../styles/ChoiceFlightContainer.css'
import {Table, Button} from 'antd';
import moment from 'moment'
import {setFirstStep} from "../actions/index";

const columns = [
    {title: 'Department Time', dataIndex: 'depTime', key: 'depTime'},
    {title: 'Arrival Time', dataIndex: 'arrivalTime', key: 'arrivalTime'},
    {title: 'Count of transfers', dataIndex: 'cot', key: 'cot'},
    {title: 'Price', dataIndex: 'price', key: 'price'},
];

export class FlightChoiceComponent extends React.Component {

    constructor() {
        super();
        this.state = {}
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
            let description2 = flightLegs.map(f => f.departureAirport.city.name + '(' + f.departureAirport.code + ')' +
                moment(f.departureTimeLocale.slice(0, 16)).format('DD.MM.YYYY hh:mm') + '->' +
                f.arrivalAirport.city.name + '(' + f.arrivalAirport.code + ')' +
                moment(f.arrivalTimeLocale.slice(0, 16)).format('DD.MM.YYYY hh:mm'));
            console.log(description2.toString().replace(/,/g, '\n'));
            return {
                key: i++,
                depTime: moment(flightLegs[0].departureTimeLocale.slice(0, 16)).format('DD.MM.YYYY hh:mm'),
                arrivalTime: moment(flightLegs[flightLegs.length - 1].arrivalTimeUTC).format('DD.MM.YYYY hh:mm'),
                cot: flightLegs.length - 1,
                price: '100$',
                description: description
            }
        });

        console.log('kuku', flights);
        return flights;
    }

    render() {

        return <div className="choiceFlightContainer">
            <Table columns={this.getColumns()}
                   expandedRowRender={record => <p style={{margin: 0}}>{record.description}</p>}
                   dataSource={this.getRows()}/>
            <Button type='neutral' onClick={() => this.props.setFirstStep(0)}>Back</Button>
        </div>;
    }

}

const mapStateToProps = (state) => {
    return {
        cities: state.cities
    }
};
 const mapDispatchToProps = {setFirstStep};

export default connect(mapStateToProps, mapDispatchToProps)(FlightChoiceComponent);