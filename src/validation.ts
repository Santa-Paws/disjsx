// ! I name this file the "horror" file because it's a horror show :3
// ! I would say "lets split it up like we did with the nodes" but honestly... I'm not sure how to do that.

import { DISJSX } from "./disjsxTypes";
import {
	ButtonStyle,
	type MessageProps,
	type ModalProps,
	type ActionRowProps,
	type ButtonProps,
	type ChannelSelectProps,
	type ContainerProps,
	type EmbedProps,
	type MediaGalleryProps,
	type MentionableSelectProps,
	type RoleSelectProps,
	type SectionProps,
	type StringSelectProps,
	type TextInputProps,
	type UserSelectProps,
	type ReactNodeType,
	type EmbedAuthorProps,
	type EmbedFooterProps,
	type EmbedFieldsProps,
	type EmbedFieldProps,
	type EmbedFieldValueProps,
	type EmbedFieldTitleProps,
} from "./types";
import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";
import { getDISJSXType, getProcessedElement } from "./utils";

/**
 * Represents a validation error or warning found during component validation.
 */
export interface ValidationError {
	/** The severity level of the validation issue */
	type: "error" | "warning";
	/** Human-readable description of the validation issue */
	message: string;
	/** The DISJSX component type where the issue occurred, if applicable */
	component?: string;
	/** Internal component ID for tracking, if applicable */
	componentId?: number;
	/** Path through the component tree where the issue was found */
	path?: string[];
}

/**
 * Result object returned from component validation operations.
 */
export interface ValidationResult {
	/** Whether the component tree passed validation without errors */
	isValid: boolean;
	/** Array of validation errors that must be fixed */
	errors: ValidationError[];
	/** Array of validation warnings that should be addressed */
	warnings: ValidationError[];
}

/**
 * Component placement rules based on Discord documentation.
 */
export const COMPONENT_PLACEMENT_RULES = Object.freeze({
	// Top-level components allowed in V2 messages
	V2_MESSAGE_ALLOWED: new Set([
		DISJSX.ActionRow,
		DISJSX.Section,
		DISJSX.TextDisplay,
		DISJSX.Container,
		DISJSX.MediaGallery,
		DISJSX.File,
		DISJSX.Separator,
	]),

	// Top-level components allowed in Legacy messages
	LEGACY_MESSAGE_ALLOWED: new Set([DISJSX.Content, DISJSX.Embed, DISJSX.ActionRow]),

	// Components allowed in Action Rows
	ACTION_ROW_ALLOWED: new Set([
		DISJSX.Button,
		DISJSX.StringSelect,
		DISJSX.UserSelect,
		DISJSX.RoleSelect,
		DISJSX.MentionableSelect,
		DISJSX.ChannelSelect,
	]),

	// Components allowed in Sections (text components)
	SECTION_TEXT_ALLOWED: new Set([DISJSX.TextDisplay]),

	// Components allowed as Section accessories
	SECTION_ACCESSORY_ALLOWED: new Set([DISJSX.Thumbnail, DISJSX.Button]),

	// Components allowed in Containers
	CONTAINER_ALLOWED: new Set([
		DISJSX.ActionRow,
		DISJSX.TextDisplay,
		DISJSX.Section,
		DISJSX.MediaGallery,
		DISJSX.Separator,
		DISJSX.File,
	]),

	// Components allowed in Embeds
	EMBED_ALLOWED: new Set([
		DISJSX.EmbedAuthor,
		DISJSX.EmbedTitle,
		DISJSX.EmbedDescription,
		DISJSX.EmbedFooter,
		DISJSX.EmbedImage,
		DISJSX.EmbedThumbnail,
		DISJSX.EmbedFields,
	]),

	// Components that can only appear once in an embed (singular components)
	EMBED_SINGULAR_COMPONENTS: new Set([
		DISJSX.EmbedAuthor,
		DISJSX.EmbedTitle,
		DISJSX.EmbedFooter,
		DISJSX.EmbedImage,
		DISJSX.EmbedThumbnail,
		DISJSX.EmbedFields,
	]),
});

/**
 * Validation limits based on Discord documentation
 *
 * I think we generally should have a way to easily modify the limits via like a config or something in case you are stuck on an old version
 * but womp womp
 */
