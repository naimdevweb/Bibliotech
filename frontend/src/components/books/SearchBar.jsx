/**
 * Composant SearchBar - Barre de recherche des livres
 *
 * Intègre un debounce de 500ms pour ne pas appeler l'API à chaque frappe.
 *
 * Props :
 * @param {Function} onSearch     - Fonction appelée avec le terme de recherche
 * @param {string}   placeholder  - Texte affiché quand le champ est vide
 */

import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchBar({
  onSearch,
  placeholder = 'Rechercher par titre, auteur, ISBN...',
}) {
  const [inputValue, setInputValue] = useState('');

  // Debounce : on attend 500ms après la dernière frappe avant d'appeler onSearch
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative">
      {/* Icône loupe (décorative, aria-hidden) */}
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
        aria-hidden="true"
      >
        🔍
      </span>

      <input
        type="search"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Rechercher un livre"
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      />

      {/* Bouton effacer (si une valeur est saisie) */}
      {inputValue && (
        <button
          type="button"
          onClick={() => setInputValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Effacer la recherche"
        >
          ✕
        </button>
      )}
    </div>
  );
}
