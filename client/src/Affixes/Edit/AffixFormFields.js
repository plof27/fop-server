import React, { Component } from 'react';

import {
  Typography,
	Divider,
	TextField,
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@material-ui/core';
import {
	Spacer,
	SearchSelect,
} from '../../Common';

const spacerHeight = 25;

export default function AffixFormFields(props) { // just form fields, no state or control. validations are done at a higher level so that form submit buttons can disable themselves when there are errors
	const [tagOptions, setTagOptions] = React.useState([]);
	const [sourceOptions, setSourceOptions] = React.useState([]);
	
	React.useEffect(() => {
		fetch('/api/affix/tags')
			.then(res => res.json())
			.then(tags => setTagOptions(tags))
			.catch(err => console.log(err.response));
			
		fetch('/api/affix/sources')
			.then(res => res.json())
			.then(sources => setSourceOptions(sources))
			.catch(err => console.log(err.response));
	}, []);
	
	return (
		<Grid container direction='row' spacing={5}>
			<Grid item sm={4}>
				<TextField
					id='name'
					label='Name'
					required
					fullWidth
					value={props.affix.name || '' /* hand it a default value here so it firstly loads as controlled. this avoids bugs */}
					onChange={(ev) => props.updateAffix({name: ev.target.value})}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='descShort'
					label='Short Description'
					required
					multiline
					fullWidth
					value={props.affix.descShort || ''}
					onChange={(ev) => props.updateAffix({descShort: ev.target.value})}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='descLong'
					label='Full Description'
					required
					multiline
					fullWidth
					value={props.affix.descLong || ''}
					onChange={(ev) => props.updateAffix({descLong: ev.target.value})}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='stacking'
					label='Stacking'
					helperText='Provide additional clarification on how multiple stacks of this affix interact, if needed'
					multiline
					fullWidth
					value={props.affix.stacking || ''}
					onChange={(ev) => props.updateAffix({stacking: ev.target.value})}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='flavor'
					label='Flavor Text'
					helperText='Fun fluff text about the affix in-universe'
					multiline
					fullWidth
					value={props.affix.flavorText || ''}
					onChange={(ev) => props.updateAffix({flavorText: ev.target.value})}
				/>
			</Grid>
			<Grid item sm={3}>
				<FormControl style={{flexGrow: 1}} fullWidth>
					<InputLabel id='affix-editor-rarity-label'>Rarity</InputLabel>
					<Select
						id='rarity'
						required
						value={props.affix.affixType || 'common'}
						onChange={(ev) => props.updateAffix({affixType: ev.target.value})}
					>
						<MenuItem value='common'>Common</MenuItem>
						<MenuItem value='advanced'>Advanced</MenuItem>
						<MenuItem value='exotic'>Exotic</MenuItem>
						<MenuItem value='prismatic'>Prismatic</MenuItem>
					</Select>
				</FormControl>
				<Spacer height={spacerHeight} />
				<FormControl style={{flexGrow: 1}} fullWidth>
					<InputLabel id='affix-editor-rarity-label'>Slot</InputLabel>
					<Select
						id='slot'
						required
						value={props.affix.slot || 'arms'}
						onChange={(ev) => props.updateAffix({slot: ev.target.value})}
					>
						<MenuItem value='arms'>Arms</MenuItem>
						<MenuItem value='armor'>Armor</MenuItem>
						<MenuItem value='trinket'>Trinket</MenuItem>
						<MenuItem value='consumable'>Consumable</MenuItem>
					</Select>
				</FormControl>
				<Spacer height={spacerHeight} />
				<TextField
					id='cost'
					label='Cost'
					required
					fullWidth
					value={props.affix.cost || ''}
					onChange={(ev) => props.updateAffix({cost: ev.target.value})}
					error={props.costError ? true : false /* this is here to avoid weird proptypes errors from autocasting */}
					helperText={props.costError}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='maxReplicates'
					label='Max Replicates'
					required
					fullWidth
					value={props.affix.maxReplicates || ''}
					onChange={(ev) => props.updateAffix({maxReplicates: ev.target.value})}
					error={props.maxReplicatesError ? true : false}
					helperText={props.maxReplicatesError || 'Enter 0 for infinite max replicates'}
				/>
			</Grid>
			<Grid item sm={3}>
				<TextField
					id='prerequisites'
					label='Prerequisites'
					fullWidth
					multiline
					value={props.affix.prerequisites || ''}
					onChange={(ev) => props.updateAffix({prerequisites: ev.target.value})}
				/>
				<Spacer height={spacerHeight} />
				<SearchSelect 
					label="Source"
					options={sourceOptions}
					defaultValue={props.affix.source}
					onChange={(ev, newValue) => props.updateAffix({source: newValue})}
				/>
				<Spacer height={spacerHeight} />
				<SearchSelect 
					label="Tags"
					options={tagOptions}
					multiple
					placeholder="Add more tags..."
					defaultValue={props.affix.tags}
					onChange={(ev, newValue) => props.updateAffix({tags: newValue})}
				/>
			</Grid>
		</Grid>
	);
}
