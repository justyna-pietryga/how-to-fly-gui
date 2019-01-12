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

const Option = Select.Option;

export class Login extends React.Component {

    constructor() {
        super();
        this.state = {};


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
                        <Input id="email" name="email" autoComplete="email" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" />
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