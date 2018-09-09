import React, { Component } from 'react';
import _ from 'lodash';
import { withAppContext } from '../../context/withAppContext';
import TeamCompDetails from './TeamCompDetails';
import TeamComp from '../TeamComp';
import {Typography, } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    pageTitle: {
        marginTop: '16px',
        fontSize: '1.4rem',
        textAlign: 'center',
        color: '#fff',
    },
    teamCompListContainer: {
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    filters: {
        color: '#fff'
    },
    colorSwitchBase: {
        color: 'var(--primary-theme-color)',
        '&$colorChecked': {
            color: 'var(--secondary-theme-color)',
            '& + $colorBar': {
                backgroundColor: 'var(--secondary-theme-color)',
            },
        },
    },
    colorBar: {},
    colorChecked: {},
};

class TeamCompDetailsContainer extends Component {

    constructor(props) {
        super(props);

        const allTeamComps = this.generateTeamComps();
        const compSizeOptions = [
            {
                size: 2,
                label: 'Two Players',
                selected: false
            },
            {
                size: 3,
                label: 'Three Players',
                selected: true
            },
            {
                size: 4,
                label: 'Four Players',
                selected: false
            },
            {
                size: 5,
                label: 'Five Players',
                selected: false
            },
        ];
        const filtering = { 
            compSizeOptions, 
            compSizeOrdering: 'asc' 
        };
        this.state = {
            allTeamComps,
            filtering
        };
    }

    filterAndSortTeamComps = (teamComps, filtering) => {
        const compSizeSelectedFilters = filtering.compSizeOptions.filter(compSizeOption => compSizeOption.selected)
            .map(compSizeFilter => compSizeFilter.size);
        const sortedTeams = _(teamComps)
            .filter(teamComp => compSizeSelectedFilters.includes(teamComp.heroes.length))    
            .orderBy(teamComp => teamComp.heroes.length, filtering.compSizeOrdering)
            .value();

        return sortedTeams;
    }

    generateTeamComps = () => {
        const { appContext: { teamComps } } = this.props;
        const allTeamComps = {
            twoPlayerComp: [],
            threePlayerComp: [],
            fourPlayerComp: [],
            fivePlayerComp: [],
        };
        
        teamComps.forEach((teamCompValues, key) => {
            const teamCompDetails = {
                key,
                heroPortraits: <div>No Heroes</div>,
                heroes: [],
                players: [],
                gameTypes: [],
                numberOfGames: 0,
                numberOfWins: 0
            };
            
            teamCompDetails.heroes = teamCompValues[0].teamPlayers.map(player => player.hero);
            teamCompDetails.numberOfGames = teamCompValues.length;
            teamCompDetails.numberOfWins = teamCompValues.filter(teamCompGame => teamCompGame.isWin).length;
            teamCompDetails.gameTypes = teamCompValues.reduce((gameTypesAcc, teamCompGame) => {
                if (gameTypesAcc.includes(teamCompGame.gameType)) {
                    return gameTypesAcc;
                }

                return gameTypesAcc.concat(teamCompGame.gameType);
            }, []);
            teamCompDetails.players = teamCompValues.reduce((playersAcc, teamCompGame) => {
                teamCompGame.teamPlayers.forEach(player => {
                    if (!playersAcc.includes(player.playerName)) {
                        return playersAcc.push(player.playerName);
                    }
                });

                return playersAcc;
            }, []);

            const teamCompPortraits = <TeamComp teamComp={teamCompDetails.heroes} />;
            const teamCompHeroesElement = (
                <div key={key}>
                    {teamCompPortraits}
                </div>
            );

            teamCompDetails.heroPortraits = teamCompHeroesElement;

            switch (teamCompDetails.heroes.length) {
                case 2: {
                    allTeamComps.twoPlayerComp.push(teamCompDetails);
                    break;
                }
                case 3: {
                    allTeamComps.threePlayerComp.push(teamCompDetails);
                    break;
                }
                case 4: {
                    allTeamComps.fourPlayerComp.push(teamCompDetails);
                    break;
                }
                default: {
                    allTeamComps.fivePlayerComp.push(teamCompDetails);
                    break;
                }
            }
        });
    
        return allTeamComps;
    }

    renderFilterControls = () => {
        const { classes } = this.props;
        const { filtering: { compSizeOptions } } = this.state;
        const handleFilterChange = (compSizeOption) => () => {
            compSizeOption.selected = !compSizeOption.selected;
            const updatedFilterOptions = compSizeOptions.map((option) => {
                if (option.size === compSizeOption.size) {
                    return compSizeOption;
                }

                return option;
            });

            this.setState({ filtering: {compSizeOptions: updatedFilterOptions}});
        };

        const filterStyles = {
            label: {
                color: '#fff'
            }
        };
        const StyledFormControlLabel = withStyles(filterStyles)(FormControlLabel);

        return (
            <FormGroup row>
                {
                    compSizeOptions.map(compSizeOption => {
                        return (
                            <StyledFormControlLabel
                                key={compSizeOption.label}
                                className={classes.filter}
                                control={
                                    <Switch
                                        checked={compSizeOption.selected}
                                        onChange={handleFilterChange(compSizeOption)}
                                        value={compSizeOption.label}
                                        classes={{
                                            switchBase: classes.colorSwitchBase,
                                            checked: classes.colorChecked,
                                            bar: classes.colorBar,
                                        }}
                                    />
                                }
                                label={compSizeOption.label}
                            />
                        );
                    })
                }
            </FormGroup>
        );
    }

    renderTeamComps = () => {
        const { classes } = this.props;
        const { allTeamComps, filtering } = this.state;
        const teamCompValues = Object.values(allTeamComps);
        const sortedTeamComps = this.filterAndSortTeamComps(_.flattenDeep(teamCompValues), filtering);

        const teamCompCards = sortedTeamComps.map(teamComp => {
            return (
                <TeamCompDetails key={teamComp.key} teamComp={teamComp} />
            );
        });

        return (
            <div className={classes.teamCompListContainer}>
                {teamCompCards}
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography className={classes.pageTitle}>Team Comps</Typography>
                { this.renderFilterControls() }
                { this.renderTeamComps() }
            </div>
        );
    }
}

export default withStyles(styles)(withAppContext(TeamCompDetailsContainer));