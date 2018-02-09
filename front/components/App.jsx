import React from 'react';
import ReactDOM from 'react-dom';
import { extend } from 'lodash';
import LocationHolder from './LocationHolder.jsx';
import '../styles/App.scss'
import FontAwesomeIcon from 'react-fontawesome'
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: {'temperatureUnit': 'c','unitDisplay': '°C'}
        };
        this.changeSettings = this.changeSettings.bind(this);
        console.log(faCoffee);
    }

    changeSettings(settings) {
    	let newSettings = extend(this.state.settings, newSettings);
    	this.setState('settings': newSettings);
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <LocationHolder settings={this.state.settings}/>
                <FontAwesomeIcon name={faCoffee.iconName} />
                <i className="fas fa-cog"></i>
            </div>);
    }
}
