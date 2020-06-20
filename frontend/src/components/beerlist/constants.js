import { createFilterOptions } from "@material-ui/lab/Autocomplete";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MENU_PROPS = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export const filterOptions = createFilterOptions({
	matchFrom: "any",
	stringify: option => option.name,
});