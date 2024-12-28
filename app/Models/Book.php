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

}