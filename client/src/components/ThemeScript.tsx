export default function ThemeScript() {
  // This script inlines in the document head to prevent flash of light theme
  const script = `
    (function() {
      // Try to get theme from localStorage
      const savedTheme = localStorage.getItem('theme');
      
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Apply dark theme if saved as dark or if system prefers dark and no saved preference
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })()
  `;

  // Using dangerouslySetInnerHTML is necessary for immediate script execution
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
