const state = {};
const methods = {};


export const createComponent = (name, func) => {
    const initComponent = () => {
        const element = document.createElement('div');
        element.innerHTML = func();

        return element;
    };

    return [name, initComponent];
}

export const registerComponents = (componentsArr) => {
    componentsArr.forEach(component => {
        document.body.appendChild(component);
    })
};

export const reactive = (initial) => {
    const timestamp = Date.now();
    state[timestamp] = initial;

    return [timestamp, (newVal) => {
        state[timestamp] = newVal;
        console.log(newVal);
    }];
}

export const useMethod = (func) => {
    const timestamp = Date.now();
    methods[timestamp] = func;

    return timestamp;
}

export const createApp = (selector, components, htmlString) => {
    const rootElem = document.querySelector(selector);
    rootElem.innerHTML = htmlString;

    components.forEach(([name, component]) => {
        const foundComponents = Array.from(document.querySelectorAll(name));
        foundComponents.forEach((componentNode) => {
            componentNode.parentNode.insertBefore(component(), componentNode);
            componentNode.parentNode.removeChild(componentNode);
        })
    });

    setInitialState(rootElem);
    setEvents(rootElem);
}

const setInitialState = (node) => {
    Object.entries(state).forEach(([key, value]) => {
        const items = Array.from(node.querySelectorAll(`*[al-bind="${key}"]`));
        items.forEach((node) => {
            node.innerHTML = value;
        });
    });
};

const setEvents = (node) => {
    const items = Array.from(node.querySelectorAll('*[al-click]'));
    items.forEach((node) => {
        const methodName = node.getAttribute('al-click');
        node.addEventListener('click', () => {
            methods[methodName]();
        })
    })
}
