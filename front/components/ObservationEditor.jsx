import React from 'react';
import ReactDOM from 'react-dom';
import { celsiusToKelvin } from '../functions/functions.js';
import '../styles/ObservationEditor.scss'

export default class ObservationEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationId: this.props.locationId,
            temperature: '',
            minTemperatureLimit: -90,
            maxTemperatureLimit: 60
        };

        this.handleChange = this.handleChange.bind(this);
        this.saveObservation = this.saveObservation.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.validateTemperature = this.validateTemperature.bind(this);
    }

    handleChange(event) {
        this.setState({temperature: event.target.value});
    }

    handleKeyPress(event) {
        if(event.key == 'Enter') {
            this.saveObservation();
        }
    }

    validateTemperature(temperature) {
        let regExp = /^([+-]?[1-9]\d*|0)$/;

        if (!regExp.test(temperature)) {
            alert('The temperature must be an integer!');
            return false;
        }

        if (temperature > this.state.maxTemperatureLimit) {
            alert('Too hot, please check your values again.');
            return false;
        }

        if (temperature < this.state.minTemperatureLimit) {
            alert('Too cold, please check your values again.');
            return false;
        }

        return true;
    }

    saveObservation() {
        let temperature = this.state.temperature;
        if (!this.validateTemperature(temperature)) return;

        let data = {
            'location_id': this.state.locationId,
            'temperature': celsiusToKelvin(temperature)
        }

        fetch('http://weather.jerenurminen.me/api/observations/', { 
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
               'Content-Type': 'application/json'
            })
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            this.setState({temperature: ''});
            this.props.update();
        });
    }

    render() {
        return (
            <div className='observationEditor'>
                <div className='inputContainer'>
                    <input className='numberInput' type='number' value={this.state.temperature} onChange={this.handleChange} 
                            onKeyPress={this.handleKeyPress} min={this.state.minTemperatureLimit} max={this.state.maxTemperatureLimit} step='1'/>
                    <span className='degrees'>°C</span>
                </div>
                <button className='save button' onClick={this.saveObservation}>Add</button>
            </div>
        )
    }
}