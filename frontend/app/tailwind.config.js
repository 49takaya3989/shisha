/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    spacing: {
      0: "0",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      13: "52px",
      14: "56px",
      15: "60px",
      16: "64px",
      20: "80px",
      30: "120px",
      // marginは4の倍数
      // ないやつは　pl-[90px] みたいな感じでもかけます
    },
    colors: {
      common: {
        'white': '#fff',
        'black': '#000',
      },
      admin: {
        'base': '#fdc1c1',
        'cancel': 'rgba(59, 130, 246, .4)',
      },
    },
  },
  plugins: [],
}
