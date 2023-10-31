import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase/firebase_initialization';
import {Dropdown, Button, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { useRouter } from 'next/navigation';



type SidebarProps = {
    showSidebar: string;
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>;
}

export default function AdminNavbar({ showSidebar, setShowSidebar } : SidebarProps) {
   
  const router = useRouter();

    return (
        <nav className="bg-light-blue-500 md:ml-64 py-6 px-3">
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <Button
                  
                    
                        onClick={() => setShowSidebar('left-0')}
                    >
                        {/* <Icon name="menu" size="2xl" color="white" /> */}
                    </Button>
                    <div
                        className={`absolute top-2 md:hidden ${
                            showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                    >
                        <Button
                         
                            onClick={() => setShowSidebar('-left-64')}
                        >
                            {/* <Icon name="close" size="2xl" color="white" /> */}
                        </Button>
                    </div>
                </div>

                <div className="flex justify-end items-center w-full  px-10">
                    {/* <h4 className="uppercase text-white text-sm tracking-wider mt-1">
                        {location === '/'
                            ? 'DASHBOARD'
                            : location.toUpperCase().replace('/', '')}
                    </h4> */}

                    <div className="flex ">
        

                        <div className=" ">
                      
    
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              
            }}
            className="transition-transform"
            description={auth.currentUser && auth.currentUser.email}
            name={auth.currentUser && auth.currentUser.displayName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{auth.currentUser && auth.currentUser.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Profile
          </DropdownItem>
 
          <DropdownItem 
          onClick={() => signOut(auth).then(() => {
            router.push('/');
          })}

          key="signout">
           Sign Out
          </DropdownItem>
           
        </DropdownMenu>
      </Dropdown>
   
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
