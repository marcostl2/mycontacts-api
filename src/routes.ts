import { Router } from 'express';

import { ContactController, CategoryController } from './app/controllers';

const router = Router();

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);
router.delete('/contacts/:id', ContactController.delete);

router.get('/categories/', CategoryController.index);
router.post('/categories', CategoryController.store);

export default router;
