import React from 'react';
import ReactDOM from 'react-dom';
import ObservationEditor from './ObservationEditor.jsx';
import { sortBy, head, last } from 'lodash';
import { LineChart, Line, YAxis, Legend, ResponsiveContainer, ReferenceLine} from 'recharts';
import { kelvinToCelsius, getTemperatureColorCode } from '../functions/functions.js';
import '../styles/LocationInfo.scss'

export default class CountryInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
            borderColor: ''
        };

        this.getMaxTemperature = this.getMaxTemperature.bind(this);
        this.getMinTemperature = this.getMinTemperature.bind(this);
        this.update = this.update.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.getColor = this.getColor.bind(this);
        this.state.maxObservation = this.getMaxTemperature(this.state.location.observations);
        this.state.minObservation = this.getMinTemperature(this.state.location.observations);
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

    getColor() {
        let currentTemperature = last(this.state.location.observations).temperature;
        return getTemperatureColorCode(currentTemperature);
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
        let locationWithBreakline = this.state.location.name.replace(', ', ',</br>');
        let graphData = this.state.location.observations.map(observation => {
            let obs = {};
            obs.time = observation.creation_time;
            obs.temperature = kelvinToCelsius(observation.temperature);
            return obs; 
        });
        let graphMin = kelvinToCelsius(this.props.extremes.min);
        let graphMax = kelvinToCelsius(this.props.extremes.max);

        return (
            <div className='location' style={{borderColor: this.getColor()}}>
                <h2 dangerouslySetInnerHTML={{__html: locationWithBreakline}}></h2>
                <div className="tableHolder">
                    <table>
                        <tbody>
                            <tr>
                                <th>Latest:</th>
                                <th colSpan='2'>Last 24 hours:</th>
                            </tr>
                            <tr>
                                <td rowSpan='2' className='currentTemperature'>{kelvinToCelsius(last(this.state.location.observations).temperature)}</td>
                                <td>Maximum:</td>
                                <td>{kelvinToCelsius(this.state.maxObservation.temperature)}</td>
                            </tr>
                            <tr>
                                <td>Minimum:</td>
                                <td>{kelvinToCelsius(this.state.minObservation.temperature)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ObservationEditor locationId={this.state.location.id} update={this.update} toggleEditor={this.toggleEditor}/>
                <ResponsiveContainer height={100} width='100%'>
                    <LineChart data={graphData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <ReferenceLine y={0} label="0" stroke="red" strokeDasharray="1 1" />
                        <YAxis domain={[graphMin, graphMax]} width={30} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} />
                        <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}