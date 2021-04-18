const state = {};
const componentsCount = {};
let currentComponentName = null;


export const createComponent = (name, func) => {
    const initComponent = () => {
        const element = document.createElement('div');
        element.innerHTML = func();

        return element;
    };

    return [name, initComponent];
}

export const reactive = (initial) => {
    return {
        _value: initial,
        _affected: [],
        get value() {
            return this._value;
        },
        set value(_val) {
            this._value = _val;
            this._setAffectedValue();
        },
        _trigger() {
          this._setAffectedValue();
        },
        _setAffectedValue() {
            this._affected.forEach((el) => {
                el.innerHTML = this._value;
            });
        }
    }
}

export const useMethod = (func) => {
    const timestamp = Date.now();
    methods[timestamp] = func;

    return timestamp;
}

export const useInTemplate = (params) => {
    state[currentComponentName] = params;
}

export const createApp = (selector, components, htmlString) => {
    const rootElem = document.querySelector(selector);
    rootElem.innerHTML = htmlString;

    components.forEach(([name, component]) => {
        const foundComponents = Array.from(document.querySelectorAll(name));
        foundComponents.forEach((componentNode) => {
            insertComponent(componentNode, name, component);
        })
    });
}

const insertComponent = (node, name, component) => {
    setCurrentComponentName(name);
    renderComponent(name, component, node);
}

const renderComponent = (name, component, node) => {
    const elem = component();
    const parent = node.parentNode;
    bindReactiveToComponent(elem);
    bindEventsToComponent(elem);

    parent.insertBefore(elem, node);
    parent.removeChild(node);
}

const setCurrentComponentName = (name) => {
    componentsCount[name] = componentsCount[name] ? ++componentsCount[name] : 1;
    currentComponentName = name + componentsCount[name];
    return currentComponentName;
}

const bindReactiveToComponent = (elem) => {
    const binds = Array.from(elem.querySelectorAll('*[al-bind]'));
    binds.forEach((el) => {
        const id = el.getAttribute('al-bind');
        state[currentComponentName][id]._affected.push(el);
    });
    Object.values(state[currentComponentName]).forEach((reactive) => {
        if (reactive._trigger) {
            reactive._trigger();
        }
    });
}

const events = ['click'];
const bindEventsToComponent = (elem) => {
    events.forEach(event => {
        const elems = Array.from(elem.querySelectorAll(`*[al-${event}]`));
        elems.forEach((el) => {
            const method = el.getAttribute(`al-${event}`);
            el.addEventListener(event, state[currentComponentName][method]);
        });
    });
}
