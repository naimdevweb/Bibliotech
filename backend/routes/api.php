<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Bibliothèque Municipale
|--------------------------------------------------------------------------
|
| Architecture : SPA (React) + API REST (Laravel Sanctum)
|
| Groupes de routes :
| 1. Auth        - Publiques : inscription / connexion
| 2. Books       - Publiques en lecture, protégées en écriture
| 3. Loans       - Protégées (utilisateur + bibliothécaire)
| 4. Reservations - Protégées (utilisateur)
| 5. Users       - Protégées (admin/bibliothécaire)
| 6. Stats       - Protégées (admin)
|
*/

// ==========================================================================
// 1. AUTHENTIFICATION (routes publiques)
// ==========================================================================
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login',    [AuthController::class, 'login']);

    // Routes nécessitant un token valide
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me',      [AuthController::class, 'me']);
    });
});

// ==========================================================================
// 2. LIVRES
// ==========================================================================
Route::prefix('books')->group(function () {
    // Lecture publique (catalogue ouvert à tous)
    Route::get('/',        [BookController::class, 'index']);
    Route::get('/search',  [BookController::class, 'search']);
    Route::get('/{id}',    [BookController::class, 'show']);

    // Écriture réservée aux bibliothécaires/admins
    Route::middleware(['auth:sanctum', 'role:bibliothecaire,admin'])->group(function () {
        Route::post('/',       [BookController::class, 'store']);
        Route::put('/{id}',    [BookController::class, 'update']);
        Route::delete('/{id}', [BookController::class, 'destroy']);
    });
});

// ==========================================================================
// 3. EMPRUNTS (tous les utilisateurs connectés)
// ==========================================================================
Route::middleware('auth:sanctum')->prefix('loans')->group(function () {
    // Utilisateur : voir ses propres emprunts + prolonger
    Route::get('/my-loans',         [LoanController::class, 'myLoans']);
    Route::put('/{id}/extend',      [LoanController::class, 'extend']);

    // Bibliothécaire/Admin : gestion complète
    Route::middleware('role:bibliothecaire,admin')->group(function () {
        Route::get('/',              [LoanController::class, 'index']);
        Route::get('/overdue',       [LoanController::class, 'overdue']);
        Route::post('/',             [LoanController::class, 'store']);
        Route::put('/{id}/return',   [LoanController::class, 'returnBook']);
    });
});

// ==========================================================================
// 4. RÉSERVATIONS (utilisateurs connectés)
// ==========================================================================
Route::middleware('auth:sanctum')->prefix('reservations')->group(function () {
    Route::get('/my-reservations',  [ReservationController::class, 'myReservations']);
    Route::post('/',                [ReservationController::class, 'store']);
    Route::delete('/{id}',          [ReservationController::class, 'destroy']);

    // File d'attente : visible par bibliothécaire
    Route::middleware('role:bibliothecaire,admin')
        ->get('/queue/{bookId}',    [ReservationController::class, 'queue']);
});

// ==========================================================================
// 5. GESTION DES UTILISATEURS (admin/bibliothécaire)
// ==========================================================================
Route::middleware(['auth:sanctum', 'role:bibliothecaire,admin'])->prefix('users')->group(function () {
    Route::get('/',        [UserController::class, 'index']);
    Route::get('/{id}',    [UserController::class, 'show']);
    Route::put('/{id}',    [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

// ==========================================================================
// 6. STATISTIQUES (admin uniquement)
// ==========================================================================
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('stats')->group(function () {
    Route::get('/dashboard', [StatsController::class, 'dashboard']);
    Route::get('/books',     [StatsController::class, 'books']);
    Route::get('/loans',     [StatsController::class, 'loans']);
    Route::get('/users',     [StatsController::class, 'users']);
});
