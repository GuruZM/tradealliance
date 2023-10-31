'use client'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import categorySlice from './slices/categorySlice';
import  userSlice  from './slices/userSlice';
import productSlice from './slices/productSlice';
import supplierSlice from './slices/supplierSlice';
import customerSlice from './slices/customerSlice';

const rootReducer = combineReducers({
    user: userSlice,
    categories: categorySlice,
    products: productSlice,
    suppliers: supplierSlice,
    customers: customerSlice,
     
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
