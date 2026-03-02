<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * Controller AuthController - Gestion de l'authentification
 *
 * Routes :
 * POST /api/auth/register - Inscription d'un nouveau lecteur
 * POST /api/auth/login    - Connexion et génération du token Sanctum
 * POST /api/auth/logout   - Révocation du token
 * GET  /api/auth/me       - Profil de l'utilisateur connecté
 */
class AuthController extends Controller
{
    /**
     * Inscrit un nouveau lecteur
     *
     * Génère automatiquement un numéro d'adhérent unique.
     * Le statut est 'en_attente' jusqu'à validation par un bibliothécaire.
     *
     * @param  RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'membership_number' => User::generateMembershipNumber(),
            'first_name'        => $request->first_name,
            'last_name'         => $request->last_name,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'phone'             => $request->phone,
            'address'           => $request->address,
            'role'              => 'lecteur',
            'status'            => 'en_attente',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie. Votre compte est en attente de validation.',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    /**
     * Connecte un utilisateur et retourne un token Sanctum
     *
     * @param  LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        // Vérifier les identifiants
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect.',
            ], 401);
        }

        $user = Auth::user();

        // Vérifier que le compte est actif
        if ($user->status === 'suspendu') {
            Auth::logout();
            return response()->json([
                'message' => 'Votre compte a été suspendu. Contactez la bibliothèque.',
            ], 403);
        }

        // Révoquer les anciens tokens pour éviter l'accumulation
        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie.',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    /**
     * Déconnecte l'utilisateur (révoque le token actuel)
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        // Supprimer uniquement le token utilisé pour cette requête
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ]);
    }

    /**
     * Retourne le profil de l'utilisateur actuellement connecté
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}
