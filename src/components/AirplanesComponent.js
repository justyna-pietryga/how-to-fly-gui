import * as React from "react";
import 'antd/dist/antd.css';
import '../styles/ChoiceFlightContainer.css'
import {AirplaneComponent} from "./AirplaneComponent";

export class AirplanesComponent extends React.Component {

    constructor() {
        super();
        this.state = {}
    }

    getPlacesAirplanes(){
        let div = '';
        let div2 = [];
        if (this.props.places!== undefined && this.props.places[[this.props.leg]] !== undefined) {
            for (let j = 0; j < this.props.places[this.props.leg].length; j++) {
                div2[j] = <AirplaneComponent key={j} leg={this.props.leg} disabled={true} places={this.props.places} j={j}/>
            }
        }
        return div2;
    }

    render() {
            return <div>
            {this.getPlacesAirplanes()}
            </div>
        }

}

