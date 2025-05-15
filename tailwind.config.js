/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        // This associates the class 'animate-scroll-down' with our keyframes
        'scroll-down': 'scroll_down_kf 2s ease-in-out infinite',
      },
      keyframes: {
        'scroll_down_kf': { // Define the keyframes for the animation
          '0%, 100%': { transform: 'scaleY(0)' }, // Bar is not visible (scaled down)
          '50%': { transform: 'scaleY(1)' },    // Bar is fully visible (scaled up)
        }
        // Note: We're not animating opacity here to avoid conflicts with Framer Motion's opacity control
        // for the initial fade-in. The bar will use its own background opacity (bg-black/50).
      }
    },
  },
  plugins: [],
};
