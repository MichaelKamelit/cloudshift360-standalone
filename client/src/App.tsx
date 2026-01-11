import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceCloudDevOps from "./pages/ServiceCloudDevOps";
import ServiceITSecurity from "./pages/ServiceITSecurity";
import ServiceDigitalMarketing from "./pages/ServiceDigitalMarketing";
import ServiceAIConsultation from "./pages/ServiceAIConsultation";
import ServiceCloudCostAudit from "./pages/ServiceCloudCostAudit";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/cloud-devops" component={ServiceCloudDevOps} />
      <Route path="/services/it-security" component={ServiceITSecurity} />
      <Route path="/services/digital-marketing" component={ServiceDigitalMarketing} />
      <Route path="/services/ai-consultation" component={ServiceAIConsultation} />
      <Route path="/services/cloud-cost-audit" component={ServiceCloudCostAudit} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogArticle} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
