<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Profesional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="API de Gestión de Reservas",
 *     version="1.0.0",
 *     description="Esta es la API para gestionar las reservas en el sistema.",
 *     termsOfService="http://swagger.io/terms/",
 *     @OA\Contact(
 *         email="contacto@tusitio.com"
 *     ),
 *     @OA\License(
 *         name="MIT",
 *         url="https://opensource.org/licenses/MIT"
 *     )
 * )
 */
class CitaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * @OA\Get(
     *     path="/api/citas",
     *     summary="Mostrar todas las citas del usuario autenticado",
     *     tags={"Reservas"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de citas",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="fecha_hora", type="string", example="2024-12-25 14:00"),
     *                 @OA\Property(property="descripcion", type="string", example="Revisión médica"),
     *                 @OA\Property(property="telefono", type="string", example="123456789"),
     *                 @OA\Property(property="profesional_id", type="integer", example=1),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="estado", type="string", example="pendiente")
     *             )
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function index()
    {
        $citas = Cita::with('profesional')->where('user_id', Auth::id())->get();
        $profesionales = Profesional::all();

        return Inertia::render('Citas/Index', [
            'citas' => $citas->toArray(),
            'profesionales' => $profesionales->toArray(),
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/citas/create",
     *     summary="Mostrar formulario para crear una nueva cita",
     *     tags={"Reservas"},
     *     @OA\Response(
     *         response=200,
     *         description="Formulario para crear cita",
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function create()
    {
        $profesionales = Profesional::all();
        return Inertia::render('Citas/Create', [
            'profesionales' => $profesionales,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/citas",
     *     summary="Crear una nueva cita",
     *     tags={"Reservas"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"fecha_hora", "descripcion", "telefono", "profesional_id"},
     *             @OA\Property(property="fecha_hora", type="string", format="date-time", example="2024-12-25 14:00"),
     *             @OA\Property(property="descripcion", type="string", example="Revisión médica"),
     *             @OA\Property(property="telefono", type="string", example="123456789"),
     *             @OA\Property(property="profesional_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Cita creada exitosamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Cita creada exitosamente.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Datos inválidos",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="Los datos proporcionados son inválidos.")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'fecha_hora' => 'required|date',
            'descripcion' => 'required',
            'telefono' => 'required|string',
            'profesional_id' => 'required|exists:profesionales,id',
        ]);

        $cita = Cita::create([
            'fecha_hora' => $request->fecha_hora,
            'descripcion' => $request->descripcion,
            'telefono' => $request->telefono,
            'user_id' => Auth::id(),
            'profesional_id' => $request->profesional_id,
        ]);

        return redirect()->route('citas.index')->with('success', 'Cita creada exitosamente.');
    }

    public function show(Cita $cita)
    {
        return Inertia::render('Citas/Show', [
            'cita' => $cita,
        ]);
    }

    public function updateEstado($id, $estado)
    {
        $cita = Cita::findOrFail($id);
        $cita->estado = $estado;
        $cita->save();

        return redirect()->route('citas.index')->with('estadoActualizado', 'Estado actualizado correctamente');
    }

    /**
     * @OA\Post(
     *     path="/api/citas/delete",
     *     summary="Eliminar reservas seleccionadas",
     *     tags={"Reservas"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"ids"},
     *             @OA\Property(
     *                 property="ids", 
     *                 type="array", 
     *                 items=@OA\Items(type="integer"),
     *                 description="Lista de IDs de las reservas a eliminar"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="reservas eliminadas correctamente",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="reservas eliminadas correctamente")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en los datos proporcionados",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="error", type="string", example="IDs inválidos o no existentes")
     *         )
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function deleteCitas(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:citas,id',
        ]);

        $idsToDelete = $request->input('ids');
        Cita::whereIn('id', $idsToDelete)->delete();

        return redirect()->route('citas.index')->with('citaEliminada', 'Citas eliminadas correctamente');
    }
}
