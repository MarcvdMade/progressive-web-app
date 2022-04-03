window.onload = () => {
    console.log('starting app...');
    init()
}

async function init() {
    renderTags();
    renderProjects();
}

async function getProjects() {
    let url = 'https://cmgt.hr.nl/api/projects'
    let projects = [];
    
    try {
        let res = await fetch(url);
        const { data } = await res.json();
        projects = data;
    } catch (err) {
        console.error(err);
    }

    return projects;
}

async function renderProjects() {
    let projects = await getProjects();
    console.log(projects)
    let projectsHolder = document.getElementById('projects-holder');

    projects.forEach(project => {
        // Create the card for a project
        let projectCard = document.createElement('div');

        // Used for appending tailwind css classes (thx js)
        addTailwind(['border-solid', 'border-4', 'border-black', 'rounded-xl', 'w-96', 'dark:border-white'], projectCard);

        // Get project details and append them to card

        // Image
        let img = document.createElement('img');
        img.setAttribute('src', project.project.header_image[0]);
        addTailwind(['rounded-t-lg', 'w-full'], img);

        // Text holder
        let infoDiv = document.createElement('div');
        addTailwind(['p-5'], infoDiv);

        // Title
        let title = document.createElement('p');
        title.innerHTML = project.project.title;
        addTailwind(['font-bold', 'text-2xl', 'text-center'], title);
        infoDiv.appendChild(title);

        // Tagline
        let tagline = document.createElement('div');
        tagline.innerHTML = project.project.tagline;
        addTailwind(['text-center', 'text-lg'], tagline);
        infoDiv.appendChild(tagline);

        // Tags
        let tagDiv = document.createElement('div');
        addTailwind(['flex', 'flex-row', 'gap-2', 'mt-2'], tagDiv)

        project.project.tags.forEach((tag) => {
            let button = document.createElement('button');
            button.innerHTML = tag.name;
            addTailwind(['px-2', 'py-1', 'rounded-xl', 'bg-red-600', 'text-white'], button);
            tagDiv.appendChild(button);
        });
        infoDiv.appendChild(tagDiv)


        // Elements in project cards
        projectCard.appendChild(img)
        projectCard.appendChild(infoDiv);

        projectsHolder.appendChild(projectCard)
    });
}

async function getTags() {
    let url = 'https://cmgt.hr.nl/api/tags'
    let tags = [];
    
    try {
        let res = await fetch(url);
        const { data } = await res.json();
        tags = data;
    } catch (err) {
        console.error(err);
    }

    return tags;
}

async function renderTags() {
    let tags = await getTags();
    console.log(tags)
    let tagsHolder = document.getElementById('tags-holder');

    tags.forEach((tag) => {
        let button = document.createElement('button');
        button.innerHTML = tag.name;
        addTailwind(['px-2', 'py-1', 'rounded-xl', 'bg-red-600', 'text-white'], button);
        tagsHolder.appendChild(button);
    })
}

/**
 * This function is used to append tailwind classes.
 * 
 * @param {*} classes - classes you want to append
 * @param {*} div - the div that needs classes
 */
function addTailwind(classes, div) {
    for (let _class of classes) {
        div.classList.add(_class);
    }
}