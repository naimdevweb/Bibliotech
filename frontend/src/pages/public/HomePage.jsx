/**
 * Page HomePage - Page d'accueil de la bibliothèque
 *
 * Sections :
 * - Bannière héro avec boutons CTA
 * - Chiffres clés (100 000 livres, horaires...)
 * - Aperçu du catalogue (derniers livres ajoutés)
 * - Appel à l'action inscription si non connecté
 */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useBooks } from '../../hooks/useBooks';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { books, isLoading, fetchBooks } = useBooks();

  // Charger les 6 premiers livres pour l'aperçu
  useEffect(() => {
    fetchBooks(1, { limit: 6 });
  }, [fetchBooks]);

  return (
    <div>
      {/* ------------------------------------------------------------------ */}
      {/* Section Hero - Bannière principale                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue à la Bibliothèque Municipale
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explorez notre catalogue de 100 000 livres, empruntez et réservez
            en ligne depuis chez vous.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalogue"
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Parcourir le catalogue
            </Link>

            {!isAuthenticated && (
              <Link
                to="/inscription"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Créer un compte gratuit
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Chiffres clés                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '100 000+', label: 'Livres disponibles' },
            { value: '21 jours', label: 'Durée d\'emprunt' },
            { value: '5 max',    label: 'Emprunts simultanés' },
            { value: 'Gratuit',  label: 'Accès au catalogue' },
          ].map(({ value, label }) => (
            <div key={label} className="p-4">
              <p className="text-3xl font-bold text-blue-600">{value}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Aperçu du catalogue                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Dernières acquisitions</h2>
            <Link to="/catalogue" className="text-blue-600 hover:underline text-sm font-medium">
              Voir tout le catalogue →
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                // Squelette de chargement (placeholder animé)
                <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-32 mb-3" />
                  <div className="bg-gray-200 rounded h-3 mb-2" />
                  <div className="bg-gray-200 rounded h-3 w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {books.map(book => (
                <Link
                  key={book.id}
                  to={`/livre/${book.id}`}
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow group"
                >
                  {/* Couverture ou placeholder */}
                  <div className="bg-blue-50 rounded-lg h-32 mb-3 flex items-center justify-center overflow-hidden">
                    {book.cover_image_url ? (
                      <img
                        src={book.cover_image_url}
                        alt={`Couverture de ${book.title}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-3xl">📕</span>
                    )}
                  </div>

                  <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{book.author}</p>

                  {/* Badge disponibilité */}
                  <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                    book.available_quantity > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {book.available_quantity > 0 ? 'Disponible' : 'Indisponible'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA Inscription (non connecté uniquement)                           */}
      {/* ------------------------------------------------------------------ */}
      {!isAuthenticated && (
        <section className="bg-blue-50 py-16 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Rejoignez la bibliothèque en ligne
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Créez votre compte gratuit pour emprunter des livres, faire des réservations
            et gérer vos emprunts depuis chez vous.
          </p>
          <Link
            to="/inscription"
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors inline-block"
          >
            S&apos;inscrire gratuitement
          </Link>
        </section>
      )}
    </div>
  );
}
