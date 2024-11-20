import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaTachometerAlt, FaAddressBook, FaMoneyCheckAlt, FaStore, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // Load state from local storage when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSidebarOpen = localStorage.getItem('isSidebarOpen');
      const savedExpanded = localStorage.getItem('isExpanded');
      if (savedSidebarOpen !== null) {
        setIsSidebarOpen(JSON.parse(savedSidebarOpen));
      }
      if (savedExpanded !== null) {
        setIsExpanded(JSON.parse(savedExpanded));
      }
    }
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isExpanded', JSON.stringify(isExpanded));
    }
  }, [isExpanded]);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className={`flex flex-col ${isSidebarOpen ? 'w-60' : 'w-20'} drop-shadow-md transition-width duration-300 h-full p-1 sidebar`}>
      <div className="flex items-center justify-center h-16">
        <img src="https://via.placeholder.com/150" alt="Logo" className="h-10 w-auto" />
      </div>
      <ul className="mt-6 custom-space-y flex-1 list-none">
        <li>
          <Link href="/dashboard" legacyBehavior>
            <a className={`flex items-center ${isSidebarOpen ? 'p-2' : 'p-3'} text-white hover:bg-gray-700 rounded-md ${isActive('/dashboard') ? 'bg-active' : ''}`}>
              <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} w-full px-3`}>
                {isSidebarOpen && <span className="ml-2 text-sm">Dashboard</span>}
                <FaTachometerAlt className="h-4 w-4" />
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/kontak" legacyBehavior>
            <a className={`flex items-center ${isSidebarOpen ? 'p-2' : 'p-3'} text-white hover:bg-gray-700 rounded-md ${isActive('/kontak') ? 'bg-active' : ''}`}>
              <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} w-full px-3`}>
                {isSidebarOpen && <span className="ml-2 text-sm">Kontak</span>}
                <FaAddressBook className="h-4 w-4" />
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/transaksi" legacyBehavior>
            <a className={`flex items-center ${isSidebarOpen ? 'p-2' : 'p-3'} text-white hover:bg-gray-700 rounded-md ${isActive('/transaksi') ? 'bg-active' : ''}`}>
              <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} w-full px-3`}>
                {isSidebarOpen && <span className="ml-2 text-sm">Transaksi</span>}
                <FaMoneyCheckAlt className="h-4 w-4" />
              </div>
            </a>
          </Link>
        </li>
        {/* Add more menu items here */}
      </ul>
      <li className="mt-auto list-none">
        <button
          onClick={handleExpandClick}
          className="btn relative btn-ghost w-full p-0 m-0 rounded-none btn-expand"
        >
          {isExpanded ? '→' : '←'}
        </button>
      </li>
    </div>
  );
};

export default Sidebar;