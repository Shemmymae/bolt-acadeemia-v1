import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path;

  // Scroll to top when clicking navigation links
  const handleNavClick = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2" onClick={handleNavClick}>
          <img 
            src="/assets/logo/acadeemia-logo.png"
            alt="Acadeemia Logo" 
            className="h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              isActive('/') ? 'text-primary-600' : 'text-gray-700'
            }`}
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link 
            to="/versions" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              isActive('/versions') ? 'text-primary-600' : 'text-gray-700'
            }`}
            onClick={handleNavClick}
          >
            Versions
          </Link>
          <Link 
            to="/features" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              isActive('/features') ? 'text-primary-600' : 'text-gray-700'
            }`}
            onClick={handleNavClick}
          >
            Features
          </Link>
          <Link 
            to="/demo" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              isActive('/demo') ? 'text-primary-600' : 'text-gray-700'
            }`}
            onClick={handleNavClick}
          >
            Demo
          </Link>
          <Link 
            to="/pricing" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              isActive('/pricing') ? 'text-primary-600' : 'text-gray-700'
            }`}
            onClick={handleNavClick}
          >
            Pricing
          </Link>
          <Link 
            to="/store" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              isActive('/store') ? 'text-primary-600' : 'text-gray-700'
            }`}
            onClick={handleNavClick}
          >
            Store
          </Link>
          <Link 
            to="/about" 
            className={`font-medium transition-colors hover:text-primary-600 ${
              isActive('/about') ? 'text-primary-600' : 'text-gray-700'
            }`}
            onClick={handleNavClick}
          >
            About
          </Link>
          
          {user ? (
            <Button variant="primary" onClick={handleDashboardClick}>
              Dashboard
            </Button>
          ) : (
            <>
              <Link 
                to="/contact" 
                className="btn-outline"
                onClick={handleNavClick}
              >
                Contact Us
              </Link>
              <Button variant="primary" onClick={handleLoginClick} icon={<LogIn size={18} />}>
                Login
              </Button>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white w-full shadow-lg animate-fade-in">
          <nav className="container py-5 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium p-2 rounded-lg transition-colors ${
                isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link 
              to="/versions" 
              className={`font-medium p-2 rounded-lg transition-colors ${
                isActive('/versions') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleNavClick}
            >
              Versions
            </Link>
            <Link 
              to="/features" 
              className={`font-medium p-2 rounded-lg transition-colors ${
                isActive('/features') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleNavClick}
            >
              Features
            </Link>
            <Link 
              to="/demo" 
              className={`font-medium p-2 rounded-lg transition-colors ${
                isActive('/demo') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleNavClick}
            >
              Demo
            </Link>
            <Link 
              to="/pricing" 
              className={`font-medium p-2 rounded-lg transition-colors ${
                isActive('/pricing') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleNavClick}
            >
              Pricing
            </Link>
            <Link 
              to="/store" 
              className={`font-medium p-2 rounded-lg transition-colors ${
                isActive('/store') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleNavClick}
            >
              Store
            </Link>
            <Link 
              to="/about" 
              className={`font-medium p-2 rounded-lg transition-colors ${
                isActive('/about') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleNavClick}
            >
              About
            </Link>
            
            {user ? (
              <Button variant="primary" fullWidth onClick={handleDashboardClick}>
                Dashboard
              </Button>
            ) : (
              <>
                <Link 
                  to="/contact" 
                  className="btn-outline text-center"
                  onClick={handleNavClick}
                >
                  Contact Us
                </Link>
                <Button variant="primary" fullWidth onClick={handleLoginClick} icon={<LogIn size={18} />}>
                  Login
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
