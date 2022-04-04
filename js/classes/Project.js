import Tag from './Tag.js';

export default class Project {
    constructor(project, div) {
        this.project = project;
        this.div = div;
    }

    create() {
        // Create link around card
        let cardLink = document.createElement('a');
        cardLink.href = `https://cmgt.hr.nl/project/${((this.project.project.title).replace(/\s/g, '-')).toLowerCase()}`
        cardLink.classList.add('project-card-link')

        // Create the card for a project
        let projectCard = document.createElement('div');
        projectCard.classList.add('project-card')

        // Get project details and append them to card

        // Image
        let img = document.createElement('div');
        img.style.backgroundImage = `url(${this.project.project.header_image[0]}`;
        img.style.backgroundRepeat = 'no-repeat'
        img.style.backgroundSize = '100% 80%'
        img.classList.add('project-card-img')

        // Text holder
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('project-info')

        // Title
        let title = document.createElement('p');
        title.innerHTML = this.project.project.title;
        title.classList.add('project-title')
        infoDiv.appendChild(title);

        // Tagline
        let tagline = document.createElement('div');
        tagline.innerHTML = this.project.project.tagline;
        tagline.classList.add('project-text')
        infoDiv.appendChild(tagline);

        // Tags
        let tagDiv = document.createElement('div');
        tagDiv.classList.add('project-tag-wrapper')

        this.project.project.tags.forEach((tag) => {
            let tagItem = new Tag(tag, tagDiv);
            tagItem.create();
        });


        // Elements in project cards
        projectCard.appendChild(img);
        projectCard.appendChild(infoDiv);
        projectCard.appendChild(tagDiv);

        cardLink.appendChild(projectCard);

        this.div.appendChild(cardLink);
    }
}