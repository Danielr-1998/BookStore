<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Agregar el campo "telefono" a la tabla "citas"
        Schema::table('citas', function (Blueprint $table) {
            $table->string('telefono')->nullable(); // Agrega un campo 'telefono' de tipo string, puede ser nullable
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Eliminar el campo "telefono" si revertimos la migración
        Schema::table('citas', function (Blueprint $table) {
            $table->dropColumn('telefono');
        });
    }
};