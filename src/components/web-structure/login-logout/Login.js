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
import {setFirstStep} from "../../../actions/index";
import CssBaseline from '@material-ui/core/CssBaseline';
// import LockIcon from '@material-ui/icons/LockOutlined';
import AuthService from './AuthService'
import history from '../../.././history';

const Option = Select.Option;

export class Login extends React.Component {

    componentWillMount(){
        if(this.Auth.loggedIn()) {
            console.log("im logged in");
            history.replace('/');
        }
    }

    constructor() {
        super();
        this.state = {};
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService();

    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e){
        e.preventDefault();

        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
            <Paper className="paper">
                <Avatar className="avatar">
                    {/*<LockIcon />*/}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className="form">
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="username" autoComplete="email" autoFocus onChange={this.handleChange}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" onChange={this.handleChange} autoComplete="current-password" />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        onClick={this.handleFormSubmit}
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = {setFirstStep};

export default connect(mapStateToProps, mapDispatchToProps)(Login);