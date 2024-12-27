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
 *     title="API de Gestión de Citas",
 *     version="1.0.0",
 *     description="Esta es la API para gestionar las citas en el sistema.",
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


 
    public function index()
    {
        // Obtén las citas con el profesional relacionado para el usuario autenticado
        $citas = Cita::with('profesional')->where('user_id', Auth::id())->get();

        // Obtén la lista de todos los profesionales
        $profesionales = Profesional::all();

        // Pasar tanto las citas como los profesionales al frontend
        return Inertia::render('Citas/Index', [
            'citas' => $citas->toArray(),
            'profesionales' => $profesionales->toArray(),
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/citas/create",
     *     summary="Mostrar formulario para crear una nueva cita",
     *     tags={"Citas"},
     *     @OA\Response(
     *         response=200,
     *         description="Formulario para crear cita",
     *     ),
     *     security={{"BearerAuth": {}}}
     * )
     */
    public function create()
    {
        // Obtener todos los profesionales disponibles
        $profesionales = Profesional::all();
        
        // Retornar la vista de crear cita con los profesionales disponibles
        return Inertia::render('Citas/Create', [
            'profesionales' => $profesionales,
        ]);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'fecha_hora' => 'required|date',
            'descripcion' => 'required',
            'telefono' => 'required|string',
            'profesional_id' => 'required|exists:profesionales,id',
        ]);

        // Crear la cita
        $cita = Cita::create([
            'fecha_hora' => $request->fecha_hora,
            'descripcion' => $request->descripcion,
            'telefono' => $request->telefono,
            'user_id' => Auth::id(),
            'profesional_id' => $request->profesional_id,
        ]);

        // Redirigir al listado de citas con mensaje de éxito
        return redirect()->route('citas.index')->with('success', 'Cita creada exitosamente.');
    }

   
    public function show(Cita $cita)
    {
        // Retornar los detalles de la cita a la vista
        return Inertia::render('Citas/Show', [
            'cita' => $cita,
        ]);
    }

    
    public function updateEstado($id, $estado)
    {
        // Buscar la cita por id
        $cita = Cita::findOrFail($id);
    
        // Actualizar el estado
        $cita->estado = $estado;
        $cita->save();
    
        // Responder con un mensaje de éxito
        return redirect()->route('citas.index')->with('estadoActualizado', 'Estado actualizado correctamente');
    }

    /**
 * @OA\Post(
 *     path="/api/citas/delete",
 *     summary="Eliminar citas seleccionadas",
 *     tags={"Citas"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"ids"},
 *             @OA\Property(
 *                 property="ids", 
 *                 type="array", 
 *                 items=@OA\Items(type="integer"),
 *                 description="Lista de IDs de las citas a eliminar"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Citas eliminadas correctamente",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Citas eliminadas correctamente")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Error en los datos proporcionados (por ejemplo, IDs no válidos)",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="error", type="string", example="Los IDs proporcionados no son válidos o no existen")
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="No autorizado",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="error", type="string", example="No autorizado. Token de acceso inválido o expirado.")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error en el servidor al intentar eliminar las citas",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="error", type="string", example="Error interno del servidor. Intente nuevamente.")
 *         )
 *     ),
 *     security={{"BearerAuth": {}}}
 * )
 */
    public function deleteCitas(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:citas,id',
        ]);
    
        // Obtener los IDs de las citas que se van a eliminar
        $idsToDelete = $request->input('ids');
    
        // Eliminar las citas de la base de datos
        Cita::whereIn('id', $idsToDelete)->delete();
    
        // Redirigir con un mensaje de éxito
        return redirect()->route('citas.index')->with('citaEliminada', 'Citas eliminadas correctamente');
    }
}
