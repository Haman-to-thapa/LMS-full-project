import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const navLinks = [
    {
      path: '/admin/dashboard',
      icon: <ChartNoAxesColumn size={22} />,
      label: 'Dashboard'
    },
    {
      path: '/admin/course',
      icon: <SquareLibrary size={22} />,
      label: 'Course'
    }
  ]

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className='hidden lg:block h-screen w-[250px] sm:w-[360px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 sticky top-0'>
        <div className="space-y-4 pt-10 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${location.pathname.startsWith(link.path)
                  ? 'bg-blue-500 text-white font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}

            >
              {link.icon}
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:p-12 p-4 overflow-auto h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default Sidebar