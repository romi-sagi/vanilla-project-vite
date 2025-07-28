import "../style/appDescription.css";
import "../style/header.css";
import "../style/img.css";
import { createElement } from "../utils/createElements";
import { addFailedLoadApplicationPlaceholder } from "../utils/ErrorHandler";
import { fetchApplicationById } from "./api";

const appDescriptionContainer = document.getElementById("app-description-container") as HTMLDivElement;
const appIcon = document.getElementById("icon") as HTMLImageElement;
const appName = document.getElementById("app-name") as HTMLDivElement;
const appDescription = document.getElementById(
    "app-description"
) as HTMLDivElement;
const featuresContainer = document.getElementById(
    "key-features-container"
) as HTMLDivElement;
const screenshotsContainer = document.getElementById(
    "screenshots-container"
) as HTMLDivElement;
const backButton = document.getElementById(
    "back-button-container"
) as HTMLButtonElement;
const setLoading = document.getElementById("loader") as HTMLDivElement;

const getApplication = async (appId: string) => {
    let errorMessage = '';
    try {
        appDescriptionContainer.style.display = 'none';
        setLoading.style.display = 'block';

        const application = await fetchApplicationById(appId);
        appDescriptionContainer.style.display = 'block';

        return application;
    } catch (e) {
        if (e instanceof Error) {
            errorMessage = e.message;
        } else {
            errorMessage = 'An unknown error occurred';
        }
        throw errorMessage;

    } finally {
        setLoading.style.display = 'none';
    }
};

const addKeyFeatures = (features: string[]) => {
    features.forEach((feature) => {
        const featureEl = createElement("li", { textContent: feature });

        featuresContainer?.appendChild(featureEl);
    });
};

const addScreenshots = (screenshots: string[]) => {
    screenshots.forEach((screenshot) => {
        const appScreenshot = createElement("img", {
            src: screenshot,
            className: "screenshot",
        });

        screenshotsContainer.appendChild(appScreenshot);
    });
};

const backToHomeScreen = () => {
    const homePageHref = window.location.href = `/`;

    return homePageHref;
}

const addOnBackListener = () => {
    backButton.addEventListener("click", () => {
        backToHomeScreen();
    });
};

const getAppId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
};

const renderApplication = async (appId: string) => {
    try {
        const app = await getApplication(appId);
        const { description, icon, screenshots, name, keyFeatures } = app;

        appIcon.src = icon;
        appName.textContent = name;
        appDescription.textContent = description;
        addKeyFeatures(keyFeatures);
        addScreenshots(screenshots);
    } catch (e) {
        addFailedLoadApplicationPlaceholder(appDescriptionContainer);
        throw e;
    }
};

const init = async () => {
    const appId = getAppId();

    if (appId) {
        renderApplication(appId);
        addOnBackListener();
    } else {
        backToHomeScreen();
    }
};

init();
