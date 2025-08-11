import { getCookie, readBody } from "h3";
import { API_BASE_URL } from "~/constants/api_ constants";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // { username, password }
  const token = getCookie(event, "token"); // read HttpOnly cookie if present
  const backendUrl = `${API_BASE_URL}/login`; // adjust to your backend

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const backendRes = await fetch(backendUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  return backendRes;
});
