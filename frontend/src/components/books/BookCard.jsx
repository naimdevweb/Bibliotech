/**
 * Composant BookCard - Carte d'affichage d'un livre dans le catalogue
 *
 * Props :
 * @param {Object} book - Le livre à afficher
 *   - id, title, author, genre, cover_image_url, available_quantity
 */

import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  const isAvailable = book.available_quantity > 0;

  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Image de couverture */}
      <div className="bg-blue-50 rounded-t-xl h-48 flex items-center justify-center overflow-hidden">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={`Couverture du livre ${book.title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl" aria-hidden="true">📕</span>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Genre */}
        {book.genre && (
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
            {book.genre}
          </span>
        )}

        {/* Titre */}
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
          {book.title}
        </h3>

        {/* Auteur */}
        <p className="text-gray-400 text-xs mb-3">{book.author}</p>

        {/* Badge disponibilité */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium w-fit mb-4 ${
            isAvailable
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-600'
          }`}
          aria-label={isAvailable ? 'Livre disponible' : 'Livre indisponible'}
        >
          {isAvailable
            ? `Disponible (${book.available_quantity})`
            : 'Indisponible'}
        </span>

        {/* Bouton vers la page détail */}
        <Link
          to={`/livre/${book.id}`}
          className="mt-auto text-center text-sm font-medium bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voir le livre
        </Link>
      </div>
    </article>
  );
}
