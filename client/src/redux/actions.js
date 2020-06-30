import {
	SET_USER,
	CLEAR_USER,
	SET_AFFIX_FILTERS,
	CLEAR_AFFIX_FILTERS,
} from './actionTypes';

export const setUser = user => ({
	type: SET_USER,
	payload: { user }
});

export const clearUser = () => ({
	type: CLEAR_USER,
	payload: { user: {} }
});

export const setAffixFilters = (affixFilters) => ({
	type: SET_AFFIX_FILTERS,
	payload: { affixFilters }
});

export const clearAffixFilters = () => ({
	type: CLEAR_AFFIX_FILTERS,
	payload: { affixFilters: {} }
});
