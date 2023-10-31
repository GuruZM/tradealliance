import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs,onSnapshot } from "firebase/firestore"; 
import { db } from '@/app/utils/firebase/firebase_initialization';


export const fetchProducts : any= createAsyncThunk('products/fetchAll', async (_, { dispatch, signal }) => {
    return new Promise((resolve, reject) => {
      const categoriesRef = collection(db, 'products');
      let products : any = [];
  
      const unsubscribe = onSnapshot(categoriesRef, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        products = data;
    
        resolve(products);
    
      }, (error) => {
 
        reject(error);
      });
  
      if (signal.aborted) {
        unsubscribe();
      }
    });
  });


const initialState = {
    products: [],
    status: 'loading',
    error: null
}


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {       
            builder.addCase(fetchProducts.pending, (state  , action : any) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action :any) => {
                state.status = 'succeeded'
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
             
            })
        }
        
    })

    export default productsSlice.reducer;

 