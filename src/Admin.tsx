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

      <p style={{ color: '#d8b4fe', marginBottom: '2rem' }}>Pilih kategori paket yang ingin Anda kelola:</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {types.map(type => (
          <Link 
            key={type} 
            to={`/admin/${encodeURIComponent(type)}`} 
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
