import { createElement } from "./createElements";

export const addFailedLoadApplicationPlaceholder = (container: HTMLElement) => {
    if (container) {
        const errorMessage = createElement('div', { className: 'get-application-error', textContent: 'Failed to load application info. Please try again later.' });

        document.body.appendChild(errorMessage);
        alert("Please try again.")
    }
} 