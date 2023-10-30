// userSlice.tsx
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import {  onAuthStateChanged } from "firebase/auth";
import { auth  } from "../../utils/firebase/firebase_initialization";
import { UserTypes } from '@/app/types/types';
import { useDispatch } from 'react-redux';
//  fetch products from the database


 

export const fetchUser : UserTypes = createAsyncThunk('user/fetchAll', async () => { 
    try {

    } catch (error) {
        console.log
      throw error; 
    }
  });

  export function Test (){
    return onAuthStateChanged(auth, (user) => {
        console.log('onAuthStateChanged callback - user:', user);
        
        if (user) {
            console.log('user is  logged in ');
           return true// User is authenticated
        } else {
            console.log('user is not logged in');
          return false; // User is not authenticated
        }
      });
  }

  export async function checkUser () {
    return   new  Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        console.log('onAuthStateChanged callback - user:', user);
        
        if (user) {
            console.log('user is  logged in ');
          resolve(true); // User is authenticated
        } else {
            console.log('user is not logged in');
          resolve(false); // User is not authenticated
        }
      });
    });
}

//   export async function checkUser () {    
//     let isLogged = false;
//     onAuthStateChanged(auth, (user : any) => {
//         if (user) {
//             isLogged = true;      
//         }
      
//     })
//     console.log('isLogged is ',isLogged);
//     return isLogged;
// }

    // const dispatch = useDispatch();

export const isLogged = () => {
    onAuthStateChanged(auth, (user : UserTypes) => {
        if (!user) {
          return null
        }
        {
            console.log(user);
               
        }
    })
  }

  type stateType  = {
    user: UserTypes | null ,
    status: string,
    error: string | null,
    isLoggedin: boolean
  }

  const initialState: stateType = {
    user: null,
    status: 'empty',
    isLoggedin: false,
    error: null,
  };
  

  const userSlice = createSlice({
    name: 'users',
    initialState ,
    reducers: {
            addUser: (state: { user: UserTypes }, action) => {
                state.user.push(action.payload);
            },

            getUser: (state: stateType) => {
                if (state.user) {
                    console.log('user in slice ',state.user);
                    return state.user;
                }else{
                    state.isLoggedin =  true
                }
                
            }

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state,  action : UserTypes) => {
          state.status = 'succeeded';
          console.log('action is ',action.payload);
          state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state , action : UserTypes) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
export const { getUser } = userSlice.actions;
export default userSlice.reducer;