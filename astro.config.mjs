import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://iceship-wheels.github.io',
  base: '/resume-static-web',
  integrations: [tailwind()],
  devToolbar: { enabled: false },
});
