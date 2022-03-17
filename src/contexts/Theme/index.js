import React, { createContext, useContext, useState } from 'react'
import { ThemeProvider as ThemeProviderStyled } from 'styled-components'

const ThemeContext = createContext([[], () => null]);

export const ThemeProvider = ({ children, ...props }) => {
  const [theme, setTheme] = useState(props.theme);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <ThemeProviderStyled theme={theme}>
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const themeManager = useContext(ThemeContext)
  return themeManager || [{}]
}
