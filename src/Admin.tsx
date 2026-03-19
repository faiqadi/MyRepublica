import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface PackageData {
  id: number;
  type: string;
  name: string;
  speed: string;
  devices: string;
  price: string;
  promo_price?: string;
  notes: string[];
}

interface BannerData {
  id: number;
  image_url: string;
  title: string;
}

interface HeroContentData {
  eyebrow: string;
  title: string;
  description: string;
  highlight_pill: string;
  highlight_main: string;
  highlight_sub: string;
}

const inputStyle = {
  width: '100%', padding: '0.8rem', borderRadius: '0.5rem', 
  border: '1px solid #4b1b82', background: '#2d114c', color: 'white',
  fontFamily: 'system-ui'
};

const primaryButtonStyle = {
  background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', color: 'white',
  padding: '0.8rem 1.5rem', border: 'none', borderRadius: '0.5rem',
  cursor: 'pointer', fontWeight: 'bold' as const
};

const secondaryButtonStyle = {
  background: 'transparent', color: '#d8b4fe',
  padding: '0.8rem 1.5rem', border: '1px solid #7e22ce', borderRadius: '0.5rem',
  cursor: 'pointer'
};

const editButtonStyle = {
  background: '#3b82f6', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', cursor: 'pointer'
};

const deleteButtonStyle = {
  background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '0.25rem', cursor: 'pointer'
};

