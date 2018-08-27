import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tooltip } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    heroTalentsList: {
        marginTop: '16px',
        overflowX: 'hidden',
    },
    levelRow: {
        fontSize: '1.3rem',
        textAlign: 'center'
    },
    talentIcon: {
        borderRadius: '48px'
    },
    hideOnMobile: {
        [theme.breakpoints.between('xs', 'sm')]: {
            display: 'none',
        },
    },
    hideOnDesktop: {
        [theme.breakpoints.between('md', 'lg')]: {
            display: 'none',
        },
    },
    heading: {
        flexBasis: '50%',
        flexShrink: 0,
    },
    secondaryHeading: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '16px',
        fontSize: theme.typography.pxToRem(20),
        // color: theme.palette.text.secondary,
    }
});

class HeroTalentsList extends Component {

    // constructor(props) {
    //     super(props);

    //     const { talents } = this.props;

    // }

    state = {};

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    renderTalents = (renderAsExpansions = false) => {
        const { classes, talents } = this.props;
        const { expanded } = this.state;
        const talentLevels = Object.keys(talents);
        
        return (
            talentLevels.map(level => {
                return (
                    <React.Fragment key={level}>                        
                        <TableRow>
                            <TableCell component="th" scope="row" className={classes.levelRow}>
                                Level {level}
                            </TableCell>
                            <TableCell className={classes.hideOnMobile} />
                            <TableCell className={classes.hideOnMobile} />
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

                                    if (renderAsExpansions) {
                                        return (
                                            <ExpansionPanel key={talent.tooltipId} expanded={expanded === talent.tooltipId} onChange={this.handleChange(talent.tooltipId)}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    {icon}
                                                    <Typography className={classes.secondaryHeading}>{talent.name}</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                        {talent.description}
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        );
                                    }

                                    return (
                                        <TableRow className={classes.hideOnMobile} key={talent.tooltipId}>
                                            <TableCell>
                                                {icon}
                                            </TableCell>
                                            <Tooltip title={talent.description} leaveTouchDelay={3000}>
                                                <TableCell component="th" scope="row">
                                                    {talent.name}
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell>{talent.description}</TableCell>
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
    renderTalentsExpansionPanels = () => {
        const { classes, talents } = this.props;
        const { expanded } = this.state;
        const talentLevels = Object.keys(talents);
        
        return (
            talentLevels.map(level => {
                return (
                    <div key={level} className={classes.hideOnDesktop}>                        
                        <Typography className={classes.levelRow}>
                                Level {level}
                        </Typography>
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
                                        <ExpansionPanel key={talent.tooltipId} expanded={expanded === talent.tooltipId} onChange={this.handleChange(talent.tooltipId)}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                {icon}
                                                <Typography className={classes.secondaryHeading}>{talent.name}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Typography>
                                                    {talent.description}
                                                </Typography>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    );
                                })
                            }
                        </React.Fragment>    
                    </div>                    
                        
                );
            })
        );
    }

    render() {        
        const { classes } = this.props;
        return (
            <Paper>
                <div className={classes.heroTalentsList}>
                    <Table className={classes.hideOnMobile}>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell component="th" variant="head">Talent</TableCell>
                                <TableCell component="th" variant="head">Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderTalents()}
                        </TableBody>
                    </Table>
                    {this.renderTalentsExpansionPanels(true)}                    
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(HeroTalentsList);