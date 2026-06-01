/**
 * Composant ErrorMessage - Affiche un message d'erreur
 *
 * @param {string}   message - Message à afficher
 * @param {Function} onRetry - Callback pour le bouton "Réessayer" (optionnel)
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3" role="alert">
      <span className="text-red-500 text-lg leading-none" aria-hidden="true">⚠</span>
      <div className="flex-1">
        <p className="text-sm text-red-700">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-xs text-red-600 underline hover:no-underline"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}
