import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
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
            <AppContext.Provider value={this.state}>
                <Router>
                    <div className="App">  
                        <AppBar />
                        <div className="AppContainer">
                            <Route exact path='/' component={HeroList} />
                            <Route path='/player/:player' component={PlayerDetails} />
                            <Route path='/player/:player/hero/:heroName' component={HeroDetails} />
                            <Route path='/hero/:heroName' component={HeroDetails} />
                        </div>
                    </div>
                </Router>
            </AppContext.Provider>
        );
    }
}

export default App;
