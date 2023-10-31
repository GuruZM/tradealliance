import React from 'react';
export default function Footer() {
    return (
        <footer className="py-6 px-16 border-t border-gray-200 bg-white font-light flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-700 hover:text-gray-900 opacity-60 font-medium block text-sm">
                Copyright &copy; {new Date().getFullYear()}{' '}
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className=" "
                >
                    Trade Alliance
                </a>
            </p>

            <ul className="list-unstyled flex">
               
                <li>
                    <a
                        className="text-gray-700 hover:text-gray-900 opacity-60 font-medium block text-sm"
                        target="_blank"
                        rel="noreferrer"
                        href=""
                    >
                        Crafted by Resonantt 
                    </a>
                </li>
            </ul>
        </footer>
    );
}
