import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from './components/AppBar';
import HeroList from './components/HeroList';
import HeroDetails from './components/HeroDetails';
import { AppContext, initAppContext } from './context/AppContext';
import PlayerDetails from './components/PlayerDetails/PlayerDetails';

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
                            <HeroList exact path='/' component={HeroList} />
                            <PlayerDetails path='/player/:player' component={PlayerDetails} />
                            <HeroDetails path='/player/:player/hero/:heroName' component={HeroDetails} />
                            <HeroDetails path='/hero/:heroName' component={HeroDetails} />
                        </Router>
                    </div>
                </AppContext.Provider>
            </div>
        );
    }
}

export default App;
