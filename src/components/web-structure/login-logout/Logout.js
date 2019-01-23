import * as React from "react";
import 'antd/dist/antd.css';
import {Select} from 'antd';
import {connect} from "react-redux";
import {
    AppBar, Avatar, Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel, Paper, Toolbar,
    Typography
} from "@material-ui/core/es/index";
import '../../../styles/Login.css'
import { NavLink } from 'react-router-dom'
import {setUserLoggedIn} from "../../../actions/index";
import CssBaseline from '@material-ui/core/CssBaseline';
// import LockIcon from '@material-ui/icons/LockOutlined';
import AuthService from './AuthService'
import history from '../../.././history';

const Option = Select.Option;

export class Logout extends React.Component {

    componentWillMount(){
        if(!this.Auth.loggedIn()) {
            console.log("im not logged in, what you want to log out");
            history.replace('/login');
        }
        else{
            this.Auth.logout();
            history.replace('/');
            this.props.setUserLoggedIn(false);
        }
    }

    constructor() {
        super();
        this.state = {};
        this.Auth = new AuthService();

    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = {setUserLoggedIn};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);