export const VALIDATION_LIMITS = Object.freeze({
	MESSAGE_V2_MAX_COMPONENTS: 40,
	MESSAGE_LEGACY_MAX_ACTION_ROWS: 5,
	ACTION_ROW_MAX_BUTTONS: 5,
	ACTION_ROW_MAX_SELECTS: 1,
	STRING_SELECT_MAX_OPTIONS: 25,
	SELECT_MIN_VALUES_MIN: 0,
	SELECT_MIN_VALUES_MAX: 25,
	SELECT_MAX_VALUES_MIN: 1,
	SELECT_MAX_VALUES_MAX: 25,
	MEDIA_GALLERY_MIN_ITEMS: 1,
	MEDIA_GALLERY_MAX_ITEMS: 10,
	SECTION_MIN_TEXT_COMPONENTS: 1,
	SECTION_MAX_TEXT_COMPONENTS: 3,
	EMBED_MAX_FIELDS: 25,
	BUTTON_LABEL_MAX_LENGTH: 80,
	SELECT_PLACEHOLDER_MAX_LENGTH: 150,
	TEXT_INPUT_MAX_LENGTH: 4000,
	CUSTOM_ID_MAX_LENGTH: 100,
	EMBED_TITLE_MAX_LENGTH: 256,
	EMBED_DESCRIPTION_MAX_LENGTH: 4096,
	EMBED_FIELD_NAME_MAX_LENGTH: 256,
	EMBED_FIELD_VALUE_MAX_LENGTH: 1024,
	EMBED_AUTHOR_NAME_MAX_LENGTH: 256,
	EMBED_FOOTER_TEXT_MAX_LENGTH: 2048,
	EMBED_TOTAL_CHARACTERS_MAX: 6000,
	THUMBNAIL_DESCRIPTION_MAX_LENGTH: 1024,
	MEDIA_DESCRIPTION_MAX_LENGTH: 1024,
	MODAL_TITLE_MAX_LENGTH: 45,
	MESSAGE_CONTENT_MAX_LENGTH: 2000,
	MESSAGE_MAX_EMBEDS: 10,
	ATTACHMENT_DESCRIPTION_MAX_LENGTH: 1024,
});

/**
 * Validates DISJSX component trees against Discord API requirements.
 */
export class ComponentValidator {
	private errors: ValidationError[] = [];
	private warnings: ValidationError[] = [];
	private componentCount = 0;
	private path: string[] = [];

	/**
	 * Validates a DISJSX component tree for messages or modals.
	 * @param element The root React element to validate (Message or Modal)
	 * @param isV2 Whether to validate as a V2 message format
	 * @param context The validation context - "message" or "modal"
	 * @returns ValidationResult containing validation status, errors, and warnings
	 */
	public validate(
		element: ReactElement<MessageProps | ModalProps>,
		isV2: boolean = false,
		context: "message" | "modal" = "message",
	): ValidationResult {
		const processedElement = getProcessedElement(element);
		const disjsxType = getDISJSXType(processedElement);

		if (context === "modal") {
			if (disjsxType !== DISJSX.Modal) {
				this.addError("Root element must be a Modal component for modal context");

				return this.getResult();
			}

			this.validateModal(processedElement as ReactElement<ModalProps>);
		} else {
			if (disjsxType !== DISJSX.Message) {
				this.addError("Root element must be a Message component");
				return this.getResult();
			}

			this.validateMessage(processedElement as ReactElement<MessageProps>, isV2, context);
		}

		return this.getResult();
	}

	/**
	 * Validates a Modal component and its children.
	 * @param element The Modal component to validate
	 */
	private validateModal(element: ReactElement<ModalProps>) {
		this.path.push("Modal");
		const props = element.props;

		if (!props.title) {
			this.addError("Modal must have a title property");
		} else if (props.title.length > VALIDATION_LIMITS.MODAL_TITLE_MAX_LENGTH) {
			this.addError(`Modal title cannot exceed ${VALIDATION_LIMITS.MODAL_TITLE_MAX_LENGTH} characters`);
		}

		if (!props.customId) {
			this.addError("Modal must have a customId property");
		} else if (props.customId.length > VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH) {
			this.addError(`Modal customId cannot exceed ${VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH} characters`);
		}

		const children = Children.toArray(props.children);

		this.validateModalComponents(children);

		this.path.pop();
	}

	/**
	 * Validates a Message component for V2 or legacy format.
	 * @param element The Message component to validate
	 * @param isV2 Whether to validate as V2 format
	 * @param context The validation context
	 */
	private validateMessage(element: ReactElement<MessageProps>, isV2: boolean, context: "message" | "modal") {
		this.path.push("Message");
		const children = Children.toArray(element.props.children);

		const embeds: ReactElement<EmbedProps>[] = [];

		for (const child of children) {
			if (isValidElement(child)) {
				const processedChild = getProcessedElement(child);
				const childType = getDISJSXType(processedChild);

				if (childType === DISJSX.Embed) {
					embeds.push(processedChild as ReactElement<EmbedProps>);
				}
			}
		}

		if (embeds.length > VALIDATION_LIMITS.MESSAGE_MAX_EMBEDS) {
			this.addError(`Message cannot have more than ${VALIDATION_LIMITS.MESSAGE_MAX_EMBEDS} embeds`);
		}

		if (embeds.length > 0) {
			this.validateEmbedTotalCharacterCount(embeds);
		}

		if (context === "modal") {
			this.validateModalComponents(children);
		} else {
			if (isV2) {
				this.validateV2MessageComponents(children);
			} else {
				this.validateLegacyMessageComponents(children);
			}
		}

		this.path.pop();
	}

