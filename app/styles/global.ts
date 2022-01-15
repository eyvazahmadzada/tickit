import { createGlobalStyle, css } from 'styled-components'
import { COLORS } from '../constants'
import { Theme } from '../models/index'

const margins = [4, 8, 16, 24, 32, 48]

// Global
export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * {
    box-sizing: border-box;
    font-family: 'Exo 2', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  // Reset
  button, input {
    outline: none;
    border: none;
  }
  button {
    background: transparent;
    cursor: pointer;
    padding: 0;
  }

  // Utility
  .animate {
    transition: 0.3s all ease-out;
  }
  .card {
    border-radius: 10px;
    height: 48px;
    filter: ${({ theme }) =>
      theme.body === COLORS.dark
        ? 'drop-shadow(2px 2px 2px rgba(250, 251, 251, 0.25))'
        : 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.25))'};
  }
  
  // Generate spacing classes dynamically
  ${margins.map(
    (size) => css`
      ${['top', 'right', 'bottom', 'left'].map(
        (dir) => css`
          .m${dir[0]}-${size}{
            margin-${dir}: ${size}px;
          }
        `,
      )}
    `,
  )}

  // Animations
  @keyframes loader {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg)
    }
  }
`
