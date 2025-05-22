module.exports = {
    theme: {
      extend: {
        animation: {
          gradient: "gradientBG 8s ease infinite",
           "spin-slow": "spin 12s linear infinite",
        },
        keyframes: {
          gradientBG: {
            "0%, 100%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
          },
        },
      },
    },
  };
  
