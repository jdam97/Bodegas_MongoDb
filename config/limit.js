import rateLimit from "express-rate-limit";

export const limitRequest = () => {
  return rateLimit({
    windowMs: 30 * 1000, // 30 segundos
    max: 5, // Limit each IP to 5 requests per `window` (here, per 30 seg)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: "se superó el limite de solicitudes",
    },
  });
}