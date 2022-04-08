import localforage from 'localforage';

// Classes
import Project from './Project.js';
import Tag from './Tag.js';

let fetchAllUrl = 'https://cmgt.hr.nl/api/projects';
let fetchUrl = fetchAllUrl;

window.addEventListener("offline", () => {
    document.getElementById('status').style.backgroundColor = "red";
})

window.addEventListener("online", () => {
    document.getElementById('status').style.backgroundColor = "green";
})

window.onload = () => {
    console.log('starting app...');
    init()

    let status = document.createElement('div');
    status.classList.add('connection-dot');
    status.setAttribute('id', 'status')
    status.style.backgroundColor = navigator.onLine ? 'green' : 'red';
    document.getElementsByClassName('connection-dot-wrapper')[0].appendChild(status);
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

        localforage.setItem('projects', data)

        projects = data;
    } catch (err) {
        projects = localforage.getItem('projects')
    }

    return projects;
}

async function renderProjects() {
    let projects = await getProjects();
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
        localforage.setItem('tags', [{id: 0, name: 'Tags are offline'}])
    } catch (err) {
        tags = localforage.getItem('tags')
    }

    return tags;
}

async function renderTags() {
    let tags = await getTags();
    let tagsHolder = document.getElementById('tags-holder');
    tagsHolder.innerHTML = '';

    tags.forEach((tag) => {
        let tagItem = new Tag(tag , tagsHolder)
        tagItem.create();
    })
}