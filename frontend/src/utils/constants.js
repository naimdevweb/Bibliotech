/**
 * Constantes globales de l'application
 * Centralisées ici pour éviter la duplication et faciliter la maintenance.
 */

export const USER_ROLES = {
  LECTEUR:        'lecteur',
  BIBLIOTHECAIRE: 'bibliothecaire',
  ADMIN:          'admin',
};

export const USER_STATUS = {
  EN_ATTENTE: 'en_attente',
  ACTIF:      'actif',
  SUSPENDU:   'suspendu',
};

export const LOAN_STATUS = {
  EN_COURS:  'en_cours',
  TERMINE:   'termine',
  EN_RETARD: 'en_retard',
};

export const RESERVATION_STATUS = {
  EN_ATTENTE: 'en_attente',
  DISPONIBLE: 'disponible',
  EXPIREE:    'expiree',
  ANNULEE:    'annulee',
};

// Règles métier (miroir des constantes backend)
export const MAX_LOANS_PER_USER      = 5;
export const LOAN_DURATION_DAYS      = 21;
export const MAX_LOAN_EXTENSIONS     = 3;
export const RESERVATION_EXPIRY_DAYS = 7;

// Genres du catalogue
export const BOOK_GENRES = [
  'Roman', 'Science-Fiction', 'Thriller', 'Policier', 'Fantasy',
  'Histoire', 'Biographie', 'Essai', 'Développement personnel',
  'Jeunesse', 'BD', 'Manga', 'Sciences', 'Philosophie', 'Art',
];

export const ITEMS_PER_PAGE = 20;
