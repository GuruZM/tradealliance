'use client'
import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from './AdminNavbar';
 


export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed z-50  rounded-lg   top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                        href="https://material-tailwind.com?ref=mtd"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <h6 color="gray">Trade Alliance</h6>
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <Link
                                    href="/dashboard"
                                  
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="dashboard" size="2xl" /> */}
                                    Dashboard
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link
                                    href="/categories"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="settings" size="2xl" /> */}
                                    Categories
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2 ">
                                <Link
                                    href="/products"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="toc" size="2xl" /> */}
                                    Products
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <Link
                                    href="/invoices"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="map" size="2xl" /> */}
                                   Invoices
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <Link
                                    href="/suppliers"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="map" size="2xl" /> */}
                                   Suppliers
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <Link
                                    href="/customers"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="map" size="2xl" /> */}
                                   Customers
                                </Link>
                            </li>

                            <li className="rounded-lg mb-2 text-gray-700">
                                <Link
                                    href="/reports"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    // activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    {/* <Icon name="map" size="2xl" /> */}
                                   Reports
                                </Link>
                            </li>
                          
                        </ul>

                        <ul className="flex-col min-w-full flex list-none absolute bottom-0">
                            <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white mb-2">
                                <a
                                    href="https://material-tailwind.com/documentation/quick-start"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    {/* <Icon name="description" size="2xl" /> */}
                                    Documentation
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