	/**
	 * Validates components within a modal (only ActionRows with TextInputs).
	 * @param children The modal's child components
	 */
	private validateModalComponents(children: ReactNodeType<ModalProps>[]) {
		for (const child of children) {
			if (!isValidElement(child)) {
				continue;
			}

			const processedChild = getProcessedElement(child);
			const childType = getDISJSXType(processedChild);

			if (childType !== DISJSX.ActionRow) {
				this.addError("Modals can only contain Action Row components", childType);

				continue;
			}

			this.validateActionRowForModal(processedChild as ReactElement<ActionRowProps>);
		}
	}

	/**
	 * Validates ActionRow components specifically for modal context.
	 * @param element The ActionRow component to validate
	 */
	private validateActionRowForModal(element: ReactElement<ActionRowProps>) {
		this.path.push("ActionRow");
		const children = Children.toArray(element.props.children);

		if (children.length !== 1) {
			this.addError("Action Rows in modals must contain exactly one Text Input component");
		}

		for (const child of children) {
			if (!isValidElement(child)) {
				continue;
			}

			const processedChild = getProcessedElement(child) as ReactElement<TextInputProps>;
			const childType = getDISJSXType(processedChild);

			if (childType !== DISJSX.TextInput) {
				this.addError("Action Rows in modals can only contain Text Input components", childType);
			} else {
				this.validateTextInput(processedChild);
			}
		}

		this.path.pop();
	}

	/**
	 * Validates components for V2 message format.
	 * @param children The message's child components
	 */
	private validateV2MessageComponents(children: ReactNodeType<MessageProps>[]) {
		let contentLength = 0;

		for (const child of children) {
			if (!isValidElement(child)) {
				continue;
			}

			const processedChild = getProcessedElement(child) as ReactElement<MessageProps>;
			const childType = getDISJSXType(processedChild);

			if (childType === DISJSX.TextDisplay) {
				const content = typeof processedChild.props.children === "string" ? processedChild.props.children : "";

				contentLength += content.length;
			}

			if (!childType || !COMPONENT_PLACEMENT_RULES.V2_MESSAGE_ALLOWED.has(childType)) {
				this.addError(`Component type ${childType} is not allowed in V2 messages`, childType);
				continue;
			}

			this.componentCount++;

			if (this.componentCount > VALIDATION_LIMITS.MESSAGE_V2_MAX_COMPONENTS) {
				this.addError(`V2 messages can have at most ${VALIDATION_LIMITS.MESSAGE_V2_MAX_COMPONENTS} components`);
				break;
			}

			this.validateComponent(processedChild, childType);
		}

		if (contentLength > VALIDATION_LIMITS.MESSAGE_CONTENT_MAX_LENGTH) {
			this.addError(`Message content cannot exceed ${VALIDATION_LIMITS.MESSAGE_CONTENT_MAX_LENGTH} characters`);
		}
	}

	/**
	 * Validates components for legacy message format.
	 * @param children The message's child components
	 */
	private validateLegacyMessageComponents(children: ReactNodeType<MessageProps>[]) {
		let actionRowCount = 0;
		let contentLength = 0;

		for (const child of children) {
			if (!isValidElement(child)) {
				continue;
			}

			const processedChild = getProcessedElement(child) as ReactElement<MessageProps>;
			const childType = getDISJSXType(processedChild);

			if (childType === DISJSX.Content) {
				const content = typeof processedChild.props.children === "string" ? processedChild.props.children : "";

				contentLength += content.length;
			}

			if (!childType || !COMPONENT_PLACEMENT_RULES.LEGACY_MESSAGE_ALLOWED.has(childType)) {
				this.addError(`Component type ${childType} is not allowed in Legacy messages`, childType);
				continue;
			}

			if (childType === DISJSX.ActionRow) {
				actionRowCount++;
				if (actionRowCount > VALIDATION_LIMITS.MESSAGE_LEGACY_MAX_ACTION_ROWS) {
					this.addError(
						`Legacy messages can have at most ${VALIDATION_LIMITS.MESSAGE_LEGACY_MAX_ACTION_ROWS} Action Rows`,
					);
					break;
				}
			}

			this.validateComponent(processedChild, childType);
		}

		if (contentLength > VALIDATION_LIMITS.MESSAGE_CONTENT_MAX_LENGTH) {
			this.addError(`Message content cannot exceed ${VALIDATION_LIMITS.MESSAGE_CONTENT_MAX_LENGTH} characters`);
		}
	}

