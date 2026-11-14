// ===== 1. MENU BURGER (mobile) =====
// On récupère le bouton et le menu dans la page
var bouton = document.querySelector('.burger');
var menu = document.getElementById('menu');

// Quand on clique sur le bouton, on ouvre ou on ferme le menu
bouton.addEventListener('click', function () {
    menu.classList.toggle('open');
});

// ===== 2. PANIER, COMMANDE ET PAIEMENT SIMULÉ =====
var cartButton = document.querySelector('.cart');
var toolsContainer = document.querySelector('.tools');
var compteur = document.getElementById('cart-count');
var boutonsAjout = document.querySelectorAll('.add');
var panier = [];

// Création du menu déroulant du panier
var cartDropdown = document.createElement('div');
cartDropdown.className = 'cart-dropdown';
cartDropdown.innerHTML =
    '<ul id="cart-items"><li>Votre panier est vide</li></ul>' +
    '<div class="cart-total" id="cart-total">Total : 0 €</div>' +
    '<button type="button" class="btn checkout-btn" id="checkout-btn" style="display:none; width:100%; margin-top:0.8rem;">Valider la commande</button>';
toolsContainer.appendChild(cartDropdown);

// Création de la fenêtre (modale) de paiement
var modal = document.createElement('div');
modal.className = 'pay-modal';
modal.innerHTML =
    '<div class="pay-box">' +
        '<button type="button" class="close-pay" id="close-pay">✕</button>' +
        '<h3>Finaliser votre commande</h3>' +
        '<p id="pay-summary" style="font-size:0.9rem; color:var(--brun); margin-bottom:1rem;"></p>' +
        '<form id="pay-form">' +
            '<label>Nom complet</label>' +
            '<input type="text" required placeholder="Camille Laurent">' +
            '<label>Numéro de carte (simulation)</label>' +
            '<input type="text" required placeholder="4970 •••• •••• 1234" maxlength="19">' +
            '<div style="display:flex; gap:0.5rem;">' +
                '<div style="flex:1;"><label>Expiration</label><input type="text" required placeholder="09/28" maxlength="5"></div>' +
                '<div style="flex:1;"><label>CVC</label><input type="text" required placeholder="123" maxlength="3"></div>' +
            '</div>' +
            '<button type="submit" class="btn" style="width:100%; margin-top:1rem;">Payer maintenant</button>' +
        '</form>' +
        '<p id="pay-msg" style="margin-top:0.8rem; font-weight:600; color:var(--bleu);"></p>' +
    '</div>';
document.body.appendChild(modal);

var cartItemsList = document.getElementById('cart-items');
var cartTotalElem = document.getElementById('cart-total');
var checkoutBtn = document.getElementById('checkout-btn');
var closePayBtn = document.getElementById('close-pay');
var payForm = document.getElementById('pay-form');
var paySummary = document.getElementById('pay-summary');
var payMsg = document.getElementById('pay-msg');
var panier = [];

// Ouvrir / fermer le panier
cartButton.addEventListener('click', function (e) {
    e.stopPropagation();
    cartDropdown.classList.toggle('open');
});

document.addEventListener('click', function (e) {
    if (!toolsContainer.contains(e.target)) {
        cartDropdown.classList.remove('open');
    }
});

// Ajouter un article
for (var i = 0; i < boutonsAjout.length; i++) {
    boutonsAjout[i].addEventListener('click', function () {
        var card = this.closest('.card');
        var nom = card.querySelector('h3').textContent.trim();
        var prix = parseInt(card.querySelector('p').textContent.trim());

        panier.push({ nom: nom, prix: prix });
        mettreAJourPanier();
    });
}

function mettreAJourPanier() {
    compteur.textContent = panier.length;

    if (panier.length === 0) {
        cartItemsList.innerHTML = '<li>Votre panier est vide</li>';
        cartTotalElem.textContent = 'Total : 0 €';
        checkoutBtn.style.display = 'none';
        return;
    }

    var html = '';
    var total = 0;
    for (var j = 0; j < panier.length; j++) {
        html += '<li><span>' + panier[j].nom + '</span><span>' + panier[j].prix + ' €</span></li>';
        total += panier[j].prix;
    }
    cartItemsList.innerHTML = html;
    cartTotalElem.textContent = 'Total : ' + total + ' €';
    checkoutBtn.style.display = 'block';
}

