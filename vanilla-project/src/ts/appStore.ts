import '../style/card.css';
import '../style/img.css';
import '../style/errorMessage.css'
import { createElement } from '../utils/createElements';
import type { Application } from '../models/applicationModel';
import { fetchAllApplications } from './api';
import { createApplicationsError } from '../utils/errorHandler';

const loader = document.getElementById('loader') as HTMLDivElement;
const appsContainer = document.getElementById("apps-container") as HTMLDivElement;

const getApplications = async () => {
  try {
    appsContainer.style.display = 'none';
    loader.style.display = 'block';

    const applications = await fetchAllApplications();
    appsContainer.style.display = 'grid';

    return applications;
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : 'unknown error';

    throw new Error(`getApplications error: ${errMsg}`);
  } finally {
    loader.style.display = 'none';
  }
};

const createAppCardContainer = () => {
  const appCard = createElement('div', { className: 'app-card' });

  return appCard;
}

const createAppIcon = (icon: string) => {
  const appIcon = createElement('img', { src: icon, id: 'icon' });

  return appIcon;
}

const createAppName = (name: string) => {
  const appName = createElement('div', { textContent: name });

  return appName;
}

const createAppCard = (app: Application) => {
  const appCard = createAppCardContainer();
  const appIcon = createAppIcon(app.icon);
  const appName = createAppName(app.name);

  appCard.append(appIcon, appName);

  return appCard;
}

const addOnCardListener = (appCard: HTMLElement, id: number) => {
  appCard.addEventListener("click", () => {
    window.location.href = `appDescription?id=${id}`
  });
};

const renderAppCard = (app: Application) => {
  const appCard = createAppCard(app);

  appsContainer.append(appCard)

  addOnCardListener(appCard, app.id);
}

const createApplicationCards = (apps: Application[]) => {
  apps.forEach(app => {
    renderAppCard(app);
  })
}

const addApplicationsErrorMessage = () => {
  const errEl = createApplicationsError();
  document.body.appendChild(errEl);
  alert("Please try again.")
}

const renderAllApplications = async () => {
  try {
    const applications = await getApplications();
    createApplicationCards(applications)
  } catch (e) {
    addApplicationsErrorMessage();
  }
}

const init = () => {
  renderAllApplications();
}

init();