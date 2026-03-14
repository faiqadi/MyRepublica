import React, { useState, useEffect } from "react";

type Term = "Bulanan" | "6 Bulanan" | "Tahunan" | "Spesial";

interface PackageData {
  id: number;
  type: Term;
  name: string;
  speed: string;
  devices: string;
  price: string;
  promo_price?: string;
  notes: string[];
}

const TERMS: Term[] = ["Bulanan", "6 Bulanan", "Tahunan", "Spesial"];

interface BannerData {
  id: number;
  image_url: string;
  title: string;
}

export const App: React.FC = () => {
  const [activeTerm, setActiveTerm] = useState<Term>("Bulanan");
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Database Banners State
  const [dbBanners, setDbBanners] = useState<BannerData[]>([]);
  const [currentBannerSlide, setCurrentBannerSlide] = useState(0);

  // Hero Slider State (Original feature)
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    "/hero_banner_1_smarthome_1773482468456.png", 
    "/hero_banner_2_gaming_1773482483063.png", 
    "/hero_banner_3_fiber_1773482561135.png"
  ];

  useEffect(() => {
    // Fetch Packages
    fetch("http://localhost:5000/api/packages")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat paket", err);
        setLoading(false);
      });

    // Fetch Database Banners
    fetch("http://localhost:5000/api/banners")
      .then((res) => res.json())
      .then((data) => {
        setDbBanners(data);
      })
      .catch((err) => {
        console.error("Gagal memuat banner dari database", err);
      });
  }, []);
  // Auto-slide effect for DB Banners
  useEffect(() => {
    if (dbBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerSlide((prev) => (prev + 1) % dbBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [dbBanners.length]);

  const nextBanner = () => setCurrentBannerSlide(prev => (prev + 1) % dbBanners.length);
  const prevBanner = () => setCurrentBannerSlide(prev => (prev - 1 + dbBanners.length) % dbBanners.length);

  // Filter packages based on the active tab
  const displayedPackages = packages.filter(pkg => pkg.type === activeTerm);

  return (
    <div className="page">
      <header className="hero slider-container">
        {dbBanners.map((banner, index) => (
          <div 
            key={banner.id}
            className={`slider-bg ${index === currentBannerSlide ? 'active' : ''}`} 
            style={{ backgroundImage: `url("${banner.image_url}")` }} 
          />
        ))}
        <div className="slider-overlay" />
        
        {dbBanners.length > 1 && (
          <div className="slider-controls-overlay">
            <button className="slider-nav prev" onClick={prevBanner}>&#10094;</button>
            <button className="slider-nav next" onClick={nextBanner}>&#10095;</button>
            
            <div className="slider-indicators">
              {dbBanners.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`indicator-dot ${idx === currentBannerSlide ? 'active' : ''}`}
                  onClick={() => setCurrentBannerSlide(idx)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="hero-content-wrapper">
          <nav className="top-nav">
            <div className="brand">
              <span className="brand-mark" />
              <span className="brand-text">
                MyRepublic <span>Jogja</span>
              </span>
            </div>
            <div className="nav-links">
              <a href="#why">Keunggulan</a>
              <a href="#packages">Paket</a>
              <a href="#steps">Cara Berlangganan</a>
              <a href="#contact">Kontak</a>
            </div>
          </nav>

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow">Promo Update 13 Maret 2026</p>
              <h1>Internetan di rumah tanpa ngelag, tahan terhadap cuaca.</h1>
              <p>
                MyRepublic adalah penyedia layanan internet unlimited tanpa FUP di Indonesia. Nikmati kecepatan internet cepat dan stabil dengan layanan full Fiber Optic (FTTH).
              </p>
              <div className="hero-cta">
                <a 
                  href="https://api.whatsapp.com/send?phone=6285713111997&text=Halo promomyrepublicjogja.com, saya ingin berlangganan internet MyRepublic. Bisa minta informasi lebih detail?" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary"
                >
                  Langganan Sekarang via WA
                </a>
                <a href="#packages" className="btn-outline">
                  Lihat Promo
                </a>
              </div>
            </div>
            <div className="hero-highlight">
              <div className="highlight-card floating-animation">
                <p className="highlight-pill">Tanpa Kuota</p>
                <p className="highlight-main">Kecepatan hingga 500 Mbps</p>
                <p className="highlight-sub">Ideal untuk streaming & gaming</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="why" className="why-us">
        <h2>Mengapa Memilih Kami</h2>
        <p>
          Kami menghadirkan layanan internet terbaik dengan kecepatan tinggi, harga terjangkau, dan fitur unggulan yang dirancang untuk memenuhi kebutuhan seluruh keluarga dan para gamer.
        </p>
        <div className="why-grid">
          <div className="why-card">
            <h3>Streaming dan Gaming dengan Kecepatan Tinggi</h3>
            <p>ISP #1 di Indonesia untuk streaming dan gaming.</p>
          </div>
          <div className="why-card">
            <h3>Lebih Cepat, Lebih Terjangkau</h3>
            <p>Paket super cepat dengan harga super terjangkau.</p>
          </div>
          <div className="why-card">
            <h3>TV Pilihan Untuk Seluruh Keluarga</h3>
            <p>Semua saluran TV lokal, serta Disney, FOX, TvN, dan lainnya.</p>
          </div>
          <div className="why-card">
            <h3>Dibangun Oleh Gamers untuk Gamers</h3>
            <p>Custom routing ke server game kelas dunia.</p>
          </div>
        </div>
      </section>

      <section id="packages" className="packages">
        <h2>Internetan Super Lancar dan Unlimited!</h2>
        <p>Pilih promo berlangganan yang paling menguntungkan untuk Anda.</p>
        
        <div className="tabs-container">
          {TERMS.map((term) => (
            <button
              key={term}
              className={`tab-button ${activeTerm === term ? "active" : ""}`}
              onClick={() => setActiveTerm(term)}
            >
              {term}
            </button>
          ))}
        </div>

        <div className="packages-grid">
          {displayedPackages.map((pkg, index) => {
            const hasPromo = pkg.promo_price && pkg.promo_price.trim() !== "";
            const activePrice = hasPromo ? pkg.promo_price : pkg.price;
            
            return (
              <article key={pkg.id} className="package-card tooltip-container" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3>{pkg.name}</h3>
                <div className="package-speed">
                  <span className="speed-value">{pkg.speed.split(' ')[0]}</span>
                  <span className="speed-unit">Mbps</span>
                </div>
                
                <div className="package-price" style={{ margin: '1rem 0' }}>
                  {hasPromo && (
                    <div style={{ color: '#9ca3af', fontSize: '1rem', textDecoration: 'line-through', marginBottom: '0.25rem' }}>
                      {pkg.price}
                    </div>
                  )}
                  <div className="price-amount" style={{ fontSize: '2rem', fontWeight: 'bold', color: hasPromo ? '#22c55e' : 'inherit' }}>
                    {activePrice}
                  </div>
                  <div className="price-period" style={{ fontSize: '0.9rem', opacity: 0.8 }}>/ {activeTerm.toLowerCase()}</div>
                </div>

                <ul>
                  {pkg.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                  <li>Ideal untuk {pkg.devices}</li>
                </ul>
                <a 
                  href={`https://api.whatsapp.com/send?phone=6285713111997&text=Halo promomyrepublicjogja.com, saya ingin langganan ${pkg.type} - ${pkg.name}. Bisa minta informasi lebih detail? Harga promo: ${activePrice || ""}`}
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary full-width"
                >
                  Langganan Sekarang
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section id="steps" className="steps">
        <h2>Ingin mulai menikmati koneksi internet terbaik dari MyRepublic?</h2>
        <p>Ikuti tiga langkah mudah berlangganan kami.</p>
        <div className="steps-grid">
          <div className="step-card">
            <h3>1. Registrasi yang Mudah</h3>
            <p>Cek ketersediaan layanan di area, pilih paket yang sesuai, dan tentukan jadwal pemasangan yang nyaman bagi Anda.</p>
          </div>
          <div className="step-card">
            <h3>2. Instalasi Tanpa Ribet</h3>
            <p>Pantau instalasi oleh tim ahli kami, dan nikmati kecepatan internet ultra cepat dari MyRepublic setelahnya.</p>
          </div>
          <div className="step-card">
            <h3>3. Pembayaran yang Praktis</h3>
            <p>Bayar tagihan dengan mudah dan nikmati pengalaman internet tanpa batas yang stabil dan handal dari MyRepublic.</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Kenapa Harus Memilih Kami</h2>
        <div className="features-grid">
          <div className="feature-card hover-lift">
            <h4>Layanan Pengaduan 24/7 Gratis</h4>
          </div>
          <div className="feature-card hover-lift">
            <h4>Koneksi Bebas Gangguan Cuaca</h4>
          </div>
          <div className="feature-card hover-lift">
            <h4>Koneksi Stabil Anti Lag</h4>
          </div>
          <div className="feature-card hover-lift">
            <h4>Gratis Biaya Instalasi</h4>
          </div>
          <div className="feature-card hover-lift">
            <h4>Upload &amp; Download Sama Cepat</h4>
          </div>
          <div className="feature-card hover-lift">
            <h4>Internet Bebas Tanpa Kuota</h4>
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <h2>Kecepatan Ultra Cepat dan Koneksi Stabil</h2>
        <p>Untuk konsultasi, cek coverage jaringan, Detail paket berlanggan MyRepublic hubungi kami</p>
        <div className="hero-cta">
          <a href="https://api.whatsapp.com/send?phone=6285713111997&text=Halo promomyrepublicjogja.com, bisa minta informasi lebih lanjut?" target="_blank" rel="noreferrer" className="btn-primary">
            Hubungi Kami
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>Copyright © 2026 Promo MyRepublic Jogja. All rights reserved.</p>
        <p>
          Kontak: <a href="tel:085713111997">085713111997</a> · Email:{" "}
          <a href="mailto:promomyrepublicjogja@gmail.com">promomyrepublicjogja@gmail.com</a>
        </p>
      </footer>
    </div>
  );
};
