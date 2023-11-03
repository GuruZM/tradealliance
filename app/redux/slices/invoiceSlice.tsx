import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs,doc,onSnapshot,getDoc,DocumentSnapshot, DocumentData,query,where } from "firebase/firestore"; 
import { db } from '@/app/utils/firebase/firebase_initialization';


export const fetchInvoice : any= createAsyncThunk('invoices/fetchAll', async (_, { dispatch, signal }) => {
    return new Promise((resolve, reject) => {
      const invoicesRef = collection(db, 'invoices');
      let invoices : any = [];
  
      const unsubscribe = onSnapshot(invoicesRef, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        invoices = data;
    
        resolve(invoices);
    
      }, (error) => {
 
        reject(error);
      });
  
      if (signal.aborted) {
        unsubscribe();
      }
    });
  });


  export const fetchDocumentById : any = createAsyncThunk(
    'documents/fetchById',
    async (Id, { rejectWithValue }) => {
      try {
 
        const q = query(collection(db, "invoices"), where("invoice_number", "==", Id));
        const querySnapshot = await getDocs(q);
        if (querySnapshot) {
       
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          return data;
       
        } else {       
          return rejectWithValue('Invoice not found');
        }
      } catch (error: any) {
        // Handle errors, e.g., network issues or permissions
        return rejectWithValue(error.message);
      }
    }
  );
  

const initialState = {
    invoices: [],
    invoiceById : [] ,
    status: 'loading',
    error: null
}


const invoiceSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {       
            builder.addCase(fetchInvoice.pending, (state  , action : any) => {
                state.status = 'loading'
            })
            .addCase(fetchInvoice.fulfilled, (state, action :any) => {
                state.status = 'succeeded'
                state.invoices = action.payload
            })
            .addCase(fetchInvoice.rejected, (state, action) => {
                state.status = 'failed'            
            })
            .addCase(fetchDocumentById.pending, (state  , action : any) => {
                state.status = 'loading'
            })
            .addCase(fetchDocumentById.fulfilled, (state, action :any) => {
                state.status = 'succeeded'
                state.invoiceById = action.payload
            })
            .addCase(fetchDocumentById.rejected, (state, action) => {
                state.status = 'failed'            
            })
        }
        
    })

    export default invoiceSlice.reducer;

 