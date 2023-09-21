function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', newTheme);

  document.cookie = `theme=${newTheme}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

  const themeToggleIcon = document.getElementById('themeToggle');
  if (themeToggleIcon) {
    themeToggleIcon.classList.toggle('fa-sun');
    themeToggleIcon.classList.toggle('fa-moon');
  }
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

window.addEventListener('DOMContentLoaded', () => {
  const themeCookie = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const currentTheme = themeCookie || 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);

  const themeToggleIcon = document.getElementById('themeToggle');
  if (themeToggleIcon) {
    if (currentTheme === 'dark') {
      themeToggleIcon.classList.remove('fa-moon');
      themeToggleIcon.classList.add('fa-sun');
    } else {
      themeToggleIcon.classList.remove('fa-sun');
      themeToggleIcon.classList.add('fa-moon');
    }
  }
});