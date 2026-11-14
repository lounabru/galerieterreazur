// ===== 1. MENU BURGER (mobile) =====
// On récupère le bouton et le menu dans la page
var bouton = document.querySelector('.burger');
var menu = document.getElementById('menu');

// Quand on clique sur le bouton, on ouvre ou on ferme le menu
bouton.addEventListener('click', function () {
    menu.classList.toggle('open');
});

// ===== 2. COMPTEUR DU PANIER =====
var nombre = 0;
var compteur = document.getElementById('cart-count');
var boutonsAjout = document.querySelectorAll('.add');

// Pour chaque bouton panier, on ajoute 1 au clic
for (var i = 0; i < boutonsAjout.length; i++) {
    boutonsAjout[i].addEventListener('click', function () {
        nombre = nombre + 1;
        compteur.textContent = nombre;
    });
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
