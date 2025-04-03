import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DarkMode from '@/pages/DarkMode'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/featureSlice/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'


const Navbar = () => {

  //predefault()
  const { user } = useSelector((state) => state.auth)
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate()



  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logout")
    }
  }, [isSuccess])

  const logoutHandler = async () => {
    await logoutUser()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logout");
      navigate("/login")
    }
  }, [isSuccess])

  return (
    <div className='h-16 dark:bg-[#0A0A0A]b bg-white border-b dark:border-b-gray-800 border-b-gray-200 
    fixed top-0 left-0 right-0  z-10
    '>
      {/* DeskTop */}

      <div className=" h-full w-full mx-auto container  hidden md:flex justify-between items-center gap-10">
        <div className="flex items-center gap-5">
          <Link to='/'>  <School size={"30"} /></Link>
          <h1
            className='hidden md:block font-extrabold text 2xl'
          >LMS-Learning</h1>
        </div>
        {/* User icons and dark mode icons */}
        <div className="flex items-center gap-8">
          {
            user ? (<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  <Link to="my-account">My Account</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to='profile'>Eidt Profile</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link onClick={logoutHandler}>Log out</Link>
                </DropdownMenuItem>
                {
                  user.role === "instructor" && (
                    <>
                      <DropdownMenuItem >
                        <Link onClick={logoutHandler}>   Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>)
              :
              <div className="flex items-center gap-2">
                <Button onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate("/login")}>Signup</Button>
              </div>
          }
          <DarkMode />
        </div>
      </div>

      {/* Mobile divice */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className='text-2xl font-bold'>LMS-Learning</h1>
        <MobileNabar />
      </div>
    </div>
  )
}

export default Navbar


const MobileNabar = () => {

  const role = "instructor"
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-200"
            variant="outline"><Menu /></Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-5">
            <Link to='/'>  <School size={"30"} /></Link>
            <SheetTitle>LMS-Learning</SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className='mr-2'>
            <nav className='flex flex-col space-y-4 p-5'>
              <Link to="my-account">My Account</Link>
              <Link to='profile'>Eidt Profile</Link>
              <Link >Log out</Link>
            </nav>
            {
              role === "instructor" && (<SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>)
            }
          </Separator>
        </SheetContent>
      </Sheet>

    </div>
  )
} 