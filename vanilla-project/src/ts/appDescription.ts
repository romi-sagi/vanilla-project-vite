import "../style/appDescription.css";
import "../style/header.css";
import "../style/img.css";
import '../style/errorMessage.css'
import { createElement } from "../utils/createElements";
import { createApplicationDetailsError } from "../utils/errorHandler";
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
const loader = document.getElementById("loader") as HTMLDivElement;

const getApplication = async (appId: string) => {
    try {
        appDescriptionContainer.style.display = 'none';
        loader.style.display = 'block';

        const application = await fetchApplicationById(appId);
        appDescriptionContainer.style.display = 'block';

        return application;
    } catch (e) {
        const errMsg = e instanceof Error ? e.message : 'unknown error';

        throw new Error(`getApplication error: ${errMsg}`);
    } finally {
        loader.style.display = 'none';
    }
};

const addFailedGetApplicationDetailsPlaceHolder = () => {
    const errEl = createApplicationDetailsError();
    document.body.appendChild(errEl);
    alert("Please try again.")
}

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

const gobackToHomeScreen = () => {
    window.location.href = `/`;
}

const addOnBackListener = () => {
    backButton.addEventListener("click", () => {
        gobackToHomeScreen();
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
        addFailedGetApplicationDetailsPlaceHolder();
    }
};

const init = async () => {
    const appId = getAppId();

    if (appId) {
        renderApplication(appId);
        addOnBackListener();
    } else {
        gobackToHomeScreen();
    }
};

init();
