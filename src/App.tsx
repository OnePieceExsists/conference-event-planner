
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import ConferenceDashboard from "./components/ConferenceDashboard";
import AddSessionPage from "./pages/AddSessionPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<ConferenceDashboard />} />
          <Route path="/add-session" element={<AddSessionPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
