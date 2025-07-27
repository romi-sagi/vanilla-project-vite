import { createElement } from "./createElements";

export const handleDataError = (error: any, container: HTMLElement) => {
    console.error('Fetch error:', error);

    if (container) {
        const errorMessage = createElement('div', { textContent: 'Failed to load data. Please try again later.' });

        container.appendChild(errorMessage);
        alert("Please try again.")
    }
} 