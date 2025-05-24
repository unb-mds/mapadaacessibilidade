import express from 'express'
import { createLocal } from '../controllers/localController.js'

const router = express.Router()


router.post('/locais', createLocal)

export default router