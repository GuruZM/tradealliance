import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs,onSnapshot } from "firebase/firestore"; 
import { db } from '@/app/utils/firebase/firebase_initialization';


export const fetchSuppliers : any= createAsyncThunk('suppliers/fetchAll', async (_, { dispatch, signal }) => {
    return new Promise((resolve, reject) => {
      const categoriesRef = collection(db, 'suppliers');
      let suppliers : any = [];
      const unsubscribe = onSnapshot(categoriesRef, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        suppliers = data;
       
    
        resolve(suppliers);
    
      }, (error) => {
 
        reject(error);
      });
  
      if (signal.aborted) {
        unsubscribe();
      }
    });
  });


const initialState = {
    suppliers: [],
    status: 'loading',
    error: null
}

const supplierSlice = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {       
            builder.addCase(fetchSuppliers.pending, (state  , action : any) => {
                state.status = 'loading'
            })
            .addCase(fetchSuppliers.fulfilled, (state, action :any) => {
                state.status = 'succeeded'
                state.suppliers = action.payload
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.status = 'failed'
             
            })
        }
        
    })

    export default supplierSlice.reducer;

 