import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import defaultPortrait from '../../resources/images/hots-default-portrait.png';

const styles = {
    heroPortrait: {
        textAlign: 'center',
        '& a': {
            textShadow: 'none',
            textDecoration: 'none',
        }
    },
    heroName: {
        color: 'var(--secondary-theme-color)',
    },
    heroImg: {
        border: 'solid 2px var(--secondary-theme-color)',
        borderRadius: '48px',
        boxShadow: '4px 4px 4px black',
    }
};

class HeroPortrait extends Component {
  static propTypes = {
      hero: PropTypes.object.isRequired,
      withLink: PropTypes.bool,
      hideName: PropTypes.bool,
  }

  getHeroImg = (hero) => {     
      const { classes, hideName } = this.props;
      let imgSrc = defaultPortrait;    

      try {
          imgSrc = require(`../../resources/images/heroes/${hero.icon}`) || defaultPortrait;
      } catch (ex) {
          console.error(ex);
      }

      const img = <img className={classes.heroImg} src={imgSrc} alt={hero.name} key={hero.name} />;
      if (!hideName) {
          return (
              <div>
                  {img}
                  <div className={classes.heroName}>{hero.name}</div>
              </div>                
          );
      }

      return img;
  };

  render() {
      const { classes, hero, withLink } = this.props;

      if (withLink) {
          return (
              <div className={classes.heroPortrait}>
                  <Link to={`hero/${hero.name}`}>
                      {this.getHeroImg(hero)}
                  </Link>
              </div>
          );
      }

      return (
          <div className={classes.heroPortrait}>
              {this.getHeroImg(hero)}
          </div>
      );

  }
}

export default withStyles(styles)(HeroPortrait);