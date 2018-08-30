import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import { AppContext, initAppContext } from './context/AppContext';
import AppBar from './components/AppBar';
import HeroList from './components/HeroList';
import HeroDetails from './components/HeroDetails';
import PlayerDetails from './components/PlayerDetails/PlayerDetails';
import TeamComp from './components/TeamComp';

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
                        </Router>
                        <TeamComp 
                            teamComp={this.state.teamComps.get('Kael\'thasSonya')[0].winningTeamComp} 
                            teamPlayers={this.state.teamComps.get('Kael\'thasSonya')[0].teamPlayers}
                        />
                    </div>
                </AppContext.Provider>
            </div>
        );
    }
}

export default App;
