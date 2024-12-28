<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenApi\Annotations as OA;

class BookController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/libros",
     *     summary="Obtener todos los libros",
     *     tags={"Libros"},
     *     @OA\Response(
     *         response=200,
     *         description="Listado de libros",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Book")  // Referencia al esquema Book
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function index()
    {
        $books = Book::all();
        return Inertia::render('Libros/Index', [
            'libros' => $books,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/libros",
     *     summary="Crear un nuevo libro",
     *     tags={"Libros"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "author", "publicationYear", "genre"},
     *             @OA\Property(property="title", type="string", example="El Gran Libro"),
     *             @OA\Property(property="author", type="string", example="Juan Pérez"),
     *             @OA\Property(property="publicationYear", type="integer", example=2023),
     *             @OA\Property(property="genre", type="string", example="Ficción")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Libro creado exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Datos de entrada inválidos",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="Los datos proporcionados son incorrectos")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publicationYear' => 'required|integer|min:1901|max:2155',
            'genre' => 'required|string|max:255',
        ]);

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'publication_year' => $request->publicationYear,
            'genre' => $request->genre,
        ]);

        return redirect()->route('books.index')->with('success', 'Libro creado exitosamente.');
    }

    /**
     * @OA\Put(
     *     path="/api/libros/{id}",
     *     summary="Editar un libro",
     *     tags={"Libros"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del libro a editar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "author", "publicationYear", "genre"},
     *             @OA\Property(property="title", type="string", example="El Gran Libro Editado"),
     *             @OA\Property(property="author", type="string", example="Juan Pérez"),
     *             @OA\Property(property="publicationYear", type="integer", example=2024),
     *             @OA\Property(property="genre", type="string", example="Aventura")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Libro actualizado exitosamente",
     *         @OA\JsonContent(ref="#/components/schemas/Book")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Libro no encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="Libro no encontrado")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publicationYear' => 'required|integer',
            'genre' => 'required|string|max:255',
        ]);

        $book->update($validated);

        return redirect()->route('books.index')->with('success', 'Libro actualizado exitosamente.');
    }

    /**
     * @OA\Delete(
     *     path="/api/libros/{id}",
     *     summary="Eliminar un libro",
     *     tags={"Libros"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del libro a eliminar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Libro eliminado exitosamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Libro eliminado exitosamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Libro no encontrado",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="Libro no encontrado")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }

        $book->delete();
        return redirect()->route('books.index')->with('success', 'Libro eliminado exitosamente.');
    }
}
