import * as React from "react";
import 'antd/dist/antd.css';
import '../styles/ChoiceFlightContainer.css'
import {Button} from 'antd';
import {connect} from "react-redux";
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
        if(this.props.chosenPlaces.find(row => row.place === this.props.id) !== undefined){
            this.setState({current: this.state.clicked})
        }
    }

    changeColor(){
        this.state.current === this.state.free ? this.setState({current: this.state.clicked}) : this.setState({current: this.state.free});
    }

    onClick(){
        const chosenPlaces = this.props.chosenPlaces;

        if(chosenPlaces.filter(row => row.id === this.props.legId).length < this.props.amountOfPassengers &&
            this.state.current === this.state.free)
        {
            this.props.setPlacesToReserve(chosenPlaces.concat([{id: this.props.legId, place: this.props.id, code: this.props.code}]))
            this.changeColor();
        }
        else if(this.state.current === this.state.clicked){
            const toDelete = this.props.chosenPlaces.find(row => row.place === this.props.id);
            this.props.setPlacesToReserve(chosenPlaces.filter(row => row !== toDelete));
            this.changeColor();
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
    return {
        chosenPlaces: state.reservedFlight.chosenPlaces,
        amountOfPassengers: state.search.amountOfPassengers
    }
};
const mapDispatchToProps = {setPlacesToReserve, removePlaceFromReserve};

export const PlaceButtonComponent = connect(mapStateToProps, mapDispatchToProps)(PlaceButton);
