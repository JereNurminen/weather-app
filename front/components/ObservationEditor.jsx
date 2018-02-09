import React from 'react';
import ReactDOM from 'react-dom';
import { convertTemperature } from '../functions/functions.js';
import '../styles/ObservationEditor.scss'

export default class ObservationEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locationId: this.props.locationId,
            temperature: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveObservation = this.saveObservation.bind(this);
    }

    handleChange(event) {
        this.setState({temperature: event.target.value});
    }

    saveObservation() {
        console.log(this.state.temperature);
        let data = {
            'location_id': this.state.locationId,
            'temperature': convertTemperature(this.props.settings.temperatureUnit, 'k', this.state.temperature)
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
                <input className='numberInput' type='number' value={this.state.temperature} onChange={this.handleChange}/>
                <span className='degrees'>{this.props.settings.unitDisplay}</span>
                <button className='save button' onClick={this.saveObservation}>Save</button>
                <button className='cancel button' onClick={() => this.props.toggleEditor(false)}>Cancel</button>
            </div>
        )
    }
}