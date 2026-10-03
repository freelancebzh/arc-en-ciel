# Arc-en-Ciel Services — site internet

Site vitrine d'Arc-en-Ciel Services (entreprise individuelle, services a la personne : menage, espaces verts, accompagnement ; Domagne 35113 et communes voisines), en francais. **Astro (pages statiques) + `style.css`**, sans Tailwind. Domaine : `https://www.arc-en-ciel-services.fr/` (GitHub Pages, domaine chez o2switch). Site realise par Clarte Web.

## Structure

- [astro.config.mjs](astro.config.mjs) — `site: https://www.arc-en-ciel-services.fr`, `build.format: 'file'` (chaque page sort en `contact.html` et non `contact/index.html` : les URL deja referencees par Google ne changent pas). Pas de `base`.
- [src/layouts/Layout.astro](src/layouts/Layout.astro) — habillage commun a **toutes** les pages : `<head>` (titre, description, canonical, noindex), en-tete, menu, pied de page, `cookies.js`. Props : `title`, `description`, `chemin` (ex. `contact.html`, vide pour l'accueil), `titreH1` (optionnel), `noindex` (optionnel). Slots : `head` (JSON-LD, scripts de page), `avant-header` (bandeau d'alerte).
- [src/data/site.js](src/data/site.js) — infos partagees : nom, URL, liens du menu (`MENU`) et du pied de page (`PIED`). A modifier ici uniquement.
- [src/pages/](src/pages/) — un fichier `.astro` par page, qui contient seulement le contenu entre l'en-tete et le pied de page, enveloppe dans `<Layout>` :
  - `index` accueil · `services-menage` · `espaces-verts` · `accompagnement` · `contact` (devis) · `blog` (articles a venir) · `liens-utiles` · `mentions-legales` · `sitemap` (plan du site visible) · `merci` (apres envoi du formulaire, `noindex`)
- [src/styles/style.css](src/styles/style.css) — **toute** la mise en forme : variables de couleur dans `:root` (`--blue`, `--green`, `--orange`, `--yellow`, `--violet`, `--bg`, `--text`...), polices Google Fonts (Baloo 2 + Karla), responsive en `@media`, classes de page (`.legal-container`, `.contact-container`...) et classes utilitaires (`.lien-vert`, `.encart-note`...). Plus de style en ligne ni de `<style>` dans les pages.
- [public/](public/) — fichiers servis tels quels : `cookies.js` (bandeau cookies, charge Google Tag Manager seulement apres accord, lien "Gerer les cookies" au pied de page), `photos/` (images publiees : seulement `general/logo.png`), `robots.txt`, `sitemap.xml` (a tenir a jour a la main), `CNAME` (`www.arc-en-ciel-services.fr`).
- [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) — build + deploiement GitHub Pages a chaque push sur `main`. **Reglage GitHub a faire une fois** : Settings > Pages > Source = "GitHub Actions".
- [.ai/SPEC_FONCTIONNALITES.md](.ai/SPEC_FONCTIONNALITES.md) — description fonctionnelle du site.
- [.ai/SYSTEM_PROMPT.md](.ai/SYSTEM_PROMPT.md) — regles de qualite/architecture a respecter.

## Commandes

```
npm install
npm run dev       # serveur de dev Astro
npm run build     # build de production (dossier dist/)
npm run preview   # previsualiser le build
```

Node >= 22.12. Pas de lint ni de tests automatises : verifier avec `npm run build` (doit passer sans erreur) et un controle visuel (ordinateur + mobile).

## Points d'attention

- Les liens internes sont **relatifs et plats** (`contact.html`, `photos/general/logo.png`) : toutes les pages sont a la racine du site.
- Chaque page a son `title`, sa `description` et son `chemin` (canonical) uniques, passes a `<Layout>`. `index.astro` porte les donnees structurees `LocalBusiness` (schema.org), en objet JavaScript en tete de fichier.
- **Formulaire de contact** (`contact.astro`) : Web3Forms (`api.web3forms.com/submit`, cle publique `access_key`) + hCaptcha + champ anti-robot `botcheck`. Apres envoi, redirection vers `merci.html`. Ne jamais changer la cle ni le service sans en parler.
- **Cookies / mesure d'audience** : bandeau Accepter/Refuser gere par `public/cookies.js` (choix dans `localStorage`, cle `cookie_consent`). Google Tag Manager (`GTM-KLNWW7NJ`) n'est charge qu'apres accord : ne jamais le remettre en dur dans le `<head>`.
- **Hebergement** : GitHub Pages ; domaine enregistre chez o2switch (indique dans les mentions legales). Le telephone et l'adresse de l'entreprise ne sont pas publies (absents des donnees structurees) : ne pas inventer ces valeurs, les demander.
- `espaces-verts.astro` affiche un bandeau "planning complet" (forte demande, slot `avant-header`) : a retirer ou garder selon la disponibilite reelle, sur demande.
- Credit d'impot de 50 % (avance immediate URSSAF) : argument commercial repete sur les pages. Ne pas changer ce chiffre sans confirmation.
- La page Menage contient un lien de parrainage **Wecasa** (reseau de prestataires independants, hors jardinage) : ne pas le modifier.
- L'accompagnement est une aide de confort (presence, courses, demarches), **jamais presente comme un soin medical ou paramedical**.
- Le depot GitHub `freelancebzh/arc-en-ciel` contient encore d'anciens restes de l'activite "web" (dossiers `sites/`, `archives/`, anciennes pages) : ce dossier de travail est la reference pour le site Arc-en-Ciel Services (services a la personne). Ne pas y reprendre de contenu "web".
- Le code et les textes sont en francais : garder cette convention.

## system prompt

Avant implementation lis [.ai/SYSTEM_PROMPT.md](.ai/SYSTEM_PROMPT.md)

## Agents

Ne jamais lancer de sous-agents ni de workflow multi-agents sans me demander d'abord. Obligatoire, sans exception.

## Niveaux d'action

Je prefixe ma demande par un tag. Sans tag, appliquer `[strict]` par defaut.

- `[consultatif]` — Ne modifie aucun fichier. Explique ce que tu ferais et attends ma validation.
- `[strict]` — Avant de coder : dis quoi, pourquoi, comment, et dans quels fichiers. Puis code.
- `[rapide]` — Code directement, explication minimale. Interdit de toucher a l'architecture (decoupage des fichiers, dependances, build, deploiement, formulaire, cookies/analytics, referencement, hebergement, ajout/suppression/renommage de pages). Si le changement l'exige, arrete-toi et repasse en `[strict]`.

## Mise a jour de la spec

Apres tout ajout ou modification de contenu ou de fonctionnalite visible par un visiteur, mettre a jour [.ai/SPEC_FONCTIONNALITES.md](.ai/SPEC_FONCTIONNALITES.md) dans la meme intervention. Si une page est ajoutee ou retiree, mettre aussi a jour `public/sitemap.xml`, la page `sitemap.astro` et les listes `MENU` / `PIED` de `src/data/site.js`. Ne pas documenter les refactos internes sans impact visible.

## explication du code

Codeur novice. Ne pas etre trop technique dans tes explications de code.
