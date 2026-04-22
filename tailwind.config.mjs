/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        abyss: '#0F1115',
        crimson: '#FF2A44',
        steel: '#4A4E59',
        slate: {
          850: '#161A22',
          750: '#1E222C',
        },
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
