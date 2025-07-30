import { createElement } from "./createElements";

export const createApplicationDetailsError = () => {
    const errorMessage = createElement('div', { className: 'error-message', textContent: 'Failed to load application details. Please try again later.' });

    return errorMessage;
}

export const createApplicationsError = () => {
    const errorMessage = createElement('div', { className: 'error-message', textContent: 'Failed to load applications. Please try again later.' });

    return errorMessage;
} 