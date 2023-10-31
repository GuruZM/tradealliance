import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs,onSnapshot } from "firebase/firestore"; 
import { db } from '@/app/utils/firebase/firebase_initialization';


export const fetchCustomers : any= createAsyncThunk('customers/fetchAll', async (_, { dispatch, signal }) => {
    return new Promise((resolve, reject) => {
      const customersRef = collection(db, 'customers');
      let customers : any = [];
  
      const unsubscribe = onSnapshot(customersRef, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        customers = data;
    
        resolve(customers);
    
      }, (error) => {
 
        reject(error);
      });
  
      if (signal.aborted) {
        unsubscribe();
      }
    });
  });


const initialState = {
    customers: [],
    status: 'loading',
    error: null
}


const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {       
            builder.addCase(fetchCustomers.pending, (state  , action : any) => {
                state.status = 'loading'
            })
            .addCase(fetchCustomers.fulfilled, (state, action :any) => {
                state.status = 'succeeded'
                state.customers = action.payload
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = 'failed'
             
            })
        }
        
    })

    export default customerSlice.reducer;

 