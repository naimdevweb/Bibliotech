/**
 * Utilitaires de formatage de dates
 */

/**
 * Formate une date en français : 01/12/2024
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

/**
 * Formate une date en français avec heure : 01/12/2024 à 14:30
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateTime(date) {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/**
 * Calcule le nombre de jours entre aujourd'hui et une date cible
 * Positif = dans le futur, négatif = dans le passé
 * @param {string|Date} date
 * @returns {number}
 */
export function daysUntil(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

/**
 * Retourne une chaîne lisible selon l'échéance :
 *   "dans 3 jours", "aujourd'hui", "en retard de 2 jours"
 * @param {string|Date} dueDate
 * @returns {string}
 */
export function formatDueDate(dueDate) {
  const days = daysUntil(dueDate);
  if (days > 1)   return `dans ${days} jours`;
  if (days === 1) return 'demain';
  if (days === 0) return "aujourd'hui";
  return `en retard de ${Math.abs(days)} jour${Math.abs(days) > 1 ? 's' : ''}`;
}
