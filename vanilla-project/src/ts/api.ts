import type { Application } from "../models/applicationModel";

export const fetchApplicationById = async (
  id: string
): Promise<Application> => {
  const response = await fetch(`http://localhost:3000/applications/${id}`);

  if (!response.ok) {
    throw new Error(
      `Fetching application data failed with status code ${response.status} ${response.statusText}`
    );
  }

  const app = await response.json();

  return app as Promise<Application>;
};
