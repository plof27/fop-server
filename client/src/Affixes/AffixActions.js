import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/selectors';

import {
  Divider,
	Fab,
	Tooltip,
} from '@material-ui/core';
import {
	Edit as EditIcon,
	FileCopy as CopyIcon,
} from '@material-ui/icons';

import {
	Spacer,
	DeleteWithConfirmation
} from '../Common';
import {
  titleCase
} from '../utils';

function AffixActions(props) {

	if (props.user.isAdmin) {
	  return (
			<>
				<Divider />
				<Spacer height={20} />
				<div style={{display: 'flex'}}>
					<Link to={`/affixes/edit/${props.affix._id}`} style={{marginLeft: 'auto', textDecoration: 'none'}}>
						<Tooltip title={`Edit ${titleCase(props.affix.name)}`}>
							<Fab color='primary' size='medium' aria-label='edit' variant='extended'>
								<EditIcon style={{marginRight: '10px'}} />
								Edit
							</Fab>
						</Tooltip>
					</Link>
					<Spacer width={15} />
					<Link to={`/affixes/copy/${props.affix._id}`} style={{textDecoration: 'none'}}>
						<Tooltip title={`Create a new affix, using ${titleCase(props.affix.name)} as a base`}>
							<Fab color='secondary' size='medium' aria-label='edit' variant='extended'>
								<CopyIcon style={{marginRight: '10px'}} />
								Copy
							</Fab>
						</Tooltip>
					</Link>
					<Spacer width={15} />
					<DeleteWithConfirmation 
						variantName={titleCase(props.affix.name)}
						apiURL={`/api/affix/${props.affix._id}`}
						callback={props.deleteCallback}
						variant='extended'
						buttonText='Delete'
					/>
				</div>
			</>
	  );
	} else {
		return (
			<>
			</>
		)
	}
}

const mapStateToProps = state => ({
	user: getUser(state)
});

export default connect(
	mapStateToProps
)(AffixActions);
