// The English text lives in the HTML. Elements marked data-i18n="key" (content)
// or data-i18n-label="key" (aria-label) take their Russian from this dictionary.
{
  const ru = {
    title: 'Михаил Самарин · Ведущий инженер-программист',
    name: 'Михаил Самарин',
    role: 'Ведущий инженер-программист',
    pitch: 'Продуктовый инженер: начинаю с проблемы клиента, а затем создаю приложение, которое её решает.',
    contact: 'Контакты',
    cv: 'Скачать резюме (EN)',
    sections: 'Разделы',
    toLight: 'Включить светлую тему',
    toDark: 'Включить тёмную тему',

    about: 'Обо мне',
    about1:
      'Я ведущий инженер-программист с более чем десятилетним опытом работы с <span class="angular">Angular</span>, начиная ещё с AngularJS. Я работаю в промышленном IoT: здесь приложение — это инструмент, с помощью которого инженеры управляют парками edge-устройств на производстве, поэтому ясность и надёжность крайне важны.',
    about2:
      'Я веду продуктовые направления целиком: формулирую проблему клиента, пишу PRD или ADR, согласую контракт API с бэкенд-инженерами, разбиваю работу на задачи, разрабатываю приложение, собираю релиз и разворачиваю окружение для его тестирования. Больше всего мне нравится превращать расплывчатую потребность клиента в решение, которое может реализовать вся команда, а затем воплощать его.',
    about3:
      'Моя основная экспертиза — фронтенд, но я уверенно чувствую себя и в остальном стеке, и в системном дизайне. Каждый день работаю с ИИ-агентами для программирования: декомпозирую задачи, задаю ограничения и проверяю каждое изменение, поэтому агенты ускоряют работу, не снижая планку качества. В свободное время создаю собственные продукты; последний из них — iOS-приложение в App Store.',
    skills: 'Навыки',
    languages:
      'Языки: <button class="lang-switch" type="button" data-lang="en">английский</button>, <button class="lang-switch" type="button" data-lang="ru" aria-current="true">русский</button>.',

    experience: 'Опыт',
    litmus:
      'Промышленное edge-ПО. Вёл продуктовые направления от проблемы клиента до релиза и отвечал за пользовательский и административный фронтенд Litmus Edge Manager.',
    lem: 'Платформа для развёртывания, настройки и мониторинга парков промышленных edge-устройств. Я разработал её пользовательское и административное приложения.',
    unify:
      'MQTT-хаб данных для единого пространства имён (Unified Namespace) всей компании. Я разработал веб-приложение для его эксплуатации и мониторинга.',
    mc: 'Подключение заводов к Manufacturing Data Engine (MDE) в Google Cloud, спроектированное Litmus. Я разработал веб-приложение для управления настройками MDE и edge-инстансами, которые передают в него данные.',
    technologies: 'Технологии',

    projects: 'Проекты',
    bp: 'iOS-приложение, которое записывает давление по фотографии домашнего тонометра. Оно распознаёт цифры на экране, сохраняет каждое измерение в Apple Health и показывает графики, напоминания и PDF-отчёт.',
    source: 'Код на GitHub',

    education: 'Образование',
    university: 'Магнитогорский государственный технический университет',
    degree: 'Инженер по специальности «Промышленная электроника»',
    courses: 'Курсы',

    hobbies: 'Увлечения',
    hobbyList: 'Путешествия, походы, спорт (хоккей, футбол, баскетбол), книги и программирование.',
  };

  const root = document.documentElement;

  // Read the English once, so switching back needs no second dictionary.
  const texts = [...document.querySelectorAll('[data-i18n]')].map((el) => [el, el.dataset.i18n, el.innerHTML]);
  const labels = [...document.querySelectorAll('[data-i18n-label]')].map((el) => [el, el.dataset.i18nLabel, el.ariaLabel]);

  const apply = (lang) => {
    const russian = lang === 'ru';
    root.lang = lang;
    // Every value is a static string from this file, so innerHTML is safe here.
    for (const [el, key, english] of texts) el.innerHTML = russian ? ru[key] : english;
    for (const [el, key, english] of labels) el.ariaLabel = russian ? ru[key] : english;
  };

  // Storage can be blocked in private modes; the choice then lasts for this visit only.
  try {
    if (localStorage.getItem('lang') === 'ru') apply('ru');
  } catch {}

  // Both language names in the Languages line are switches; the current one does nothing.
  // The line is re-rendered on every switch, so the listener sits on the line itself.
  const line = document.querySelector('[data-i18n="languages"]');
  line.addEventListener('click', (event) => {
    const lang = event.target.closest('[data-lang]')?.dataset.lang;
    if (!lang || lang === root.lang) return;
    apply(lang);
    line.querySelector(`[data-lang="${lang}"]`).focus();
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  });
}
