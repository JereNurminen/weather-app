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
        this.toggleEditor = this.toggleEditor.bind(this);
        this.state.location.max = this.getMaxTemperature();
        this.state.location.min = this.getMinTemperature();
    }

    componentDidMount() {

    }

    getMaxTemperature() {
        let sortedObservations = sortBy(this.state.location.observations, (o) => { return o.temperature; });
        return last(sortedObservations);
    }

    getMinTemperature() {
        let sortedObservations = sortBy(this.state.location.observations, (o) => { return o.temperature; });
        return head(sortedObservations);
    }

    toggleEditor(toggle) {
		this.setState({editorIsOpen: toggle});

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
            				<td>{convertTemperature('k', 'c', this.state.location.max.temperature)}</td>
            			</tr>
            			<tr>
            				<td>Minimum:</td>
            				<td>{convertTemperature('k', 'c', this.state.location.min.temperature)}</td>
            			</tr>
            		</tbody>
            	</table>
            	
            	{this.state.editorIsOpen ? (
            		<ObservationEditor locationId={this.state.location.id}/>
        		) : (
					<span onClick={() => this.toggleEditor(true)}>Add Observation</span>
        		)}
            </div>
        )
    }
}