import { getUserById } from './../core/userHandlers';
import { getAllUsers } from '../core/userHandlers';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

/**
 * The api fetch all the users data from the db
 * 
 * @returns All the users info from the db.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let users = await getAllUsers();
        res.status(200).send(users);
    }
    catch (error) {
        next(error)
    }
});

/**
 * The api fetch speific user data from the db
 * 
 * @returns speific user info from the db.
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await getUserById(req.params.id);
        await res.status(200).send(user);

    } catch (error) {
        next(error)
    }
})

export default router;