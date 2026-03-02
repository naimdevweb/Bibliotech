<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * Middleware CheckRole - Vérification des rôles
 *
 * Utilisation dans routes/api.php :
 * Route::middleware(['auth:sanctum', 'role:bibliothecaire'])->group(...);
 * Route::middleware(['auth:sanctum', 'role:admin'])->group(...);
 */
class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    /**
     * Vérifie que l'utilisateur connecté possède l'un des rôles autorisés
     *
     * Exemple : middleware('role:bibliothecaire,admin')
     * → accepte les utilisateurs avec le rôle 'bibliothecaire' OU 'admin'
     *
     * @param  string ...$roles Un ou plusieurs rôles autorisés
     */
    public function handle(Request $request, Closure $next, string ...$roles)
    {
        $user = $request->user();

        if (!$user || !in_array($user->role, $roles)) {
            return response()->json([
                'message' => 'Accès refusé. Vous n\'avez pas les droits nécessaires.',
            ], 403);
        }

        return $next($request);
    }
}
