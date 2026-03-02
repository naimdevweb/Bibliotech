/**
 * Hook useDebounce - Retarde l'exécution d'une valeur changeante
 *
 * Utilisé pour éviter trop d'appels API lors de la saisie dans la recherche.
 * Exemple : si l'utilisateur tape vite, on n'appelle l'API qu'après 500ms de pause.
 *
 * Exemple d'utilisation :
 *   const debouncedQuery = useDebounce(searchInput, 500);
 *   useEffect(() => { searchBooks(debouncedQuery); }, [debouncedQuery]);
 *
 * @param {*}      value - La valeur à "debouncer" (généralement la saisie utilisateur)
 * @param {number} delay - Délai d'attente en ms avant de retourner la valeur (défaut 500)
 * @returns {*}    La valeur stabilisée après le délai
 */

import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Programmer la mise à jour après le délai
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nettoyer le timer si la valeur change à nouveau avant le délai
    // (c'est ici que le "debounce" se produit)
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
