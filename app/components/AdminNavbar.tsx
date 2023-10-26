// import { useLocation } from 'react-router-dom';
// import Button from '@material-tailwind/react/Button';
 
import {Dropdown, Button, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";

// import Icon from '@material-tailwind/react/Icon';
// import NavbarInput from '@material-tailwind/react/NavbarInput';
// import Image from '@material-tailwind/react/Image';
// import Dropdown from '@material-tailwind/react/Dropdown';
// import DropdownItem from '@material-tailwind/react/DropdownItem';
// import ProfilePicture from 'assets/img/team-1-800x800.jpg';

type SidebarProps = {
    showSidebar: string;
    setShowSidebar: React.Dispatch<React.SetStateAction<string>>;
}

export default function AdminNavbar({ showSidebar, setShowSidebar } : SidebarProps) {
    // const location = useLocation().pathname;

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
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Profile
          </DropdownItem>
 
          <DropdownItem key="analytics">
            Logout
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
