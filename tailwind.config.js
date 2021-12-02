module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dark": "var(--dark)",
        "dark-alt": "var(--dark-alt)",
        "light": "var(--light)",
        "light-alt": "var(--light-alt)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
