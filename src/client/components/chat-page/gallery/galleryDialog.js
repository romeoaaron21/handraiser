import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, withWidth
} from '@material-ui/core';
import Transition from './transition'
import Carousel from './carousel'

export default class Gallery extends React.Component {
    render(){
        const {
            open,
            handleClose,
            conversation,
            selected,
        } = this.props;
        return (
            <Dialog
                fullWidth
                fullScreen
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <DialogContent style={{ background: 'black' }}>
                    <Carousel 
                    images={conversation} 
                    selected={selected}
                    />
                </DialogContent>
                <DialogActions style={{ background: 'black' }}>
                <Button onClick={handleClose} style={{ color: '#b3aeaa' }}>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}