// This file is used to enable eruda debugging in the browser
// If the URL contains "eruda=true" or the localStorage item "active-eruda" is set to "true", then the eruda script is loaded and initialized.
if (/eruda=true/.test(location.search) || localStorage.getItem('active-eruda') == 'true')
  document.write('<script src="https://unpkg.com/eruda"></script><script>eruda.init();document.currentScript?.remove();</script>');
// remove after execution
document.currentScript?.remove();
