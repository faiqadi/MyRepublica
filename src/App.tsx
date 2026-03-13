import React, { useState } from "react";

type Term = "1 Bulan" | "5 Get 1" | "9 Get 3" | "12 Get 6";

const packages = [
  {
    name: "Value",
    speed: "30 Mbps",
    devices: "1 - 3 Device",
    notes: ["Internet UNLIMITED", "Include ONT/Modem", "Gratis Instalasi Rp500.000", "DL & UL 1:1 up to 30 Mbps"],
    prices: {
      "1 Bulan": "Rp 218.000",
      "5 Get 1": "Rp 1.090.000",
      "9 Get 3": "Rp 1.962.000",
      "12 Get 6": "Rp 2.616.000",
    },
  },
  {
    name: "Fast",
    speed: "50 Mbps",
    devices: "1 - 5 Device",
    notes: [
      "Bonus Speed upgrade 100 Mbps (3 bulan)",
      "Internet UNLIMITED",
      "Include ONT/Modem",
      "Gratis Instalasi Rp500.000",
      "DL & UL 1:1 up to 50 Mbps",
    ],
    prices: {
      "1 Bulan": "Rp 227.550",
      "5 Get 1": "Rp 1.304.250",
      "9 Get 3": "Rp 2.347.000",
      "12 Get 6": "Rp 3.130.200",
    },
  },
  {
    name: "Nova",
    speed: "100 Mbps",
    devices: "1 - 7 Device",
    notes: [
      "Vidio Platinum Lite",
      "Bonus Speed upgrade 200 Mbps (3 bulan)",
      "Internet UNLIMITED",
      "Include ONT/Modem",
      "Gratis Instalasi Rp500.000",
      "DL & UL 1:1 up to 100 Mbps",
    ],
    prices: {
      "1 Bulan": "Rp 277.500",
      "5 Get 1": "Rp 1.387.500",
      "9 Get 3": "Rp 2.497.500",
      "12 Get 6": "Rp 3.330.000",
    },
  },
  {
    name: "MyGamer",
    speed: "250 Mbps",
    devices: "1 - 10 Device",
    notes: [
      "Vidio Platinum Lite",
      "Internet UNLIMITED",
      "Include ONT/Modem",
      "Gratis Instalasi Rp500.000",
      "DL & UL 1:1 up to 250 Mbps",
      "Akses langsung ke server game",
    ],
    prices: {
      "1 Bulan": "Rp 333.000",
      "5 Get 1": "Rp 1.655.000",
      "9 Get 3": "Rp 2.997.000",
      "12 Get 6": "Rp 3.996.000",
    },
  },
  {
    name: "Prime",
    speed: "500 Mbps",
    devices: "1 - 15 Device",
    notes: [
      "Vidio Platinum Lite",
      "Internet UNLIMITED",
      "Include ONT/Modem",
      "Gratis Instalasi Rp500.000",
      "DL & UL 1:1 up to 500 Mbps",
    ],
    prices: {
      "1 Bulan": "Rp 444.000",
      "5 Get 1": "Rp 2.220.000",
      "9 Get 3": "Rp 3.966.000",
      "12 Get 6": "Rp 5.328.000",
    },
  },
];

const TERMS: Term[] = ["1 Bulan", "5 Get 1", "9 Get 3", "12 Get 6"];

export const App: React.FC = () => {
  const [activeTerm, setActiveTerm] = useState<Term>("1 Bulan");

  return (
    <div className="page">
      <header className="hero">
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
      </header>

      <section id="why" className="why-us">
        <h2>Why Choose Us</h2>
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
          {packages.map((pkg) => (
            <article key={pkg.name} className="package-card tooltip-container">
              <h3>{pkg.name}</h3>
              <p className="package-speed">{pkg.speed}</p>
              <p className="package-price">{pkg.prices[activeTerm]}</p>
              <ul>
                {pkg.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
                <li>Ideal untuk {pkg.devices}</li>
              </ul>
              <a 
                href={`https://api.whatsapp.com/send?phone=6285713111997&text=Halo promomyrepublicjogja.com, saya ingin langganan ${activeTerm} - ${pkg.name}. Bisa minta informasi lebih detail?`}
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary full-width"
              >
                Langganan Sekarang
              </a>
            </article>
          ))}
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