	/**
	 * Dispatches validation to the appropriate method based on component type.
	 * @param element The component to validate
	 * @param disjsxType The DISJSX component type
	 */
	private validateComponent(element: ReactElement, disjsxType: DISJSX) {
		switch (disjsxType) {
			case DISJSX.ActionRow: {
				this.validateActionRow(element as ReactElement<ActionRowProps>);
				break;
			}

			case DISJSX.Button: {
				this.validateButton(element as ReactElement<ButtonProps>);
				break;
			}

			case DISJSX.StringSelect: {
				this.validateStringSelect(element as ReactElement<StringSelectProps>);
				break;
			}

			case DISJSX.UserSelect:
			case DISJSX.RoleSelect:
			case DISJSX.MentionableSelect:
			case DISJSX.ChannelSelect: {
				this.validateAutoPopulatedSelect(
					element as ReactElement<UserSelectProps | RoleSelectProps | MentionableSelectProps | ChannelSelectProps>,
					disjsxType,
				);
				break;
			}

			case DISJSX.Section: {
				this.validateSection(element as ReactElement<SectionProps>);
				break;
			}

			case DISJSX.Container: {
				this.validateContainer(element as ReactElement<ContainerProps>);
				break;
			}

			case DISJSX.MediaGallery: {
				this.validateMediaGallery(element as ReactElement<MediaGalleryProps>);
				break;
			}

			case DISJSX.Embed: {
				this.validateEmbed(element as ReactElement<EmbedProps>);
				break;
			}

			case DISJSX.TextInput: {
				this.validateTextInput(element as ReactElement<TextInputProps>);
				break;
			}
		}
	}

	/**
	 * Validates ActionRow components and their children.
	 * @param element The ActionRow component to validate
	 */
	private validateActionRow(element: ReactElement<ActionRowProps>) {
		this.path.push("ActionRow");
		const children = Children.toArray(element.props.children);

		if (children.length === 0) {
			this.addError("Action Row cannot be empty");
			this.path.pop();
			return;
		}

		const childTypes: DISJSX[] = [];
		let buttonCount = 0;
		let selectCount = 0;

		for (const child of children) {
			if (!isValidElement(child)) {
				continue;
			}

			const processedChild = getProcessedElement(child);
			const childType = getDISJSXType(processedChild);

			if (!childType || !COMPONENT_PLACEMENT_RULES.ACTION_ROW_ALLOWED.has(childType)) {
				this.addError(`Component type ${childType} is not allowed in Action Rows`, childType);
				continue;
			}

			childTypes.push(childType);

			if (childType === DISJSX.Button) {
				buttonCount++;
			} else if (
				[
					DISJSX.StringSelect,
					DISJSX.UserSelect,
					DISJSX.RoleSelect,
					DISJSX.MentionableSelect,
					DISJSX.ChannelSelect,
				].includes(childType)
			) {
				selectCount++;
			}

			this.validateComponent(processedChild, childType);
		}

		if (buttonCount > VALIDATION_LIMITS.ACTION_ROW_MAX_BUTTONS) {
			this.addError(`Action Row can contain at most ${VALIDATION_LIMITS.ACTION_ROW_MAX_BUTTONS} buttons`);
		}

		if (selectCount > VALIDATION_LIMITS.ACTION_ROW_MAX_SELECTS) {
			this.addError(`Action Row can contain at most ${VALIDATION_LIMITS.ACTION_ROW_MAX_SELECTS} select menu`);
		}

		if (buttonCount > 0 && selectCount > 0) {
			this.addError("Action Row cannot contain both buttons and select menus");
		}

		this.path.pop();
	}

	/**
	 * Validates Button components based on their style and properties.
	 * @param element The Button component to validate
	 */
	private validateButton(element: ReactElement<ButtonProps>) {
		this.path.push("Button");
		const props = element.props;

		switch (props.style) {
			case ButtonStyle.Link: {
				if (!props.url) {
					this.addError("Link buttons must have a url property");
				}
				if (props.customId) {
					this.addWarning("Link buttons should not have customId (it will be ignored)");
				}
				break;
			}

			case ButtonStyle.Premium: {
				if (!props.skuId) {
					this.addError("Premium buttons must have a skuId property");
				}

				if (props.customId || props.label || props.url || props.emoji) {
					this.addWarning("Premium buttons should not have customId, label, url, or emoji properties");
				}

				break;
			}

			case ButtonStyle.Primary:
			case ButtonStyle.Secondary:
			case ButtonStyle.Success:
			case ButtonStyle.Danger: {
				if (!props.customId) {
					this.addError("Interactive buttons must have a customId property");
				}

				if (props.url) {
					this.addWarning("Interactive buttons should not have url property");
				}

				if (props.skuId) {
					this.addWarning("Interactive buttons should not have skuId property");
				}

				break;
			}
		}

		const label = props.label || (typeof props.children === "string" ? props.children : "");

		if (label && label.length > VALIDATION_LIMITS.BUTTON_LABEL_MAX_LENGTH) {
			this.addError(`Button label cannot exceed ${VALIDATION_LIMITS.BUTTON_LABEL_MAX_LENGTH} characters`);
		}

		if (props.customId && props.customId.length > VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH) {
			this.addError(`Button customId cannot exceed ${VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH} characters`);
		}

		this.path.pop();
	}

