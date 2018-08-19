import React, { Component } from 'react';
import HeroPortrait from '../HeroPortrait';
import { withAppContext } from '../../context/withAppContext';

class HeroDetails extends Component {

    constructor(props) {
        super(props);
        const { match: {params}, appContext: { heroes } } = this.props;        
        const hero = heroes.find(aHero => aHero.name === params.heroName);

        this.state = {
            hero
        };
    }

    render() {
        return (
            <div>
                <HeroPortrait hero={this.state.hero} />
            </div>
        );
    }
}

export default withAppContext(HeroDetails);