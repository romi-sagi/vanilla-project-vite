import '../style/img.css';
import '../style/appDescription.css';
import '../style/header.css';
import { handleDataError } from '../utils/dataErrorHandler';
import { createElement } from '../utils/createElements';
import type { Application } from '../models/ApplicationModel';

const params = new URLSearchParams(window.location.search);
const appId = params.get('id');
const appDescriptionContainer = document.getElementById("app-description-container");
const loader = document.getElementById('loader');

const fetchApplicationsData = async () => {
    if (loader && appDescriptionContainer) {
        loader.style.display = 'inline-block';

        try {
            const response = await fetch(`http://localhost:3000/applications/${appId}`);

            if (!response.ok) {
                throw new Error(`Fetching application data failed with status code ${response.status} ${response.statusText}`);
            }

            const app = await response.json();

            return app;
        } catch (error) {
            handleDataError(error, appDescriptionContainer)
        } finally {
            loader.style.display = 'none';
        }
    }
}

const updateAppIcon = (app: Application) => {
    const appIcon = document.getElementById('icon') as HTMLImageElement;
    if (appIcon) appIcon.src = app.icon;
}

const updateAppName = (app: Application) => {
    const appName = document.getElementById("app-name");
    if (appName) appName.textContent = app.name;
}

const updateAppDescription = (app: Application) => {
    const appIcon = document.getElementById('app-description');
    if (appIcon) appIcon.textContent = app.description;
}

const updateAppKeyFeatures = async (app: Application) => {
    const featuresContainer = document.getElementById('key-features-container');
    const keyFeatures = app.keyFeatures;

    if (featuresContainer) {
        keyFeatures.forEach(async feature => {
            const appKeyFeature = await createElement('li', { textContent: feature });
            featuresContainer.appendChild(appKeyFeature);
        })
    }
}

const updateAppScreenshots = async (app: Application) => {
    const screenshotsContainer = document.getElementById('screenshots-container');
    const screenshots = app.screenshots;

    if (screenshotsContainer) {
        screenshots.forEach(async screen => {
            const appScreenshot = await createElement('img', { src: screen, className: 'screenshot' });
            screenshotsContainer.appendChild(appScreenshot);
        })
    }
}

const clickOnBackButton = () => {
    const backButton = document.getElementById("back-button-container");
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.location.href = `/`
        });
    }
}

const updateDomByFetchData = async () => {
    const appDetails = await fetchApplicationsData();
    updateAppIcon(appDetails);
    updateAppName(appDetails);
    updateAppDescription(appDetails);
    updateAppKeyFeatures(appDetails);
    updateAppScreenshots(appDetails);

    clickOnBackButton();
}

updateDomByFetchData();