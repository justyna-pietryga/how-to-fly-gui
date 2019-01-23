import * as React from "react";
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import '../../../styles/Login.css'
import {setUserLoggedIn, setUserReservations} from "../../../actions/index";
import AuthService from './../login-logout/AuthService'
import history from '../../.././history';
import Sider from "../../small/Sider";
import {Route} from "react-router";
import {Typography} from "@material-ui/core/es/index";

export class PassengerInfo extends React.Component {

    componentWillMount(){
        if(!this.Auth.loggedIn()) {
            history.replace('/login');
        }
    }

    componentDidMount(){

    }

    constructor() {
        super();
        this.state = {};
        this.Auth = new AuthService();

    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
                <Typography variant="subheading"><b>Passenger:</b></Typography>
                <Typography variant="subheading"><b>Name: </b>{this.props.passenger.name + ' '}
                    <b>Surname: </b> {this.props.passenger.surname + ' '} <b>Telephone:</b> {this.props.passenger.telephone + ' '}
                    <b>Pesel: </b>{this.props.passenger.pesel}</Typography>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {setUserLoggedIn, setUserReservations};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerInfo);