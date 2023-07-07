import express from 'express';

import {logIn,register} from '../controllers/users.js';
const router = express.Router();//creates new Router object
router.get('/test', (req, res) => {
    res.send('Server is working!');
  });
router.post('/signin',logIn);
router.post('/signup',register);
export default router;