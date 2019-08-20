import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListIcon from '@material-ui/icons/List';
import SchoolIcon from '@material-ui/icons/School';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '0 4px 0 rgba(60,64,67,0.302), 0 8px 12px 6px rgba(60,64,67,0.149)'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
});

class SideNav extends React.Component {

  handleDrawerClose = () => {
    this.props.handleDrawerCloseFn();
  }

  render() {
    const { classes } = this.props;

    return (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon><VpnKeyIcon /></ListItemIcon>
              <ListItemText primary={'Generated Keys'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary={"Mentors"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon><SchoolIcon /></ListItemIcon>
              <ListItemText primary={"Cohorts"} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
    );
  }
}

export default withStyles(styles)(SideNav);
