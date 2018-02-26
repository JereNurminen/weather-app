import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import LocationHolder from './LocationHolder.jsx';
import '../styles/App.scss';

const socket = io('weather.jerenurminen.me:5000');

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };

        socket.on('connect', (data) => {
            console.log('Connected to WebSocket server');          
        });
        socket.on('connect_error', (data) => {
            console.log('Error connecting to WebSocket server, real time updates disabled');          
        });
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Weather-App</h1>
                <LocationHolder socket={socket}/>
            </div>
        );
    }
}
