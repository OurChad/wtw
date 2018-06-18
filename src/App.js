import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {heroes} from './heroData/';
import {Row, Col, Slider, Slide, Card, CardTitle} from 'react-materialize';

class App extends Component {

    renderHeroes = () => {
        return heroes.map((hero) => {
            let heroImg = {}
            try {
                heroImg = require(`./heroData/${hero.replace(/\./gi,'')}/${hero}.png`) || {};
            } catch(ex) {

            }
            return <img src={heroImg}/>;
        })
    };
  render() {
      const alarak = require('./heroData/Alarak/Alarak.png');
      //const aba = require(`./heroData/${heroes[0]}/${heroes[0]}.png`);

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Slider>
              <Slide>
                  <Row>
                      <Col s={3} m={3}>{heroes[0]}</Col>
                      <Col s={3} m={3}>{heroes[1]}</Col>
                      <Col s={3} m={3}>{heroes[2]}</Col>
                      <Col s={3} m={3}>{heroes[3]}</Col>
                  </Row>
                  <Row>
                      <Col s={3} m={3}>{heroes[4]}</Col>
                      <Col s={3} m={3}>{heroes[5]}</Col>
                      <Col s={3} m={3}>{heroes[6]}</Col>
                      <Col s={3} m={3}>{heroes[7]}</Col>
                  </Row>
              </Slide>
              <Slide>
                  <Row>
                      <Col s={3} m={3}>{heroes[8]}</Col>
                      <Col s={3} m={3}>{heroes[9]}</Col>
                      <Col s={3} m={3}>{heroes[10]}</Col>
                      <Col s={3} m={3}>{heroes[11]}</Col>
                  </Row>
                  <Row>
                      <Col s={3} m={3}>{heroes[12]}</Col>
                      <Col s={3} m={3}>{heroes[13]}</Col>
                      <Col s={3} m={3}>{heroes[14]}</Col>
                      <Col s={3} m={3}>{heroes[15]}</Col>
                  </Row>
              </Slide>
          </Slider>
          <img src={alarak} />
          {this.renderHeroes()}
      </div>
    );
  }
}

export default App;
