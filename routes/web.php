<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookController;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('citas', CitaController::class);
    Route::put('/citas/{id}/estado/{estado}', [CitaController::class, 'updateEstado']);
    Route::delete('/citas', [CitaController::class, 'deleteCitas']);

    Route::get('books', [BookController::class, 'index']); // Obtener todos los libros
    Route::get('books/{id}', [BookController::class, 'show']); // Obtener un libro por ID
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::put('books/{id}', [BookController::class, 'update']); // Editar un libro
    Route::delete('books/{id}', [BookController::class, 'destroy']); // Eliminar un libro
});

require __DIR__.'/auth.php';
