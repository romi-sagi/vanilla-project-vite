import type { Application } from "../models/applicationModel";
import { ServerUrl } from "../constants/apiConstants";

export const fetchByServerUrl = async <T = Application | Application[]>(
  url: string
): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch from ${response.url} — Status: ${response.status} (${response.statusText})`
    );
  }

  const app = await response.json();

  return app as Promise<T>;
};

export const fetchApplicationById = async (
  id: string
): Promise<Application> => {
  const app = fetchByServerUrl<Application>(`${ServerUrl}/${id}`)

  return app;
}

export const fetchAllApplications = async (): Promise<Application[]> => {
  const applications = fetchByServerUrl<Application[]>(`${ServerUrl}`)

  return applications;
}