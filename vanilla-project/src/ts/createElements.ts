export const createDivElement = (text?: string, name?: string) => {
    const element: HTMLDivElement = document.createElement('div');
    if (text) {
        element.textContent = text;
    }

    if (name) {
        element.className = name;
    }

    return element;
}

 export const createHeaderElement = (type: string, text: string) => {
    const element: HTMLHeadElement = document.createElement(type);

    element.textContent = text;

    return element;
}

export const createImageElement = (source: string, className: string) => {

    const element: HTMLImageElement = document.createElement('img');
    element.src = source;
    element.className = className;

    return element;
}