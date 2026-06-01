/**
 * Composant Input - Champ de saisie réutilisable
 *
 * Affiche le label, l'input, et le message d'erreur en dessous.
 *
 * Usage :
 *   <Input id="email" label="Email" type="email" value={email}
 *     onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
 */

/**
 * @param {string}   label       - Texte du label (optionnel)
 * @param {string}   id          - ID HTML (lié au label via htmlFor)
 * @param {string}   type        - Type HTML ('text', 'email', 'password', etc.)
 * @param {string}   value       - Valeur courante
 * @param {Function} onChange    - Gestionnaire de changement
 * @param {string}   error       - Message d'erreur (null si pas d'erreur)
 * @param {string}   placeholder - Texte d'aide
 * @param {boolean}  required    - Champ obligatoire (affiche un *)
 * @param {boolean}  disabled    - Désactiver le champ
 * @param {string}   className   - Classes CSS supplémentaires sur l'input
 */
export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  ...rest
}) {
  const inputClasses = [
    'block w-full px-3 py-2 border rounded-lg text-sm transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    error
      ? 'border-red-400 bg-red-50 focus:ring-red-400'
      : 'border-gray-300 bg-white hover:border-gray-400',
    disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
    className,
  ].join(' ');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClasses}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
