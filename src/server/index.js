const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const boardgamesRoutes = require('./routes/boardgameRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use('/api/boardgames', boardgamesRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});