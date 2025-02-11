import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * This hook is used to simulate a loading state in a component.
 *
 * @param gap the duration between each loading state update
 */
export function useArtificialLoading(gap: number = 500) {
  const [isLoading, setLoading] = useState(true);
  const loadingElementRef = useRef<HTMLElement>(null);

  /**
   * This function is used to update the loading state of the component.
   */
  const startCounter = useCallback(() => {
    const element = loadingElementRef.current;

    if (element) {
      // Get the current presentation value or set it to 0 if it's not a number
      const currentPresentation = Number(element.innerText) ?? 0;

      // Calculate the remaining presentation to reach 100
      const loadingPresentationLeft = 100 - currentPresentation;

      // If the remaining presentation is less than or equal to 10, set the presentation to 100
      if (loadingPresentationLeft <= 10) {
        element.innerText = '100';
        return setLoading(false);
      }

      // Set the presentation to a random number between 1 and 10
      element.innerText = (
        currentPresentation +
        (Math.floor(Math.random() * 10) + 1)
      ).toString();

      // Call the function again after a random duration between 1 and the gap
      setTimeout(
        () => requestAnimationFrame(startCounter),
        Math.floor(Math.random() * gap) + 1,
      );
    }
  }, [gap, loadingElementRef.current]);

  useEffect(() => {
    if (loadingElementRef.current && isLoading) {
      startCounter();
    }
  }, [loadingElementRef.current, isLoading]);

  return {
    /**
     * A reference to the element that will be used to display the loading state.
     */
    loadingElementRef,

    /**
     * A boolean that indicates if the component is in a loading state.
     */
    isLoading,
  };
}
