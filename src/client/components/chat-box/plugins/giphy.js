import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, withWidth, TextField, IconButton, InputAdornment,
} from '@material-ui/core';
import Search from '@material-ui/icons/Search'
import axios from 'axios'

const styles = theme => ({
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
    gifItem: {
        display: 'grid',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '2px 2px 4px 0 #ccc',
        boxSizing: 'border-box',
        margin: '0 0 1.5em',
        padding: '1em',
        width: '100%'
    },
    gifList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        columnGap: '1.5em',
        fontSize: '.85em',
        margin: '1.5em 0',
        padding: 0
    }
    
});

class Splash extends React.Component {
    constructor(){
        super();
        this.state = {
            trending: [],
            query: ' ',
            showTrend: true,
            results: []
        }
    }
    componentDidMount = () => {
        axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=NUK2jPG9u330Lg9QqIPjGMuX13oG0loS&limit=100`)
        .then(res => {
            this.setState({
                trending: [...res.data.data]
            })
        })
        .catch(err => {
            console.log(err)
        })

    }
    handleChange = (query) => {
        this.setState({ query })
    }
    handleSubmit = () => {
        axios.get(`http://api.giphy.com/v1/gifs/search?q=${this.state.query}&api_key=NUK2jPG9u330Lg9QqIPjGMuX13oG0loS&limit=100`)
        .then(res => {
            this.setState({
                showTrend: false,
                results: [...res.data.data]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    closeDialog = () => {
        this.setState({
            query: ' ',
            results: [],
            showTrend: true
        })
    }
    render(){
        const {
            width,
            classes,
            open, 
            handleClose,
            uploadGif
        } = this.props;
        return (
            <Dialog
                maxWidth="sm"
                fullWidth
                fullScreen={width === 'xs' ? true : false}
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onExited={this.closeDialog}
            >
                <DialogTitle disableTypography className={classes.title}>
                    <Typography variant="h4">Search for GIFs</Typography>
                    <Typography variant="overline">&copy; giphy</Typography>
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
                {this.state.showTrend
                ?   <div className={classes.gifList}>
                        {this.state.trending.map(tile => (
                            <div key={tile.id} className={classes.gifItem} onClick={() => uploadGif(tile)}>
                                <img style={{ width: '100%' }} src={tile.images.downsized.url} alt="" />
                            </div>
                        ))}
                    </div>
                :   <div className={classes.gifList}>
                        {this.state.results.map(tile => (
                            <div key={tile.id}  className={classes.gifItem} onClick={() => uploadGif(tile)}>
                                <img style={{ width: '100%' }} src={tile.images.downsized.url} alt="" />
                            </div>
                        ))}
                    </div>
                }
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
