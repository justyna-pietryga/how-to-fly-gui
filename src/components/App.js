import * as React from "react";
import '../App.css';
import {citiesFetched} from ".././actions";
import {connect} from "react-redux";
import {FlightSearcherFormContainer} from "../containers/FlightSearcherFormContainer";
import StepperComponent from "./StepperComponent";
import {BrowserRouter, Route} from "react-router-dom";
import FlightChoiceComponent from "./FlightChoiceComponent";

export class App extends React.Component {

    componentDidMount() {
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
                    <BrowserRouter>
                        <div>
                            <StepperComponent/>
                            <Route path="/reservation/setParameters" component={FlightSearcherFormContainer}/>
                            <Route path="/reservation/chooseFlight" component={FlightChoiceComponent}/>
                        </div>
                    </BrowserRouter>
                </div>
                {/*</header>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities
    }
};
const mapDispatchToProps = {citiesFetched};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

