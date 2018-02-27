import React from 'react';
import ReactDOM from 'react-dom';
import { sortBy, head, last, compact } from 'lodash';
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer, ReferenceLine} from 'recharts';
import { kelvinToCelsius, getTemperatureColorCode } from '../functions/functions.js';

export default class ListPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="overlay">

            </div>
        )
    }
}