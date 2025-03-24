CREATE DATABASE IF NOT EXISTS adalicious;
USE adalicious;

CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plat VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    plat VARCHAR(255) NOT NULL,
    statut VARCHAR(50) NOT NULL DEFAULT 'En préparation'
);

INSERT INTO menu (plat, description) VALUES
('Hello World Burger', 'Un cheeseburger classique (pain, steak, fromage, salade, sauce).'),
('404 Not Found Fries', 'Des frites maison avec une sauce mystère.'),
('JSON Nuggets', 'Nuggets de poulet avec 3 sauces au choix (ketchup, mayo, barbecue).');