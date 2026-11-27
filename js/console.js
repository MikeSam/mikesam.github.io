// A greeting for visitors who open developer tools.
{
  const mikhail = [
    '██      ██    ██████    ██    ██    ██    ██      ████      ██████    ██',
    '████  ████      ██      ██  ██      ██    ██    ██    ██      ██      ██',
    '██  ██  ██      ██      ████        ████████    ████████      ██      ██',
    '██      ██      ██      ██  ██      ██    ██    ██    ██      ██      ██',
    '██      ██    ██████    ██    ██    ██    ██    ██    ██    ██████    ████████',
  ].join('\n');

  const samarin = [
    '  ██████      ████      ██      ██      ████      ██████      ██████    ██    ██',
    '██          ██    ██    ████  ████    ██    ██    ██    ██      ██      ████  ██',
    '  ████      ████████    ██  ██  ██    ████████    ██████        ██      ██  ████',
    '      ██    ██    ██    ██      ██    ██    ██    ██  ██        ██      ██    ██',
    '██████      ██    ██    ██      ██    ██    ██    ██    ██    ██████    ██    ██',
  ].join('\n');

  const experiaence = [
      'Lead Software Engineer · 10+ years of Angular',
      'msamarin@gmail.com'
    ].join('\n');

  const letters = 'font: 12px/1 monospace; color:';

  console.log(`%c${mikhail}\n\n%c${samarin}`, `${letters} #14b8a6`, `${letters} #94a3b8`);
  console.log(experiaence);
}
