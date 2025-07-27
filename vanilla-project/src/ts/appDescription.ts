import "../style/appDescription.css";
import "../style/header.css";
import "../style/img.css";
import { createElement } from "../utils/createElements";
import { fetchApplicationById } from "./api";

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

const getApplication = async (appId: string) => {
  try {
    // todo clearError
    // todo setLoading = true

    return await fetchApplicationById(appId);
  } catch (e) {
    // todo set error = e.message

    throw e;
  } finally {
    // todo setLoading = false
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

const addOnBackListener = () => {
  backButton.addEventListener("click", () => {
    window.location.href = `/`;
  });
};

const getAppId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

const renderApplication = async (appId: string) => {
  const app = await getApplication(appId);
  const { description, icon, screenshots, name, keyFeatures } = app;

  appIcon.src = icon;
  appName.textContent = name;
  appDescription.textContent = description;
  addKeyFeatures(keyFeatures);
  addScreenshots(screenshots);
};

const init = async () => {
  const appId = getAppId();

  if (appId) {
    // todo: handle thrown error
    renderApplication(appId);
    addOnBackListener();
  } else {
    // navigate to home screen
  }
};

init();