	/**
	 * Validates StringSelect components and their options.
	 * @param element The StringSelect component to validate
	 */
	private validateStringSelect(element: ReactElement<StringSelectProps>) {
		this.path.push("StringSelect");
		const props = element.props;
		const children = Children.toArray(props.children);

		if (!props.customId) {
			this.addError("String Select must have a customId property");
		} else if (props.customId.length > VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH) {
			this.addError(`String Select customId cannot exceed ${VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH} characters`);
		}

		if (children.length === 0) {
			this.addError("String Select must have at least one option");
		} else if (children.length > VALIDATION_LIMITS.STRING_SELECT_MAX_OPTIONS) {
			this.addError(`String Select cannot have more than ${VALIDATION_LIMITS.STRING_SELECT_MAX_OPTIONS} options`);
		}

		this.validateSelectValues(props.minValues, props.maxValues, children.length);

		if (props.placeholder && props.placeholder.length > VALIDATION_LIMITS.SELECT_PLACEHOLDER_MAX_LENGTH) {
			this.addError(
				`String Select placeholder cannot exceed ${VALIDATION_LIMITS.SELECT_PLACEHOLDER_MAX_LENGTH} characters`,
			);
		}

		this.path.pop();
	}

	/**
	 * Validates auto-populated select components (User, Role, Mentionable, Channel).
	 * @param element The select component to validate
	 * @param selectType The type of select component
	 */
	private validateAutoPopulatedSelect(
		element: ReactElement<UserSelectProps | RoleSelectProps | MentionableSelectProps | ChannelSelectProps>,
		selectType: DISJSX,
	) {
		this.path.push(selectType);
		const props = element.props;

		if (!props.customId) {
			this.addError(`${selectType} must have a customId property`);
		} else if (props.customId.length > VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH) {
			this.addError(`${selectType} customId cannot exceed ${VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH} characters`);
		}

		this.validateSelectValues(props.minValues, props.maxValues);

		if (props.placeholder && props.placeholder.length > VALIDATION_LIMITS.SELECT_PLACEHOLDER_MAX_LENGTH) {
			this.addError(
				`${selectType} placeholder cannot exceed ${VALIDATION_LIMITS.SELECT_PLACEHOLDER_MAX_LENGTH} characters`,
			);
		}

		this.path.pop();
	}

	/**
	 * Validates minValues and maxValues for select components.
	 * @param minValues The minimum number of selections
	 * @param maxValues The maximum number of selections
	 * @param optionCount The total number of available options
	 */
	private validateSelectValues(minValues?: number, maxValues?: number, optionCount?: number) {
		if (minValues !== undefined) {
			if (minValues < VALIDATION_LIMITS.SELECT_MIN_VALUES_MIN || minValues > VALIDATION_LIMITS.SELECT_MIN_VALUES_MAX) {
				this.addError(
					`minValues must be between ${VALIDATION_LIMITS.SELECT_MIN_VALUES_MIN} and ${VALIDATION_LIMITS.SELECT_MIN_VALUES_MAX}`,
				);
			}
		}

		if (maxValues !== undefined) {
			if (maxValues < VALIDATION_LIMITS.SELECT_MAX_VALUES_MIN || maxValues > VALIDATION_LIMITS.SELECT_MAX_VALUES_MAX) {
				this.addError(
					`maxValues must be between ${VALIDATION_LIMITS.SELECT_MAX_VALUES_MIN} and ${VALIDATION_LIMITS.SELECT_MAX_VALUES_MAX}`,
				);
			}
		}

		if (minValues !== undefined && maxValues !== undefined) {
			if (minValues > maxValues) {
				this.addError("minValues cannot be greater than maxValues");
			}
		}

		if (optionCount !== undefined && maxValues !== undefined && maxValues > optionCount) {
			this.addError("maxValues cannot be greater than the number of available options");
		}
	}

	/**
	 * Validates Section components and their text/accessory children.
	 * @param element The Section component to validate
	 */
	private validateSection(element: ReactElement<SectionProps>) {
		this.path.push("Section");
		const children = Children.toArray(element.props.children);

		const textComponents: ReactElement[] = [];
		let accessoryComponent: ReactElement | null = null;

		for (const child of children) {
			if (!isValidElement(child)) {
				continue;
			}

			const processedChild = getProcessedElement(child);
			const childType = getDISJSXType(processedChild);

			if (childType && COMPONENT_PLACEMENT_RULES.SECTION_TEXT_ALLOWED.has(childType)) {
				textComponents.push(processedChild);
			} else if (childType && COMPONENT_PLACEMENT_RULES.SECTION_ACCESSORY_ALLOWED.has(childType)) {
				if (accessoryComponent) {
					this.addError("Section can have only one accessory component");
				} else {
					accessoryComponent = processedChild;
				}
			} else {
				this.addError(`Component type ${childType} is not allowed in Sections`, childType);
			}
		}

		if (textComponents.length < VALIDATION_LIMITS.SECTION_MIN_TEXT_COMPONENTS) {
			this.addError(`Section must have at least ${VALIDATION_LIMITS.SECTION_MIN_TEXT_COMPONENTS} text component`);
		} else if (textComponents.length > VALIDATION_LIMITS.SECTION_MAX_TEXT_COMPONENTS) {
			this.addError(`Section cannot have more than ${VALIDATION_LIMITS.SECTION_MAX_TEXT_COMPONENTS} text components`);
		}

		for (const textComponent of textComponents) {
			this.validateComponent(textComponent, DISJSX.TextDisplay);
		}

		if (accessoryComponent) {
			const accessoryType = getDISJSXType(accessoryComponent);

			if (accessoryType) {
				this.validateComponent(accessoryComponent, accessoryType);
			}
		}

		this.path.pop();
	}