// Ouvrir la fenêtre de paiement
checkoutBtn.addEventListener('click', function () {
    var total = panier.reduce(function (acc, item) { return acc + item.prix; }, 0);
    paySummary.textContent = panier.length + ' œuvre(s) · Montant à régler : ' + total + ' €';
    payMsg.textContent = '';
    payForm.style.display = 'block';
    cartDropdown.classList.remove('open');
    modal.classList.add('open');
});

// Fermer la fenêtre de paiement
closePayBtn.addEventListener('click', function () {
    modal.classList.remove('open');
});

// Validation du paiement simulé
payForm.addEventListener('submit', function (e) {
    e.preventDefault();
    payForm.style.display = 'none';
    payMsg.textContent = '✓ Paiement confirmé ! Merci pour votre commande chez Terre Azur.';
    panier = [];
    mettreAJourPanier();
    payForm.reset();
});

// ===== 3. FILTRES DE LA BOUTIQUE =====
var filtres = document.querySelectorAll('.filters button');
var produits = document.querySelectorAll('#shop .card');

for (var j = 0; j < filtres.length; j++) {
    filtres[j].addEventListener('click', function () {
        // On enlève la couleur "active" de tous les filtres
        for (var a = 0; a < filtres.length; a++) {
            filtres[a].classList.remove('on');
        }
        // On la met sur le filtre cliqué
        this.classList.add('on');
        var choix = this.dataset.f;

        // On affiche ou on cache chaque produit selon sa catégorie
        for (var b = 0; b < produits.length; b++) {
           if (choix === 'all' || produits[b].dataset.cat === choix) {
    produits[b].style.display = '';
} else {
    produits[b].style.display = 'none';
}
           }
});
}

// ===== 4. FORMULAIRES (message de confirmation) =====
var newsletter = document.getElementById('news');
if (newsletter) {
    newsletter.addEventListener('submit', function (e) {
        e.preventDefault(); // empêche le rechargement de la page
        document.getElementById('news-msg').textContent = 'Merci pour votre inscription !';
        newsletter.reset();
    });
}

var contact = document.getElementById('cform');
if (contact) {
    contact.addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('form-msg').textContent = 'Merci, votre message a bien été envoyé.';
        contact.reset();
    });
}

// ===== 5. RECHERCHE (loupe) =====
var loupe = document.querySelector('[aria-label="Rechercher"]');

// Création de la zone de recherche (comme le panier, elle s'ouvre sous les icônes)
var searchBox = document.createElement('div');
searchBox.className = 'search-box';
searchBox.innerHTML =
    '<form id="search-form">' +
        '<input type="search" id="search-input" placeholder="Rechercher une pièce…" aria-label="Rechercher une pièce">' +
        '<button type="submit" class="btn">OK</button>' +
    '</form>' +
    '<p id="search-msg"></p>';
toolsContainer.appendChild(searchBox);

var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');
var searchMsg = document.getElementById('search-msg');

// Enlève les accents et les majuscules pour que "equilibre" trouve "Équilibre"
function normaliser(texte) {
    return texte.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Affiche seulement les pièces dont le nom contient le mot cherché
function rechercher(mot) {
    var recherche = normaliser(mot.trim());
    var trouves = 0;

    for (var k = 0; k < produits.length; k++) {
        var nomProduit = normaliser(produits[k].querySelector('h3').textContent);
        if (recherche === '' || nomProduit.indexOf(recherche) !== -1) {
            produits[k].style.display = '';
            trouves++;
        } else {
            produits[k].style.display = 'none';
        }
    }

    // On remet "Toutes les pièces" en filtre actif
    for (var m = 0; m < filtres.length; m++) {
        filtres[m].classList.remove('on');
    }
    if (filtres.length > 0) {
        filtres[0].classList.add('on');
    }

    if (recherche !== '' && trouves === 0) {
        searchMsg.textContent = 'Aucune pièce trouvée.';
    } else {
        searchMsg.textContent = '';
    }
}

// Ouvrir / fermer la zone de recherche
if (loupe) {
    loupe.addEventListener('click', function (e) {
        e.stopPropagation();
        cartDropdown.classList.remove('open');
        searchBox.classList.toggle('open');
        if (searchBox.classList.contains('open')) {
            searchInput.focus();
        }
    });
}

// Ouvrir le panier ferme la recherche
cartButton.addEventListener('click', function () {
    searchBox.classList.remove('open');
});

// Cliquer ailleurs ferme la recherche
document.addEventListener('click', function (e) {
    if (!toolsContainer.contains(e.target)) {
        searchBox.classList.remove('open');
    }
});

// Valider la recherche (touche Entrée ou bouton OK)
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var mot = searchInput.value;
    if (document.getElementById('shop')) {
        // On est sur la page boutique : on filtre directement
        rechercher(mot);
    } else {
        // On est sur une autre page : on va à la boutique avec la recherche
        window.location.href = 'boutique.html?q=' + encodeURIComponent(mot);
    }
});

