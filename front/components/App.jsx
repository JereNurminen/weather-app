import React from 'react';
import ReactDOM from 'react-dom';
import LocationHolder from './LocationHolder.jsx';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Weather App</h1>
        <LocationHolder/>
      </div>);
  }
}
