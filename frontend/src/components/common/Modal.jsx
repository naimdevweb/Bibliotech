/**
 * Composant Modal - Fenêtre modale réutilisable
 *
 * Usage :
 *   <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Mon titre">
 *     <p>Contenu...</p>
 *   </Modal>
 *
 * @param {boolean}   isOpen   - Afficher ou non la modal
 * @param {Function}  onClose  - Appelée lors de la fermeture (clic croix ou fond)
 * @param {string}    title    - Titre affiché en en-tête
 * @param {ReactNode} children - Contenu
 * @param {string}    size     - 'sm' | 'md' | 'lg' | 'xl'
 */
export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  // Fermer en cliquant sur le fond (mais pas sur la fenêtre elle-même)
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}>

        {/* En-tête */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
            aria-label="Fermer la fenêtre"
          >
            ✕
          </button>
        </div>

        {/* Corps (scrollable si long) */}
        <div className="p-5 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
