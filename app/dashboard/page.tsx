'use client'
import react,{use, useEffect} from 'react';  
// import StatusCard from 'components/StatusCard';
// import ChartLine from 'components/ChartLine';
// import ChartBar from 'components/ChartBar';
// import PageVisitsCard from 'components/PageVisitsCard';
// import TrafficCard from 'components/TrafficCard';
import { useRouter } from 'next/navigation';
import AdminLayout from "../layout/AdminLayout";
import StatusCard from "../components/StatusCard";
import { SpinnerIcon } from '../components/icons/Spinner';
import {  onAuthStateChanged } from "firebase/auth";
import { auth  } from "../utils/firebase/firebase_initialization";

import { useDispatch,useSelector } from 'react-redux'; 

export default async function Dashboard() {


   const  router  = useRouter();

  useEffect(() => {
   onAuthStateChanged(auth, (user) => {             
        if (!user) {
           router.push('/')
        } else 
        { 

        }
      });

  })

  


    return (
        <>
        <AdminLayout>
            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            {/* <ChartLine /> */}
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            {/* <ChartBar /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-10 gap-10 xl:grid-cols-3 mb-4">
                        <StatusCard
                           
                        />
                        <StatusCard
                             
                        />
                        <StatusCard
                     
                        />
                 
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            {/* <PageVisitsCard /> */}
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            {/* <TrafficCard /> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* model */}
 
            </AdminLayout>
        </>
    );
}
 