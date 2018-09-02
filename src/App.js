import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import { AppContext, initAppContext } from './context/AppContext';
import AppBar from './components/AppBar';
import HeroList from './components/HeroList';
import HeroDetails from './components/HeroDetails';
import PlayerDetails from './components/PlayerDetails/PlayerDetails';
import TeamCompDetails from './components/TeamCompDetails/TeamCompDetails';

class App extends Component {

    constructor() {
        super();

        this.state = initAppContext();
    }

    render() {
        return (
            <div className="App">  
                <AppBar players={this.state.players} />
                <AppContext.Provider value={this.state}>
                    <div className="AppContainer">
                        <Router>
                            <HeroList exact path='/' />
                            <PlayerDetails path='/player/:player' />
                            <HeroDetails path='/player/:player/hero/:heroName' />
                            <HeroDetails path='/hero/:heroName' />
                            <TeamCompDetails path='/teamcomps' />
                        </Router>
                    </div>
                </AppContext.Provider>
            </div>
        );
    }
}

export default App;
