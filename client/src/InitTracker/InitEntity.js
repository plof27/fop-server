import React, { Component } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Typography,
  Button,
  Tooltip,
  TextField,
  Divider,
  Paper,
  IconButton,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as RemoveIcon,
  RotateLeft as ResetIcon,
} from '@material-ui/icons';
import {
  Spacer
} from '../Common';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }
  },
  paper: {
    paddingRight: 20,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 7,
  },
  darkBackground: {
    backgroundColor: '#dddddd',
  },
  yellowBackground: {
    backgroundColor: '#fff4b5',
  }
});

export default function InitEntity(props) {
  const classes = useStyles();

  return (
    <>
      <Paper className={clsx(
        classes.paper,
        {
          [classes.darkBackground]: props.entity.hasFinishedTurn,
          [classes.yellowBackground]: props.entity.isCurrentTurn,
        }
      )}>
        <Grid container direction='row' alignItems='flex-start' wrap='nowrap' spacing={1}>
          <Grid item md>
            <TextField
              fullWidth
              autoFocus
              placeholder='Combatant Name'
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') props.addEntity();
              }}
              InputProps={{
                classes: {
                  underline: classes.underline,
                },
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Tooltip title='Remove combatant' aria-label='remove-combatant'>
              <IconButton size='small' onClick={() => props.removeEntity()}>
                <RemoveIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
      <Spacer height={10} />
    </>
  );
}
