export const createComponent = (func) => {
    const element = document.createElement('div');
    const tpl = func();
    tpl.replaceAll();
    return element
}

export const registerComponents = (componentsArr) => {
    componentsArr.forEach((component) => {
        document.body.appendChild(component);
    })
};