	/**
	 * Validates Container components and their children.
	 * @param element The Container component to validate
	 */
	private validateContainer(element: ReactElement<ContainerProps>) {
		this.path.push("Container");
		const children = Children.toArray(element.props.children);

		for (const child of children) {
			if (!isValidElement(child)) {
				continue;
			}

			const processedChild = getProcessedElement(child);
			const childType = getDISJSXType(processedChild);

			if (!childType || !COMPONENT_PLACEMENT_RULES.CONTAINER_ALLOWED.has(childType)) {
				this.addError(`Component type ${childType} is not allowed in Containers`, childType);
				continue;
			}

			this.validateComponent(processedChild, childType);
		}

		this.path.pop();
	}

	/**
	 * Validates MediaGallery components and item count limits.
	 * @param element The MediaGallery component to validate
	 */
	private validateMediaGallery(element: ReactElement<MediaGalleryProps>) {
		this.path.push("MediaGallery");
		const children = Children.toArray(element.props.children);

		if (children.length < VALIDATION_LIMITS.MEDIA_GALLERY_MIN_ITEMS) {
			this.addError(`Media Gallery must have at least ${VALIDATION_LIMITS.MEDIA_GALLERY_MIN_ITEMS} item`);
		} else if (children.length > VALIDATION_LIMITS.MEDIA_GALLERY_MAX_ITEMS) {
			this.addError(`Media Gallery cannot have more than ${VALIDATION_LIMITS.MEDIA_GALLERY_MAX_ITEMS} items`);
		}

		this.path.pop();
	}

	/**
	 * Validates Embed components and their properties.
	 * @param element The Embed component to validate
	 */
	private validateEmbed(element: ReactElement<EmbedProps>) {
		this.path.push("Embed");
		const props = element.props;

		if (props.title && props.title.length > VALIDATION_LIMITS.EMBED_TITLE_MAX_LENGTH) {
			this.addError(`Embed title cannot exceed ${VALIDATION_LIMITS.EMBED_TITLE_MAX_LENGTH} characters`);
		}

		if (props.description && props.description.length > VALIDATION_LIMITS.EMBED_DESCRIPTION_MAX_LENGTH) {
			this.addError(`Embed description cannot exceed ${VALIDATION_LIMITS.EMBED_DESCRIPTION_MAX_LENGTH} characters`);
		}

		this.validateEmbedChildren(element);

		this.path.pop();
	}

	/**
	 * Validates Embed children and enforces singular component rules.
	 * @param element The Embed component whose children to validate
	 */
	private validateEmbedChildren(element: ReactElement<EmbedProps>) {
		const children = Children.toArray(element.props.children);
		let fieldCount = 0;

		const singularComponentCounts = new Map<DISJSX, number>();

		for (const child of children) {
			if (!isValidElement(child)) {
				continue;
			}

			const processedChild = getProcessedElement(child) as ReactElement<
				EmbedAuthorProps | EmbedFooterProps | EmbedFieldsProps
			>;
			const childType = getDISJSXType(processedChild);

			if (!childType || !COMPONENT_PLACEMENT_RULES.EMBED_ALLOWED.has(childType)) {
				this.addError(`Component type ${childType} is not allowed in Embeds`, childType);
				continue;
			}

			if (COMPONENT_PLACEMENT_RULES.EMBED_SINGULAR_COMPONENTS.has(childType)) {
				const currentCount = singularComponentCounts.get(childType) || 0;

				singularComponentCounts.set(childType, currentCount + 1);

				if (currentCount >= 1) {
					this.addError(`Embed can only contain one ${childType} component`, childType);
				}
			}

			switch (childType) {
				case DISJSX.EmbedAuthor: {
					const authorProps = processedChild.props as EmbedAuthorProps;

					if (authorProps.name && authorProps.name.length > VALIDATION_LIMITS.EMBED_AUTHOR_NAME_MAX_LENGTH) {
						this.addError(
							`Embed author name cannot exceed ${VALIDATION_LIMITS.EMBED_AUTHOR_NAME_MAX_LENGTH} characters`,
						);
					}
					break;
				}
				case DISJSX.EmbedFooter: {
					const footerProps = processedChild.props as EmbedFooterProps;
					const footerText = footerProps.text || (typeof footerProps.children === "string" ? footerProps.children : "");

					if (footerText && footerText.length > VALIDATION_LIMITS.EMBED_FOOTER_TEXT_MAX_LENGTH) {
						this.addError(
							`Embed footer text cannot exceed ${VALIDATION_LIMITS.EMBED_FOOTER_TEXT_MAX_LENGTH} characters`,
						);
					}
					break;
				}
				case DISJSX.EmbedFields: {
					const fieldsChildren = Children.toArray((processedChild.props as EmbedFieldsProps).children);

					for (const fieldChild of fieldsChildren) {
						if (isValidElement(fieldChild)) {
							const processedFieldChild = getProcessedElement(fieldChild) as ReactElement<EmbedFieldProps>;

							if (getDISJSXType(processedFieldChild) === DISJSX.EmbedField) {
								fieldCount++;
								this.validateEmbedField(processedFieldChild);
							}
						}
					}
					break;
				}
			}
		}

		if (fieldCount > VALIDATION_LIMITS.EMBED_MAX_FIELDS) {
			this.addError(`Embed cannot have more than ${VALIDATION_LIMITS.EMBED_MAX_FIELDS} fields`);
		}
	}

