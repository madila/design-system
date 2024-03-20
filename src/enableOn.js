export const enableOn = [
	'core/group',
];

export const setAnimationAttribute = ( settings, name ) => {
	// Do nothing if it's another block than our defined ones.
	if ( ! enableOn.includes( name ) ) {
		return settings;
	}

	return Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			animation: { type: 'string' },
		} ),
	} );
};
