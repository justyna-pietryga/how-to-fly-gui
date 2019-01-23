import * as React from "react";
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import '../../../styles/Login.css'
import {setUserLoggedIn, setUserReservations} from "../../../actions/index";
import AuthService from './../login-logout/AuthService'
import history from '../../.././history';
import Sider from "../../small/Sider";
import {Route} from "react-router";
import PassengerInfo from "./PassengerInfo";
import FlightLegInfo from "./FlightLegInfo";
import {Typography} from "@material-ui/core/es/index";
import {Button} from "antd";

export class Reservation extends React.Component {

    componentWillMount() {
        if (!this.Auth.loggedIn()) {
            history.replace('/login');
        }
    }

    componentDidMount() {

    }

    constructor() {
        super();
        this.state = {};
        this.Auth = new AuthService();

    }

    render() {
        return (
            <div style={{border: "black solid 1px", marginBottom: '1rem'}}>
                Pnr Code: <b>{this.props.pnrId}</b>
                <Button onClick={()=> {}} style={{marginLeft: "90%"}}>Delete</Button>
                {this.props.pnrDetailDtoList.map(pnrDetailDtoList => {
                    return <div>
                        <PassengerInfo passenger={pnrDetailDtoList.passenger}/>
                        <FlightLegInfo flightDetails={pnrDetailDtoList.placesOnLegs}/>
                    </div>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {flightLegs: state.flightLegs}
};

const mapDispatchToProps = {setUserLoggedIn, setUserReservations};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);