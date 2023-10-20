import express from 'express';
import cors from 'cors';

const PORT = 3001;
const app = express();

app.use(cors());

export const fake = [
  {
    "id": 1,
    "curr_name": "ru",
    "value": 309.22,
  },
  {
    "id": 2,
    "curr_name": "byn",
    "value": 2.4442,
  },
  {
    "id": 3,
    "curr_name": "eur",
    "value": 3.62,
  },
  {
    "id": 4,
    "curr_name": "usd",
    "value": 3.02,
  },
]

app.get("/api", (req, res) => {
  res.json(fake)
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});