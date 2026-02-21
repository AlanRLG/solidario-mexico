import { Link, useLocation } from "react-router-dom";
import { Heart, Wallet } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Inicio", path: "/" },
  { label: "Eventos", path: "/eventos" },
  { label: "Sobre Nosotros", path: "/sobre-nosotros" },
];

const WalletButton = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => disconnect()}
        className="gap-2 font-mono text-xs"
      >
        <Wallet className="h-3 w-3 text-green-500" />
        {address.slice(0, 6)}...{address.slice(-4)}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      onClick={() => connect({ connector: connectors[0] })}
      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
    >
      <Wallet className="h-4 w-4" />
      Conectar Wallet
    </Button>
  );
};

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
          <div className="ml-2">
            <WalletButton />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
