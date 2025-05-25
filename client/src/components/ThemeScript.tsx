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
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }

      // Add color-scheme meta tag if it doesn't exist
      if (!document.querySelector('meta[name="color-scheme"]')) {
        const meta = document.createElement('meta');
        meta.name = 'color-scheme';
        meta.content = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        document.head.appendChild(meta);
      }
    })()
  `;

  // Using dangerouslySetInnerHTML is necessary for immediate script execution
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
