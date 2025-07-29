import { createElement } from "./createElements";

export const createFailedGetApplicationDetailsError = () => {
    const errorMessage = createElement('div', { className: 'get-application-error', textContent: 'Failed to load application info. Please try again later.' });

    return errorMessage;
} 