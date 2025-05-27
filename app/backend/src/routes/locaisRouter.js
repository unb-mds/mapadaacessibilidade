import express from 'express'
const router = express.Router()
import { buscarLocais } from '../controllers/locaisController.js'

router.get('/', buscarLocais)

export default router
