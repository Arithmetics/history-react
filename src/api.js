const prod = "http://75.164.135.106:8080";
const dev = "http://localhost:8080";

export const config = process.env.NODE_ENV === "development" ? dev : prod;
