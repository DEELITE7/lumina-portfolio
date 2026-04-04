import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import StudioLayout from "./components/studio/StudioLayout.tsx";
import StudioDashboard from "./pages/studio/StudioDashboard.tsx";
import StudioProjects from "./pages/studio/StudioProjects.tsx";
import StudioBlog from "./pages/studio/StudioBlog.tsx";
import StudioTestimonials from "./pages/studio/StudioTestimonials.tsx";
import StudioMessages from "./pages/studio/StudioMessages.tsx";
import StudioSettings from "./pages/studio/StudioSettings.tsx";
import StudioMedia from "./pages/studio/StudioMedia.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/studio" element={<StudioLayout />}>
            <Route index element={<StudioDashboard />} />
            <Route path="projects" element={<StudioProjects />} />
            <Route path="blog" element={<StudioBlog />} />
            <Route path="testimonials" element={<StudioTestimonials />} />
            <Route path="messages" element={<StudioMessages />} />
            <Route path="settings" element={<StudioSettings />} />
            <Route path="media" element={<StudioMedia />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
