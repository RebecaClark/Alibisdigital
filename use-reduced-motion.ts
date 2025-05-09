import { useState, useEffect } from "react";

/**
 * A hook that detects if the user has enabled reduced motion preferences
 * This allows us to respect user preferences by disabling or reducing animations
 * @returns boolean indicating if reduced motion is preferred
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check if the browser supports matchMedia and the prefers-reduced-motion query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Set the initial value based on the media query result
    setPrefersReducedMotion(mediaQuery.matches);

    // Create a handler function for the change event
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener for changes to the media query
    mediaQuery.addEventListener("change", handleChange);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}