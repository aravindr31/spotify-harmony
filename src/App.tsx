import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Discover from "./pages/Discover";
import NotFound from "./pages/NotFound";
import { getAccessToken, redirectToSpotifyAuth } from "./api/auth/spotifyAuth";
import { Button } from "./components/ui/button";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("spotify_access_token")
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !isAuthenticated) {
      getAccessToken(code).then(() => {
        setIsAuthenticated(true);
        window.history.replaceState({}, document.title, "/");
      });
    }
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {!isAuthenticated ? (
              <div className="flex h-screen w-full items-center justify-center">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight">Harmony - Your Music Stats</h1>
                  <p className="text-muted-foreground">Login to see your top tracks and artists.</p>
                  <Button 
                    size="lg" 
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold rounded-full"
                    onClick={redirectToSpotifyAuth}
                  >
                    Login with Spotify
                  </Button>
                </div>
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/discover" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;