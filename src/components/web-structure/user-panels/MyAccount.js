import * as React from "react";
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import '../../../styles/Login.css'
import {setUserLoggedIn} from "../../../actions/index";
import AuthService from './../login-logout/AuthService'
import history from '../../.././history';
import Sider from "../../small/Sider";
import {Route} from "react-router";
import ReservationsHistory from "./ReservationsHistory";

export class MyAccount extends React.Component {

    componentWillMount(){
        if(!this.Auth.loggedIn()) {
            history.replace('/login');
        }
    }

    constructor() {
        super();
        this.state = {};
        this.Auth = new AuthService();

    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "row"}}>
                <Sider/>
                <Route path="/my-account/reservations" component={ReservationsHistory}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = {setUserLoggedIn};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);