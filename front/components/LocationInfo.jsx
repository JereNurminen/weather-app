import React from 'react';
import ReactDOM from 'react-dom';
import { sortBy } from 'lodash';
import { head } from 'lodash';
import { last } from 'lodash';
import { convertTemperature } from '../functions/functions.js';

export default class CountryInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location
        };
        this.getMaxTemperature = this.getMaxTemperature.bind(this);
        this.getMinTemperature = this.getMinTemperature.bind(this);
        this.state.location.max = this.getMaxTemperature();
        this.state.location.min = this.getMinTemperature();
        console.log(this.state);
    }

    componentDidMount() {
        console.log(this.state.location.min.toString());
        console.log(last(this.state.location.observations).toString());
        console.log(this.state.location.max.toString());
    }

    getMaxTemperature() {
        let sortedObservations = sortBy(this.state.location.observations, (o) => { return o.temperature; });
        return last(sortedObservations);
    }

    getMinTemperature() {
        let sortedObservations = sortBy(this.state.location.observations, (o) => { return o.temperature; });
        return head(sortedObservations);
    }

    render() {
        return (
            <div>
                <h2>{this.state.location.name}</h2>
                <h4>Maximum: {convertTemperature('k', 'c', this.state.location.max.temperature)}</h4>
                <h3>{convertTemperature('k', 'c', last(this.state.location.observations).temperature)}</h3>
                <h4>Minimum: {convertTemperature('k', 'c', this.state.location.min.temperature)}</h4>
            </div>
        )
    }
}