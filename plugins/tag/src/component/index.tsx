import {
	$,
	Card,
	CardType,
	NodeInterface,
	SelectStyleType,
} from '@aomao/engine';
import ReactDOM from 'react-dom';
import React from 'react';
import TagComponent from './tag';
import type { TagValue } from './type';

class Tag extends Card<TagValue> {
	static get cardName() {
		return 'tag';
	}

	static get cardType() {
		return CardType.INLINE;
	}

	static get autoSelected() {
		return false;
	}

	static get singleSelectable() {
		return false;
	}

	static get selectStyleType() {
		return SelectStyleType.BACKGROUND;
	}

	#container?: NodeInterface;

	render() {
		this.#container = $('<div>Loading</div>');
		return this.#container;
	}

	didRender() {
		super.didRender();
		const value = this.getValue();
		const { editor } = this;

		ReactDOM.render(
			<TagComponent
				value={value}
				editor={editor}
				onChange={(item) => {
					this.setValue({
						tagType: item.type,
						tagValue: item.text,
						isCustom: item.isCustom,
					});
				}}
			/>,
			this.#container?.get() as HTMLElement,
		);
	}

	destroy() {
		super.destroy();
		ReactDOM.unmountComponentAtNode(this.#container?.get() as HTMLElement);
	}
}
export default Tag;
export type { TagValue };