	/**
	 * Validates individual embed field name and value lengths.
	 * @param element The EmbedField component to validate
	 */
	private validateEmbedField(element: ReactElement<EmbedFieldProps>) {
		const fieldProps = element.props;

		let fieldName = fieldProps.title || "";
		let fieldValue = fieldProps.value || "";

		const children = Children.toArray(fieldProps.children);

		for (const child of children) {
			if (isValidElement(child)) {
				const processedChild = getProcessedElement(child) as ReactElement<EmbedFieldTitleProps | EmbedFieldValueProps>;
				const childType = getDISJSXType(processedChild);

				if (childType === DISJSX.EmbedFieldTitle && !fieldName) {
					fieldName = typeof processedChild.props.children === "string" ? processedChild.props.children : "";
				} else if (childType === DISJSX.EmbedFieldValue && !fieldValue) {
					fieldValue = typeof processedChild.props.children === "string" ? processedChild.props.children : "";
				}
			}
		}

		if (fieldName && fieldName.length > VALIDATION_LIMITS.EMBED_FIELD_NAME_MAX_LENGTH) {
			this.addError(`Embed field name cannot exceed ${VALIDATION_LIMITS.EMBED_FIELD_NAME_MAX_LENGTH} characters`);
		}

		if (fieldValue && fieldValue.length > VALIDATION_LIMITS.EMBED_FIELD_VALUE_MAX_LENGTH) {
			this.addError(`Embed field value cannot exceed ${VALIDATION_LIMITS.EMBED_FIELD_VALUE_MAX_LENGTH} characters`);
		}
	}

	/**
	 * Validates TextInput components for modals.
	 * @param element The TextInput component to validate
	 */
	private validateTextInput(element: ReactElement<TextInputProps>) {
		this.path.push("TextInput");
		const props = element.props;

		if (!props.customId) {
			this.addError("Text Input must have a customId property");
		} else if (props.customId.length > VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH) {
			this.addError(`Text Input customId cannot exceed ${VALIDATION_LIMITS.CUSTOM_ID_MAX_LENGTH} characters`);
		}

		if (!props.label) {
			this.addError("Text Input must have a label property");
		}

		if (props.minLength !== undefined && props.maxLength !== undefined) {
			if (props.minLength > props.maxLength) {
				this.addError("Text Input minLength cannot be greater than maxLength");
			}
		}

		if (props.maxLength !== undefined && props.maxLength > VALIDATION_LIMITS.TEXT_INPUT_MAX_LENGTH) {
			this.addError(`Text Input maxLength cannot exceed ${VALIDATION_LIMITS.TEXT_INPUT_MAX_LENGTH} characters`);
		}

		if (props.value && props.value.length > VALIDATION_LIMITS.TEXT_INPUT_MAX_LENGTH) {
			this.addError(`Text Input value cannot exceed ${VALIDATION_LIMITS.TEXT_INPUT_MAX_LENGTH} characters`);
		}

		this.path.pop();
	}

