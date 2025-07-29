import type { Application } from "../models/ApplicationModel";
import { applicationsApiUrl } from "../constants/apiConstants";

export const fetchApplicationById = async (
  id: string
): Promise<Application> => {
  const response = await fetch(`${applicationsApiUrl}/${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch application description by ID from ${response.url} — Status: ${response.status} (${response.statusText})`
    );
  }

  const app = await response.json();

  return app as Promise<Application>;
};
