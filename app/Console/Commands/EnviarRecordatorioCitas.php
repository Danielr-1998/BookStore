<?php

namespace App\Console\Commands;

use App\Models\Cita;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class EnviarRecordatorioCitas extends Command
{
    /**
     * El nombre y la firma del comando de consola.
     *
     * @var string
     */
    protected $signature = 'citas:recordatorio';

    /**
     * La descripción del comando.
     *
     * @var string
     */
    protected $description = 'Enviar recordatorios de citas 24 horas antes.';

    /**
     * Ejecutar el comando.
     *
     * @return void
     */
    public function handle()
    {
        // Obtener las citas que ocurren dentro de 24 horas (mañana)
        $citas = Cita::whereBetween('fecha_hora', [Carbon::now()->addDay()->startOfDay(), Carbon::now()->addDay()->endOfDay()])
                     ->get();

        // Recorrer todas las citas y enviar el recordatorio
        foreach ($citas as $cita) {
            $this->enviarRecordatorio($cita);
        }

        $this->info('Recordatorios enviados exitosamente.');
    }

    /**
     * Enviar el recordatorio de la cita por WhatsApp.
     *
     * @param \App\Models\Cita $cita
     * @return void
     */
   
private function enviarRecordatorio(Cita $cita)
{
    // Obtener el teléfono y la fecha de la cita
    $telefono = $cita->telefono;

    // Convertir la fecha de la cita a Carbon si no se ha convertido automáticamente
    $fechaHora = Carbon::parse($cita->fecha_hora)->format('d/m/Y H:i');

    $mensaje = urlencode("¡Hola! Te recordamos que tienes una cita el {$fechaHora} con " . $cita->profesional->nombre);

    // Llamada al API de WhatsApp usando CallMeBot
    $url = "https://api.callmebot.com/whatsapp.php?phone={$telefono}&text={$mensaje}&apikey=6601808";

    // Realizar la solicitud HTTP
    $response = Http::get($url);

    // Si la respuesta es exitosa, imprime el éxito, si no, muestra el error.
    if ($response->successful()) {
        $this->info("Recordatorio enviado a {$telefono}.");
    } else {
        $this->error("No se pudo enviar el recordatorio a {$telefono}. Error: {$response->body()}");
    }
}
}
