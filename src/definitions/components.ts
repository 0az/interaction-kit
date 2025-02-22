/**
 * These type definitions come from the official Discord API docs. They should
 * be defined with references back to the documentation section.
 */

import type { Emoji } from "./emoji";

// https://discord.com/developers/docs/interactions/message-components#component-object
// TODO: Add in type constraints
export type Component = {
	type: ComponentType; // all
	style?: ButtonStyle; // button
	label?: string; // button
	emoji?: Pick<Emoji, "id" | "name" | "animated">; // button
	custom_id?: string; // button
	url?: string; // button
	disabled?: boolean; // button
	components?: Component[]; // action rows
};

// https://discord.com/developers/docs/interactions/message-components#component-types
export enum ComponentType {
	ACTION_ROW = 1,
	BUTTON = 2,
	SELECT = 3,
}

// https://discord.com/developers/docs/interactions/message-components#buttons-button-styles
export enum ButtonStyle {
	PRIMARY = 1,
	SECONDARY = 2,
	SUCCESS = 3,
	DANGER = 4,
	LINK = 5,
}
