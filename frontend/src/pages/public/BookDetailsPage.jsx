/**
 * Page BookDetailsPage - Détail d'un livre
 *
 * URL : /livre/:id
 *
 * Affiche :
 * - Couverture, titre, auteur, genre, éditeur, année, ISBN, résumé
 * - Badge de disponibilité (nombre d'exemplaires)
 * - Bouton "Réserver" si indisponible et utilisateur connecté
 * - Bouton "Enregistrer un emprunt" pour les bibliothécaires
 * - Invitation à se connecter pour les visiteurs
 */

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookService }        from '../../services/api/bookService';
import { reservationService } from '../../services/api/reservationService';
import { useAuth }            from '../../hooks/useAuth';
import { USER_ROLES }         from '../../utils/constants';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button       from '../../components/common/Button';

export default function BookDetailsPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [book, setBook]               = useState(null);
  const [isLoading, setIsLoading]     = useState(true);
  const [fetchError, setFetchError]   = useState(null);
  const [actionMsg, setActionMsg]     = useState(null);
  const [actionError, setActionError] = useState(null);
  const [isActing, setIsActing]       = useState(false);

  // Charger le livre dès que l'id change dans l'URL
  useEffect(() => {
    async function loadBook() {
      try {
        setIsLoading(true);
        const data = await bookService.getBookById(id);
        // Compatibilité : la réponse peut être { book: {...} } ou l'objet directement
        setBook(data.book ?? data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadBook();
  }, [id]);

  /**
   * Crée une réservation pour ce livre
   * Redirige vers la connexion si l'utilisateur n'est pas authentifié
   */
  async function handleReserve() {
    if (!isAuthenticated) {
      navigate('/connexion');
      return;
    }
    setIsActing(true);
    setActionError(null);
    setActionMsg(null);
    try {
      await reservationService.createReservation(book.id);
      setActionMsg('Réservation effectuée ! Vous serez notifié quand le livre sera disponible.');
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsActing(false);
    }
  }

  if (isLoading) {
    return <div className="py-20"><Loading message="Chargement du livre..." /></div>;
  }
  if (fetchError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorMessage message={fetchError} />
      </div>
    );
  }
  if (!book) return null;

  const isAvailable = book.available_quantity > 0;
  const isLibrarian = isAuthenticated &&
    [USER_ROLES.BIBLIOTHECAIRE, USER_ROLES.ADMIN].includes(user?.role);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Fil d'Ariane */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Fil d'Ariane">
        <Link to="/" className="hover:text-blue-600">Accueil</Link>
        <span className="mx-2">/</span>
        <Link to="/catalogue" className="hover:text-blue-600">Catalogue</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{book.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Couverture */}
        <div className="md:col-span-1">
          <div className="bg-blue-50 rounded-xl h-72 flex items-center justify-center overflow-hidden shadow-sm">
            {book.cover_image_url ? (
              <img
                src={book.cover_image_url}
                alt={`Couverture : ${book.title}`}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-7xl" aria-hidden="true">📖</span>
            )}
          </div>

          {/* Badge disponibilité */}
          <div className="mt-4">
            <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${
              isAvailable
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
            }`}>
              {isAvailable
                ? `Disponible (${book.available_quantity} exemplaire${book.available_quantity > 1 ? 's' : ''})`
                : 'Indisponible'}
            </span>
          </div>
        </div>

        {/* Informations et actions */}
        <div className="md:col-span-2 space-y-4">

          {book.genre && (
            <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
              {book.genre}
            </span>
          )}

          <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-lg text-gray-600">{book.author}</p>

          {/* Métadonnées */}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-gray-100 pt-4">
            {book.publisher && (
              <>
                <dt className="text-gray-500">Éditeur</dt>
                <dd className="text-gray-800">{book.publisher}</dd>
              </>
            )}
            {book.publication_year && (
              <>
                <dt className="text-gray-500">Année</dt>
                <dd className="text-gray-800">{book.publication_year}</dd>
              </>
            )}
            {book.isbn && (
              <>
                <dt className="text-gray-500">ISBN</dt>
                <dd className="text-gray-800 font-mono text-xs tracking-wide">{book.isbn}</dd>
              </>
            )}
          </dl>

          {/* Résumé */}
          {book.summary && (
            <div className="border-t border-gray-100 pt-4">
              <h2 className="font-semibold text-gray-800 mb-2">Résumé</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{book.summary}</p>
            </div>
          )}

          {/* Retours d'action (réservation) */}
          {actionMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3" role="status">
              {actionMsg}
            </div>
          )}
          {actionError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">
              {actionError}
            </div>
          )}

          {/* Zone d'actions selon le rôle */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
            {isAuthenticated ? (
              <>
                {/* Réservation si indisponible — tous les connectés */}
                {!isAvailable && (
                  <Button onClick={handleReserve} isLoading={isActing} variant="outline">
                    Réserver (liste d'attente)
                  </Button>
                )}

                {/* Enregistrement emprunt — bibliothécaires uniquement */}
                {isLibrarian && (
                  <Link to="/bibliothecaire/emprunts">
                    <Button>Enregistrer un emprunt</Button>
                  </Link>
                )}

                {/* Message si disponible et simple lecteur */}
                {isAvailable && !isLibrarian && (
                  <p className="text-sm text-gray-500 bg-blue-50 rounded-lg p-3 w-full">
                    Ce livre est disponible. Rendez-vous à la bibliothèque pour l'emprunter.
                  </p>
                )}
              </>
            ) : (
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700 w-full">
                <Link to="/connexion" className="font-medium underline">Connectez-vous</Link>
                {" pour emprunter ou réserver ce livre."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
