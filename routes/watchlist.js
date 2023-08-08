import express from "express";
import {createList,getLists} from '../controllers/watchlist.js'
const router = express.Router();

router.post('/:id',createList);
router.get('/:id', getLists);

export default router;