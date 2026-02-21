import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Eventos", path: "/eventos" },
  { label: "Sobre Nosotros", path: "/sobre-nosotros" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-accent fill-accent" />
          <span className="font-display text-xl font-bold text-foreground">
            Unidos por México
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
