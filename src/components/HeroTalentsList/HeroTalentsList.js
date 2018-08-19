import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './HeroTalentsList.css';
import { Tooltip } from '@material-ui/core';

const styles = theme => ({
    heroTalentsList: {
        marginTop: '16px',
        overflowX: 'hidden',
    },
    levelRow: {
        fontSize: '1.3rem'
    },
    talentIcon: {
        borderRadius: '48px'
    },
    description: {
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'none',
        },
    }
});

class HeroTalentsList extends Component {

    // constructor(props) {
    //     super(props);

    //     const { talents } = this.props;

    // }

    renderTalents = () => {
        const { classes, talents } = this.props;
        const talentLevels = Object.keys(talents);
        
        return (
            talentLevels.map(level => {
                return (
                    <React.Fragment>
                        <TableRow key={level}>
                            <TableCell component="th" scope="row" className={classes.levelRow}>
                                Level {level}
                            </TableCell>
                            <TableCell />
                            <TableCell className={classes.description} />
                        </TableRow>
                        <React.Fragment>
                            {
                                talents[level].map(talent => {
                                    let iconSrc = '';
                                    try {
                                        iconSrc = require(`../../resources/images/talents/${talent.icon}`);
                                    } catch (ex) {
                                        console.error(ex);
                                    }
                                    const icon = <img className={classes.talentIcon} src={iconSrc} alt={talent.abilityId} key={talent.tooltipId} />;
                                    return (
                                        <TableRow key={talent.tooltipId}>
                                            <TableCell>
                                                {icon}
                                            </TableCell>
                                            <Tooltip title={talent.description} enterTouchDelay={0} leaveTouchDelay={3000}>
                                                <TableCell component="th" scope="row">
                                                    {talent.name}
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell className={classes.description} >{talent.description}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </React.Fragment>    
                    </React.Fragment>                    
                        
                );
            })
        );
    }

    render() {        
        const { classes } = this.props;
        return (
            <Paper>
                <Table className={classes.heroTalentsList}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell component="th" variant="head">Talent</TableCell>
                            <TableCell component="th" variant="head" className={classes.description} >Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderTalents()}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(HeroTalentsList);