import { addTailwind } from "../scripts/mixins.js";

export default class Tag {
    constructor(tag, div) {
        this.tag = tag;
        this.div = div;
    }

    create() {
        let link = document.createElement('a');
        link.href = `https://cmgt.hr.nl/tag/${((this.tag.name).replace(/\s/g, '-')).toLowerCase()}`

        let button = document.createElement('button');
        button.innerHTML = this.tag.name;
        addTailwind(['px-2', 'py-1', 'rounded-xl', 'bg-red-600', 'text-white', 'hover:bg-red-500'], button);

        link.appendChild(button);

        this.div.appendChild(link);
    }
}