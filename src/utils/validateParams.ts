import type { Request, Response } from "express";
import { validationResult } from 'express-validator';


export const validateParams = (req: Request, res: Response, next: any) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    }

    next();
}