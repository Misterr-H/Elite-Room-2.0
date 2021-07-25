import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';


function NameDialogue(props) {
    const [open, setOpen] = useState(props.state);
    const [name, setName] = useState('');
    const [alert, setAlert] = useState('');

    const handleclose = () => {
        if(name=='') {
            setAlert('Please enter your name');
        }
        else {
            props.nameFunction(name);
            setOpen(false);
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={handleclose} aria-labelledby="nameDialog">
                <DialogTitle id="nameDialog">Join</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter your name to join this chat</DialogContentText>
                    <DialogContentText><h1 className="text-red-500 text-sm">{alert}</h1></DialogContentText>
                    <TextField onChange={event => setName(event.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Your Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleclose} color="primary">
                        JOIN
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

NameDialogue.propTypes = {

}

export default NameDialogue

