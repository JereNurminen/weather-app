import React from 'react';
import ReactDOM from 'react-dom';
import ObservationEditor from './ObservationEditor.jsx';
import { sortBy } from 'lodash';
import { head } from 'lodash';
import { last } from 'lodash';
import { convertTemperature } from '../functions/functions.js';
import '../styles/LocationInfo.scss'

export default class CountryInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location
        };
        this.getMaxTemperature = this.getMaxTemperature.bind(this);
        this.getMinTemperature = this.getMinTemperature.bind(this);
        this.update = this.update.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.state.maxObservation = this.getMaxTemperature(this.state.location.observations);
        this.state.minObservation = this.getMinTemperature(this.state.location.observations);
    }

    componentWillUpdate() {

    }

    getMaxTemperature(observations) {
        let sortedObservations = sortBy(observations, (o) => { return o.temperature; });
        return last(sortedObservations);
    }

    getMinTemperature(observations) {
        let sortedObservations = sortBy(observations, (o) => { return o.temperature; });
        return head(sortedObservations);
    }

    toggleEditor(toggle) {
        this.setState({editorIsOpen: toggle});
    }

    update() {
        fetch(`http://weather.jerenurminen.me/api/locations/${this.state.location.id}`)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            this.setState({
                location: responseData,
                minObservation: this.getMinTemperature(responseData.observations),
                maxObservation: this.getMaxTemperature(responseData.observations)
            });
        });
        this.toggleEditor(false);
    }

    render() {
        return (
            <div className='location'>
                <h2>{this.state.location.name}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Latest:</th>
                            <th colSpan='2'>Last 24 hours:</th>
                        </tr>
                        <tr>
                            <td rowSpan='2' className='currentTemperature'>{convertTemperature('k', 'c', last(this.state.location.observations).temperature)}</td>
                            <td>Maximum:</td>
                            <td>{convertTemperature('k', 'c', this.state.maxObservation.temperature)}</td>
                        </tr>
                        <tr>
                            <td>Minimum:</td>
                            <td>{convertTemperature('k', 'c', this.state.minObservation.temperature)}</td>
                        </tr>
                    </tbody>
                </table>
                
                {this.state.editorIsOpen ? (
                    <ObservationEditor locationId={this.state.location.id} update={this.update} toggleEditor={this.toggleEditor} changeSettings={this.changeSettings} settings={this.props.settings}/>
                ) : (
                    <button className='button openEditor' onClick={() => this.toggleEditor(true)}>Add Observation</button>
                )}
            </div>
        )
    }
}