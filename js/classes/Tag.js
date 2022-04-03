import { addTailwind } from "../scripts/mixins.js";

export default class Tag {
    constructor(tag, div) {
        this.tag = tag;
        this.div = div;
    }

    create() {
        let button = document.createElement('button');
        button.innerHTML = this.tag.name;
        addTailwind(['px-2', 'py-1', 'rounded-xl', 'bg-red-600', 'text-white', 'hover:bg-red-500'], button);
        this.div.appendChild(button);
    }
}