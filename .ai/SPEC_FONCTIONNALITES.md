# Site Arc-en-Ciel Services — Spec fonctionnelle

Site vitrine d'Arc-en-Ciel Services (entreprise individuelle, SIRET 991 629 981 00010), services a la personne a Domagne (35113) et dans les communes voisines : menage, espaces verts, accompagnement. Site statique en francais (Astro + `src/styles/style.css`), publie sur `https://www.arc-en-ciel-services.fr/`. Realise par Clarte Web. Argument commun : un interlocuteur unique, devis gratuit et sans engagement, 50 % de credit d'impot immediat (avance immediate URSSAF).

## Elements communs (toutes les pages)

Ces elements viennent d'un habillage commun (`src/layouts/Layout.astro`, liens dans `src/data/site.js`) : une modification s'applique a toutes les pages.

- **En-tete** : logo en arcs de couleur (bleu, vert, jaune, orange) + titre, menu Accueil / Espaces Verts / Menage / Accompagnement / Contact.
- **Pied de page** : liens Menage | Jardin | Accompagnement | Contact | Blog & Actu | Sites Utiles | Mentions Legales | Plan du Site, mention (c) 2026 Arc-en-Ciel Services, "site realise par Clarte Web" (lien vers https://www.clarte-web.fr).
- **Bandeau de cookies** (script commun `cookies.js`) en bas d'ecran tant qu'aucun choix n'est memorise (`localStorage`, cle `cookie_consent`) : Accepter / Refuser, lien "En savoir plus" vers les mentions legales. Lien **"Gerer les cookies"** dans le pied de page de chaque page pour changer d'avis.
- **Google Tag Manager** (`GTM-KLNWW7NJ`) : charge uniquement apres accord au bandeau ; au refus, les cookies Google Analytics (`_ga`, `_gid`) sont effaces.
- **Design** : fond creme, couleurs bleu / vert / orange / jaune / violet definies dans `style.css`, polices Baloo 2 (titres) et Karla (texte), adapte au mobile.
- **SEO** : titre, description et URL canonique propres a chaque page ; donnees structurees schema.org `LocalBusiness` sur l'accueil (services proposes, horaires lundi-vendredi 8h-18h, zone d'environ 20 km autour de Domagne ; telephone et rue non renseignes) ; `sitemap.xml` et `robots.txt` a jour a la main.

## Accueil (`index.html`)

- Hero "Le quotidien, plus leger." : accroche (menage, jardin, accompagnement, un seul interlocuteur, 50 % de credit d'impot) + bouton "Demander un devis gratuit" (-> Contact).
- 3 tuiles de services (Menage bleu, Espaces Verts vert, Accompagnement orange) avec lien "Decouvrir les prestations".
- Texte de presentation "votre artisan de confiance a Domagne" (trois savoir-faire, intervention a Domagne et communes voisines, pas de sous-traitance), avec liens vers les trois pages de service et vers Contact.

## Menage (`services-menage.html`)

- "Menage a domicile" : prestations (nettoyage courant des pieces de vie, cuisine et sanitaires, vitres et baies vitrees, grand nettoyage de printemps ou etat des lieux).
- Encart credit d'impot immediat de 50 % (avance immediate URSSAF : le client ne paie que la moitie).
- Encart **Wecasa** pour les professionnels independants : lien de parrainage pour s'inscrire sur la plateforme (menage et repassage, garde d'enfants, coiffure, beaute, massage, coaching sportif) ; precision que cela ne concerne pas le jardinage.
- Renvois vers Jardin et Accompagnement, bouton "Demander un Devis Menage", texte SEO final sur le menage a domicile a Domagne.

## Espaces verts (`espaces-verts.html`)

- **Bandeau d'alerte en haut** : planning complet (tres forte demande), nouvelles demandes pas toutes acceptees ; rappel de delais allonges dans l'encart de fin.
- Deux blocs : entretien Printemps & Ete (tonte, taille, desherbage, arrosage et potagers) et preparation Automne & Hiver (feuilles mortes, taille avant le gel, scarification et amendement, hivernage). Lien vers des outils de calcul en ligne gratuits (volumes de massifs, surfaces).
- Encart 50 % de credit d'impot (petits travaux de jardinage = services a la personne).
- Renvois vers Menage et Accompagnement, bouton "Demander un Devis Jardin".

## Accompagnement (`accompagnement.html`)

- Mention claire : prestations de confort et d'aide pratique, qui ne remplacent pas une prise en charge medicale ou paramedicale.
- Deux blocs : accompagnement des personnes agees (courses, rendez-vous medicaux et administratifs, sorties et lien social, presence a domicile) et aide administrative et demarches (tri de documents et courriers, demarches courantes, prise de rendez-vous et demarches en ligne, relecture de dossiers simples).
- Encart 50 % de credit d'impot ; renvois vers Menage et Jardin ; bouton "Demander un Devis Accompagnement".

## Contact (`contact.html`)

- **Formulaire de devis** : nom, e-mail, telephone (facultatif), service concerne (Menage, Espaces verts, Accompagnement, Autre), message. Envoye par **Web3Forms** (cle publique dans la page), protege par hCaptcha et un champ anti-robot cache. Apres envoi, redirection vers `merci.html`.
- Texte de zone d'intervention (Domagne et communes voisines) et promesse de reponse rapide, devis gratuit et sans engagement.

## Blog (`blog.html`)

- Pas encore d'article : page de rubriques (Entretien & Maison, Jardin & Espaces Verts, Accompagnement & Quotidien) annoncant des conseils a venir, avec liens vers les pages de service et vers Contact.

## Sites utiles (`liens-utiles.html`)

- Ressources externes par theme, liens ouverts dans un nouvel onglet : entretien, hygiene et produits (UFC-Que Choisir, INRS...), botanique et calendriers de taille (SNHF, conseils de jardinage...).

## Mentions legales (`mentions-legales.html`)

- Proprietaire (Arc-en-Ciel Services, EI, Domagne, SIRET), responsable de la publication, webmaster (Clarte Web), propriete intellectuelle, limitation de responsabilite, donnees personnelles et RGPD (nom, e-mail, telephone du formulaire, utilises uniquement pour traiter la demande, jamais transmis a des tiers).
- Hebergeur : GitHub, Inc. (GitHub Pages), avec son adresse et un lien vers pages.github.com ; domaine enregistre chez o2switch.
- RGPD : precise que le formulaire passe par Web3Forms (hCaptcha) et que la mesure d'audience (Google Tag Manager / Analytics) n'a lieu qu'apres accord, modifiable via "Gerer les cookies".

## Merci (`merci.html`)

- Page affichee apres l'envoi du formulaire de contact : "Merci, votre demande est bien partie !", retour a l'accueil. Non indexee (`noindex`), absente des sitemaps.

## Plan du site (`sitemap.html`)

- Liste visible de toutes les pages du site, par theme.
- Le fichier `sitemap.xml` (pour Google) reprend les pages ; a mettre a jour a la main a chaque ajout ou retrait de page.

## Hors perimetre actuel

Pas de paiement en ligne, pas de prise de rendez-vous en ligne, pas de back-office, pas d'espace client, pas d'avis clients, pas d'articles de blog. Tout le contenu est ecrit directement dans les fichiers HTML.
