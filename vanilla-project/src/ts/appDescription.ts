import '../style/img.css';
import '../style/appDescription.css';
import '../style/header.css';
import { createImageElement, createDivElement, createHeaderElement } from './createElements';
import { handleDataError } from '../utils/dataErrorHandler';

const noText = '';
const keyFeatureTitleText: string = 'Key Features: ';
const screenshotsTitleText: string = 'Screenshots: ';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const appDescriptionContainer = document.getElementById("app-description-container") as HTMLDivElement;
const loader = document.getElementById('loader') as HTMLDivElement;

const fetchData = async () => {
    loader.style.display = 'inline-block';

    try {
        const response = await fetch(`http://localhost:3000/applications/${id}`);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const app = await response.json();

        if (appDescriptionContainer) {
            const appIcon: HTMLImageElement = createImageElement(app.icon, 'icon');
            const appName: HTMLHeadElement = createHeaderElement('h3', app.name);
            const appDescription: HTMLDivElement = createDivElement(app.description, 'description-text');
            const additionalDetailsContainer: HTMLDivElement = createDivElement(noText, 'table');
            const featuresContainer: HTMLDivElement = createDivElement();
            const featuresTitle: HTMLHeadElement = createHeaderElement('h4', keyFeatureTitleText);
            const features: string[] = app.keyFeatures;
            const screenshotsContainer: HTMLDivElement = createDivElement();
            const screenshotsTitle: HTMLHeadElement = createHeaderElement('h4', screenshotsTitleText);
            const screenshots: string[] = app.screenshots;

            featuresContainer.appendChild(featuresTitle);

            features.forEach(feature => {
                const appKeyFeature = document.createElement('li');
                appKeyFeature.textContent = feature;
                featuresContainer.appendChild(appKeyFeature);
            });

            additionalDetailsContainer.append(featuresContainer);

            screenshotsContainer.appendChild(screenshotsTitle);

            screenshots.forEach(screenshot => {
                const appScreenshot = createImageElement(screenshot, 'screenshot');
                screenshotsContainer.appendChild(appScreenshot);
            });

            additionalDetailsContainer.append(screenshotsContainer);
            appDescriptionContainer.appendChild(appIcon);
            appDescriptionContainer.appendChild(appName);
            appDescriptionContainer.appendChild(appDescription);
            appDescriptionContainer.appendChild(additionalDetailsContainer);
        }

    } catch (error) {
        handleDataError(error, appDescriptionContainer)
    } finally {
        loader.style.display = 'none';
    }
}

fetchData();