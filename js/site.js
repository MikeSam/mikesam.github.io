// Loaded in <head> without defer so a saved theme applies before the first paint.
{
  const root = document.documentElement;

  // The site follows the system theme until the visitor picks one.
  // Storage can be blocked in private modes; the site then just follows the system.
  const saved = (() => {
    try {
      return localStorage.getItem('theme');
    } catch {
      return null;
    }
  })();
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const systemDark = matchMedia('(prefers-color-scheme: dark)');
    const theme = () => root.dataset.theme ?? (systemDark.matches ? 'dark' : 'light');
    // The button shows the icon, and so the label, of the theme it switches to.
    const label = () => {
      toggle.dataset.next = theme() === 'dark' ? 'light' : 'dark';
    };

    toggle.addEventListener('click', () => {
      root.dataset.theme = theme() === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', root.dataset.theme);
      } catch {
        // The choice still holds for this visit.
      }
      label();
    });
    systemDark.addEventListener('change', label);
    label();
    toggle.hidden = false;

    // Mark the nav link of the last section whose top has passed the upper quarter of the screen.
    // At the very bottom the last section wins, since a short one may never get that high.
    const links = document.querySelectorAll('.nav a');
    const sections = [...document.querySelectorAll('main section')];
    // A section picked from the menu or the address stays marked until the visitor scrolls on their own:
    // short sections at the end of the page share one scroll position, so scrolling alone can't tell them apart.
    let picked = location.hash;
    const mark = () => {
      const page = document.documentElement;
      const atBottom = scrollY + innerHeight >= page.scrollHeight - 2;
      const current =
        sections.find((section) => `#${section.id}` === picked) ??
        (atBottom
          ? sections.at(-1)
          : (sections.findLast((section) => section.getBoundingClientRect().top <= innerHeight / 4) ?? sections[0]));
      for (const link of links) link.toggleAttribute('aria-current', link.hash === `#${current.id}`);
    };
    const pick = (hash) => {
      picked = hash;
      mark();
    };
    // Clicks cover a second click on the same link, which changes no address.
    for (const link of links) link.addEventListener('click', () => pick(link.hash));
    addEventListener('hashchange', () => pick(location.hash));
    for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown']) {
      addEventListener(type, () => (picked = ''), { passive: true });
    }
    addEventListener('scroll', mark, { passive: true });
    addEventListener('resize', mark);
    mark();
  });
}
