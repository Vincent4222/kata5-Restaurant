let utilisateurNom = "";

function commencerCommande() {
    utilisateurNom = document.getElementById("username").value;
    if (utilisateurNom.trim() !== "") {
        document.getElementById("welcome-screen").style.display = "none";
        document.getElementById("menu-screen").style.display = "block";
        document.getElementById("user-name").innerText = utilisateurNom;
        chargerMenu();
    }
}

function chargerMenu() {
    fetch('http://localhost:3000/menu')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById("menu");
            menuContainer.innerHTML = "";
            data.forEach(item => {
                const menuItem = document.createElement("div");
                menuItem.className = "menu-item";
                menuItem.innerHTML = `
                    <h3>${item.plat}</h3>
                    <p>${item.description}</p>
                    <button onclick="passerCommande('${item.plat}')">Commander</button>
                `;
                menuContainer.appendChild(menuItem);
            });
        });
}

function passerCommande(plat) {
    fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: utilisateurNom, plat: plat })
    })
    .then(response => response.json())
    .then(commande => {
        document.getElementById("menu-screen").style.display = "none";
        document.getElementById("order-status").style.display = "block";
        document.getElementById("user-order-name").innerText = utilisateurNom;
        suivreCommande(commande.id);
    });
}

function suivreCommande(commandeId) {
    setInterval(() => {
        fetch(`http://localhost:3000/order/${commandeId}`)
            .then(response => response.json())
            .then(commande => {
                document.getElementById("status-container").innerText = commande.statut;
            });
    }, 3000);
}