<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Inertia\Inertia;  // Asegúrate de importar Inertia

class BookController extends Controller
{
    /**
     * Mostrar el listado de todos los libros.
     */
    public function index()
    {
        // Obtener todos los libros
        $books = Book::all();
        
        // Usar Inertia para renderizar la vista 'Libros/Index'
        return Inertia::render('Libros/Index', [
            'libros' => $books
        ]);
    }

    /**
     * Mostrar un libro específico.
     */
    public function show($id)
    {
        $book = Book::find($id);
        if ($book) {
            // Mostrar los detalles de un libro específico
            return Inertia::render('Libros/Show', [
                'book' => $book
            ]);
        }

        return response()->json(['message' => 'Book not found'], 404);
    }

    /**
     * Crear un nuevo libro.
     */
    public function store(Request $request)
    {
        // Validación de los datos
        $request->validate([
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'anio_publicacion' => 'required|integer',
            'genero' => 'required|string|max:255',
        ]);

        // Crear el libro
        Book::create([
            'titulo' => $request->titulo,
            'autor' => $request->autor,
            'anio_publicacion' => $request->anio_publicacion,
            'genero' => $request->genero,
        ]);

        // Redirigir a la lista de libros utilizando Inertia
        return redirect()->route('books.index');
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
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'anio_publicacion' => 'required|integer',
            'genero' => 'required|string|max:255',
        ]);

        // Actualizar el libro
        $book->update($validated);

        // Devolver la respuesta como JSON (puedes redirigir o hacer otra acción)
        return response()->json($book);
    }

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

        // Devolver un mensaje de éxito
        return response()->json(['message' => 'Book deleted successfully']);
    }
}