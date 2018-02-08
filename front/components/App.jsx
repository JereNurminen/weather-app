import React from 'react';
import ReactDOM from 'react-dom';
import LocationHolder from './LocationHolder.jsx';
import '../styles/App.scss'

export default class App extends React.Component {
  render() {
    return (
    	<div style={{textAlign: 'center'}}>
        	<LocationHolder/>
    	</div>);
  }
}
