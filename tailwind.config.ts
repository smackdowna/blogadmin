import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "system-ui"],
      },
      colors: {
        primary: {
          10: "#524CC6",
          20: "#f2f2f2b3",   //rgba(242, 242, 242, 0.70);
          30: "#f5f5f533",   //rgba(245, 245, 245, 0.20)
          40: "#F5F5F5",
          50: "#524cc666",   //rgba(82, 76, 198, 0.40)
          60: "#FAFAFF",
          70: "#F6F6F6",
          80: "#F7F7FC",
          90 : '#E6E3DC',
        },
        neutral: {
          10: "#0d0d0de6",    //rgba(13, 13, 13, 0.90)
          20: "#0d0d0d99",    //rgba(13, 13, 13, 0.60)
          25: "#0d0d0db3",    //rgba(13, 13, 13, 0.70)
          30: "#AFAFB2",
          40: "#1a1a1ab3",
          50: "#1A1A1A",
          60: "#00000033",     //rgba(0, 0, 0, 0.20)
          70: "#B3B3B3",
          80: "#1A1A1A",
          90: "#1a1a1a5c",      //rgba(26, 26, 26, 0.36)
          95: "#1a1a1ab3",      //rgba(26, 26, 26, 0.70)
          100: "#333743",
        },
        black : '#000',
        white : '#FFFFFF',
      },

      boxShadow: {
        'custom': '0px 2px 0px 0px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
