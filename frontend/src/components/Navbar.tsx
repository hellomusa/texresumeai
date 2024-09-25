import type React from 'react';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FileText className="h-6 w-6 text-primary-600" />
              </motion.div>
              <motion.span 
                className="font-bold text-2xl font-display text-white"
                whileHover={{ scale: 1.05 }}
              >
                TeXResume.ai
              </motion.span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/templates">Templates</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <motion.button
                className="p-1 rounded-full text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">View profile</span>
                <User className="h-6 w-6" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white transition-colors duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/templates" mobile>Templates</NavLink>
              <NavLink to="/about" mobile>About</NavLink>
              <NavLink to="/contact" mobile>Contact</NavLink>
            </div>
            <div className="pt-4 pb-3 border-t border-primary-600">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full text-white" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none">Tom Cook</div>
                  <div className="text-sm font-medium leading-none text-primary-300">tom@example.com</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, mobile }) => {
  const baseClasses = "text-white font-medium transition-all duration-300 ease-in-out";
  const desktopClasses = "px-3 py-2 text-sm hover:text-secondary-300 relative";
  const mobileClasses = "block px-3 py-2 text-base hover:bg-primary-600 rounded-md";

  const linkAnimation = {
    rest: { width: 0 },
    hover: { width: "100%" },
  };

  return (
    <Link
      to={to}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
      activeProps={{ className: `${baseClasses} ${mobile ? mobileClasses : desktopClasses} ${mobile ? 'bg-primary-600' : 'text-secondary-300'}` }}
    >
      <motion.span
        className="relative z-10"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        {children}
        {!mobile && (
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-secondary-300"
            variants={linkAnimation}
          />
        )}
      </motion.span>
    </Link>
  );
};

export default Navbar;