<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Book extends Model
{
    use HasFactory;

    // Definir la tabla asociada al modelo (opcional si el nombre de la tabla es plural y sigue la convención)
    protected $table = 'books';

    // Definir los campos que son asignables en masa
    protected $fillable = [
        'title',
        'author',
        'publication_year',
        'genre',
    ];

    // Si deseas agregar relaciones, aquí es donde las defines.
    // Por ejemplo, si cada libro tiene una categoría, la relación sería algo como:
    // public function category() {
    //     return $this->belongsTo(Category::class);
    // }

    // Puedes definir más configuraciones o métodos adicionales para el modelo si es necesario.
}