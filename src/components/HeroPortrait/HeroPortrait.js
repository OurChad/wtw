import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import './HeroPortrait.css';
import defaultPortrait from '../../resources/images/hots-default-portrait.png';

export default class HeroPortrait extends Component {
  static propTypes = {
      hero: PropTypes.object.isRequired,
      hideName: PropTypes.bool
  }

  getHeroImg = (hero) => {     
      const { hideName } = this.props;
      let imgSrc = defaultPortrait;    

      try {
          imgSrc = require(`../../resources/images/heroes/${hero.icon}`) || defaultPortrait;
      } catch (ex) {
          console.error(ex);
      }

      const img = <img src={imgSrc} alt={hero.name} key={hero.name} />;
      if (!hideName) {
          return (
              <div>
                  {img}
                  <div>{hero.name}</div>
              </div>                
          );
      }

      return img;
  };

  render() {
      const { hero} = this.props;

      return (
          <div className="HeroPortrait">
              <Link to={`/hero/${hero.name}`} hero={hero} >
                  {this.getHeroImg(hero)}
              </Link>
          </div>
      );
  }
}
