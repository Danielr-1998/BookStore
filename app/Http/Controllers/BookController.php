<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Mostrar el listado de todos los libros.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Obtener todos los libros desde la base de datos
        $books = Book::all();
        // Pasar los libros a la vista Inertia
        return Inertia::render('Libros/Index', [
            'libros' => $books,
        ]);
    }

    /**
     * Crear un nuevo libro.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publicationYear' => 'required|integer|min:1901|max:2155',  
            'genre' => 'required|string|max:255',
        ]);

        // Crear el libro
        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'publication_year' => $request->publicationYear,
            'genre' => $request->genre,
        ]);

        // Retornar los datos del libro y los libros actuales
        $books = Book::all();
        return Inertia::render('Libros/Index', [
            'libros' => $books,
            'success' => 'Libro creado exitosamente!',
        ]);
    }

    /**
     * Editar un libro existente.
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        // Validación de los datos
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publicationYear' => 'required|integer',
            'genre' => 'required|string|max:255',
        ]);

        // Actualizar el libro
        $book->update($validated);

        $books = Book::all();

        return Inertia::render('Libros/Index', [
            'libros' => $books,
        ]);    }

    /**
     * Eliminar un libro.
     */
    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        // Eliminar el libro
        $book->delete();
        $books = Book::all();

        return Inertia::render('Libros/Index', [
            'libros' => $books,
        ]);    }
}
