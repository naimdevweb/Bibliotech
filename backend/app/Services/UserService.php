<?php

namespace App\Services;

use App\Models\User;

/**
 * Service UserService - Logique métier des utilisateurs
 */
class UserService
{
    /**
     * Récupère tous les utilisateurs (avec filtres)
     *
     * @param array $filters - Filtres : rôle, statut, recherche
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getAllUsers(array $filters = [])
    {
        // TODO: Implémenter
    }

    /**
     * Active un compte utilisateur (bibliothécaire)
     *
     * @param int $userId
     * @return User
     */
    public function activateUser(int $userId): User
    {
        // TODO: Changer status de 'en_attente' à 'actif'
        // TODO: Envoyer email de confirmation
    }

    /**
     * Suspend un compte (retards trop nombreux)
     *
     * @param int $userId
     * @return User
     */
    public function suspendUser(int $userId): User
    {
        // TODO: Changer status à 'suspendu'
    }

    /**
     * Supprime un compte (RGPD)
     *
     * Vérifications :
     * - Aucun emprunt actif
     *
     * @param int $userId
     * @return bool
     * @throws \Exception Si emprunts actifs
     */
    public function deleteUser(int $userId): bool
    {
        // TODO: Vérifier aucun emprunt actif
        // TODO: Supprimer l'utilisateur
    }

    /**
     * Exporte les données utilisateur (RGPD)
     *
     * @param int $userId
     * @return array JSON avec toutes les données
     */
    public function exportUserData(int $userId): array
    {
        // TODO: Récupérer toutes les données :
        // - Infos perso
        // - Historique emprunts
        // - Réservations
        // - Retourner en JSON
    }
}
