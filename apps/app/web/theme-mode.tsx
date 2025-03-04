import { useEffect, useState } from 'react';

export function useThemeMode(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  let lastClassString = document.body.classList.toString();

  const mutationObserver = new MutationObserver((mutationList) => {
    for (const item of mutationList) {
      if (item.attributeName === 'class') {
        const classString = document.body.classList.toString();
        if (classString !== lastClassString) {
          setTheme(document.body.classList.contains('dark') ? 'dark' : 'light');
          lastClassString = classString;
          break;
        }
      }
    }
  });

  useEffect(() => {
    mutationObserver.observe(document.body, { attributes: true });

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return theme;
}
