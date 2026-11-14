// ===== 1. MENU BURGER (mobile) =====
// On récupère le bouton et le menu dans la page
var bouton = document.querySelector('.burger');
var menu = document.getElementById('menu');

// Quand on clique sur le bouton, on ouvre ou on ferme le menu
bouton.addEventListener('click', function () {
    menu.classList.toggle('open');
});

// ===== 2. PANIER ET MENU DÉROULANT =====
var cartButton = document.querySelector('.cart');
var toolsContainer = document.querySelector('.tools');
var compteur = document.getElementById('cart-count');
var boutonsAjout = document.querySelectorAll('.add');

// Création du conteneur déroulant
var cartDropdown = document.createElement('div');
cartDropdown.className = 'cart-dropdown';
cartDropdown.innerHTML = '<ul id="cart-items"><li>Votre panier est vide</li></ul><div class="cart-total" id="cart-total">Total : 0 €</div>';
toolsContainer.appendChild(cartDropdown);

var cartItemsList = document.getElementById('cart-items');
var cartTotalElem = document.getElementById('cart-total');
var panier = [];

// Ouvrir / fermer au clic sur l'icône
cartButton.addEventListener('click', function (e) {
    e.stopPropagation();
    cartDropdown.classList.toggle('open');
});

// Fermer en cliquant ailleurs sur la page
document.addEventListener('click', function (e) {
    if (!toolsContainer.contains(e.target)) {
        cartDropdown.classList.remove('open');
    }
});

// Ajout des produits
for (var i = 0; i < boutonsAjout.length; i++) {
    boutonsAjout[i].addEventListener('click', function () {
        var card = this.closest('.card');
        var nom = card.querySelector('h3').textContent.trim();
        var prixTexte = card.querySelector('p').textContent.trim();
        var prix = parseInt(prixTexte);

        panier.push({ nom: nom, prix: prix });
        mettreAJourPanier();
    });
}

function mettreAJourPanier() {
    compteur.textContent = panier.length;
    
    if (panier.length === 0) {
        cartItemsList.innerHTML = '<li>Votre panier est vide</li>';
        cartTotalElem.textContent = 'Total : 0 €';
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
}

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
                produits[b].hidden = false;
            } else {
                produits[b].hidden = true;
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
