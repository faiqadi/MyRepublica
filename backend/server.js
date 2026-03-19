import express from "express";
import cors from "cors";
import { initializeDatabase, pool } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Database on startup
initializeDatabase().catch(err => {
    console.error("Failed to initialize database. Make sure MySQL is running:", err);
});

// GET all packages
app.get("/api/packages", async (req, res) => {
    try {
        const [packages] = await pool.query('SELECT * FROM packages');

        // Parse JSON notes for the frontend
        const formattedPackages = packages.map(pkg => ({
            id: pkg.id,
            type: pkg.type,
            name: pkg.name,
            speed: pkg.speed,
            devices: pkg.devices,
            price: pkg.price,
            promo_price: pkg.promo_price,
            notes: typeof pkg.notes === 'string' ? JSON.parse(pkg.notes) : pkg.notes
        }));

        res.json(formattedPackages);
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST a new package
app.post("/api/packages", async (req, res) => {
    const { type, name, speed, devices, price, promo_price, notes } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO packages (type, name, speed, devices, price, promo_price, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [type, name, speed, devices, price, promo_price || "", JSON.stringify(notes)]
        );
        res.status(201).json({ message: "Package inserted", id: result.insertId });
    } catch (error) {
        console.error("Error inserting package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT update a package
app.put("/api/packages/:id", async (req, res) => {
    const { id } = req.params;
    const { type, name, speed, devices, price, promo_price, notes } = req.body;
    try {
        await pool.query(
            'UPDATE packages SET type = ?, name = ?, speed = ?, devices = ?, price = ?, promo_price = ?, notes = ? WHERE id = ?',
            [type, name, speed, devices, price, promo_price || "", JSON.stringify(notes), id]
        );
        res.json({ message: "Package updated" });
    } catch (error) {
        console.error("Error updating package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE a package
app.delete("/api/packages/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM packages WHERE id = ?', [id]);
        res.json({ message: "Package deleted" });
    } catch (error) {
        console.error("Error deleting package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET all banners
app.get("/api/banners", async (req, res) => {
    try {
        const [banners] = await pool.query('SELECT * FROM banners ORDER BY id ASC');
        res.json(banners);
    } catch (error) {
        console.error("Error fetching banners:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST a new banner
app.post("/api/banners", async (req, res) => {
    const { image_url, title } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO banners (image_url, title) VALUES (?, ?)',
            [image_url, title || ""]
        );
        res.status(201).json({ message: "Banner inserted", id: result.insertId });
    } catch (error) {
        console.error("Error inserting banner:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE a banner
app.delete("/api/banners/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM banners WHERE id = ?', [id]);
        res.json({ message: "Banner deleted" });
    } catch (error) {
        console.error("Error deleting banner:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET hero content
app.get("/api/hero-content", async (req, res) => {
    try {
        const [content] = await pool.query('SELECT * FROM hero_content LIMIT 1');
        if (content.length > 0) {
            res.json(content[0]);
        } else {
            res.status(404).json({ error: "Hero content not found" });
        }
    } catch (error) {
        console.error("Error fetching hero content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT update hero content
app.put("/api/hero-content", async (req, res) => {
    const { eyebrow, title, description, highlight_pill, highlight_main, highlight_sub } = req.body;
    try {
        await pool.query(
            'UPDATE hero_content SET eyebrow = ?, title = ?, description = ?, highlight_pill = ?, highlight_main = ?, highlight_sub = ?',
            [eyebrow, title, description, highlight_pill, highlight_main, highlight_sub]
        );
        res.json({ message: "Hero content updated" });
    } catch (error) {
        console.error("Error updating hero content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});