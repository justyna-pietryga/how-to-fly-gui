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
import moment from "moment";

export class FlightLegInfo extends React.Component {

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

        this.getLeg = this.getLeg.bind(this);
        this.getPlaceCode = this.getPlaceCode.bind(this);

    }

    getPlaceCode(leg, placeId) {
        if (leg.airplane !== undefined) {
            return leg.airplane.places.filter(place => place.id === placeId) !== undefined ?
                leg.airplane.places.filter(place => place.id === placeId)[0].code : '';
        }
        else return;
    }

    getLeg(placesOnLeg) {
        const {flightLegId} = placesOnLeg;
        console.log('aa', this.props.flightLegs.filter(leg => leg.id === flightLegId)[0]);
        return this.props.flightLegs.filter(leg => leg.id === flightLegId)[0] !== undefined ?
            this.props.flightLegs.filter(leg => leg.id === flightLegId)[0] : '';
    }

    render() {

        return (
            <div style={{display: 'flex', flexDirection:'column', justifyContent: 'space-between', padding: '1rem'}}>
                {this.props.flightDetails.map(det => {
                    const leg = this.getLeg(det);
                    const placeCode = this.getPlaceCode(leg, det.placeId);

                    return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: "1rem"}}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Typography variant="subheading">{leg.departureAirport.name}</Typography>
                            <Typography variant="subheading">{moment(leg.departureTimeLocale.slice(0, 16)).format('DD.MM.YY hh:mm')}</Typography>
                        </div>
                        <div>
                            <Typography variant="subheading">-></Typography>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                            <Typography variant="subheading">{leg.arrivalAirport.name}</Typography>
                            <Typography variant="subheading">{moment(leg.arrivalTimeLocale.slice(0, 16)).format('DD.MM.YY hh:mm')}</Typography>
                        </div>
                        <Typography variant="subheading"><b>Place: {placeCode}</b></Typography>

                    </div>
                })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {flightLegs: state.flightLegs}
};

const mapDispatchToProps = {setUserLoggedIn, setUserReservations};

export default connect(mapStateToProps, mapDispatchToProps)(FlightLegInfo);