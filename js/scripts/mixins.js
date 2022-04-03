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

export { addTailwind };