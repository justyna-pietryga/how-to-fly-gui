import * as React from "react";
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import '../../../styles/Login.css'
import {setUserLoggedIn, setUserReservations} from "../../../actions/index";
import AuthService from './../login-logout/AuthService'
import history from '../../.././history';
import Sider from "../../small/Sider";
import {Route} from "react-router";
import {Reservation} from "./Reservation";
import {Button} from "antd";

export class ReservationsHistory extends React.Component {

    componentWillMount(){
        if(!this.Auth.loggedIn()) {
            history.replace('/login');
        }
    }

    componentDidMount(){
        this.Auth.fetch("http://localhost:8085/api/reservation/pnr-reservation")
            .then((json) => this.props.setUserReservations(json))
    }

    constructor() {
        super();
        this.state = {};
        this.Auth = new AuthService();

    }

    render() {
        return (
            <div style={{padding: "3rem", width: '100%'}}>

                {this.props.reservations.map(reservations =>
                    <Reservation pnrId={reservations.pnr.id} pnrDetailDtoList={reservations.pnrDetailDtoList}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {reservations: state.user_info.reservations}
};

const mapDispatchToProps = {setUserLoggedIn, setUserReservations};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsHistory);