'use client'
import React, { useEffect } from 'react'
import { Divider, Input, Select, SelectItem } from '@nextui-org/react'
import { fetchProducts } from '../redux/slices/productSlice'
import { useDispatch,useSelector } from 'react-redux'


export function InvoiceField({register,index,handleRemove,handlePriceChange,getValues,handleQuantityChange}: any) {
  
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    const products = useSelector((state: any) => state.products.products)

    return (
        <div>

            <div className=' flex dark:text-white justify-between space-x-5 items-center'>
                <div className=' flex flex-wrap  w-full   '>
                    <div className=' flex-1 flex px-2 mt-6 flex-col  '>
                        
                        <Select
                        labelPlacement='outside'
                        startContent='📦'
                        label='Item Name'
                        {...register(`items.${index}.name`)}
                        >
                            {
                                products.map((product: any) => (
                                    <SelectItem key={product.name} value={product.name}>
                                        {product.name}
                                    </SelectItem>
                                ))
                            }
                            
                        </Select>

                        {/* <h1 className='font-medium'>
                            Item Name
                        </h1>
                         
                        <input name="name" onChange={(e) => { handelOnChange(itemDetails.id, e) }} value={itemDetails.name} type='text' className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none        dark:border-gray-800`} /> */}
                    </div>

                    <div className=' flex px-2   flex-1  flex-col items-start'>
                        <Input
                        type='number'
                        label='Qty.'
                        labelPlacement='outside'
                        startContent='🧮'
                        onChange={(event)=>(handleQuantityChange(index,event))}
                        />
                        {/* <h1>
                            Qty.
                        </h1>
                        <input name='quantity' type='number' onChange={(e) => { handelOnChange(itemDetails.id, e) }} value={itemDetails.quantity} min={0} className={` dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 max-w-[60px] border-gray-300 focus:outline-none      dark:border-gray-800`}  /> */}
                    </div>

                    <div className=' flex px-2 flex-1  flex-col items-start'>
                    <Input
                        type='number'
                        label='Price'
                        labelPlacement='outside'
                        onChange={(event)=>(handlePriceChange(index,event))}
                        startContent='K'             
                        />
                     
                        {/* <h1>
                            Price
                        </h1>
                        <input name='price' type='number' onChange={(e) => { handelOnChange(itemDetails.id, e) }} value={itemDetails.price} min={0} className={` dark:bg-[#1e2139] py-2 max-w-[100px] px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none dark:border-gray-800`} /> */}
                    </div>

                    <div className=' flex px-2 flex-1  flex-col items-start'>
                    <Input
                        type='number'
                        label='Total.'
                        labelPlacement='outside'
                        startContent='K'
                        // value={getValues(`items.${index}.total`)}
                       {...register(`items.${index}.total`)}
                        />
                       
                        {/* <h1>
                            Total
                        </h1>
                        <div className=' max-w-[100px] dark:bg-[#1e2139] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white'>
                            {itemDetails.total}
                        </div> */}
                    </div>
                </div>
                <button 
                className='pt-8'
                onClick={() => { handleRemove(index)  }}>
                 
                      🗑️
                </button>

            </div>
        </div>
    )
}



export default InvoiceField