// Arrivée sur la boutique depuis une autre page avec une recherche
var params = new URLSearchParams(window.location.search);
if (params.get('q') && document.getElementById('shop')) {
    searchInput.value = params.get('q');
    rechercher(params.get('q'));
}

// ===== 6. COMPTE CLIENT (smiley) =====
// SIMULATION : les comptes sont enregistrés dans le navigateur (localStorage),
// pas sur un serveur. Un compte créé sur un appareil n'existe pas sur un autre.
var boutonCompte = document.querySelector('[aria-label="Mon compte"]');

// Création de la fenêtre du compte
var modalCompte = document.createElement('div');
modalCompte.className = 'acc-modal';
modalCompte.innerHTML =
    '<div class="acc-box" role="dialog" aria-label="Mon compte">' +
        '<button type="button" class="acc-close" id="acc-close" aria-label="Fermer">✕</button>' +

        // Partie affichée quand on n'est pas connecté
        '<div id="acc-guest">' +
            '<div class="acc-tabs">' +
                '<button type="button" class="acc-tab on" id="acc-tab-login">Se connecter</button>' +
                '<button type="button" class="acc-tab" id="acc-tab-signup">Créer un compte</button>' +
            '</div>' +
            '<form id="acc-login-form">' +
                '<label for="acc-login-email">E-mail</label>' +
                '<input type="email" id="acc-login-email" required autocomplete="email">' +
                '<label for="acc-login-mdp">Mot de passe</label>' +
                '<input type="password" id="acc-login-mdp" required autocomplete="current-password">' +
                '<button type="submit" class="btn">Se connecter</button>' +
            '</form>' +
            '<form id="acc-signup-form" hidden>' +
                '<label for="acc-signup-nom">Nom complet</label>' +
                '<input type="text" id="acc-signup-nom" required autocomplete="name">' +
                '<label for="acc-signup-email">E-mail</label>' +
                '<input type="email" id="acc-signup-email" required autocomplete="email">' +
                '<label for="acc-signup-mdp">Mot de passe (6 caractères minimum)</label>' +
                '<input type="password" id="acc-signup-mdp" required minlength="6" autocomplete="new-password">' +
                '<button type="submit" class="btn">Créer mon compte</button>' +
            '</form>' +
        '</div>' +

        // Partie affichée quand on est connecté
        '<div id="acc-user" hidden>' +
            '<h3 id="acc-hello"></h3>' +
            '<p id="acc-email"></p>' +
            '<button type="button" class="btn" id="acc-logout">Se déconnecter</button>' +
        '</div>' +

        '<p id="acc-msg" role="status"></p>' +
    '</div>';
document.body.appendChild(modalCompte);

var accClose = document.getElementById('acc-close');
var accGuest = document.getElementById('acc-guest');
var accUser = document.getElementById('acc-user');
var accTabLogin = document.getElementById('acc-tab-login');
var accTabSignup = document.getElementById('acc-tab-signup');
var accLoginForm = document.getElementById('acc-login-form');
var accSignupForm = document.getElementById('acc-signup-form');
var accHello = document.getElementById('acc-hello');
var accEmail = document.getElementById('acc-email');
var accLogout = document.getElementById('acc-logout');
var accMsg = document.getElementById('acc-msg');

// --- Enregistrement dans le navigateur ---
function lireComptes() {
    try {
        return JSON.parse(localStorage.getItem('terreazur_comptes')) || {};
    } catch (err) {
        return {};
    }
}

function ecrireComptes(comptes) {
    try {
        localStorage.setItem('terreazur_comptes', JSON.stringify(comptes));
        return true;
    } catch (err) {
        return false;
    }
}

