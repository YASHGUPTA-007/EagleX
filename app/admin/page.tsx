// app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LayoutDashboard, Mail, LogOut, Trash2, Eye, CheckCircle, X } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: any;
  ipAddress?: string;
  userAgent?: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch contacts from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsData: Contact[] = [];
      snapshot.forEach((doc) => {
        contactsData.push({ id: doc.id, ...doc.data() } as Contact);
      });
      setContacts(contactsData);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
        if (selectedContact?.id === id) setSelectedContact(null);
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), {
        status: 'read'
      });
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020202] text-white font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-orange-500 animate-pulse">Initializing System...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-orange-600 selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-black/50 border-r border-white/10 backdrop-blur-md fixed h-full z-20">
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
             <div className="relative w-8 h-8">
               <Image 
                 src="/Eaglex3.png" 
                 alt="Eagle Logo" 
                 fill
                 className="object-contain"
               />
             </div>
             <div>
               <h1 className="font-bold text-lg tracking-wider">EAGLE<span className="text-orange-600">X</span></h1>
               <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Command Center</p>
             </div>
          </div>
          
          <nav className="p-4 space-y-2 mt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-orange-600/10 text-orange-500 border border-orange-600/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <LayoutDashboard size={18} />
              OVERVIEW
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all duration-300 relative group ${
                activeTab === 'contacts'
                  ? 'bg-orange-600/10 text-orange-500 border border-orange-600/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Mail size={18} />
              INBOX
              {contacts.filter(c => c.status === 'new').length > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-600 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {contacts.filter(c => c.status === 'new').length}
                </span>
              )}
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-orange-500 border border-orange-600/30">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-white truncate">{user?.email}</p>
                <p className="text-[10px] text-zinc-500 uppercase">Admin Access</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs uppercase tracking-widest py-2 rounded border border-red-500/20 transition-all"
            >
              <LogOut size={14} />
              Terminate Session
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tight mb-2">System Overview</h2>
                  <p className="text-zinc-500 font-mono text-sm">Real-time data visualization</p>
                </div>
                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 text-xs font-mono uppercase">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  System Online
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Inquiries', value: contacts.length, sub: 'Lifetime Volume', icon: '✉️', color: 'blue' },
                  { label: 'Active Alerts', value: contacts.filter(c => c.status === 'new').length, sub: 'Unread Messages', icon: '🚨', color: 'orange' },
                  { label: 'Processed', value: contacts.filter(c => c.status === 'read').length, sub: 'Archived / Read', icon: '✓', color: 'green' },
                  { label: 'Weekly Traffic', value: contacts.filter(c => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      const contactDate = c.createdAt?.toDate ? c.createdAt.toDate() : new Date(c.createdAt);
                      return contactDate > weekAgo;
                    }).length, sub: 'Last 7 Days', icon: '📈', color: 'purple' }
                ].map((stat, i) => (
                  <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 relative group hover:border-orange-600/30 transition-all duration-300">
                    <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-${stat.color === 'orange' ? 'orange-600' : 'white/20'} to-transparent opacity-50`} />
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider">{stat.label}</span>
                      <span className="text-xl opacity-50 grayscale group-hover:grayscale-0 transition-all">{stat.icon}</span>
                    </div>
                    <div className="text-4xl font-black text-white mb-1 group-hover:text-orange-500 transition-colors">{stat.value}</div>
                    <div className="text-zinc-600 text-xs">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-zinc-900/30 border border-white/5 p-6">
                <h3 className="text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-1 h-4 bg-orange-600" />
                  Recent Transmissions
                </h3>
                <div className="space-y-2">
                  {contacts.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 hover:border-white/10 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold border border-white/5 group-hover:border-orange-500/50 group-hover:text-orange-500 transition-all">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-zinc-200 group-hover:text-white">{contact.name}</p>
                          <p className="text-xs text-zinc-500 font-mono">{contact.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-zinc-600 font-mono">{formatDate(contact.createdAt)}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                          contact.status === 'new' 
                            ? 'bg-orange-600/10 text-orange-500 border-orange-600/20' 
                            : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                        } uppercase tracking-wider`}>
                          {contact.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div className="text-zinc-600 text-center py-12 font-mono text-sm border border-dashed border-white/10">
                      // NO DATA FOUND IN STREAM
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
              <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8">
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Comms Center</h2>
                  <p className="text-zinc-500 font-mono text-sm">Encrypted Message Logs</p>
                </div>
                <div className="flex gap-2">
                   <div className="px-3 py-1 bg-orange-600/10 border border-orange-600/20 text-orange-500 text-xs font-mono uppercase">
                     Unread: {contacts.filter(c => c.status === 'new').length}
                   </div>
                   <div className="px-3 py-1 bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-mono uppercase">
                     Total: {contacts.length}
                   </div>
                </div>
              </div>

              {contacts.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 border border-dashed border-white/10 rounded-lg bg-white/[0.01]">
                  <Mail size={48} className="mb-4 opacity-20" />
                  <h3 className="text-xl font-bold uppercase tracking-widest mb-2 opacity-50">Signal Silence</h3>
                  <p className="font-mono text-sm opacity-50">No incoming transmissions detected.</p>
                </div>
              ) : (
                <div className="border border-white/10 rounded overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-zinc-900/80 text-zinc-500 font-mono text-xs uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-4 font-medium border-b border-white/10">Status</th>
                          <th className="px-6 py-4 font-medium border-b border-white/10">Identity</th>
                          <th className="px-6 py-4 font-medium border-b border-white/10">Subject</th>
                          <th className="px-6 py-4 font-medium border-b border-white/10">Timestamp</th>
                          <th className="px-6 py-4 font-medium border-b border-white/10 text-right">Protocol</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-black/20">
                        {contacts.map((contact) => (
                          <tr key={contact.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4">
                              <span className={`w-2 h-2 rounded-full inline-block mr-2 ${contact.status === 'new' ? 'bg-orange-500 shadow-[0_0_8px_rgba(234,88,12,0.5)]' : 'bg-zinc-700'}`} />
                              <span className={`text-xs font-mono uppercase ${contact.status === 'new' ? 'text-white' : 'text-zinc-600'}`}>
                                {contact.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-bold text-sm text-zinc-300 group-hover:text-white transition-colors">{contact.name}</div>
                              <div className="text-xs text-zinc-600 font-mono">{contact.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-zinc-400 group-hover:text-zinc-200">{contact.subject}</td>
                            <td className="px-6 py-4 text-xs text-zinc-600 font-mono">{formatDate(contact.createdAt)}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => setSelectedContact(contact)}
                                  className="p-2 hover:bg-blue-500/10 text-zinc-500 hover:text-blue-400 rounded transition-colors"
                                  title="View Details"
                                >
                                  <Eye size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteContact(contact.id)}
                                  className="p-2 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Modal Overlay */}
              {selectedContact && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                  <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-600 to-transparent" />
                    
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-orange-600" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Transmission Details</h3>
                      </div>
                      <button 
                        onClick={() => setSelectedContact(null)}
                        className="text-zinc-500 hover:text-white hover:rotate-90 transition-all duration-300"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="p-8 space-y-6 font-mono">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <label className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">Sender Identity</label>
                          <div className="text-lg font-bold text-white">{selectedContact.name}</div>
                          <a href={`mailto:${selectedContact.email}`} className="text-sm text-orange-500 hover:text-orange-400 hover:underline">{selectedContact.email}</a>
                        </div>
                        <div className="text-right">
                          <label className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">Received At</label>
                          <div className="text-sm text-zinc-300">{formatDate(selectedContact.createdAt)}</div>
                          {selectedContact.ipAddress && <div className="text-xs text-zinc-700 mt-1">IP: {selectedContact.ipAddress}</div>}
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-6">
                        <label className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-2">Subject Line</label>
                        <div className="text-base text-zinc-300 font-bold border-l-2 border-zinc-700 pl-4">{selectedContact.subject}</div>
                      </div>

                      <div className="border-t border-white/5 pt-6">
                        <label className="text-[10px] text-zinc-600 uppercase tracking-widest block mb-2">Message Payload</label>
                        <div className="bg-black border border-white/10 p-6 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                          {selectedContact.message}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-between items-center">
                       <div className="flex gap-2">
                          {selectedContact.status === 'new' ? (
                            <button
                              onClick={() => {
                                handleMarkAsRead(selectedContact.id);
                                setSelectedContact(prev => prev ? {...prev, status: 'read'} : null);
                              }}
                              className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                            >
                              <CheckCircle size={14} />
                              Acknowledge
                            </button>
                          ) : (
                            <span className="flex items-center gap-2 text-zinc-600 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-white/5 bg-black/20 cursor-not-allowed">
                              <CheckCircle size={14} />
                              Archived
                            </span>
                          )}
                       </div>
                       
                       <button
                          onClick={() => {
                            handleDeleteContact(selectedContact.id);
                            setSelectedContact(null);
                          }}
                          className="flex items-center gap-2 text-red-500 hover:text-red-400 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          <Trash2 size={14} />
                          Purge Record
                        </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}