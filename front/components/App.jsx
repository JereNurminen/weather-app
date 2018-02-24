import React from 'react';
import ReactDOM from 'react-dom';
import { extend } from 'lodash';
import LocationHolder from './LocationHolder.jsx';
import '../styles/App.scss';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Weather-App</h1>
                <LocationHolder/>
            </div>
        );
    }
}
