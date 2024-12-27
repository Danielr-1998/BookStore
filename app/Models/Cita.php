<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Cita extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_hora',
        'descripcion',
        'telefono',
        'user_id',
        'profesional_id',
    ];

    // Define que el campo 'fecha_hora' debe ser tratado como una fecha
    protected $dates = [
        'fecha_hora',  // Esto asegura que fecha_hora se trate como un objeto Carbon
    ];

    /**
     * Define la relación con el modelo Profesional (una cita pertenece a un profesional)
     */
    public function profesional()
    {
        return $this->belongsTo(Profesional::class);
    }
}
