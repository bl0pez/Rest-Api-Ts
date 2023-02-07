import { Router } from "express";
import type { Request, Response } from "express";
import { body } from "express-validator";

import * as BookService from "./book.services";
import { validateParams } from "../utils/validateParams";

export const bookRouter = Router();

//GET: Lista todos los libros
bookRouter.get("/", async (req: Request, res: Response) => {
    try {
        const books = await BookService.listBooks();
        res.status(200).json(books);
    } catch (error: any) {
        res.status(500).json({ error: error.message });        
    }
});

//GET: Obtiene un libro por su id
bookRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const book = await BookService.getBookById(id);
        if (!book) {
            res.status(404).json({ error: "Book not found" });
        } else {
            res.status(200).json(book);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

//POST: Crea un nuevo libro
bookRouter.post("/", [
    body("title").isString().notEmpty(),
    body("authorId").isInt(),
    body("datePublished").isDate(),
    body("isFiction").isBoolean(),
    validateParams
], async (req: Request, res: Response) => {
    try {
        const book = await BookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

//PUT: Actualiza un libro por su id
bookRouter.put("/:id", [
    body("title").isString().notEmpty(),
    body("authorId").isInt(),
    body("datePublished").isDate(),
    body("isFiction").isBoolean(),
    validateParams
], async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const book = req.body;
        const updatedBook = await BookService.updateBook(book, id);
        res.status(200).json(updatedBook);
    } catch (error: any) {
        console.log(error);
        
        res.status(500).json({ error: error.message });
    }
});

//DELETE: Elimina un libro por su id
bookRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await BookService.deleteBook(id);
        res.status(200).json({
            message: `Book deleted`
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});