'use client'
import React,{useEffect} from 'react'
import AdminLayout from '../layout/AdminLayout'

import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    useDisclosure,
    Divider,
    Spinner,
    ChipProps,
    SortDescriptor,
    Select, SelectItem
  } from "@nextui-org/react";
  import { PlusIcon } from '../components/icons/PlusIcon';
  import { VerticalDotsIcon } from '../components/icons/VerticalDotsIcon';
  import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
  import { SearchIcon } from '../components/icons/SearchIcon';
  import {productColumns,users, statusOptions } from '../utils/tableStructure/columns';
  import { capitalize } from '../utils/text/capitalize';
  import Model from '../components/Model';
  import { useForm,  Controller, set,  } from 'react-hook-form';
  import { db } from '../utils/firebase/firebase_initialization';
  import { collection, addDoc } from "firebase/firestore"; 
  import { toast } from 'react-toastify';
  import { useSelector,useDispatch } from 'react-redux';
  import { fetchCategories } from '../redux/slices/categorySlice';
  import { fetchProducts } from '../redux/slices/productSlice';
  
  const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  
  const INITIAL_VISIBLE_COLUMNS = ["name", "category", "supplier","description", "base_price","actions"];
  
  // type User = typeof users[0];


function Page() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
      column: "age",
      direction: "ascending",
    });

    const dispatch = useDispatch()
    const {categories} = useSelector((state:any)=>state.categories)
    const { status, products } = useSelector((state:any)=>state.products)

    useEffect(() => {
      dispatch(fetchCategories())
      dispatch(fetchProducts())
    }, [])
  
    const [page, setPage] = React.useState(1);
  
    const hasSearchFilter = Boolean(filterValue);
  
    const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return productColumns;
  
      return productColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);
  
    const filteredItems = React.useMemo(() => {
      let filteredProducts = [...products];
  
      if (hasSearchFilter) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredProducts = filteredProducts.filter((product) =>
          Array.from(statusFilter).includes(product.status),
        );
      }
  
      return filteredProducts;
    }, [products, filterValue, statusFilter]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const sortedItems = React.useMemo(() => {
      return [...items].sort((a: any, b: any) => {
        const first = a[sortDescriptor.column as keyof any] as number;
        const second = b[sortDescriptor.column as keyof any] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);
  
    const renderCell = React.useCallback((product: any, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof any];
  
      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-tiny capitalize text-default-400">{product.name}</p>
          </div>
          );
          case "description":
            return (
              <div className="flex flex-col">
              {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
              <p className="text-bold text-tiny capitalize text-default-400">{product.description}</p>
            </div>
            );
        case "category":
          return (
            <div className="flex flex-col">
              {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
              <p className="text-bold text-tiny capitalize text-default-400">{product.category}</p>
            </div>
          );
        case "supplier":
          return (
            <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-tiny capitalize text-default-400">{product.supplier}</p>
          </div>
          );
          case "base_price":
          return (
            <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-tiny capitalize text-default-400">K{product.base_price}</p>
          </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);
  
    const onNextPage = React.useCallback(() => {
      if (page < pages) {
        setPage(page + 1);
      }
    }, [page, pages]);
  
    const onPreviousPage = React.useCallback(() => {
      if (page > 1) {
        setPage(page - 1);
      }
    }, [page]);
  
    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    }, []);
  
    const onSearchChange = React.useCallback((value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    }, []);
  
    const onClear = React.useCallback(()=>{
      setFilterValue("")
      setPage(1)
    },[])
  
    const topContent = React.useMemo(() => {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              {/* <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown> */}
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {productColumns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button color="primary" endContent={<PlusIcon />}  onPress={onOpen}>
                Add New
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {products.length} users</span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      );
    }, [
      filterValue,
      statusFilter,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      products.length,
      hasSearchFilter,
    ]);
  
    const bottomContent = React.useMemo(() => {
      return (
        <div className="py-2 px-2 flex justify-between items-center">
          <span className="w-[30%] text-small text-default-400">
            {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
          </span>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
          <div className="hidden sm:flex w-[30%] justify-end gap-2">
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
              Previous
            </Button>
            <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
              Next
            </Button>
          </div>
        </div>
      );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
 
    type productType = {
      name: string;
      category: string;
      supplier: string;
      base_price: number;
      description: string;
    };
 
    const { register,reset, handleSubmit, getValues} = useForm<productType>();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
     
  const onSubmit = async (data: productType) => {
    setIsSubmitting(true);
    console.log('data :',data);
    try {
      
      const docRef = await addDoc(collection(db, "products"), {
        name: data.name,
        category: data.category, // Corrected property name
        supplier: data.supplier, // Corrected property name
        base_price: data.base_price, // Corrected property name
        description: data.description,
      }); 
       
      setIsSubmitting(false);
      dispatch(fetchProducts())
      reset();
      onOpenChange();
      toast.success("Product added successfully!");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      toast.error("Error adding product. Please try again later.");
    }
  };



 
    return (
   <AdminLayout>
<Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody isLoading={status=="loading"? true: false}   loadingContent={<Spinner label="Loading..." />} emptyContent={status === 'loading'? " " : sortedItems.length == 0 ? " No Products Found": " "} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    <Model onOpenChange={onOpenChange} isOpen={isOpen} title="Add Product" isSubmitting={isSubmitting}>                
            <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                  autoFocus
                  labelPlacement='outside'
                  label="Name"
                  placeholder="e.g "
             
                  {...register('name', { required: true })}
                />

                  <Input
                  autoFocus
                  labelPlacement='outside'
                  label="Description"
                  placeholder="e.g 300ml vatra bottle"
             
                  {...register('description', { required: true })}
                />

                  
              <Select
              labelPlacement="outside"
              label="Category"
              className="w-full my-3"
              placeholder="Select Category"
              {...register('category', { required: true })}
            >
              {categories.map((category : any) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>

            <Select
              labelPlacement="outside"
              label="Supplier"
              className="w-full my-3"
              placeholder="Select Supplier"
              {...register('supplier', { required: true })}
            >
             
                <SelectItem key="tradekings">
                  Tradekings
                </SelectItem>
               
            </Select>

            <Input
                  autoFocus
                  labelPlacement='outside'
                  label="Base Price"
                  placeholder="e.g 100"
             
                  {...register('base_price', { required: true })}
                  startContent={<span className="text-default-400 text-small">K</span>}
                />


                  <Divider className='my-5'/>
                <div className="buttonSection flex  justify-end gap-1">
                  <Button 
                
                color="danger" variant="flat"  onPress={()=>{
                  reset()
                  onOpenChange()  
                }}>
                  Close
                </Button>

                <Button 
                isLoading={isSubmitting}
                type='submit'
                color="primary" >
                 Submit
                </Button>
            </div>
            </form>     
            </Model>
   </AdminLayout>
  )
}

export default Page