<?php

namespace App\Jobs;

use App\Models\Cita;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class EnviarRecordatorioWhatsApp implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $cita;

    /**
     * Crear una nueva instancia del trabajo.
     *
     * @param \App\Models\Cita $cita
     */
    public function __construct(Cita $cita)
    {
        $this->cita = $cita;
    }

    /**
     * Ejecutar el trabajo.
     *
     * @return void
     */
    public function handle()
    {
        // Aquí configuramos la lógica para enviar el mensaje de WhatsApp usando la API

        $telefono = $this->cita->telefono;
        $mensaje = "¡Hola! Recordatorio de tu cita programada para mañana.";

        // Utilizamos CallMeBot para enviar el mensaje
        $url = "https://api.callmebot.com/whatsapp.php";
        $response = Http::get($url, [
            'phone' => $telefono,
            'text' => $mensaje,
            'apikey' => '6601808', // Reemplaza con tu API Key de CallMeBot
        ]);

        // Verificar si el mensaje fue enviado correctamente
        if ($response->successful()) {
            \Log::info("Recordatorio enviado a: {$telefono}");
        } else {
            \Log::error("Error al enviar mensaje a: {$telefono}");
        }
    }
}
