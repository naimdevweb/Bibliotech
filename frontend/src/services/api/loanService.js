/**
 * Service LoanService - Gestion des emprunts
 *
 * Fonctions :
 * - getMyLoans() : GET /api/loans/my-loans
 * - createLoan(userId, bookId) : POST /api/loans (bibliothécaire uniquement)
 * - returnBook(loanId) : PUT /api/loans/:id/return
 * - extendLoan(loanId) : PUT /api/loans/:id/extend
 * - getOverdueLoans() : GET /api/loans/overdue
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const loanService = {
  // TODO: Implémenter toutes les fonctions
};
