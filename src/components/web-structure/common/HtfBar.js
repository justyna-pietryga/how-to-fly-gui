import * as React from "react";
import 'antd/dist/antd.css';
import {Select} from 'antd';
import {connect} from "react-redux";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core/es/index";
import '../../../styles/HtfBar.css'
import '../../../styles/Login.css'
import { NavLink } from 'react-router-dom'
import {setFirstStep} from "../../../actions/index";
import AuthService from "../login-logout/AuthService";


export class HtfBar extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.Auth = new AuthService();
    }

    render() {
        return (
            <AppBar position="static" color="secondary" className="appBar" style={{marginBottom: "15px"}}>
                <Toolbar>
                    <Typography variant="display1" color="inherit" noWrap className="toolbarTitle">
                       How to Fly <b>#JRocks</b> Airline
                    </Typography>
                    <Button>Main Page</Button>
                    <Button><NavLink className="notActive" activeClassName="activeLink" to="/reservation/set-parameters">Search for flights</NavLink></Button>
                    {/*<Button>Search for flights</Button>*/}
                    <Button>History</Button>
                    {this.Auth.loggedIn() ? <Button color="primary" variant="outlined">
                        <NavLink className="notActive" activeClassName="activeLink" to="/logout">
                            Logout</NavLink>
                    </Button> :  <Button color="primary" variant="outlined">
                        <NavLink className="notActive" activeClassName="activeLink" to="/login">
                            Login</NavLink>
                    </Button>}
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = {setFirstStep};

export default connect(mapStateToProps, mapDispatchToProps)(HtfBar);