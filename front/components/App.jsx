import React from 'react';
import ReactDOM from 'react-dom';
import { extend } from 'lodash';
import LocationHolder from './LocationHolder.jsx';
import SettingsPanel from './SettingsPanel.jsx';
import '../styles/App.scss'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: {'temperatureUnit': 'c','unitDisplay': '°C'},
            settingsPanelIsOpen: false
        };
        this.changeSettings = this.changeSettings.bind(this);
    }

    changeSettings(settings) {
    	let newSettings = extend(this.state.settings, newSettings);
    	this.setState('settings': newSettings);
    }

    toggleSettingsPanel(toggle) {
        this.setState({settingsPanelIsOpen: toggle});
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                    <div className='sidePanel'>
                <h1>Weather-App</h1>
                {this.state.settingsPanelIsOpen ? (
                    <div>
                        <button className='button openSettings' onClick={() => this.toggleSettingsPanel(false)}>Settings</button>
                        <SettingsPanel settings={this.props.settings} changeSettings={this.changeSettings}/>
                    </div>
                ) : (
                    <div>
                        <button className='button openSettings' onClick={() => this.toggleSettingsPanel(true)}>Settings</button>
                    </div>
                )}
                </div>
                <LocationHolder settings={this.state.settings}/>
            </div>);
    }
}
