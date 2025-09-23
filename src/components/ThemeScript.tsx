export default function ThemeScript() {
  const script = `
    (function() {
      // try to get theme from localStorage
      const savedTheme = localStorage.getItem('theme');
      
      // check system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // dark theme if saved as dark OR (no saved preference AND system prefers dark)
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    })()
  `;

  // dangerouslySetInnerHTML is necessary to execute the script immediately
  // biome-ignore lint/security/noDangerouslySetInnerHtml: necessary for script injection
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
