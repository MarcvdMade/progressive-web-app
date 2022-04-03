import { addTailwind } from "../scripts/mixins.js";

export default class Project {
    constructor(project, div) {
        this.project = project;
        this.div = div;
    }

    create() {
        // Create the card for a project
        let projectCard = document.createElement('div');

        // Used for appending tailwind css classes (thx js)
        addTailwind(['flex', 'flex-col', 'justify-between', 'border-solid', 'border-4', 'border-black', 'bg-white', 'dark:bg-black', 'rounded-xl', 'w-96', 'dark:border-red-600', 'hover:drop-shadow-2xl', 'hover:-translate-y-5', 'transition', 'duration-200'], projectCard);

        // Get project details and append them to card

        // Image
        let img = document.createElement('div');
        img.style.backgroundImage = `url(${this.project.project.header_image[0]}`;
        img.style.backgroundRepeat = 'no-repeat'
        img.style.backgroundSize = '100% 80%'
        addTailwind(['rounded-t-lg', 'w-full', 'h-64'], img);

        // Text holder
        let infoDiv = document.createElement('div');
        addTailwind(['p-5'], infoDiv);

        // Title
        let title = document.createElement('p');
        title.innerHTML = this.project.project.title;
        addTailwind(['font-bold', 'text-2xl', 'text-center'], title);
        infoDiv.appendChild(title);

        // Tagline
        let tagline = document.createElement('div');
        tagline.innerHTML = this.project.project.tagline;
        addTailwind(['text-center', 'text-lg'], tagline);
        infoDiv.appendChild(tagline);

        // Tags
        let tagDiv = document.createElement('div');
        addTailwind(['flex', 'flex-row', 'gap-2', 'mt-2', 'flex-wrap', 'p-5'], tagDiv)

        this.project.project.tags.forEach((tag) => {
            let button = document.createElement('button');
            button.innerHTML = tag.name;
            addTailwind(['px-2', 'py-1', 'rounded-xl', 'bg-red-600', 'text-white', 'hover:bg-red-500'], button);
            tagDiv.appendChild(button);
        });


        // Elements in project cards
        projectCard.appendChild(img);
        projectCard.appendChild(infoDiv);
        projectCard.appendChild(tagDiv);

        this.div.appendChild(projectCard);
    }
}