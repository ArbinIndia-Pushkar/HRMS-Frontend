export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        RobotoMono: "RobotoMono",
        Bungee: "Bungee"
      },
      colors:{
        HRMSBlack: "#3a3a3a",
        HRMSBeige: "#f5f2ed",
        HRMSRed: "#cc5959",
      }
    },
  },
  plugins: [],
}