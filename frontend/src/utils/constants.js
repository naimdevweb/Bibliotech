/**
 * Constantes de l'application
 */

export const MAX_LOANS_PER_USER = 5;
export const LOAN_DURATION_DAYS = 21;
export const MAX_LOAN_EXTENSIONS = 3;
export const RESERVATION_EXPIRY_DAYS = 7;

export const USER_ROLES = {
  LECTEUR: 'lecteur',
  BIBLIOTHECAIRE: 'bibliothecaire',
  ADMIN: 'admin',
};

export const LOAN_STATUS = {
  EN_COURS: 'en_cours',
  TERMINE: 'termine',
  EN_RETARD: 'en_retard',
};

export const RESERVATION_STATUS = {
  EN_ATTENTE: 'en_attente',
  DISPONIBLE: 'disponible',
  EXPIREE: 'expiree',
};

export const BOOK_GENRES = [
  'Roman',
  'Science-Fiction',
  'Thriller',
  'Policier',
  'Fantasy',
  'Histoire',
  'Biographie',
  'Essai',
  'Développement personnel',
  'Jeunesse',
  'BD',
  'Manga',
];
