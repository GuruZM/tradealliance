'use client'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import categorySlice from './slices/categorySlice';
import  userSlice  from './slices/userSlice';

const rootReducer = combineReducers({
    user: userSlice,
    categories: categorySlice,
     
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
