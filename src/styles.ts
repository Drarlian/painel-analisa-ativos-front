import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';


export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{yellow.50}',
      100: '{yellow.100}',
      200: '{yellow.200}',
      300: '{yellow.300}',
      400: '{yellow.400}',
      500: '{yellow.500}',
      600: '{yellow.600}',
      700: '{yellow.700}',
      800: '{yellow.800}',
      900: '{yellow.900}',
      950: '{yellow.950}'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '#00926b',
          400: '#00926b',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        },
        primary: {
          50: '{rose.50}',
          100: '{rose.100}',
          200: '#00926b',
          300: '{rose.300}',
          400: '{rose.400}',
          500: '#00926b',
          600: '{rose.600}',
          700: '{rose.700}',
          800: '{rose.800}',
          900: '{rose.900}',
          950: '{rose.950}'
        },
        highlight: {
          background: '{purple.700}',
          focusBackground: '{purple.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        },
        custom: {
          cardcolor: '{blue.500}'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{rose.50}',
          100: '{rose.100}',
          200: '{rose.200}',
          300: '{rose.300}',
          400: 'white',
          500: '#00926b',
          600: '#00926b',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        },
        primary: {
          50: '#00926b',
          100: '#00926b',
          200: '#00926b',
          300: '{rose.300}',
          400: '#00926b',
          500: '#00926b',
          600: '#00926b',
          700: '#00926b',
          800: '#00926b',
          900: '#00926b',
          950: '#00926b'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(250, 250, 250, .87)',
          focusColor: 'rgba(250, 250, 250, .87)'
        },

        custom: {
          cardcolor: '{green.500}'
        },
      }
    }
  },
});
