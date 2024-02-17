const express = require('express');
const cors = require('cors');
const { middleware } = require('./utils/middleware');
const morgan = require('morgan');
const app = express();
const expressRouter = require('./Express/router');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
middleware(app);


app.use('/', expressRouter);

app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
});  

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
