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
        button.classList.add('button')
        
        link.appendChild(button);

        this.div.appendChild(link);
    }
}