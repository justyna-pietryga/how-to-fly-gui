import * as React from "react";
import 'antd/dist/antd.css';
import '../styles/ChoiceFlightContainer.css'
import {Button, Form, Input, Select} from 'antd';
import {connect} from "react-redux";
import {removePlaceFromReserve, setPlacesToReserve, addPersonalData} from "../actions/index";
import PlaceSelector from "./small/PlaceSelector";

const FormItem = Form.Item;
const Option = Select.Option;

export class PersonalDataForm extends React.Component {

    constructor() {
        super();
        this.state = {
            formLayout: 'horizontal',
            submit: -1,
            name: '',
            surname: '',
            phone: '',
            pesel: '',
        };
    }

    componentDidMount() {
        const {passengersData, psnSeq} = this.props;
        const data = passengersData.filter(row => row.psnSeq === psnSeq);
        this.setState({submit: this.props.submit});
        if (data !== undefined && data.length > 0) {
            const obj = data[0];
            const {name, surname, pesel, phone} = obj;
            this.setState({name: name, surname: surname, pesel: pesel, phone: phone});
        }
    }

    componentDidUpdate() {
        const {name, surname, phone, pesel} = this.state;
        const objToPut = {
            psnSeq: this.props.psnSeq,
            name: name,
            surname: surname,
            phone: phone,
            pesel: pesel,
        };

        if (this.props.submit > this.state.submit) {
            this.setState({submit: this.props.submit});
            this.props.addPersonalData([objToPut])
        }
    }

    flightLegs() {
        if (this.props.flights !== undefined) {
            return this.props.flights.filter(flight => flight.id === this.props.chosenFlight)
                .map(flight => flight.flightLegs)[0];
        }
    }

    handleFormLayoutChange = (e) => {
        e.preventDefault();
        console.log('Received values of form: ');
    };

    render() {
        // const { getFieldDecorator } = this.props.form;
        const {formLayout} = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: {span: 7},
            wrapperCol: {span: 14},
        } : null;
        const buttonItemLayout = formLayout === 'horizontal' ? {
            wrapperCol: {span: 14, offset: 4},
        } : null;

        const legs = this.flightLegs();
        const {name, surname, pesel, phone} = this.state;
        return (
            <div style={{
                border: "solid 1px grey",
                borderRadius:"2rem",
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '2rem'
            }}>
                <h1>Personal data of {this.props.psnSeq + 1} passenger</h1>

                <Form style={{marginLeft: 'auto', marginRight: 'auto'}} layout={formLayout}
                      onSubmit={this.handleFormLayoutChange}>

                    <FormItem
                        label="Name" {...formItemLayout}>
                        <Input value={name} placeholder="Name" style={{width: '80%'}}
                               onChange={(v) => this.setState({name: v.target.value})}/>
                    </FormItem>
                    <FormItem
                        label="Surname" {...formItemLayout}>
                        <Input value={surname} placeholder="Surname" style={{width: '80%'}}
                               onChange={(v) => this.setState({surname: v.target.value})}/>
                    </FormItem>

                    <FormItem
                        {...formItemLayout} label="Pesel">
                        <Input value={pesel} placeholder="Pesel" style={{width: '80%'}}
                               onChange={(v) => this.setState({pesel: v.target.value})}/>
                    </FormItem>

                    <FormItem
                        {...formItemLayout} label="Phone Number">
                        <Input value={phone} placeholder="Phone number" style={{width: '80%'}}
                               onChange={(v) => this.setState({phone: v.target.value})}/>
                    </FormItem>

                    {legs.map(leg => {
                        const {flightLegs} = this.props;
                        const legDetails = flightLegs.filter(flightLeg => flightLeg.id === leg.id);
                        const legDetObject = legDetails !== undefined ? legDetails[0]: {};
                        const departCity = legDetObject.departureAirport.city.name;
                        const arrivalCity = legDetObject.arrivalAirport.city.name;
                        const label = "Place (" +departCity+"->"+arrivalCity+")";
                        return <FormItem {...formItemLayout} label={label}>
                                     <PlaceSelector legId={leg.id} psnSeq={this.props.psnSeq}/>
                               </FormItem>
                    })}
                </Form>
            </div>
        );
    }
}

// export const PersonalForm = Form.create()(PersonalDataForm);

const mapStateToProps = (state) => {
    return {
        chosenPlaces: state.reservedFlight.chosenPlaces,
        amountOfPassengers: state.search.amountOfPassengers,
        flights: state.flights,
        flightLegs: state.flightLegs,
        chosenFlight: state.reservedFlight.chosenFlight,
        passengersData: state.reservedFlight.passengersData,
        submit: state.reservedFlight.submit
    }
};
const mapDispatchToProps = {setPlacesToReserve, removePlaceFromReserve, addPersonalData};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataForm);
