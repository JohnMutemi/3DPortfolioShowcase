import { useEffect, useState, Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import { useTheme } from "@/hooks/useTheme";

// Custom page component
const HomePage = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`relative bg-gradient-to-b from-primary-dark to-secondary-dark ${theme}-mode`}>
      <ThemeToggle />
      <ScrollProgress />
      <Navigation />
      
      <div className="container mx-auto px-4">
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
