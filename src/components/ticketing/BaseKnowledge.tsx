import React, { useState } from 'react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  category: string;
  relevance: number;
}

const BaseKnowledge: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for knowledge base
  const knowledgeBase: SearchResult[] = [
    {
      id: '1',
      title: 'Cara Reset Password',
      content: 'Untuk reset password, pengguna dapat mengklik tombol "Lupa Password" di halaman login, kemudian memasukkan email yang terdaftar. Link reset akan dikirim ke email pengguna.',
      category: 'Account',
      relevance: 0
    },
    {
      id: '2',
      title: 'Cara Mengubah Profil',
      content: 'Pengguna dapat mengubah profil dengan masuk ke menu Settings > Profile, kemudian mengisi form yang tersedia dan klik Save.',
      category: 'Account',
      relevance: 0
    },
    {
      id: '3',
      title: 'Cara Membatalkan Pesanan',
      content: 'Pesanan dapat dibatalkan dalam waktu 24 jam setelah pembayaran. Masuk ke menu Orders, pilih pesanan yang ingin dibatalkan, lalu klik tombol Cancel Order.',
      category: 'Orders',
      relevance: 0
    },
    {
      id: '4',
      title: 'Metode Pembayaran yang Tersedia',
      content: 'Kami menerima pembayaran melalui Bank Transfer, Credit Card, E-Wallet (OVO, GoPay, DANA), dan Virtual Account.',
      category: 'Payment',
      relevance: 0
    },
    {
      id: '5',
      title: 'Cara Melacak Pengiriman',
      content: 'Nomor resi pengiriman akan dikirim melalui email dan SMS setelah pesanan diproses. Pengguna dapat melacak status pengiriman di menu Orders atau menggunakan nomor resi di website kurir.',
      category: 'Shipping',
      relevance: 0
    },
    {
      id: '6',
      title: 'Kebijakan Pengembalian Barang',
      content: 'Barang dapat dikembalikan dalam waktu 7 hari setelah diterima dengan kondisi masih segel dan tidak rusak. Hubungi customer service untuk proses pengembalian.',
      category: 'Returns',
      relevance: 0
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = knowledgeBase
        .filter(item => {
          const searchLower = query.toLowerCase();
          const titleMatch = item.title.toLowerCase().includes(searchLower);
          const contentMatch = item.content.toLowerCase().includes(searchLower);
          const categoryMatch = item.category.toLowerCase().includes(searchLower);
          
          if (titleMatch || contentMatch || categoryMatch) {
            // Calculate relevance score
            let relevance = 0;
            if (titleMatch) relevance += 3;
            if (contentMatch) relevance += 1;
            if (categoryMatch) relevance += 2;
            item.relevance = relevance;
            return true;
          }
          return false;
        })
        .sort((a, b) => b.relevance - a.relevance);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex-shrink-0">
        <div className="relative flex items-center">
          <i className="bx bx-search absolute left-3.5 text-[var(--text-tertiary)] text-lg z-10"></i>
          <input
            type="text"
            className="w-full py-3 px-3.5 pl-11 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm outline-none transition-all duration-200 focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_2px_var(--brand-alpha)]"
            placeholder="Cari informasi yang tidak diketahui..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border-color)] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[var(--bg-tertiary)]">
        {isSearching ? (
          <div className="flex items-center justify-center py-10 text-[var(--text-tertiary)] gap-3">
            <i className="bx bx-loader-alt animate-spin"></i>
            <span>Mencari...</span>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="text-xs text-[var(--text-tertiary)] mb-4 pb-3 border-b border-[var(--border-color)]">
              Ditemukan {searchResults.length} hasil untuk "{searchQuery}"
            </div>
            {searchResults.map((result) => (
              <div 
                key={result.id} 
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl mb-3 cursor-pointer transition-all duration-200 hover:bg-[var(--bg-secondary)] hover:border-[var(--brand-primary)] hover:shadow-[0_2px_8px_var(--brand-alpha)]"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[15px] font-semibold text-[var(--text-primary)] m-0 flex-1">{result.title}</h4>
                  <span className="py-1 px-2.5 bg-[var(--bg-tertiary)] rounded-xl text-[11px] font-medium text-[var(--text-secondary)] ml-3 whitespace-nowrap">{result.category}</span>
                </div>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed m-0">{result.content}</p>
              </div>
            ))}
          </>
        ) : searchQuery ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-tertiary)] text-center py-10 px-5">
            <i className="bx bx-search-alt text-5xl mb-4 opacity-50"></i>
            <div className="text-sm mb-1">Tidak ada hasil ditemukan</div>
            <div className="text-xs opacity-70">Coba gunakan kata kunci lain</div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-tertiary)] text-center py-10 px-5">
            <i className="bx bx-book-open text-5xl mb-4 opacity-50"></i>
            <div className="text-sm mb-1">Cari informasi di knowledge base</div>
            <div className="text-xs opacity-70">Ketik kata kunci untuk mencari informasi yang dibutuhkan</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseKnowledge;

