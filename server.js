const express = require('express');
const clog = require('./middleware/clog');
const apiRoutes = require('./routes/noteRoutes')
const appControllers = require('./controllers/appControllers')

// activating express
const app = express()

// Port
const PORT = process.env.PORT || 3001

// middleware and static files
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// notes routes
app.use('/api', apiRoutes)

// GET Route for notes page
app.get('/notes', appControllers.notesPage)

// Get route for everything not the notes page
app.get('/*', appControllers.indexPage)

// port listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
)