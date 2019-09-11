import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";
import Paper from "@material-ui/core/Paper";

//CHATLIST
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import CreateIcon from '@material-ui/icons/Create';
import IconButton from "@material-ui/core/IconButton"

class ChatPageList extends Component {
    constructor(props){
        super(props)
        
    }
    render() {
        const {classes} = this.props
        return (
            <Paper style={{ height: "800px", maxHeight: "1000px" }}>
                <div style={{ padding: 13 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span style={{display:'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Avatar style={{marginRight:'10px'}}sizes="lg">
                      ME
                    </Avatar>
                    <Typography variant="h5">Chats</Typography>
                    </span>
                    <IconButton><CreateIcon/></IconButton>
                    
                  </div>
                  <div>
                    <TextField
                      id="outlined-name"
                      label="Search"
                      inputProps={{
                        style: {
                          height: "4px"
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          height: "3px",
                          marginTop: -6
                        }
                      }}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                </div>
                <Divider />
                <div style={{height: '663px', overflowY:'auto'}} className={classes.scrollBar}>
                <List>
                  <ListItem alignItems="flex-start" button>
                    <ListItemAvatar>
                      <Avatar> TL </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Trizha Kate Longaza"
                      secondary=" I'll be in your neighborhood doing errands this"   
                    />
                  </ListItem>
                  <Divider/>
                </List>
                </div>
              </Paper>
        )
    }
}

export default withStyles(styles)(ChatPageList)
