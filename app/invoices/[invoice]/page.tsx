'use client'
import React, { useEffect } from 'react'
import AdminLayout from '@/app/layout/AdminLayout'
import { useDispatch,useSelector } from 'react-redux'
import { fetchDocumentById } from '@/app/redux/slices/invoiceSlice'
import { Spinner } from '@nextui-org/react'

type pageProps = {
    params : {invoice : string}
}


function Page  ({params} : pageProps) {
    const dispatch = useDispatch()
  useEffect(() => {    
        dispatch(fetchDocumentById(params.invoice))
  },[dispatch])
    

    const {invoiceById,status} = useSelector((state : any) => state.invoices) 
    
    

  return (
    <AdminLayout>
       { status === 'loading'? <div className='w-full flex justify-center h-screen bg-white items-center'><Spinner label='Loading Invoice...' size='lg'/></div>  : true ?  <div
                className='dark:bg-[#141625] mx-auto duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12  lg:py-[72px] '>
                <div className=''>
                    <div className=' mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#1e2139]'>
                        <div className=' flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center'>
                            <h1 className=' text-gray-600 font-medium dark:text-gray-400'>
                                Status
                            </h1>
                            
                        </div>
                        <div className=' md:block hidden space-x-3'>
                          
                            
                           

                        </div>
                    </div>


                    <div className=' mt-4 rounded-lg w-full  px-6 py-6 bg-white dark:bg-[#1e2139]'>

                        <div className=' flex flex-col md:flex-row items-start justify-between w-full '>
                            <div>
                                {/* <h1 className=' font-semibold dark:text-white text-xl'><span className='text-[#7e88c3]'>#</span>{invoiceById[0].invoice_number}</h1> */}
                                {/* <p className=' text-sm text-gray-500'>{invoiceById[0].customer_name}</p> */}
                            </div>
                            <div className=' mt-4 md:mt-0 text-left text-gray-400 text-sm md:text-right felx flex-col items-center'>
                                <p> Trade Alliance</p>
                                <p>Lusaka, Zambia</p>
                                {/* <p>{invoice.senderAddress.postCode}</p>
                                <p>{invoice.senderAddress.country}</p> */}
                            </div>
                        </div>

                        <div className=' mt-10 grid grid-cols-2 w-full  md:grid-cols-3'>

                            <div className=' flex flex-col justify-between'>
                                <div>
                                    <h3 className=' text-gray-400 font-thin '>Invoice Date</h3>
                                    {/* <h1 className=' text-lg font-semibold dark:text-white'>{invoiceById[0].date}</h1> */}
                                </div>
                                {/* <div>
                                    <h3 className=' text-gray-400 font-thin '>Payment Due</h3>
                                    <h1 className=' dark:text-white text-lg font-semibold'>Due date</h1>
                                </div> */}
                            </div>

                            <div className=''>
                                <p className=' text-gray-400 font-thin'>Bill to</p>
                                <h1 className=' dark:text-white text-lg font-semibold'>
                                    {/* {invoiceById[0].customer_name} */}
                                </h1>
                                {/* <p className=' text-gray-400 font-thin'>Address</p> */}
                                
                            </div>

                            <div className=' mt-8 md:mt-0'>
                                <p className=' text-gray-400 font-thin'>Sent to</p>
                                {/* <h1 className=' dark:text-white text-lg font-semibold'>
                                    email
                                </h1> */}

                            </div>

                        </div>

                        {/* Last Section */}

                        <div className=' sm:hidden mt-10 bg-[#f9fafe] dark:bg-[#252945] rounded-lg rounded-b-none space-y-4  p-10'>
                            {/* {
                        
                                invoiceById[0].line_items.map((item : any) => (
                                    <div className=' justify-between text-lg dark:text-white flex'>
                                        <h1>{item.name}</h1>
                                        <h1>£{item.total}</h1>
                                    </div>
                                ))
                            } */}
                        </div>

                        <div className=' hidden sm:block mt-10 bg-[#f9fafe] dark:bg-[#252945] rounded-lg rounded-b-none space-y-4  p-10'>
                            
                            {/* {invoiceById[0].line_items.map((item : any) => (
                                <div key={item.id} className=' flex justify-around  '>
                                    <div className=' space-y-4' >
                                        <p className=' text-gray-400 font-thin'>Item name</p>

                                        <h1 className=' dark:text-white text-base font-semibold'>
                                            {item.name}
                                        </h1>
                                    </div>
                                    <div className=' space-y-4' >
                                        <p className=' text-gray-400 font-thin'>Qty.</p>

                                        <h1 className=' dark:text-white text-base font-semibold'>
                                            {item.quantity}
                                        </h1>
                                    </div>
                                    <div className=' space-y-4' >
                                        <p className=' text-gray-400 font-thin'>Item price</p>

                                        <h1 className=' dark:text-white text-base font-semibold'>
                                            K{item.price}
                                        </h1>
                                    </div>
                                    <div className=' space-y-4' >
                                        <p className=' text-gray-400 font-thin'>Total</p>

                                        <h1 className=' dark:text-white text-base font-semibold'>
                                            K{item.total}
                                        </h1>
                                    </div>

                                </div>

                            ))} */}

                        </div>
                        <div className=' p-10 font-semibold text-white rounded-lg rounded-t-none justify-between flex dark:bg-black bg-primary '>
                            <h3 className=' text-xl '>
                                Invoice Total 
                            </h3>

                            <h1 className=' text-3xl'>
                              K{invoiceById[0].invoice_total}
                            </h1>

                        </div>

                    </div>
                </div>

            </div>: <div className='w-full flex justify-center h-screen bg-white items-center'>Something went wrong</div>}
    </AdminLayout>

  )
}

export default Page