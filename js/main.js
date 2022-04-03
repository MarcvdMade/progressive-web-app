import Project from './classes/Project.js';
import Tag from './classes/Tag.js';

let fetchAllUrl = 'https://cmgt.hr.nl/api/projects';
let fetchUrl = fetchAllUrl

window.onload = () => {
    console.log('starting app...');
    init()
}

async function init() {
    renderTags();
    renderProjects();
}

async function getProjects() {
    let url = fetchUrl
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
    projectsHolder.innerHTML = '';

    projects.forEach(project => {
        let projectCard = new Project(project, projectsHolder);
        projectCard.create();
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
    tagsHolder.innerHTML = '';

    tags.forEach((tag) => {
        let tagItem = new Tag(tag , tagsHolder)
        tagItem.create();
    })
}