// Cart storage stays on-device until authenticated, per-user persistence is implemented.
// The legacy unauthenticated endpoint must never expose or overwrite another visitor's cart.
const express = require("express");
const app = express();
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Cache-Control", "no-store");
  next();
});
app.all("/api/cart/:user", (req, res) =>
  res
    .status(410)
    .json({
      error: "Remote cart sync is unavailable. Use browser-local storage.",
    }),
);
app.use((req, res) => res.status(404).json({ error: "Not found" }));
const port = process.env.PORT || 5174;
app.listen(port, "127.0.0.1", () =>
  console.log("Local server listening on", port),
);
