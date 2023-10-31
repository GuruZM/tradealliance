import React from "react";
const categoryColumns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const productColumns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "DESCRIPTION", uid: "description", sortable: true},
  {name: "CATEGORY", uid: "category", sortable: true},
  {name: "SUPPLIER", uid: "supplier", sortable: true},
  {name: "BASE PRICE", uid: "base_price", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const supplierColumns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "DESCRIPTION", uid: "description", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const customerColumns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "CONTACT", uid: "contact", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const invoiceColumns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "INVOICE NUMBER", uid: "name", sortable: true},
  {name: "CUSTOMER", uid: "name", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
    {name: "Vacation", uid: "vacation"},
  ];

  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
    },
    
  ];


  export {categoryColumns,customerColumns,supplierColumns,users,productColumns,invoiceColumns,statusOptions};