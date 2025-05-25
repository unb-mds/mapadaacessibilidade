import express from 'express'

import { createLocal } from '../controllers/localController.js'
import { validateLocal } from '../middlewares/LocalMiddleware.js'

const router = express.Router()

// Adiciona o middleware validateLocal antes do controller
router.post('/locais', validateLocal, createLocal)

export default router