	/**
	 * Validates total character count across all embeds in a message.
	 * @param embeds Array of embed components to validate
	 */
	private validateEmbedTotalCharacterCount(embeds: ReactElement<EmbedProps>[]) {
		let totalCharacters = 0;

		for (const embed of embeds) {
			const props = embed.props;

			if (props.title) {
				totalCharacters += props.title.length;
			}

			if (props.description) {
				totalCharacters += props.description.length;
			}

			const children = Children.toArray(props.children);

			for (const child of children) {
				if (!isValidElement(child)) {
					continue;
				}

				const processedChild = getProcessedElement(child);
				const childType = getDISJSXType(processedChild);

				switch (childType) {
					case DISJSX.EmbedAuthor: {
						const authorProps = processedChild.props as EmbedAuthorProps;

						if (authorProps.name) {
							totalCharacters += authorProps.name.length;
						}
						break;
					}
					case DISJSX.EmbedFooter: {
						const footerProps = processedChild.props as EmbedFooterProps;
						const footerText =
							footerProps.text || (typeof footerProps.children === "string" ? footerProps.children : "");

						if (footerText) {
							totalCharacters += footerText.length;
						}
						break;
					}
					case DISJSX.EmbedFields: {
						const fieldsChildren = Children.toArray((processedChild.props as EmbedFieldsProps).children);

						for (const fieldChild of fieldsChildren) {
							if (isValidElement(fieldChild)) {
								const processedFieldChild = getProcessedElement(fieldChild) as ReactElement<EmbedFieldProps>;

								if (getDISJSXType(processedFieldChild) === DISJSX.EmbedField) {
									const fieldProps = processedFieldChild.props;

									let fieldName = fieldProps.title || "";
									let fieldValue = fieldProps.value || "";

									const fieldChildren = Children.toArray(fieldProps.children);

									for (const subChild of fieldChildren) {
										if (isValidElement(subChild)) {
											const processedSubChild = getProcessedElement(subChild) as ReactElement<
												EmbedFieldTitleProps | EmbedFieldValueProps
											>;
											const subChildType = getDISJSXType(processedSubChild);

											if (subChildType === DISJSX.EmbedFieldTitle && !fieldName) {
												fieldName =
													typeof processedSubChild.props.children === "string" ? processedSubChild.props.children : "";
											} else if (subChildType === DISJSX.EmbedFieldValue && !fieldValue) {
												fieldValue =
													typeof processedSubChild.props.children === "string" ? processedSubChild.props.children : "";
											}
										}
									}

									if (fieldName) {
										totalCharacters += fieldName.length;
									}
									if (fieldValue) {
										totalCharacters += fieldValue.length;
									}
								}
							}
						}
						break;
					}
				}
			}
		}

		if (totalCharacters > VALIDATION_LIMITS.EMBED_TOTAL_CHARACTERS_MAX) {
			this.addError(
				`Total character count across all embeds cannot exceed ${VALIDATION_LIMITS.EMBED_TOTAL_CHARACTERS_MAX} characters`,
			);
		}
	}

	/**
	 * Adds a validation error to the results.
	 * @param message The error message
	 * @param component The component type where the error occurred
	 */
	private addError(message: string, component?: string) {
		this.errors.push({
			type: "error",
			message,
			component,
			path: [...this.path],
		});
	}

	/**
	 * Adds a validation warning to the results.
	 * @param message The warning message
	 * @param component The component type where the warning occurred
	 */
	private addWarning(message: string, component?: string) {
		this.warnings.push({
			type: "warning",
			message,
			component,
			path: [...this.path],
		});
	}

	/**
	 * Returns the final validation result.
	 * @returns The complete validation result with errors and warnings
	 */
	private getResult(): ValidationResult {
		return {
			isValid: this.errors.length === 0,
			errors: this.errors,
			warnings: this.warnings,
		};
	}
}

/**
 * Validates a DISJSX component tree before rendering.
 * @param element The root React element to validate (Message or Modal component)
 * @param isV2 Whether to validate as a V2 message format
 * @param context The validation context - "message" or "modal"
 * @returns ValidationResult containing validation status, errors, and warnings
 */
export const validateComponent = (
	element: ReactElement<MessageProps | ModalProps>,
	isV2: boolean = false,
	context: "message" | "modal" = "message",
): ValidationResult => {
	const validator = new ComponentValidator();

	return validator.validate(element, isV2, context);
};

/**
 * Validates that all customId properties within a component tree are unique.
 * @param element The root React element to check for duplicate customIds
 * @returns Array of validation errors for any duplicate customIds found
 */
export const validateUniqueCustomIds = (element: ReactElement): ValidationError[] => {
	const customIds = new Set<string>();
	const errors: ValidationError[] = [];

	const checkElement = (node: ReactNode, path: string[] = []) => {
		if (!isValidElement(node)) {
			return;
		}

		const processedNode = getProcessedElement(node) as ReactElement<MessageProps | ModalProps>;
		const disjsxType = getDISJSXType(processedNode);
		const props = processedNode.props;

		if ("customId" in props) {
			if (customIds.has(props.customId)) {
				errors.push({
					type: "error",
					message: `Duplicate customId "${props.customId}" found. Custom IDs must be unique within a message.`,
					component: disjsxType,
					path: [...path],
				});
			} else {
				customIds.add(props.customId);
			}
		}

		if (props.children) {
			const children = Children.toArray(props.children);

			children.forEach((child, index) => {
				checkElement(child, [...path, disjsxType || "Unknown", index.toString()]);
			});
		}
	};

	checkElement(element);

	return errors;
};
