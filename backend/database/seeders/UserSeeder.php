<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

/**
 * Seeder UserSeeder - Créer des utilisateurs de test
 */
class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'membership_number' => 'ADM001',
            'first_name' => 'Admin',
            'last_name' => 'Système',
            'email' => 'admin@bibliotheque.fr',
            'password' => Hash::make('Admin123!'),
            'role' => 'admin',
            'status' => 'actif',
        ]);

        // Bibliothécaire
        User::create([
            'membership_number' => 'BIB001',
            'first_name' => 'Sarah',
            'last_name' => 'Martin',
            'email' => 'sarah@bibliotheque.fr',
            'password' => Hash::make('Biblio123!'),
            'role' => 'bibliothecaire',
            'status' => 'actif',
        ]);

        // Lecteur
        User::create([
            'membership_number' => 'LEC001',
            'first_name' => 'Yanis',
            'last_name' => 'Dupont',
            'email' => 'yanis@example.com',
            'password' => Hash::make('Yanis123!'),
            'role' => 'lecteur',
            'status' => 'actif',
        ]);

        // TODO: Ajouter plus d'utilisateurs de test si besoin
    }
}
