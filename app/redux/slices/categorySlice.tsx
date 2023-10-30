import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs,onSnapshot } from "firebase/firestore"; 
import { db } from '@/app/utils/firebase/firebase_initialization';



export const fetchCategories : any= createAsyncThunk('category/fetchAll', async (_, { dispatch, signal }) => {
    return new Promise((resolve, reject) => {
      const categoriesRef = collection(db, 'categories');
      let categories : any = [];
  
      const unsubscribe = onSnapshot(categoriesRef, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        categories = data;
 
        resolve(categories);
    
      }, (error) => {
 
        reject(error);
      });
  
      if (signal.aborted) {
        unsubscribe();
      }
    });
  });


const initialState = {
    categories: [],
    status: 'loading',
    error: null
}


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {       
            builder.addCase(fetchCategories.pending, (state  , action : any) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action :any) => {
                state.status = 'succeeded'
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
             
            })
        }
        
    })

    export default categorySlice.reducer;

 