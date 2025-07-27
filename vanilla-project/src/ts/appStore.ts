import '../style/card.css';
import '../style/img.css';
import { handleFetchFailedError } from '../utils/dataErrorHandler';
import { createElement } from '../utils/createElements';
import type { Application } from '../models/ApplicationModel';

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
        const appCard: HTMLDivElement = createElement('div', { className: 'app-card' });
        appCard.addEventListener("click", function () {
          window.location.href = `appDescription?id=${app.id}`
        });

        const appIcon: HTMLImageElement = createElement('img', { src: app.icon, id: 'icon' });
        const appName: HTMLDivElement = createElement('div', { textContent: app.name });

        appCard.appendChild(appIcon);
        appCard.appendChild(appName);

        appsContainer.appendChild(appCard);
      }
    })

  } catch (error) {
    handleFetchFailedError(error, appsContainer)
  } finally {
    loader.style.display = 'none';
  }
}

fetchData();