import { defineConfig } from 'astro/config';

// "file" : chaque page est produite en contact.html (et non contact/index.html),
// pour garder les URL deja referencees par Google.
export default defineConfig({
  site: 'https://www.arc-en-ciel-services.fr',
  build: { format: 'file' },
  trailingSlash: 'never',
});
