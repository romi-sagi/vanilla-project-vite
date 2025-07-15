import mock from "./mocks";

interface KeyFeatureInterface {
  feature: string;
}

interface ScreenshotInterface {
  screenshot: string;
}

interface AppStoreInterface {
  id: number;
  name: string;
  icon: string;
  description: string;
  keyFeatures: KeyFeatureInterface[];
  screenshots: ScreenshotInterface[];
}

const appStore: AppStoreInterface[] = mock;

appStore.forEach(app => {
  const newDiv: HTMLDivElement = document.createElement('div');
  newDiv.className = "inner-card";
  newDiv.textContent = app.name;
  document.body.appendChild(newDiv);
})