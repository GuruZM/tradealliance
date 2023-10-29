
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'; 
import { Providers } from './redux/provider';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trade Alliance',
  description: 'Trade Alliance Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <ToastContainer   />
        <Providers>
        {children} 
        </Providers>  
        </body>
    </html>
  )
}
