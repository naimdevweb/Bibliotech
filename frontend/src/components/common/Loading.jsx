/**
 * Composant Loading - Indicateur de chargement
 *
 * @param {string} message - Texte affiché sous le spinner (optionnel)
 * @param {string} size    - 'sm' | 'md' | 'lg'
 */
export default function Loading({ message = 'Chargement...', size = 'md' }) {
  const sizeClasses = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8" role="status" aria-live="polite">
      <svg
        className={`animate-spin text-blue-600 ${sizeClasses[size]}`}
        fill="none" viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
}