function lireSession() {
    try {
        return localStorage.getItem('terreazur_connecte');
    } catch (err) {
        return null;
    }
}

function ecrireSession(email) {
    try {
        if (email) {
            localStorage.setItem('terreazur_connecte', email);
        } else {
            localStorage.removeItem('terreazur_connecte');
        }
    } catch (err) {
        // navigation privée : on ignore
    }
}

// Le mot de passe n'est jamais enregistré en clair : on garde seulement son empreinte
function hacher(texte) {
    if (window.crypto && window.crypto.subtle && window.TextEncoder) {
        return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(texte)).then(function (buf) {
            return Array.prototype.map.call(new Uint8Array(buf), function (o) {
                return ('0' + o.toString(16)).slice(-2);
            }).join('');
        });
    }
    return Promise.resolve('b64:' + btoa(encodeURIComponent(texte)));
}

// --- Affichage ---
function changerOnglet(mode) {
    var connexion = (mode === 'connexion');
    accLoginForm.hidden = !connexion;
    accSignupForm.hidden = connexion;
    if (connexion) {
        accTabLogin.classList.add('on');
        accTabSignup.classList.remove('on');
    } else {
        accTabSignup.classList.add('on');
        accTabLogin.classList.remove('on');
    }
    accMsg.textContent = '';
}

function afficherEtat() {
    var email = lireSession();
    var comptes = lireComptes();
    if (email && comptes[email]) {
        accGuest.hidden = true;
        accUser.hidden = false;
        accHello.textContent = 'Bonjour ' + comptes[email].nom + ' !';
        accEmail.textContent = email;
    } else {
        accGuest.hidden = false;
        accUser.hidden = true;
    }
}

function ouvrirCompte() {
    cartDropdown.classList.remove('open');
    if (typeof searchBox !== 'undefined') {
        searchBox.classList.remove('open');
    }
    changerOnglet('connexion');
    afficherEtat();
    modalCompte.classList.add('open');
}

function fermerCompte() {
    modalCompte.classList.remove('open');
}

// --- Clics ---
if (boutonCompte) {
    boutonCompte.addEventListener('click', ouvrirCompte);
}

accClose.addEventListener('click', fermerCompte);

// Cliquer sur le fond sombre ferme la fenêtre
modalCompte.addEventListener('click', function (e) {
    if (e.target === modalCompte) {
        fermerCompte();
    }
});

// La touche Échap ferme la fenêtre
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        fermerCompte();
    }
});

accTabLogin.addEventListener('click', function () {
    changerOnglet('connexion');
});

accTabSignup.addEventListener('click', function () {
    changerOnglet('inscription');
});

// --- Créer un compte ---
accSignupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var nom = document.getElementById('acc-signup-nom').value.trim();
    var email = document.getElementById('acc-signup-email').value.trim().toLowerCase();
    var mdp = document.getElementById('acc-signup-mdp').value;
    var comptes = lireComptes();

    if (mdp.length < 6) {
        accMsg.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
        return;
    }
    if (comptes[email]) {
        accMsg.textContent = 'Un compte existe déjà avec cet e-mail.';
        return;
    }

    hacher(email + '|' + mdp).then(function (empreinte) {
        comptes[email] = { nom: nom, hash: empreinte };
        if (!ecrireComptes(comptes)) {
            accMsg.textContent = 'Impossible d’enregistrer le compte sur cet appareil.';
            return;
        }
        ecrireSession(email);
        accSignupForm.reset();
        afficherEtat();
        accMsg.textContent = 'Compte créé, bienvenue chez Terre Azur !';
    });
});

// --- Se connecter ---
accLoginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('acc-login-email').value.trim().toLowerCase();
    var mdp = document.getElementById('acc-login-mdp').value;
    var comptes = lireComptes();

    hacher(email + '|' + mdp).then(function (empreinte) {
        if (comptes[email] && comptes[email].hash === empreinte) {
            ecrireSession(email);
            accLoginForm.reset();
            afficherEtat();
            accMsg.textContent = 'Connexion réussie.';
        } else {
            accMsg.textContent = 'E-mail ou mot de passe incorrect.';
        }
    });
});

// --- Se déconnecter ---
accLogout.addEventListener('click', function () {
    ecrireSession(null);
    afficherEtat();
    changerOnglet('connexion');
    accMsg.textContent = 'Vous êtes déconnecté(e).';
});
