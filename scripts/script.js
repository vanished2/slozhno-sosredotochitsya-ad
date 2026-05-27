const THEMES = ['light', 'auto', 'dark'];
const THEME_CLASS_PREFIX = 'theme-';
const ACTIVE_BUTTON_CLASS = 'header__theme-menu-button_active';

(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const theme = THEMES.includes(savedTheme) ? savedTheme : 'auto';
  setTheme(theme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];
  const currentTheme = getCurrentTheme();

  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = getButtonTheme(button);

      if (!chosenTheme) {
        return;
      }

      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });
});

function setTheme(theme) {
  document.documentElement.classList.remove(
    ...THEMES.map((item) => `${THEME_CLASS_PREFIX}${item}`)
  );
  document.documentElement.classList.add(`${THEME_CLASS_PREFIX}${theme}`);
  localStorage.setItem('theme', theme);
}

function getCurrentTheme() {
  return (
    THEMES.find((theme) =>
      document.documentElement.classList.contains(
        `${THEME_CLASS_PREFIX}${theme}`
      )
    ) || 'auto'
  );
}

function getButtonTheme(button) {
  return THEMES.find((theme) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove(ACTIVE_BUTTON_CLASS);
    button.removeAttribute('disabled');
    button.setAttribute('aria-pressed', 'false');
  });

  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );

  if (target) {
    target.classList.add(ACTIVE_BUTTON_CLASS);
    target.setAttribute('disabled', '');
    target.setAttribute('aria-pressed', 'true');
  }
}
