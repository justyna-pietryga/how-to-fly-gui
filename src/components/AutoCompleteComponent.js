import * as React from "react";
import { AutoComplete } from 'antd'
import 'antd/dist/antd.css';
import {store} from '../store'

export class AutoCompleteComponent extends React.Component {

    componentDidMount() {

    }

//<Option key={city.id} value={city.name}>{city.name}</Option>)
    render() {
        return (
            <div className="AutoComplete">
                <AutoComplete dataSource={this.props.cities.map(city => city.name)}
                              style={{width: this.props.width}}
                              placeholder={this.props.placeholder}
                              onSelect = {(value) => this.props.setValue(value)}
                              filterOption={(inputValue, option) =>
                                  option.props.children.toUpperCase().substr(0, inputValue.length).indexOf(inputValue.toUpperCase()) !== -1}
                />

            </div>
        );
    }
}