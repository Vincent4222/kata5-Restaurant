const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "adalicious"
});

db.connect();

app.get("/menu", (req, res) => {
    db.query("SELECT * FROM menu", (err, results) => {
        res.json(results);
    });
});

app.post("/order", (req, res) => {
    const { nom, plat } = req.body;

    db.query(
        "INSERT INTO orders (nom, plat, statut) VALUES (?, ?, 'En préparation')",
        [nom, plat],
        (err, result) => {
            res.json({ id: result.insertId, nom, plat, statut: "En préparation" });
        }
    );
});

app.get("/order/:id", (req, res) => {
    db.query("SELECT * FROM orders WHERE id = ?", [req.params.id], (err, result) => {
        res.json(result[0]);
    });
});

app.put("/order/:id", (req, res) => {
    const { statut } = req.body;
    db.query("UPDATE orders SET statut = ? WHERE id = ?", [statut, req.params.id], () => {
        res.send("Statut mis à jour");
    });
});

app.listen(3000, () => {
    console.log("Serveur backend démarré sur http://localhost:3000");
});