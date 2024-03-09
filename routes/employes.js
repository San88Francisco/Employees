const express = require('express')
const router = express.Router()
const { auth } = require('../middleware/auth')
// const { log } = require('debug/src/browser')
const { all, add, remove, employee, edit } = require('../controllers/employes')

// /api/employes
router.get('/', auth, all)
// /api/employes/id
router.get('/:id', auth, employee)
// /api/employes/add
router.post('/add', auth, add)
// /api/employes/remove/:id
router.post('/remove/:id', auth, remove);

// /api/employes/edit/:id
router.put('/edit/:id', auth, edit)

module.exports = router