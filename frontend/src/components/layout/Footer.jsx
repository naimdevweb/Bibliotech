/**
 * Composant Footer - Pied de page
 *
 * Contient :
 * - Identité de la bibliothèque
 * - Navigation rapide
 * - Liens légaux (RGPD, CGU, mentions légales)
 */
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">

          {/* Identité */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📚</span>
              <span className="font-bold text-white">Bibliothèque Municipale</span>
            </div>
            <p className="text-sm text-gray-400">
              Votre espace culturel en ligne. Empruntez, réservez, découvrez.
            </p>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/"           className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/catalogue"  className="hover:text-white transition-colors">Catalogue</Link></li>
              <li><Link to="/inscription" className="hover:text-white transition-colors">S'inscrire</Link></li>
              <li><Link to="/connexion"  className="hover:text-white transition-colors">Se connecter</Link></li>
            </ul>
          </div>

          {/* Liens légaux — RGPD */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Informations légales</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#mentions-legales" className="hover:text-white transition-colors">Mentions légales</a></li>
              <li><a href="#confidentialite"  className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#cgu"              className="hover:text-white transition-colors">CGU</a></li>
              <li>
                <Link to="/mon-compte/profil" className="hover:text-white transition-colors">
                  Gérer mes données (RGPD)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 text-xs text-gray-500 text-center">
          © {year} Bibliothèque Municipale. Tous droits réservés.
          {' '}Données personnelles protégées conformément au RGPD.
        </div>
      </div>
    </footer>
  );
}
