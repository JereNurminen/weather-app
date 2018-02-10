import React from 'react';
import ReactDOM from 'react-dom';
import { convertTemperature } from '../functions/functions.js';
import '../styles/SettingsPanel.scss'

export default class SettingsPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
        this.saveChanges = this.saveChanges.bind(this);
    }

    saveChanges() {
    	console.log
    }

    render() {
        return (
        	<div onChange={this.saveChanges}>
        		<span>Temperature Unit:</span>
        		<div className='temperatureInputHolder'>
	        		<input type="radio" id="c" name="degree" value="c"/>
				    <label for="c">Celsius</label>
				</div>

			    <div className='temperatureInputHolder'>
				    <input type="radio" id="k" name="degree" value="k"/>
				    <label for="k">Kelvin</label>
				</div>

			    <div className='temperatureInputHolder'>
				    <input type="radio" id="f" name="degree" value="f"/>
				    <label for="f">Fahrenheit</label>
				</div>

				<button onClick={this.saveChanges}></button>

        	</div>
        )
    }
}