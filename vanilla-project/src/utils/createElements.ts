export const createElement = (tagName: string,
    options?: {
        className?: string;
        id?: string;
        textContent?: string;
        src?: string;
        alt?: string;
    }) => {
    const element = document.createElement(tagName);

    if (options) {
        const { className, id, textContent, src, alt } = options;
        if (className) element.className = className;
        if (id) element.id = id;
        if (textContent) element.textContent = textContent;

        if (tagName === 'img') {
            const img = element as HTMLImageElement;
            if (src) img.src = src;
            if (alt) img.alt = alt;
        }
    }
    return element;
}