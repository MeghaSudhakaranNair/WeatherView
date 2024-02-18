// const express = require('express');
// const app = express();

// app.use(express.json());

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
