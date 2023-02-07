import { Router } from "express";
import type { Request, Response } from "express";
import { body } from "express-validator";

import * as AuthorService from "./author.services";
import { validateParams } from "../utils/validateParams";

export const authorRouter = Router();

//GET: Lista todos los autores
authorRouter.get("/", async (req: Request, res: Response) => {
    try {
        const authors = await AuthorService.listAuthors();
        res.status(200).json(authors);
    } catch (error: any) {
        res.status(500).json({ error: error.message });        
    }
});

//GET: Busca un autor por id
authorRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        
        const id: number = parseInt(req.params.id, 10);
        const author = await AuthorService.getAuthorById(id);

        if(!author) {
            return res.status(404).json({ error: "Author not found" });
        }
        
        res.status(200).json(author);

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * POST: Crea un autor
 * 
 */
authorRouter.post("/", [
    body("firstName").isString().notEmpty(),
    body("lastName").isString().notEmpty(),
    validateParams
], async (req: Request, res: Response) => {
    try {
        const author = req.body;
        const newAuthor = await AuthorService.createAuthor(author);
        res.status(201).json(newAuthor);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

authorRouter.put("/:id", [
    body("firstName").isString().notEmpty(),
    body("lastName").isString().notEmpty(),
    validateParams
], async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const author = req.body;

        const updatedAuthor = await AuthorService.updateAuthor(author, id);

        res.status(200).json(updatedAuthor);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

authorRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await AuthorService.deleteAuthor(id);
        res.status(204).json({
            message: "Author deleted"
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});