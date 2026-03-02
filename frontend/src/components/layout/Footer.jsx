/**
 * Composant Footer - Pied de page de l'application
 *
 * Contient :
 * - Liens légaux (mentions légales, confidentialité) - obligation RGPD
 * - Informations de contact de la bibliothèque
 * - Copyright
 */

import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Colonne 1 : Présentation */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📚</span>
              <span className="font-semibold text-white">Bibliothèque Municipale</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Votre bibliothèque numérique pour emprunter, réserver et découvrir des milliers de livres.
            </p>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <nav aria-label="Liens du pied de page">
            <h3 className="text-white font-semibold text-sm mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/"           className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/catalogue"  className="hover:text-white transition-colors">Catalogue</Link></li>
              <li><Link to="/connexion"  className="hover:text-white transition-colors">Mon compte</Link></li>
            </ul>
          </nav>

          {/* Colonne 3 : Informations légales (RGPD obligatoire) */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Informations légales</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mentions-legales"  className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link to="/confidentialite"   className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li>
                <a href="mailto:contact@bibliotheque.fr" className="hover:text-white transition-colors">
                  contact@bibliotheque.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
          © {currentYear} Bibliothèque Municipale. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
