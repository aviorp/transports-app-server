import { createNewTransport, getTransports } from './../core/transportsHandlers';
import { Router, Request, Response, NextFunction } from 'express';
const express = require("express");
const router: Router = express.Router();


/**
 * This function creates new transport to the collection.
  */
router.post('/newTransport', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createNewTransport(req.body);
        return res.status(201).send("הסעה נוצרה בהצלחה.");
    } catch (error) {
        next(error)
    }
});

/**
 * This function creates new transport to the collection.
 * @returns transports;
  */
router.get('/getTransports', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let transports = await getTransports();
        return res.status(200).send(transports);
    } catch (error) {
        next(error)
    }
});

export default router;