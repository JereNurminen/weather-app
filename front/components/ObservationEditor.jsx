import React from 'react';
import ReactDOM from 'react-dom';
import { celsiusToKelvin } from '../functions/functions.js';
import '../styles/ObservationEditor.scss'

export default class ObservationEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationId: this.props.locationId,
            temperature: 0,
            minTemperatureLimit: -90,
            maxTemperatureLimit: 60
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveObservation = this.saveObservation.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        this.setState({temperature: event.target.value});
    }

    handleKeyPress(event) {
        if(event.key == 'Enter') {
            this.saveObservation();
        }
    }

    saveObservation() {
        let temperature = this.state.temperature;
        let regExp = /^([+-]?[1-9]\d*|0)$/;
        if (!regExp.test(temperature)) {
            alert('The temperature must be an integer!');
            return;
        }
        if (temperature > this.state.maxTemperatureLimit) {
            alert('Too hot, please check your values again.');
            return;
        }
        if (temperature < this.state.minTemperatureLimit) {
            alert('Too cold, please check your values again.');
            return;
        }
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
            this.props.update();
        });
    }

    render() {
        return (
            <div className='observationEditor'>
                <input className='numberInput' type='number' value={this.state.temperature} onChange={this.handleChange} 
                        onKeyPress={this.handleKeyPress} min={this.state.minTemperatureLimit} max={this.state.maxTemperatureLimit} step='1'/>
                <span className='degrees'>{this.props.settings.unitDisplay}</span>
                <button className='save button' onClick={this.saveObservation}>Save</button>
                <button className='cancel button' onClick={() => this.props.toggleEditor(false)}>Cancel</button>
            </div>
        )
    }
}