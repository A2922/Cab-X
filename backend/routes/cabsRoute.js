import express from 'express';
import {getCabs,getCabById, updateCab} from '../controllers/cabController.js'
const router = express.Router();

router.get('/',getCabs);
router.get('/:id',getCabById);
router.put('/:id',updateCab);


export default router;