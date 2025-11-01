import { Switch, Route, Link, Router, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { useHashLocation } from "./lib/useHashLocation";
import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { Header } from "@/components/Header";
import Home from "@/pages/Home";
import ToolDetail from "@/pages/ToolDetail";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

import { usePageTitle } from "@/hooks/use-page-title";

const RouterContent = () => {
  usePageTitle();
  const [location] = useLocation();

  // Scroll to top on route change so navigation always starts at the top
  useEffect(() => {
    // Run after paint to ensure new route content is rendered first
    try {
      requestAnimationFrame(() => {
        try {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        } catch (e) {
          window.scrollTo(0, 0);
        }
        // additional fallbacks for some browsers/containers
        try { document.documentElement.scrollTop = 0; } catch (e) {}
        try { document.body.scrollTop = 0; } catch (e) {}
      });
    } catch (e) {
      try { window.scrollTo(0, 0); } catch (e) {}
    }
  }, [location]);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tool/:slug" component={ToolDetail} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
      <footer className="border-t border-sidebar-border bg-sidebar">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">SteamFamily</h3>
              <p className="text-sm text-muted-foreground">
                Community gaming tools platform
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-footer-home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors" data-testid="link-footer-terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <p className="text-sm text-muted-foreground">
                Join our gaming community and share tools
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SteamFamily. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router hook={useHashLocation}>
            <Toaster />
            <RouterContent />
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
