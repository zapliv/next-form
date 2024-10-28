import { configureStore } from '@reduxjs/toolkit';
import listingsReducer from './listingsSlice';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
    configureStore({
        reducer: {
            listings: listingsReducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
   
