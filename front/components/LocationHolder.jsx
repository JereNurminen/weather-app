import React from 'react';
import ReactDOM from 'react-dom';
import LocationInfo from './LocationInfo.jsx';
import { sortBy, head, last } from 'lodash';
import '../styles/LocationHolder.scss'

export default class CountryHolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            extremes: {
                min: '210',
                max: '360'
            }
        };

        this.getObservations = this.getObservations.bind(this);
        this.getExtremes = this.getExtremes.bind(this);
    }

    componentDidMount() {
        this.getObservations();
        this.getExtremes();
    }

    getObservations() {
        fetch('http://weather.jerenurminen.me/api/observations/')
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                locations: responseData
            });
        });
    }

    getExtremes() {
        fetch('http://weather.jerenurminen.me/api/extremes/')
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                extremes: responseData
            });
        });
    }

    render() {
        return (
            <div className='locationHolder'>
            {this.state.locations.map(location =>
                <LocationInfo location={location} extremes={this.state.extremes} socket={this.props.socket}/>
            )}
            </div>
        )
    }
}
