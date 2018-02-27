import React from 'react';
import ReactDOM from 'react-dom';
import { sortBy, head, last, compact } from 'lodash';
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer, ReferenceLine} from 'recharts';
import { kelvinToCelsius, getTemperatureColorCode } from '../functions/functions.js';
import '../styles/DetailsPanel.scss';
import flagIcon from '../img/flag.svg';

export default class ListPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            observations: [],
            hasLoaded: false
        };

        this.loadObservations = this.loadObservations.bind(this);
        this.flagObservation = this.flagObservation.bind(this);
        //this.updateObservation = this.updateObservation.bind(this);

        this.loadObservations();
    }

    loadObservations() {
        fetch(`http://weather.jerenurminen.me:5000/api/locations/${this.props.location.id}?days=7`)
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                observations: responseData.observations,
                hasLoaded: true
            });
        });
    }
/*
    updateObservation(id) {
        fetch(`http://weather.jerenurminen.me:5000/api/observations/${id}`)
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                observations: 
            });
        });
    }
*/
    flagObservation(id) {
        fetch(`http://weather.jerenurminen.me:5000/api/flag/${id}`, { 
            method: 'POST',
            mode: 'cors'
        }).then(response => {
            //this.updateObservation(id);
            this.loadObservations();
        });
    }

    render() {
        return (
            <div className="overlay" onClick={() => this.props.openDetails(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h3>Details for {this.props.location.name}</h3>
                    <div className="tableContainer">
                        <table>
                            <tr>
                                <th></th>
                                <th>Time</th>
                                <th>Temperature</th>
                                <th>Flag</th>
                            </tr>
                            {this.state.hasLoaded ? (
                                <tbody>
                                {this.state.observations.map(observation =>
                                    <tr key={observation.id}>
                                        <td style={{borderColor: getTemperatureColorCode(observation.temperature)}}>{observation.id}</td>
                                        <td>{observation.creation_time}</td>
                                        <td>{kelvinToCelsius(observation.temperature)}</td>
                                        <td onClick={() => {this.flagObservation(observation.id)}}>
                                            {observation.flags ? (<span className="flags">{observation.flags} x </span>) : (null)}
                                            <img className='flagIcon' src={flagIcon} alt="A flag icon"/>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            ) : (
                                <tr>
                                    <td colSpan='3' align='center'>Loading...</td>
                                </tr>
                            )}
                        </table>
                    </div>
                    <span className="closePanel" onClick={() => this.props.openDetails(false)}>Close Panel</span>
                </div>
            </div>
        )
    }
}