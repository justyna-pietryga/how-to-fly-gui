import * as React from "react";
import 'antd/dist/antd.css';
import '../styles/ChoiceFlightContainer.css'
import {store} from '../store'
import {Button} from 'antd';
import {connect} from "react-redux";
import {reservations} from "../reducers/reservations";
import {removePlaceFromReserve, setPlacesToReserve} from "../actions/index";

export class PlaceButton extends React.Component {

    constructor() {
        super();
        this.state = {
            free: '#99e286',
            clicked: '#ec7a34',
            current: '#99e286'
        };

        this.onClick=this.onClick.bind(this);
    }

    componentDidMount() {
    }

    changeColor(){
        this.state.current === this.state.free ? this.setState({current: this.state.clicked}) : this.setState({current: this.state.free});
    }

    onClick(){
        this.changeColor();
        if(this.props.chosenPlaces.find(row => row.id === this.props.legId) === undefined){
            this.props.setPlacesToReserve(this.props.chosenPlaces.concat([{id: this.props.legId, places:[this.props.id]}]))
        }
        else{
            let copy = this.props.chosenPlaces.find(row => row.id === this.props.legId);
            // this.props.removePlaceFromReserve(copy);
            // copy.places.concat([this.props.id]);
            // console.log(copy);
            // this.props.setPlacesToReserve(copy);
        }
    }

    render() {
        return <div className="back" style={{backgroundColor: this.state.current, border: '1px solid black'} }>
            <Button ghost={true} className="placeButton" key={this.props.id} size="small"
                    type={"neutral"} style={{hover: {color: 'black'}}} onClick={this.onClick}>{this.props.code}</Button>
        </div>

    }
}

const mapStateToProps = (state) => {
    return {chosenPlaces: state.reservedFlight.chosenPlaces}
};
const mapDispatchToProps = {setPlacesToReserve, removePlaceFromReserve};

export const PlaceButtonComponent = connect(mapStateToProps, mapDispatchToProps)(PlaceButton);
