import React from 'react';
import ReactDOM from 'react-dom';
import ObservationEditor from './ObservationEditor.jsx';
import { sortBy, head, last, compact } from 'lodash';
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer, ReferenceLine} from 'recharts';
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
        this.onNewObservation = this.onNewObservation.bind(this);
        this.state.maxObservation = this.getMaxTemperature(this.state.location.observations);
        this.state.minObservation = this.getMinTemperature(this.state.location.observations);

        props.socket.on('new_observation', (data) => {this.onNewObservation(data)});
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

    onNewObservation(data) {
        if (data == this.state.location.id) {
            console.log('New observation at ' + this.state.location.name);
            this.update();
        }
    }

    update() {
        fetch(`http://weather.jerenurminen.me:5000/api/locations/${this.state.location.id}`)
        .then(response => response.json())
        .then(responseData => {
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
            obs.time = Date.parse(observation.creation_time);
            obs.temperature = kelvinToCelsius(observation.temperature);
            return obs; 
        });
        let graphMin = kelvinToCelsius(this.props.extremes.min);
        let graphMax = kelvinToCelsius(this.props.extremes.max);
        return (
            <div className='location' style={{borderColor: this.getColor()}}>
                <h2 dangerouslySetInnerHTML={{__html: locationWithBreakline}}></h2>
                <div className='tableHolder'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Latest:</th>
                                <th colSpan='2'>Last 24 hours:</th>
                            </tr>
                            <tr>
                                <td rowSpan='2' className='currentTemperature'>{kelvinToCelsius(last(this.state.location.observations).temperature)}</td>
                                <td>Maximum:</td>
                                <td className='temperatureExtreme'>{kelvinToCelsius(this.state.maxObservation.temperature)}</td>
                            </tr>
                            <tr>
                                <td>Minimum:</td>
                                <td className='temperatureExtreme'>{kelvinToCelsius(this.state.minObservation.temperature)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ObservationEditor locationId={this.state.location.id} update={this.update} toggleEditor={this.toggleEditor}/>
                <ResponsiveContainer height={100} width='100%'>
                    <LineChart data={graphData} margin={{ top: 1, right: 1, left: 1, bottom: 1 }}>
                        <ReferenceLine y={0} stroke='hsla(360, 60%, 60%, 0.6)'/>
                        <XAxis hide={true} dataKey='time' scale='time'/>
                        <YAxis ticks={[graphMin, 0, graphMax]} mirror={true} dataKey='temperature'
                        domain={[graphMin, graphMax]} width={30} interval='preserveStartEnd'
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }} type='number'/>
                        <Line type='monotone' dataKey='temperature' stroke='rgba(0,0,0,1)' dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}