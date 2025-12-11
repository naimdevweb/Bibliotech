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
    public function handle(Request $request, Closure $next, string $role)
    {
        // TODO: Vérifier que l'utilisateur connecté a le bon rôle
        // if (! $request->user() || $request->user()->role !== $role) {
        //     return response()->json(['error' => 'Unauthorized'], 403);
        // }

        return $next($request);
    }
}
