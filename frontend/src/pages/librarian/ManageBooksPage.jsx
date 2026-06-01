/**
 * Page ManageBooksPage - Gestion du catalogue de livres
 *
 * Fonctionnalités :
 * - Recherche et filtrage du catalogue
 * - Ajouter un livre (modal de formulaire)
 * - Modifier un livre (modal pré-remplie)
 * - Supprimer un livre (avec confirmation)
 */

import { useState, useEffect } from 'react';
import { bookService }   from '../../services/api/bookService';
import { BOOK_GENRES }   from '../../utils/constants';
import Loading      from '../../components/common/Loading';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button       from '../../components/common/Button';
import Input        from '../../components/common/Input';
import Modal        from '../../components/common/Modal';
import Pagination   from '../../components/common/Pagination';

/** Formulaire de création/modification d'un livre */
function BookForm({ initialData = {}, onSubmit, isSubmitting }) {
  const [form, setForm] = useState({
    title:            initialData.title            ?? '',
    author:           initialData.author           ?? '',
    isbn:             initialData.isbn             ?? '',
    publisher:        initialData.publisher        ?? '',
    publication_year: initialData.publication_year ?? '',
    genre:            initialData.genre            ?? '',
    summary:          initialData.summary          ?? '',
    cover_image_url:  initialData.cover_image_url  ?? '',
    total_quantity:   initialData.total_quantity   ?? 1,
    available_quantity: initialData.available_quantity ?? 1,
  });
  const [errors, setErrors] = useState({});

  function handleChange(field) {
    return (e) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      setErrors(prev => ({ ...prev, [field]: null }));
    };
  }

  function validate() {
    const errs = {};
    if (!form.title.trim())   errs.title  = 'Titre requis.';
    if (!form.author.trim())  errs.author = 'Auteur requis.';
    if (!form.isbn.trim())    errs.isbn   = 'ISBN requis.';
    if (!/^\d{13}$/.test(form.isbn)) errs.isbn = 'ISBN doit contenir 13 chiffres.';
    if (!form.total_quantity || form.total_quantity < 1) errs.total_quantity = 'Quantité >= 1.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...form,
      total_quantity:     parseInt(form.total_quantity, 10),
      available_quantity: parseInt(form.available_quantity, 10),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input id="title" label="Titre" value={form.title} onChange={handleChange('title')}
            error={errors.title} required />
        </div>
        <Input id="author" label="Auteur" value={form.author} onChange={handleChange('author')}
          error={errors.author} required />
        <Input id="isbn" label="ISBN (13 chiffres)" value={form.isbn} onChange={handleChange('isbn')}
          error={errors.isbn} placeholder="9782070360024" required />
        <Input id="publisher" label="Éditeur" value={form.publisher} onChange={handleChange('publisher')} />
        <Input id="publication_year" type="number" label="Année" value={form.publication_year}
          onChange={handleChange('publication_year')} placeholder="2024" />
        <div className="flex flex-col gap-1">
          <label htmlFor="genre" className="text-sm font-medium text-gray-700">Genre</label>
          <select id="genre" value={form.genre} onChange={handleChange('genre')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sélectionner...</option>
            {BOOK_GENRES.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <Input id="total_quantity" type="number" label="Nb exemplaires total" value={form.total_quantity}
          onChange={handleChange('total_quantity')} error={errors.total_quantity} required />
        <Input id="available_quantity" type="number" label="Nb exemplaires disponibles"
          value={form.available_quantity} onChange={handleChange('available_quantity')} required />
        <div className="col-span-2">
          <Input id="cover_image_url" label="URL de la couverture" value={form.cover_image_url}
            onChange={handleChange('cover_image_url')} placeholder="https://..." />
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <label htmlFor="summary" className="text-sm font-medium text-gray-700">Résumé</label>
          <textarea id="summary" value={form.summary} onChange={handleChange('summary')}
            rows={3} placeholder="Résumé du livre..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <Button type="submit" isLoading={isSubmitting}>Enregistrer</Button>
      </div>
    </form>
  );
}

export default function ManageBooksPage() {
  const [books, setBooks]           = useState([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState(null);

  // Modals
  const [showAddModal, setShowAddModal]       = useState(false);
  const [showEditModal, setShowEditModal]     = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook]       = useState(null);
  const [isSubmitting, setIsSubmitting]       = useState(false);

  useEffect(() => {
    loadBooks();
  }, [currentPage, search]);

  async function loadBooks() {
    try {
      setIsLoading(true);
      const params = { page: currentPage, per_page: 20 };
      if (search) params.search = search;
      const data = search
        ? await bookService.searchBooks(search, params)
        : await bookService.getAllBooks(params);
      setBooks(data.data ?? data);
      if (data.last_page) setTotalPages(data.last_page);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function notify(type, message) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }

  async function handleCreate(formData) {
    setIsSubmitting(true);
    try {
      await bookService.createBook(formData);
      setShowAddModal(false);
      notify('success', 'Livre ajouté avec succès.');
      loadBooks();
    } catch (err) {
      notify('error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdate(formData) {
    setIsSubmitting(true);
    try {
      await bookService.updateBook(selectedBook.id, formData);
      setShowEditModal(false);
      notify('success', 'Livre modifié avec succès.');
      loadBooks();
    } catch (err) {
      notify('error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setIsSubmitting(true);
    try {
      await bookService.deleteBook(selectedBook.id);
      setShowDeleteModal(false);
      notify('success', 'Livre supprimé.');
      loadBooks();
    } catch (err) {
      notify('error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion du catalogue</h1>
        <Button onClick={() => setShowAddModal(true)}>+ Ajouter un livre</Button>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-4 rounded-lg p-3 text-sm border ${
          notification.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`} role={notification.type === 'error' ? 'alert' : 'status'}>
          {notification.message}
        </div>
      )}

      {/* Barre de recherche */}
      <div className="mb-4">
        <Input
          id="search"
          placeholder="Rechercher par titre, auteur ou ISBN..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
      </div>

      {/* Tableau des livres */}
      {isLoading ? (
        <Loading message="Chargement du catalogue..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadBooks} />
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3 font-medium">Titre</th>
                  <th className="px-4 py-3 font-medium">Auteur</th>
                  <th className="px-4 py-3 font-medium">Genre</th>
                  <th className="px-4 py-3 font-medium text-center">Dispo.</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {books.map(book => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{book.title}</td>
                    <td className="px-4 py-3 text-gray-600">{book.author}</td>
                    <td className="px-4 py-3 text-gray-500">{book.genre ?? '—'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        book.available_quantity > 0
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {book.available_quantity}/{book.total_quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="secondary"
                          onClick={() => { setSelectedBook(book); setShowEditModal(true); }}>
                          Modifier
                        </Button>
                        <Button size="sm" variant="danger"
                          onClick={() => { setSelectedBook(book); setShowDeleteModal(true); }}>
                          Supprimer
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                      Aucun livre trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      {/* Modal ajout */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}
        title="Ajouter un livre" size="lg">
        <BookForm onSubmit={handleCreate} isSubmitting={isSubmitting} />
      </Modal>

      {/* Modal modification */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}
        title="Modifier le livre" size="lg">
        {selectedBook && (
          <BookForm initialData={selectedBook} onSubmit={handleUpdate} isSubmitting={isSubmitting} />
        )}
      </Modal>

      {/* Modal suppression */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression">
        <p className="text-sm text-gray-600 mb-4">
          Supprimer <span className="font-medium">"{selectedBook?.title}"</span> ? Cette action est irréversible.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Annuler</Button>
          <Button variant="danger" isLoading={isSubmitting} onClick={handleDelete}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  );
}
