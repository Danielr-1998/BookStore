<?php

namespace App\Console;

use App\Console\Commands\EnviarRecordatorioCitas;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Los comandos Artisan proporcionados por tu aplicación.
     *
     * @var array
     */
    protected $commands = [
        EnviarRecordatorioCitas::class,
    ];

    /**
     * Definir la programación de los comandos de la aplicación.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Ejecuta el comando de recordatorio cada día a las 9 AM
        $schedule->command('citas:recordatorio')->dailyAt('09:00');
    }

    /**
     * Registrar los comandos para la aplicación.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }
}
