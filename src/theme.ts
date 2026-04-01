import { createTheme, MantineColorsTuple } from '@mantine/core'

const coral: MantineColorsTuple = [
  '#ffe9e9',
  '#ffd1d1',
  '#fba0a1',
  '#f76d6d',
  '#f34141',
  '#f22625',
  '#f21616',
  '#d8090b',
  '#c10007',
  '#a90003'
]

const mint: MantineColorsTuple = [
  '#e6fcfa',
  '#d8f3f0',
  '#b3e5df',
  '#8ad6cd',
  '#69c9be',
  '#52c1b5',
  '#43bdb0',
  '#31a699',
  '#209488',
  '#008076'
]

export const theme = createTheme({
  primaryColor: 'coral',
  colors: {
    coral,
    mint,
  },
  fontFamily: 'Comic Neue, Comic Sans MS, cursive, sans-serif',
  headings: {
    fontFamily: 'Comic Neue, Comic Sans MS, cursive, sans-serif',
  },
  radius: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          minHeight: '60px',
          minWidth: '60px',
          fontSize: '1.1rem',
          fontWeight: 600,
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    },
  },
})
