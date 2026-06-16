tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#2A1A14',    // Coklat tua pekat
                    brown: '#4A3022',   // Coklat kayu
                    gold: '#D4AF37',    // Emas elegan
                    orange: '#C84B31',  // Burnt orange / bara api
                    cream: '#FDFBF7',   // Krem hangat
                    light: '#F4ECE4'    // Beige
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            animation: {
                'marquee-right': 'marqueeRight 80s linear infinite',
                'marquee-left': 'marqueeLeft 80s linear infinite',
            },
            keyframes: {
                marqueeRight: {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                marqueeLeft: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        }
    }
}
