import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from '../data/moviesSlice'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { 
        movies: moviesSlice.reducer, 
        starred: starredSlice.reducer,
        watchLater: watchLaterSlice.reducer
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {

  function Wrapper({ children }) {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}