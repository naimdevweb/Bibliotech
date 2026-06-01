/**
 * Composant Button - Bouton réutilisable
 *
 * Variantes : primary | secondary | danger | success | outline
 * Tailles   : sm | md | lg
 *
 * Usage :
 *   <Button variant="danger" size="sm" onClick={handleDelete}>Supprimer</Button>
 *   <Button type="submit" isLoading={isLoading}>Enregistrer</Button>
 */

const VARIANT_CLASSES = {
  primary:   'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50',
  danger:    'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
  success:   'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300',
  outline:   'border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

/**
 * @param {string}    variant   - Variante visuelle (default: 'primary')
 * @param {string}    size      - Taille (default: 'md')
 * @param {boolean}   disabled  - Désactiver le bouton
 * @param {boolean}   isLoading - Affiche un spinner et désactive le clic
 * @param {string}    type      - Type HTML ('button' | 'submit')
 * @param {Function}  onClick   - Gestionnaire de clic
 * @param {ReactNode} children  - Contenu du bouton
 * @param {string}    className - Classes CSS supplémentaires
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  type = 'button',
  onClick,
  children,
  className = '',
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed';
  const variantClasses = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const sizeClasses    = SIZE_CLASSES[size]    || SIZE_CLASSES.md;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
    >
      {isLoading ? '⏳ Chargement...' : children}
    </button>
  );
}
