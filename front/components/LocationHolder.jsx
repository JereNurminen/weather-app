import React from 'react';
import ReactDOM from 'react-dom';
import LocationInfo from './LocationInfo.jsx';

export default class CountryHolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          locations: []
        };
    }

    componentDidMount() {
        fetch('http://weather.jerenurminen.me/api/observations/')
        .then(response => response.json())
        .then(responseData => {
            console.log(this);
            this.setState({
                locations: responseData,
                loadComplete: true
            });
        });
    }

    render() {
      return (
        <div>
          {this.state.locations.map(location =>
            <LocationInfo location={location}/>
          )}
        </div>
      )
    }
}