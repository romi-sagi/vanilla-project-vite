import '../style/card.css';
import '../style/img.css';
import { handleDataError } from '../utils/dataErrorHandler';
import { createDivElement, createImageElement } from './createElements';

interface Application {
  id: number;
  name: string;
  icon: string;
  description: string;
  keyFeatures: string[];
  screenshots: string[];
}

const noTextContext = '';
const loader = document.getElementById('loader') as HTMLDivElement;
const appsContainer = document.getElementById("apps-container") as HTMLDivElement;

const fetchData = async () => {
  loader.style.display = 'inline-block';

  try {
    const response = await fetch('http://localhost:3000/applications');

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const applications: Application[] = await response.json();

    applications.forEach(app => {
      if (appsContainer) {
        const appCard: HTMLDivElement = createDivElement(noTextContext, 'app-card');
        appCard.addEventListener("click", function () {
          window.location.href = `appDescription?id=${app.id}`
        });

        const appIcon: HTMLImageElement = createImageElement(app.icon, 'icon');
        const appName: HTMLDivElement = createDivElement(app.name);

        appCard.appendChild(appIcon);
        appCard.appendChild(appName);

        appsContainer.appendChild(appCard);
      }
    })

  } catch (error) {
    handleDataError(error, appsContainer)
  } finally {
    loader.style.display = 'none';
  }
}

fetchData();