if (/eruda=true/.test(location.search) || localStorage.getItem('active-eruda') == 'true')
  document.write('<script src="https://unpkg.com/eruda"></script><script>eruda.init();document.currentScript?.remove();</script>');
document.currentScript?.remove();
