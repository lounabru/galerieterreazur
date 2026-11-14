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
