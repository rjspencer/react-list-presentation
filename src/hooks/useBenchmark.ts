import { useLayoutEffect } from "react";

/**
 * Simple hook for displaying time between the start of a render cycle and the DOM being updated.
 * To use place `useBenchmark()` at the top of the component you need to test.
 * Results will appear in the browser dev tools console.
 */
export const useBenchmark = (name = "") => {
  // timestamp is set at the start of the render cycle
  const start = Date.now();

  // This hooks runs after the DOM update is complete, giving us a reasonable point to measure update time
  // Note that while elements are updated at this point, they may not be completely rendered to the user
  // Example <img> tags are on the page but will still be loading image files
  useLayoutEffect(() => {
    // If you play with this in a real app, you might want to prevent it from running in production,
    // just in case you forget to remove it
    // if (process.env.NODE_ENV !== 'production') {
    console.log(`Render ${name}: ${(Date.now() - start) / 1000} seconds`);
    // }
  });
};
