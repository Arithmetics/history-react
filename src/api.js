export const config =
  process.env.NODE_ENV === "production"
    ? "http://75.164.135.106:8080"
    : "http://localhost:8080";
