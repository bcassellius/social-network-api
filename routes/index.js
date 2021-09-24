const router = require('express').Router();
// Import all of the API routes /api/index.js (index.js implied)
const apiRoutes = require('./api');

// Add prefix `/api` to all api routes imported from 'api' directory
router.use('/api', apiRoutes)

router.use((req, res) => {
  res.status(404).send('<h1>😖 404 Error!</h1>');
});

module.exports = router;
