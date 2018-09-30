import * as React from "react";
import {Button, Form} from 'antd'
import 'antd/dist/antd.css';
import {store} from '../store'
import {AutoCompleteComponent} from "./AutoCompleteComponent";
import '../styles/FlightSearcherForm.css'

const FormItem = Form.Item;

// const styles = theme => ({
//     root: {
//         width: '90%',
//     },
//     backButton: {
//         marginRight: theme.spacing.unit,
//     },
//     instructions: {
//         marginTop: theme.spacing.unit,
//         marginBottom: theme.spacing.unit,
//     },
// });

export class FlightSearcherFormComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            departCity: '',
            arrivalCity: ''
        }
    }

    handleDepartCity = (city) => {
        this.setState({departCity: city})
    };

    handleArrivalCity = (city) => {
        this.setState({arrivalCity: city})
    };

    getCityId = (type) => {
        return store.getState().cities.filter(city => city.name === type)[0].id;
    };

    handleSubmit = (e) => {

        e.preventDefault();
        const departCityId = this.getCityId(this.state.departCity);
        const arrivalCityId = this.getCityId(this.state.arrivalCity);
        console.log('depart -> arrival', departCityId + "->" + arrivalCityId);

        this.props.actions.setSearchParameters({departCityId: departCityId, arrivalCityId: arrivalCityId});
        const path = 'http://localhost:8085/api/flights/search/departureId=' + departCityId + ',arrivalId=' + arrivalCityId;

        fetch(path)
            .then(res => res.json())
            .then(json => this.props.actions.setFlightsSearched(json))
            .then(() => this.props.actions.setFirstStep(1));
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        // const config = {
        //     rules: [{type: 'object', required: true, message: 'Please select department city!'}],
        // };

        return (

            <div className="FlightSearcher">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem  {...formItemLayout} label="Department City">
                        <AutoCompleteComponent cities={store.getState().cities}
                                               width={300}
                                               placeholder="Choose department city"
                                               setValue={this.handleDepartCity}/>

                    </FormItem>

                    <FormItem {...formItemLayout} label="Arrival City">
                        <AutoCompleteComponent cities={store.getState().cities}
                                               width={300}
                                               placeholder="Choose arrival city"
                                               setValue={this.handleArrivalCity}/>
                    </FormItem>

                    <FormItem
                        wrapperCol={{
                            xs: {span: 24, offset: 0},
                            sm: {span: 8, offset: 8},
                        }}>
                        <Button className="submit_button" type="primary" htmlType="submit">SEARCH</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }

}

// export default withStyles(styles)(FlightSearcherFormComponent);

// const mapStateToProps = (state) => {
//     return {
//         cities: state.cities
//     }
// };
// const mapDispatchToProps = {setSearchParameters, setFlightsSearched};

// export default connect(mapStateToProps, mapDispatchToProps)(FlightSearcherFormComponent);

