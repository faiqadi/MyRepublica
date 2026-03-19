import mysql from 'mysql2/promise';

// Database configuration
// Note: Hardcoding these for the sake of setting up this local project.
export const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Assuming empty password for local dev. If different, we will ask the user.
  database: 'myrepublica',
};

// Initial connection without database selected (to create it if it doesn't exist)
export const initialConnectionConfig = {
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
};

export async function initializeDatabase() {
  try {
    // 1. Connect to MySQL Server
    const connection = await mysql.createConnection(initialConnectionConfig);
    console.log('Connected to MySQL server.');

    // 2. Create Database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    console.log(`Database '${dbConfig.database}' created or already exists.`);

    // 3. Connect to the specific database
    await connection.changeUser({ database: dbConfig.database });

    // 4. Create Tables (Drop existing first to reset data for the new structure)
    console.log('Resetting package tables for independent type structure...');
    await connection.query(`DROP TABLE IF EXISTS package_prices;`);
    await connection.query(`DROP TABLE IF EXISTS packages;`);
    await connection.query(`DROP TABLE IF EXISTS banners;`);
    await connection.query(`DROP TABLE IF EXISTS hero_content;`);

    const createPackagesTable = `
      CREATE TABLE packages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        speed VARCHAR(255) NOT NULL,
        devices VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        promo_price VARCHAR(255) NULL,
        notes JSON NOT NULL
      );
    `;

    await connection.query(createPackagesTable);
    console.log('Table `packages` recreated as independent type table with promo pricing support.');

    const createBannersTable = `
      CREATE TABLE banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(500) NOT NULL,
        title VARCHAR(255) NULL
      );
    `;
    
    await connection.query(createBannersTable);
    console.log('Table `banners` created.');

    const createHeroContentTable = `
      CREATE TABLE hero_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        eyebrow VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        highlight_pill VARCHAR(255) NOT NULL,
        highlight_main VARCHAR(255) NOT NULL,
        highlight_sub VARCHAR(255) NOT NULL
      );
    `;
    
    await connection.query(createHeroContentTable);
    console.log('Table `hero_content` created.');

    // 5. Seed initial data
    console.log('Seeding initial independent package data...');
    
    // We instantiate 5 core packages, then loop 4 times for each Type to create 20 independent records
    const corePackages = [
      {
        name: "Value",
        speed: "30 Mbps",
        devices: "1 - 3 Device",
        notes: ["Internet UNLIMITED", "Include ONT/Modem", "Gratis Instalasi Rp500.000", "DL & UL 1:1 up to 30 Mbps"],
        prices: {
          "Bulanan": "Rp 218.000",
          "6 Bulanan": "Rp 1.090.000",
          "Tahunan": "Rp 1.962.000",
          "Spesial": "Rp 2.616.000",
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
          "Bulanan": "Rp 227.550",
          "6 Bulanan": "Rp 1.304.250",
          "Tahunan": "Rp 2.347.000",
          "Spesial": "Rp 3.130.200",
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
          "Bulanan": "Rp 277.500",
          "6 Bulanan": "Rp 1.387.500",
          "Tahunan": "Rp 2.497.500",
          "Spesial": "Rp 3.330.000",
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
          "Bulanan": "Rp 333.000",
          "6 Bulanan": "Rp 1.655.000",
          "Tahunan": "Rp 2.997.000",
          "Spesial": "Rp 3.996.000",
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
          "Bulanan": "Rp 444.000",
          "6 Bulanan": "Rp 2.220.000",
          "Tahunan": "Rp 3.966.000",
          "Spesial": "Rp 5.328.000",
        },
      },
    ];

    const types = ["Bulanan", "6 Bulanan", "Tahunan", "Spesial"];

    for (const type of types) {
      for (const corePkg of corePackages) {
        const priceForType = corePkg.prices[type];
        
        await connection.execute(
          'INSERT INTO packages (type, name, speed, devices, price, promo_price, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [type, corePkg.name, corePkg.speed, corePkg.devices, priceForType, "", JSON.stringify(corePkg.notes)]
        );
      }
    }
    console.log('Seeding completed. Inserted independent packages for each type.');

    const initialBanners = [
      { url: "/hero_banner_1_smarthome_1773482468456.png", title: "Smart Home Entertainment" },
      { url: "/hero_banner_2_gaming_1773482483063.png", title: "Esports & Gaming" },
      { url: "/hero_banner_3_fiber_1773482561135.png", title: "Ultra Fast Fiber City" }
    ];

    for (const banner of initialBanners) {
      await connection.execute(
        'INSERT INTO banners (image_url, title) VALUES (?, ?)',
        [banner.url, banner.title]
      );
    }
    console.log('Seeding completed. Inserted initial banners.');

    // Seed Hero Content
    const initialHeroContent = {
      eyebrow: "Promo Update 13 Maret 2026",
      title: "Internetan di rumah tanpa ngelag, tahan terhadap cuaca.",
      description: "MyRepublic adalah penyedia layanan internet unlimited tanpa FUP di Indonesia. Nikmati kecepatan internet cepat dan stabil dengan layanan full Fiber Optic (FTTH).",
      highlight_pill: "Tanpa Kuota",
      highlight_main: "Kecepatan hingga 500 Mbps",
      highlight_sub: "Ideal untuk streaming & gaming"
    };

    await connection.execute(
      'INSERT INTO hero_content (eyebrow, title, description, highlight_pill, highlight_main, highlight_sub) VALUES (?, ?, ?, ?, ?, ?)',
      [
        initialHeroContent.eyebrow, 
        initialHeroContent.title, 
        initialHeroContent.description, 
        initialHeroContent.highlight_pill, 
        initialHeroContent.highlight_main, 
        initialHeroContent.highlight_sub
      ]
    );
    console.log('Seeding completed. Inserted initial hero content.');

    // Close configuration connection
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Create a pool for application querying
export const pool = mysql.createPool(dbConfig);
