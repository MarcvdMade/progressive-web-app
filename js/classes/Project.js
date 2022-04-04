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
        // addTailwind(['flex', 'flex-col', 'justify-between', 'border-solid', 'border-4', 'border-black', 'bg-white', 'dark:bg-black', 'rounded-xl', 'w-[15rem]', 'md:w-[25rem]', 'min-h-[20rem]', 'md:min-h-[30rem]', 'dark:border-hrRed', 'hover:drop-shadow-2xl', 'hover:scale-110', 'transition', 'duration-200'], projectCard);

        // Get project details and append them to card

        // Image
        let img = document.createElement('div');
        img.style.backgroundImage = `url(${this.project.project.header_image[0]}`;
        img.style.backgroundRepeat = 'no-repeat'
        img.style.backgroundSize = '100% 80%'
        img.classList.add('project-card-img')
        // addTailwind(['rounded-t-lg', 'w-full', 'h-48', 'md:h-64'], img);

        // Text holder
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('project-info')
        // addTailwind(['px-5'], infoDiv);

        // Title
        let title = document.createElement('p');
        title.innerHTML = this.project.project.title;
        title.classList.add('project-title')
        // addTailwind(['font-bold', 'text-2xl', 'text-center'], title);
        infoDiv.appendChild(title);

        // Tagline
        let tagline = document.createElement('div');
        tagline.innerHTML = this.project.project.tagline;
        tagline.classList.add('project-text')
        // addTailwind(['text-center', 'text-lg'], tagline);
        infoDiv.appendChild(tagline);

        // Tags
        let tagDiv = document.createElement('div');
        tagDiv.classList.add('project-tag-wrapper')
        // addTailwind(['flex', 'flex-row', 'gap-2', 'mt-2', 'flex-wrap', 'px-5', 'pb-5'], tagDiv)

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