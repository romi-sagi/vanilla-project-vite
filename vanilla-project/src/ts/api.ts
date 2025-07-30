import type { Application } from "../models/applicationModel";

const serverUrl = 'http://localhost:3000/applications'

export const sendRequest = async <T = Application | Application[]>(
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
  const app = sendRequest<Application>(`${serverUrl}/${id}`)

  return app;
}

export const fetchAllApplications = async (): Promise<Application[]> => {
  const applications = sendRequest<Application[]>(`${serverUrl}`)

  return applications;
}