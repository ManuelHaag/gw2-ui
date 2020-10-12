import { baseTheme, ThemeProvider } from 'gw2-ui'
import React from 'react'
import { Provider } from 'react-redux'
import createStore from './createStore'

const store = createStore()

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <Story />
      </ThemeProvider>
    </Provider>
  ),
  (Story) => (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        margin: '16px 0px',
        padding: '48px 24px',
        border: '1px dashed rgb(229, 229, 229)',
        backgroundColor: 'rgb(255, 255, 255)',
        textAlign: 'center',
        color: 'rgb(0, 0, 0)',
        borderRadius: '3px',
        fontSize: '16px',
        lineHeight: 1.5,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <Story />
    </div>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}
