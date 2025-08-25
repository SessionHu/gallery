const nav = document.querySelector('nav#nav')!;

// nav#nav > div > ul#nav-left > li > a
const navleft = document.createElement('div');
const navleftul = document.createElement('ul');
navleftul.id = 'nav-left';
for (const [n, h] of [
  ['blog', 'https://sess.xhustudio.eu.org/'],
  ['gallery', '#']
]) {
  const e = document.createElement('li');
  const a = document.createElement('a');
  a.href = h;
  a.textContent = n;
  e.appendChild(a);
  navleftul.appendChild(e);
}
navleft.appendChild(navleftul);

// nav#nav > div > ul#nav-right > li > a
const navright = document.createElement('div');
const navrightul = document.createElement('ul');
navrightul.id = 'nav-right';
{
  const e = document.createElement('li');
  const a = document.createElement('a');
  a.textContent = 'settings';
  a.href = '#settings';
  a.addEventListener('click', console.log);
  e.appendChild(a);
  navrightul.appendChild(e);
}
navright.appendChild(navrightul);

nav.append(navleft, navright);
