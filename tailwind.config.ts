// @type {import('tailwindcss').Config}

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard Variable", "sans-serif"],
      },
      backgroundImage: {
        "unselect-star": "url('/images/icons/unselect_star.svg')",
        "select-star": "url('/images/icons/select_star.svg')",
      },
      screens: {
        "max-xl": { max: "1200px" },
        "max-md": { max: "768px" },
        md: "768px",
        xl: "1200px",
      },
      colors: {
        light: {
          black: "#101318",
          white: "#ffffff",
          gray: {
            100: "#f2f4f8",
            300: "#cfdbea",
            500: "#9facbd",
            800: "#2d3034",
          },
          purple: {
            10: "#f1edfc",
            100: "#6a42db",
          },
        },
        dark: {
          black: "#101318",
          white: "#ffffff",
          gray: {
            100: "#f2f4f8",
            300: "#cfdbea",
            500: "#9facbd",
            800: "#2d3034",
          },
          purple: {
            10: "#f1edfc",
            100: "#6a42db",
          },
        },
      },
      backgroundColor: {
        light: {
          default: "#ebeef4",
          white: "#ffffff",
        },
        dark: {
          default: "#ebeef4",
          white: "#ffffff",
        },
      },
      boxShadow: {
        light: "0 2px 20px rgba(0, 0, 0, 0.04)",
        dark: "0 2px 20px rgba(255, 255, 255, 0.04)",
      },
      // font 사용법 : text-3xl-32px-bold
      fontSize: {
        "3xl-32px-bold": [
          "32px",
          {
            lineHeight: "42px",
            fontWeight: "700",
          },
        ],
        "3xl-32px-semibold": [
          "32px",
          {
            lineHeight: "42px",
            fontWeight: "600",
          },
        ],
        "2xl-24px-bold": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "700",
          },
        ],
        "2xl-24px-semibold": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "600",
          },
        ],
        "2xl-24px-medium": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "500",
          },
        ],
        "2xl-24px-regular": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "400",
          },
        ],
        "xl-20px-bold": [
          "20px",
          {
            lineHeight: "32px",
            fontWeight: "700",
          },
        ],
        "xl-20px-semibold": [
          "20px",
          {
            lineHeight: "32px",
            fontWeight: "600",
          },
        ],
        "xl-20px-medium": [
          "20px",
          {
            lineHeight: "32px",
            fontWeight: "500",
          },
        ],
        "xl-20px-regular": [
          "20px",
          {
            lineHeight: "32px",
            fontWeight: "400",
          },
        ],
        "2lg-18px-bold": [
          "18px",
          {
            lineHeight: "26px",
            fontWeight: "700",
          },
        ],
        "2lg-18px-semibold": [
          "18px",
          {
            lineHeight: "26px",
            fontWeight: "600",
          },
        ],
        "2lg-18px-medium": [
          "18px",
          {
            lineHeight: "26px",
            fontWeight: "500",
          },
        ],
        "2lg-18px-regular": [
          "18px",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
        "lg-16px-bold": [
          "16px",
          {
            lineHeight: "26px",
            fontWeight: "700",
          },
        ],
        "lg-16px-semibold": [
          "16px",
          {
            lineHeight: "26px",
            fontWeight: "600",
          },
        ],
        "lg-16px-medium": [
          "16px",
          {
            lineHeight: "26px",
            fontWeight: "500",
          },
        ],
        "lg-16px-regular": [
          "16px",
          {
            lineHeight: "26px",
            fontWeight: "400",
          },
        ],
        "md-14px-bold": [
          "14px",
          {
            lineHeight: "24px",
            fontWeight: "700",
          },
        ],
        "md-14px-semibold": [
          "14px",
          {
            lineHeight: "24px",
            fontWeight: "600",
          },
        ],
        "md-14px-medium": [
          "14px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        "md-14px-regular": [
          "14px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],
        "sm-13px-semibold": [
          "13px",
          {
            lineHeight: "22px",
            fontWeight: "600",
          },
        ],
        "sm-13px-medium": [
          "13px",
          {
            lineHeight: "22px",
            fontWeight: "500",
          },
        ],
        "xs-12px-semibold": [
          "12px",
          {
            lineHeight: "20px",
            fontWeight: "600",
          },
        ],
        "xs-12px-medium": [
          "12px",
          {
            lineHeight: "18px",
            fontWeight: "500",
          },
        ],
        "xs-12px-regular": [
          "12px",
          {
            lineHeight: "18px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  // aspect-ratio plugin 사용법 : aspect-w-16 aspect-h-9 or aspect-video
  // plugins: [require("@tailwindcss/aspect-ratio")],
};
