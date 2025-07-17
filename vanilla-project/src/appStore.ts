import mock from "./mocks";
import './style/card.css';
import './style/img.css';

interface Application {
  id: number;
  name: string;
  icon: string;
  description: string;
  keyFeatures: string[];
  screenshots: string[];
}

const applications: Application[] = mock;

applications.forEach(app => {
  const appsContainer = document.getElementById("apps-container");

  if (appsContainer) {
    const appCard: HTMLDivElement = document.createElement('div');
    appCard.className = 'app-card';

    const appIcon: HTMLImageElement = document.createElement('img');
    appIcon.className = 'image';
    appIcon.src = app.icon;

    const appName: HTMLDivElement = document.createElement('div');
    appName.textContent = app.name;

    appCard.appendChild(appIcon);
    appCard.appendChild(appName);

    appsContainer.appendChild(appCard);
  }
})