
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'glass shadow-md py-3' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {['About', 'Features', 'Creators', 'Join'].map((item, index) => (
            <NavItem key={item} label={item} delay={index * 0.1} />
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-crimson transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  {user.email?.split('@')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="text-white hover:text-crimson transition-colors" 
                asChild
              >
                <Link to="/auth">Login</Link>
              </Button>
              <Button 
                className="bg-crimson hover:bg-crimson/90 text-white" 
                asChild
              >
                <Link to="/auth?tab=signup">Get Invited</Link>
              </Button>
            </>
          )}
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass shadow-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {['About', 'Features', 'Creators', 'Join'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-crimson py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-white/10">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-crimson justify-start"
                    asChild
                  >
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-crimson justify-start"
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-crimson justify-start"
                    asChild
                  >
                    <Link to="/auth">Login</Link>
                  </Button>
                  <Button 
                    className="bg-crimson hover:bg-crimson/90 text-white w-full"
                    asChild
                  >
                    <Link to="/auth?tab=signup">Get Invited</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

const Logo = () => (
  <motion.div 
    className="text-2xl font-bold text-white flex items-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Link to="/">
      <span className="text-gradient font-poppins">SubSpace</span>
    </Link>
  </motion.div>
);

const NavItem = ({ label, delay = 0 }: { label: string; delay?: number }) => (
  <motion.a
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    href={`#${label.toLowerCase()}`}
    className="text-white/90 hover:text-white transition-colors text-sm font-medium"
  >
    {label}
  </motion.a>
);

export default Navbar;
