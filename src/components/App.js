import * as React from "react";
import '../App.css';
import {citiesFetched, setFlightLegs} from ".././actions";
import {connect} from "react-redux";
import {FlightSearcherFormContainer} from "../containers/FlightSearcherFormContainer";
import StepperComponent from "./StepperComponent";
import {BrowserRouter, Router, Route} from "react-router-dom";
import history from '.././history';
import FlightChoiceComponent from "./FlightChoiceComponent";
import PlacesChoiceComponent from "./PlacesChoiceComponent"
import PersonalDataComponent from "./PersonalDataComponent";

export class App extends React.Component {

    componentDidMount() {
       this.setUp()
    }

    setUp(){
        this.getCities();
        this.getFlightLegs();
    }

    getFlightLegs(){
        fetch("http://localhost:8085/api/flight-legs")
            .then(res => res.json())
            .then(json => this.props.setFlightLegs(json));
    }

    getCities(){
        fetch("http://localhost:8085/api/cities")
            .then(res => res.json())
            .then(json => this.props.citiesFetched(json));
    }

    render() {
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                {/**/}
                <div className="AppContainer">
                    <Router history={history}>
                        <div>
                            <StepperComponent/>
                            <Route path="/reservation/set-parameters" component={FlightSearcherFormContainer}/>
                            <Route path="/reservation/choose-flight" component={FlightChoiceComponent}/>
                            <Route path="/reservation/set-places" component={PlacesChoiceComponent}/>
                            <Route path="/reservation/personal-data" component={PersonalDataComponent}/>
                        </div>
                    </Router>
                </div>
                {/*</header>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities,
        flightLegs: state.flightLegs
    }
};
const mapDispatchToProps = {citiesFetched, setFlightLegs};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

