// Bandeau de cookies commun a toutes les pages.
// Google Tag Manager n'est charge qu'apres accord du visiteur (RGPD).
(function () {
    var CLE = 'cookie_consent';
    var ID_GTM = 'GTM-KLNWW7NJ';

    function lireChoix() {
        try { return localStorage.getItem(CLE); } catch (e) { return null; }
    }

    function memoriserChoix(valeur) {
        try { localStorage.setItem(CLE, valeur); } catch (e) {}
    }

    function chargerGTM() {
        if (window.gtmCharge) return;
        window.gtmCharge = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtm.js?id=' + ID_GTM;
        document.head.appendChild(s);
    }

    // Efface les cookies Google Analytics poses avant un refus
    function effacerCookiesAnalytics() {
        var hote = location.hostname;
        var domaineRacine = hote.replace(/^www\./, '');
        document.cookie.split(';').forEach(function (c) {
            var nom = c.split('=')[0].trim();
            if (nom.indexOf('_ga') === 0 || nom.indexOf('_gid') === 0) {
                var expire = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                document.cookie = nom + expire;
                document.cookie = nom + expire + '; domain=' + hote;
                document.cookie = nom + expire + '; domain=.' + domaineRacine;
            }
        });
    }

    function afficherBandeau() {
        var bandeau = document.createElement('div');
        bandeau.className = 'cookie-banner';
        bandeau.setAttribute('role', 'dialog');
        bandeau.setAttribute('aria-label', 'Cookies');
        bandeau.innerHTML =
            '<div class="cookie-banner-inner">' +
            '<div class="cookie-banner-texte">Arc-en-Ciel Services utilise des cookies pour mesurer l\'audience du site (Google Tag Manager / Google Analytics). Vous pouvez accepter ou refuser ces traceurs. ' +
            '<a href="mentions-legales.html">En savoir plus</a></div>' +
            '<div><button type="button" class="cookie-accepter">Accepter</button>' +
            '<button type="button" class="cookie-refuser">Refuser</button></div>' +
            '</div>';
        document.body.appendChild(bandeau);

        bandeau.querySelector('.cookie-accepter').addEventListener('click', function () {
            memoriserChoix('accepted');
            bandeau.remove();
            chargerGTM();
        });
        bandeau.querySelector('.cookie-refuser').addEventListener('click', function () {
            memoriserChoix('rejected');
            effacerCookiesAnalytics();
            bandeau.remove();
        });
    }

    // Lien "Gerer les cookies" ajoute dans le pied de page de chaque page
    function ajouterLienGerer() {
        var liens = document.querySelector('footer div');
        if (!liens) return;
        var bouton = document.createElement('button');
        bouton.type = 'button';
        bouton.className = 'cookie-gerer';
        bouton.textContent = 'Gérer les cookies';
        bouton.addEventListener('click', function () {
            try { localStorage.removeItem(CLE); } catch (e) {}
            effacerCookiesAnalytics();
            location.reload();
        });
        liens.appendChild(document.createTextNode(' | '));
        liens.appendChild(bouton);
    }

    function demarrer() {
        ajouterLienGerer();
        var choix = lireChoix();
        if (choix === 'accepted') {
            chargerGTM();
        } else if (!choix) {
            afficherBandeau();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', demarrer);
    } else {
        demarrer();
    }
})();
