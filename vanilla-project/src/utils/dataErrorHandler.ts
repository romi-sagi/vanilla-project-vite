export const handleDataError = (error: any, container: HTMLDivElement) => {
    console.error('Fetch error:', error);

    if (container) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Failed to load data. Please try again later.';

        container.appendChild(errorMessage);
        alert("Please try again.")
    }
} 