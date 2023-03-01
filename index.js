const express = require('express');
const PORT = process.env.PORT || '5555';
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.json());
// app.use(limiter);  //this will hold all api's
app.use('/get', limiter); // in this we specify /get

app.get('/', (req, res) => {
  res.json({ method: req.method, message: 'Hello World', ...req.body });
});

app.get('/get/api', (req, res) => {
  try {
    res.json({ method: req.method, message: 'Hello World', ...req.body });
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listening on http://localhost:${PORT}`);
});
