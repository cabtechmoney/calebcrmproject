'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { api } from '../../lib/api';
import type { Client } from '../../lib/types';

type ClientDraft = { name: string; email: string; company: string; phone: string };
const emptyDraft: ClientDraft = { name: '', email: '', company: '', phone: '' };

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [draft, setDraft] = useState<ClientDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadClients = async () => {
    setIsLoading(true);
    setError('');
    try {
      setClients(await api<Client[]>('/clients'));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load clients.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void loadClients(); }, []);

  const saveClient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      const client = await api<Client>(editingId ? `/clients/${editingId}` : '/clients', {
        method: editingId ? 'PUT' : 'POST',
        body: JSON.stringify(draft),
      });
      setClients((current) => editingId
        ? current.map((item) => item.id === client.id ? client : item)
        : [client, ...current]);
      setDraft(emptyDraft);
      setEditingId(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save client.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteClient = async (id: string) => {
    setError('');
    try {
      await api<void>(`/clients/${id}`, { method: 'DELETE' });
      setClients((current) => current.filter((client) => client.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Could not delete client.');
    }
  };

  const editClient = (client: Client) => {
    setEditingId(client.id);
    setDraft({ name: client.name, email: client.email ?? '', company: client.company ?? '', phone: client.phone ?? '' });
  };

  return (
    <main className="page-shell">
      <header className="page-header">
        <div><p className="eyebrow">Clients</p><h1>Customer directory</h1></div>
        <nav className="page-nav"><Link href="/">Overview</Link><Link href="/projects">Projects</Link></nav>
      </header>

      <form className="page-card mb-6 grid gap-3 sm:grid-cols-2" onSubmit={saveClient}>
        <h2 className="sm:col-span-2">{editingId ? 'Edit client' : 'Add a client'}</h2>
        <input aria-label="Client name" required placeholder="Full name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
        <input aria-label="Email" required type="email" placeholder="Email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
        <input aria-label="Company" placeholder="Company" value={draft.company} onChange={(event) => setDraft({ ...draft, company: event.target.value })} />
        <input aria-label="Phone" placeholder="Phone" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
        <div className="flex gap-2 sm:col-span-2">
          <button className="primary-button" disabled={isSaving}>{isSaving ? 'Saving...' : editingId ? 'Save changes' : 'Add client'}</button>
          {editingId && <button type="button" className="secondary-button" onClick={() => { setEditingId(null); setDraft(emptyDraft); }}>Cancel</button>}
        </div>
      </form>

      {error && <p className="form-error mb-4" role="alert">{error} <button type="button" onClick={() => void loadClients()}>Retry</button></p>}
      {isLoading ? <p role="status">Loading clients...</p> : clients.length === 0 ? <p className="page-card">No clients yet. Add your first client above.</p> : (
        <section className="card-grid">
          {clients.map((client) => (
            <article key={client.id} className="page-card">
              <span className="page-chip">Client</span><h3>{client.name}</h3><p>{client.company || 'No company listed'}</p>
              <div className="meta-row"><span>{client.email || 'No email'}</span></div>
              <div className="meta-row"><span>{client.phone || 'No phone'}</span></div>
              <div className="mt-4 flex gap-2">
                <button type="button" className="secondary-button" onClick={() => editClient(client)}>Edit</button>
                <button type="button" className="danger-button" onClick={() => void deleteClient(client.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
