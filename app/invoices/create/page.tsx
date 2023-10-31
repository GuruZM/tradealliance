"use client";
import React, { use, useEffect, useState } from "react";
import AdminLayout from "@/app/layout/AdminLayout";
import { motion } from "framer-motion";
import { InvoiceField } from "@/app/components/InvoiceField";
import invoiceSlice from "@/app/redux/slices/invoiceSlice";
import { Select, SelectSection, Input, SelectItem , Button, Divider} from "@nextui-org/react";
import { PlusIcon } from "@/app/components/icons/PlusIcon";
import { fetchCustomers } from "@/app/redux/slices/customerSlice";
import { useDispatch,useSelector } from "react-redux";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';
import { db } from "@/app/utils/firebase/firebase_initialization";

function Create() {
  const dispatch = useDispatch();

  const type = "create";


 const items : any = [
    {
        name: "",
        quantity: 0,
        price: 0,
        total: 0,
 
      },
 ]

 const form = useForm({
    defaultValues: {
        invoiceNumber: 0,
        client: "",
        date: new Date().toISOString().slice(0, 10),
        deliveryTerms: "",
        transport: 0,
        invoiceTotal: 0,
         items: items,
    },
  });
  

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
});

const { register,reset,setValue,getValues, handleSubmit } = form;

const handlePriceChange = (index: number,e:any) => {

    const value = e.target.value
    setValue(`items.${index}.price`, value);
    const qty = getValues(`items.${index}.quantity`);
    const price = getValues(`items.${index}.price`);
    const total = qty * price;
    setValue(`items.${index}.total`, total);
    setInvoiceTotal()
} 

const handleQuantityChange = (index: number,e:any) => {
    
        const value = e.target.value
        setValue(`items.${index}.quantity`, value);
        const qty = getValues(`items.${index}.quantity`);
        const price = getValues(`items.${index}.price`);
        const total = qty * price;
        setValue(`items.${index}.total`, total);
        setInvoiceTotal()
    }

const setInvoiceTotal = () => {
    const items = getValues('items');
    const invoiceTotal = items.reduce((acc : any, item : any) => acc + item.total, 0);
    setValue('invoiceTotal', invoiceTotal);
}
   
const handleRemove = (index: number) => {
    remove(index);
};

const handleAdd = () => {
    append({
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
        id: "",
    });
};
const [isSubmitting, setIsSubmitting] = React.useState(false);

const onSubmit = async (data : any) => {
    setIsSubmitting(true);
    console.log('data :',data);
    try {
      
      const docRef = await addDoc(collection(db, "invoices"), {
        invoice_number: data.invoiceNumber,
        customer_name: data.client,
        date: data.date, // Corrected property name
        delivery_terms: data.deliveryTerms, // Corrected property name
        transport: data.transport,
        line_items: data.items,
        invoice_total: data.invoiceTotal,
      }); 
       
      setIsSubmitting(false);
    //   dispatch(fetchProducts())
      reset();
      toast.success("Invoice Created Successfully!");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      toast.error("Error adding Invoice. Please try again later.");
    }

};


  const deliveryTimes = [
    { text: "Next 1 day", value: 1 },
    { text: "Next 7 day", value: 7 },
    { text: "Next 14 day", value: 14 },
    { text: "Next 30 day", value: 30 },
  ];
  
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const clients = useSelector((state: any) => state.customers.customers);

  return (
    <AdminLayout>
      <motion.div
        key="createInvoice-sidebar"
        initial={{ x: -500, opacity: 0 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 40,
            duration: 0.4,
          },
        }}
        exit={{ x: -700, transition: { duration: 0.2 } }}
        className="  scrollbar-hide flex flex-col dark:text-white dark:bg-[#141625] bg-white my-5  md:pl-[50px] py-16 px-6 h-screen md:w-full md:rounded-r-3xl"
      >
        <h1 className=" font-semibold dark:text-white  text-3xl">
          {/* {type == 'edit' ? 'Edit' : 'Create'}  */}
          Create Invoice
        </h1>
        <form
        className="overflow-y-scroll relative scrollbar-hide "
        onSubmit={form.handleSubmit(onSubmit)}> 
        <div className="  ">
        <div className=" ">
          {/* Bill to Section */}

          <h1 className="my-4 mt-5 font-medium">Bill To</h1>

          <Divider className="my-5"/>
            
          <div className=" grid grid-cols-2   gap-3   ">
          <div className=" mx-1  flex flex-col ">
            <Input
              key="invoiceNumber"
              type="text"
              label="Invoice No#"
              labelPlacement="outside"
              startContent="#"
              className=""
                {...register("invoiceNumber")}
            />
          </div>
            <div className="  mt-6 col-span-1">
              <Select
                labelPlacement="outside"
                label="Client Name"
                className=" "
                startContent="👤"
                {...register("client")}
              >
                {
                    clients.map((client: any) => (
                        <SelectItem key={client.name} value={client.name}>
                        {client.name}
                        </SelectItem>
                    ))
                }
                
              </Select>
            </div>
          </div>

          <div className=" flex justify-center space-x-5 items-center mt-8 ">
            <div className=" flex-1  ">
              <Input
                key="date"
                type="date"
                label="Invoice Date"
                labelPlacement="outside"
                startContent="🗓️"
                {...register("date")}
              />
             
            </div>

            <div className="flex-1 mt-6">
              <Select
                labelPlacement="outside"
                label="Delivery Terms"
                className="w-full   "
                startContent="🚚"
                {...register("deliveryTerms")}
              >
                {deliveryTimes.map((time) => (
                  <SelectItem key={time.value} value={time.text}>
                    {time.text}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className=" mx-1 mt-4 flex flex-col ">
            <Input
              key="transport"
              type="text"
              label="Transport Amount"
              labelPlacement="outside"
              startContent="K"
              className=""
                {...register("transport")}
            />
          </div>

          {/* Item List Section */}

          <h2 className=" font-medium text-gray-500 mt-10 ">Item List</h2>
                    
         <Divider className="my-5"/>

          {fields.map(({id}, index) => (
            <div className=" border-b pb-2 border-gray-300 mb-4 ">
              <InvoiceField
                handleRemove={handleRemove}
                handlePriceChange={handlePriceChange}
                key={index}
                getValues={getValues}
                
                control={form.control}
                handleQuantityChange={handleQuantityChange}
                index={index}
                name={`items.${index}.name`}
                register={register}
                    
              />
            </div>
          ))}
     

       
            <Input
              key="invoiceTotal"
              type="text"
              label="Invoice Total"
              labelPlacement="outside"
              startContent="K"
              className="w-fit float-right"
                {...register("invoiceTotal")}
            />
    
        </div>
        </div>
        <div className="sticky space-y-4">

        <Button
            onClick={() => {
                handleAdd();
                }}
            className="  w-full mt-4"
            color="primary" endContent={<PlusIcon />} 
          >
            Add New Item 
          </Button>
        <div className=" flex  justify-between">
          <div>
            <Button
              onClick={() => {reset()}}
              className="  "
              color="primary"
            >
              Discard
            </Button>
          </div>

          <div>
            <Button
              className="  "
              color="primary"
               type="submit"
                isLoading={isSubmitting}
            >
              Submit
            </Button>
          </div>
          
        </div>
        </div>
       
        
        
        </form>
      </motion.div>
    </AdminLayout>
  );
}

export default Create;
