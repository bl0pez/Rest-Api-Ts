import { db } from '../src/utils/db.server';

type Author = {
    firstName: string;
    lastName: string;
}

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

/**
 * Seed que crea autores y libros
 */
async function seed(){
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName,
                }
            })
        }));

    const author = await db.author.findFirst({
        where: {
            firstName: 'John',
            lastName: 'Doe'
        }
    });

    await Promise.all(
        getBooks().map((book) => {
                const { title, isFiction, datePublished } = book;
                return db.book.create({
                    data: {
                        title,
                        isFiction,
                        datePublished,
                        authorId: author!.id
                    }
            })
    }));

}

seed();

/**
 * Datos que se van a insertar en la base de datos
 * @returns Matriz de autores
 */
function getAuthors(): Array<Author>{
    return [
        {
            firstName: 'John',
            lastName: 'Doe'
        },
        {
            firstName: 'Bryan',
            lastName: 'Lopez'
        },
        {
            firstName: 'Louise',
            lastName: 'Smith'
        }
    ];
}

/**
 * Datos que se van a insertar en la base de datos
 * @returns Matriz de libros
 */
function getBooks(): Array<Book>{
    return [
        {
            title: 'Libro Uno',
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: 'Libro Dos',
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: 'Libro Tres',
            isFiction: false,
            datePublished: new Date()
        }
    ]
}