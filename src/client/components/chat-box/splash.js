import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, withWidth, TextField, IconButton, InputAdornment,
  GridList, GridListTile
} from '@material-ui/core';
import Search from '@material-ui/icons/Search'
import axios from 'axios'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    title: {
      paddingTop: 35,
      minHeight: 100,
      backgroundColor: '#780aaf',
      color: 'white',
      textAlign: 'center'
    },
    emptyQueue: {
      marginTop: 45,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      "@media (max-width: 425px)": {
        marginTop: 160
      }
    },
    subtitle: {
      marginTop: 20
    },
    gridList: {
        width: 500,
        height: 450,
    },
});

class Splash extends React.Component {
    constructor(){
        super();
        this.state = {
            query: ' ',
            results: []
        }
    }
    handleChange = (query) => {
        this.setState({ query })
    }
    handleSubmit = () => {
        let arr = []
        axios.get('https://api.unsplash.com/search/photos', {
            params: { query: this.state.query},
            headers: {
                Authorization: 'Client-ID dfa4c436eb3c108f49a31f09cdc4940abd45a370aad6c90260aec587a58421c7'
            }
        })
        .then(res => {
            arr = [...res.data.results] 
            arr.map((result,i) => {
                if (result.height > result.width){
                    arr[i].col = 2
                }
                else {
                    arr[i].col = 3
                }
            })
            this.setState({
                results: arr
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    closeDialog = () => {
        this.setState({
            query: ' ',
            results: []
        })
    }
    render(){
        const {
            width,
            classes,
            open, 
            handleClose,
        } = this.props;
        return (
            <Dialog
                maxWidth="md"
                fullWidth
                fullScreen={width === 'xs' ? true : false}
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onExited={this.closeDialog}
            >
                <DialogTitle disableTypography className={classes.title}>
                    <Typography variant="h4">Search for images</Typography>
                    <Typography variant="overline">&copy; Unsplash.com</Typography>
                </DialogTitle>
                <DialogContent>
                <TextField
                    id="outlined-name"
                    label="Name"
                    fullWidth
                    onChange={(e) => this.handleChange(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={this.handleSubmit}
                            >
                                <Search />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                />
                <div className={classes.root}>
                    <GridList cellHeight={170} cols={10}>
                        {this.state.results.map(tile => (
                        <GridListTile key={tile.id} className={classes.gridList} cols={tile.col}>
                            <img style={{ width: '100%' }} src={tile.urls.regular} alt="" />
                        </GridListTile>
                        ))}
                    </GridList>
                </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default withWidth()(withStyles(styles)(Splash));