// ----------------------------------------------------
// ADMIN HOME COMPONENT
// ----------------------------------------------------
export const AdminHome: React.FC = () => {
  const types = ["Bulanan", "6 Bulanan", "Tahunan", "Spesial"];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#ffffff' }}>Dasbor Admin MyRepublica</h1>
        <a href="/" style={{ color: '#b47ce9', textDecoration: 'none' }}>&larr; Kembali ke Situs Utama</a>
      </header>
      
      <p style={{ color: '#d8b4fe', marginBottom: '1rem', fontWeight: 'bold' }}>Tampilan Website & Header:</p>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
        <Link 
          to="/admin/banners" 
          style={{ 
            flex: 1,
            background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', 
            padding: '1.5rem 2rem', borderRadius: '1rem', 
            border: '1px solid #b47ce9', color: 'white', textDecoration: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: '1.25rem', fontWeight: 'bold',
            transition: 'transform 0.2s', boxShadow: '0 10px 25px rgba(139, 61, 200, 0.4)'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <span>🖼️ Kelola Banner Slider</span>
          <span>&rarr;</span>
        </Link>
        <Link 
          to="/admin/hero" 
          style={{ 
            flex: 1,
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
            padding: '1.5rem 2rem', borderRadius: '1rem', 
            border: '1px solid #93c5fd', color: 'white', textDecoration: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: '1.25rem', fontWeight: 'bold',
            transition: 'transform 0.2s', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <span>✍️ Kelola Teks Hero Utama</span>
          <span>&rarr;</span>
        </Link>
      </div>


      <p style={{ color: '#d8b4fe', marginBottom: '2rem', fontWeight: 'bold' }}>Pengelolaan Daftar Paket per Kategori:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {types.map(type => (
          <Link 
            key={type} 
            to={`/admin/packages/${encodeURIComponent(type)}`} 
            style={{ 
              background: '#1c0a2f', padding: '2rem', borderRadius: '1rem', 
              border: '1px solid #4b1b82', color: 'white', textDecoration: 'none',
              textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold',
              transition: 'transform 0.2s', display: 'block'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Kelola Paket {type}
          </Link>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// ADMIN BANNER COMPONENT
// ----------------------------------------------------
export const AdminBanner: React.FC = () => {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const fetchBanners = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/banners")
      .then((res) => res.json())
      .then((data: BannerData[]) => {
        setBanners(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat banner", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const resetForm = () => {
    setImageUrl("");
    setTitle("");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus banner ini?")) return;
    
    try {
      await fetch(`http://localhost:5000/api/banners/${id}`, {
        method: "DELETE",
      });
      fetchBanners();
    } catch (error) {
      console.error("Gagal menghapus banner", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: imageUrl, title })
      });
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error("Gagal menyimpan banner", error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#ffffff', margin: 0 }}>Kelola <span style={{color: '#a855f7'}}>Banner Utama</span></h1>
          <Link to="/admin" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>&larr; Kembali ke Beranda Admin</Link>
        </div>
        <a href="/" style={{ color: '#b47ce9', textDecoration: 'none' }}>Ke Situs Utama &rarr;</a>
      </header>

      <div className="admin-container-grid" style={{ gap: '2rem' }}>
        
        {/* Form Container */}
        <div style={{ background: '#1c0a2f', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #4b1b82', alignSelf: 'start' }}>
          <h2 style={{ marginTop: 0, color: '#d8b4fe' }}>Tambah Banner Baru</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>URL/Path Gambar (e.g. /promo.jpg)</label>
              <input required value={imageUrl} onChange={e => setImageUrl(e.target.value)} style={inputStyle} placeholder="/hero_banner_1.png" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>Judul Internal (Opsional)</label>
              <input value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="Banner Promosi TV" />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" style={primaryButtonStyle}>Tambah Banner</button>
            </div>
          </form>
        </div>

        {/* Table Container */}
        <div style={{ background: '#1c0a2f', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #4b1b82', overflowX: 'auto' }}>
          <h2 style={{ marginTop: 0, color: '#d8b4fe' }}>Daftar Banner Aktif</h2>
          {loading ? (
            <p>Memuat banner...</p>
          ) : banners.length === 0 ? (
            <p>Tidak ada banner. Slider tidak akan muncul.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #4b1b82', color: '#a855f7' }}>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Pratinjau</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Judul</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Path / URL</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.8rem 0.5rem' }}>
                      <img src={banner.image_url} alt={banner.title} style={{ width: '100px', height: '56px', objectFit: 'cover', borderRadius: '0.25rem', border: '1px solid #4b1b82' }} />
                    </td>
                    <td style={{ padding: '0.8rem 0.5rem', fontWeight: 'bold' }}>{banner.title || "-"}</td>
                    <td style={{ padding: '0.8rem 0.5rem', color: '#d8b4fe', fontSize: '0.9rem' }}>{banner.image_url}</td>
                    <td style={{ padding: '0.8rem 0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', height: '100%' }}>
                      <button onClick={() => handleDelete(banner.id)} style={deleteButtonStyle}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// ADMIN TYPE SPECIFIC COMPONENT
// ----------------------------------------------------
export const AdminType: React.FC = () => {
  const { type: urlType } = useParams<{ type: string }>();
  const decodedType = urlType ? decodeURIComponent(urlType) : "";

  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [devices, setDevices] = useState("");
  const [price, setPrice] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [notes, setNotes] = useState("");

  const fetchPackages = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/packages")
      .then((res) => res.json())
      .then((data: PackageData[]) => {
        // Only keep packages belonging to the current decoded type
        setPackages(data.filter(pkg => pkg.type === decodedType));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat paket", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedType]);

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setName("");
    setSpeed("");
    setDevices("");
    setPrice("");
    setPromoPrice("");
    setNotes("");
  };

  const handleEdit = (pkg: PackageData) => {
    setIsEditing(true);
    setEditingId(pkg.id);
    setName(pkg.name);
    setSpeed(pkg.speed);
    setDevices(pkg.devices);
    setPrice(pkg.price);
    setPromoPrice(pkg.promo_price || "");
    setNotes(pkg.notes.join("\n"));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus paket ini?")) return;
    
    try {
      await fetch(`http://localhost:5000/api/packages/${id}`, {
        method: "DELETE",
      });
      fetchPackages();
    } catch (error) {
      console.error("Gagal menghapus paket", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const notesArray = notes.split("\n").filter(n => n.trim() !== "");

    const payload = {
      type: decodedType, // Lock the payload to the current page's Type
      name,
      speed,
      devices,
      price,
      promo_price: promoPrice,
      notes: notesArray,
    };

    try {
      if (isEditing && editingId) {
        await fetch(`http://localhost:5000/api/packages/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch("http://localhost:5000/api/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }
      resetForm();
      fetchPackages();
    } catch (error) {
      console.error("Gagal menyimpan paket", error);
    }
  };

  if (!decodedType) return <div style={{color:'white', padding: '2rem'}}>Tipe tidak valid.</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#ffffff', margin: 0 }}>Kelola Paket: <span style={{color: '#a855f7'}}>{decodedType}</span></h1>
          <Link to="/admin" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>&larr; Kembali ke Beranda Admin</Link>
        </div>
        <a href="/" style={{ color: '#b47ce9', textDecoration: 'none' }}>Ke Situs Utama &rarr;</a>
      </header>

      <div className="admin-container-grid" style={{ gap: '2rem' }}>
        
        {/* Form Container */}
        <div style={{ background: '#1c0a2f', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #4b1b82' }}>
          <h2 style={{ marginTop: 0, color: '#d8b4fe' }}>{isEditing ? `Edit Paket ${decodedType}` : `Tambah Paket ${decodedType} Baru`}</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>Nama Paket</label>
              <input required value={name} onChange={e => setName(e.target.value)} style={inputStyle} placeholder="e.g. Prime" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>Kecepatan</label>
              <input required value={speed} onChange={e => setSpeed(e.target.value)} style={inputStyle} placeholder="e.g. 500 Mbps" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>Perangkat</label>
              <input required value={devices} onChange={e => setDevices(e.target.value)} style={inputStyle} placeholder="e.g. 1 - 15 Device" />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>Harga Asli</label>
                <input required value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} placeholder="Rp 444.000" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>Harga Promo (Opsional)</label>
                <input value={promoPrice} onChange={e => setPromoPrice(e.target.value)} style={inputStyle} placeholder="Rp 399.000" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', color: '#94a3b8' }}>Catatan (Satu per baris)</label>
              <textarea required value={notes} onChange={e => setNotes(e.target.value)} style={{...inputStyle, minHeight: '100px', resize: 'vertical'}} placeholder="Catatan 1&#10;Catatan 2" />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" style={primaryButtonStyle}>{isEditing ? "Perbarui Paket" : "Buat Paket"}</button>
              {isEditing && (
                <button type="button" onClick={resetForm} style={secondaryButtonStyle}>Batal</button>
              )}
            </div>
          </form>
        </div>

        {/* Table Container */}
        <div style={{ background: '#1c0a2f', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #4b1b82', overflowX: 'auto' }}>
          <h2 style={{ marginTop: 0, color: '#d8b4fe' }}>Daftar Paket "{decodedType}"</h2>
          {loading ? (
            <p>Memuat paket...</p>
          ) : packages.length === 0 ? (
            <p>Belum ada paket. Tambahkan di sebelah kiri.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #4b1b82', color: '#a855f7' }}>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Nama</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Kecepatan</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Harga</th>
                  <th style={{ padding: '0.8rem 0.5rem' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => {
                  const hasPromo = pkg.promo_price && pkg.promo_price.trim() !== "";
                  return (
                    <tr key={pkg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '0.8rem 0.5rem', fontWeight: 'bold' }}>{pkg.name}</td>
                      <td style={{ padding: '0.8rem 0.5rem', color: '#d8b4fe' }}>{pkg.speed}</td>
                      <td style={{ padding: '0.8rem 0.5rem' }}>
                        {hasPromo ? (
                          <>
                            <div style={{ color: '#ef4444', textDecoration: 'line-through', fontSize: '0.85rem' }}>{pkg.price}</div>
                            <div style={{ color: '#22c55e', fontWeight: 'bold' }}>{pkg.promo_price}</div>
                          </>
                        ) : (
                          pkg.price
                        )}
                      </td>
                      <td style={{ padding: '0.8rem 0.5rem', display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleEdit(pkg)} style={editButtonStyle}>Edit</button>
                        <button onClick={() => handleDelete(pkg.id)} style={deleteButtonStyle}>Hapus</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// ADMIN HERO TEXT COMPONENT
// ----------------------------------------------------
export const AdminHero: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [highlightPill, setHighlightPill] = useState("");
  const [highlightMain, setHighlightMain] = useState("");
  const [highlightSub, setHighlightSub] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/hero-content")
      .then((res) => res.json())
      .then((data: HeroContentData) => {
        setEyebrow(data.eyebrow);
        setTitle(data.title);
        setDescription(data.description);
        setHighlightPill(data.highlight_pill);
        setHighlightMain(data.highlight_main);
        setHighlightSub(data.highlight_sub);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat teks hero", err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("http://localhost:5000/api/hero-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eyebrow, title, description,
          highlight_pill: highlightPill,
          highlight_main: highlightMain,
          highlight_sub: highlightSub
        })
      });
      alert("Konten Hero berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal menyimpan teks hero", error);
      alert("Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#ffffff', margin: 0 }}>Kelola <span style={{color: '#3b82f6'}}>Teks Hero</span></h1>
          <Link to="/admin" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>&larr; Kembali ke Beranda Admin</Link>
        </div>
        <a href="/" style={{ color: '#b47ce9', textDecoration: 'none' }}>Ke Situs Utama &rarr;</a>
      </header>

      <div style={{ background: '#1c0a2f', padding: '2rem', borderRadius: '1rem', border: '1px solid #4b1b82' }}>
        {loading ? (
          <p style={{ color: 'white' }}>Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <fieldset style={{ border: '1px solid #4b1b82', padding: '1.5rem', borderRadius: '0.5rem', margin: 0 }}>
              <legend style={{ color: '#a855f7', fontWeight: 'bold', padding: '0 0.5rem' }}>Teks Penawaran Utama</legend>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>Eyebrow (Label Promo Atas)</label>
                <input required value={eyebrow} onChange={e => setEyebrow(e.target.value)} style={inputStyle} placeholder="Promo Update..." />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>Judul H1 Utama</label>
                <textarea required value={title} onChange={e => setTitle(e.target.value)} style={{...inputStyle, minHeight: '80px', resize: 'vertical'}} placeholder="Internetan di rumah..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>Deskripsi Paragraf</label>
                <textarea required value={description} onChange={e => setDescription(e.target.value)} style={{...inputStyle, minHeight: '120px', resize: 'vertical'}} placeholder="MyRepublic adalah..." />
              </div>
            </fieldset>

            <fieldset style={{ border: '1px solid #4b1b82', padding: '1.5rem', borderRadius: '0.5rem', margin: 0 }}>
              <legend style={{ color: '#a855f7', fontWeight: 'bold', padding: '0 0.5rem' }}>Kartu Highlight Sebelah Kanan</legend>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>Highlight Pill (Tombol Kecil)</label>
                <input required value={highlightPill} onChange={e => setHighlightPill(e.target.value)} style={inputStyle} placeholder="Tanpa Kuota" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>Teks Highlight Besar</label>
                <input required value={highlightMain} onChange={e => setHighlightMain(e.target.value)} style={inputStyle} placeholder="Kecepatan hingga..." />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>Teks Keterangan Bawah</label>
                <input required value={highlightSub} onChange={e => setHighlightSub(e.target.value)} style={inputStyle} placeholder="Ideal untuk..." />
              </div>
            </fieldset>

            <button type="submit" disabled={saving} style={{...primaryButtonStyle, background: saving ? '#475569' : primaryButtonStyle.background, marginTop: '1rem'}}>
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
