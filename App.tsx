import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import FunnelPage from "@/pages/FunnelPage";
import Scanner from "@/pages/Scanner";
import TermosUso from "@/pages/TermosUso";
import Privacidade from "@/pages/Privacidade";
import Cookies from "@/pages/Cookies";
import FAQ from "@/pages/FAQ";
import Suporte from "@/pages/Suporte";
import Contato from "@/pages/Contato";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/funnel" component={FunnelPage} />
      <Route path="/scanner" component={Scanner} />
      <Route path="/termos-de-uso" component={TermosUso} />
      <Route path="/privacidade" component={Privacidade} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/faq" component={FAQ} />
      <Route path="/suporte" component={Suporte} />
      <Route path="/contato" component={Contato} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <Router />
        <Toaster />
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}

export default App;
