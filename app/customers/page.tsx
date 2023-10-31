'use client'
import React,{useEffect} from 'react'
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
    Spinner,
    Divider,
    useDisclosure,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor
  } from "@nextui-org/react";
import { PlusIcon } from '../components/icons/PlusIcon';
import { VerticalDotsIcon } from '../components/icons/VerticalDotsIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { customerColumns,users, statusOptions } from '../utils/tableStructure/columns';
import { capitalize } from '../utils/text/capitalize';
import AdminLayout from '../layout/AdminLayout';
import Model from '../components/Model';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import { fetchCustomers } from '../redux/slices/customerSlice'; 
import { useForm,  Controller, set,  } from 'react-hook-form';
import { db } from '../utils/firebase/firebase_initialization';
import { collection, addDoc } from "firebase/firestore";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

const INITIAL_VISIBLE_COLUMNS = ["name", "contact", "actions"];

type User = typeof users[0];

function Page() {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchCustomers())
  },[dispatch])

  const {customers,status} = useSelector((state: any) => state.customers)
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

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return customerColumns;

    return customerColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCustomers = [...customers];

    if (hasSearchFilter) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        customer.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredCustomers = filteredCustomers.filter((customer) =>
        Array.from(statusFilter).includes(customer.status),
      );
    }

    return filteredCustomers;
  }, [customers, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((customer: any, columnKey: React.Key) => {
    const cellValue = customer[columnKey as keyof any];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-400">{customer.name}</p> */}
          </div>
        );
      case "contact":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-400">{customer.contact}</p> */}
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
                {customerColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
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
    users.length,
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

  const { register,reset, handleSubmit, getValues} = useForm<any>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    console.log('data :',data);
    try {
      
      const docRef = await addDoc(collection(db, "customers"), {
        name: data.name,
        contact: data.contact, // Corrected property name
      }); 
       
      setIsSubmitting(false);
      dispatch(fetchCustomers())
      reset();
      onOpenChange();
      toast.success("Customer added successfully!");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      toast.error("Error adding Customer. Please try again later.");
    }
  };


  return (
    <AdminLayout>
    <Table
      aria-label="Customer Table"
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
      <TableBody isLoading={status=="loading"? true: false}   loadingContent={<Spinner label="Loading..." />} emptyContent={status === 'loading'? " " : sortedItems.length == 0 ? " No Customers Found": " "}  items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>


    <Model onOpenChange={onOpenChange} isOpen={isOpen} title="Add Supplier" isSubmitting={isSubmitting}>                
            <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                  autoFocus
                  labelPlacement='outside'
                  label="Name"
                  placeholder="e.g Trade Kings"
             
                  {...register('name', { required: true })}
                />

                  <Input
                  autoFocus
                  labelPlacement='outside'
                  label="Contact"
                  placeholder="e.g 097 ******"
                  {...register('contact', { required: true })}
                  
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
  );
}

export default Page