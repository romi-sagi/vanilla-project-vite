import mock from "./mocks";
import './style/card.css';
import './style/img.css';

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
  const outterCard = document.getElementById("card");

  if (outterCard !== null) {
    const innerCard: HTMLDivElement = document.createElement('div');
    innerCard.className = 'inner-card';

    const iconApp: HTMLImageElement = document.createElement('img');
    iconApp.className = 'image';
    iconApp.src = app.icon;

    const nameApp: HTMLDivElement = document.createElement('div');
    nameApp.textContent = app.name;

    innerCard.appendChild(iconApp);
    innerCard.appendChild(nameApp);

    outterCard.appendChild(innerCard);
  }
})