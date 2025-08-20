const levels = 50;
const tableValues = Array.from({ length: levels + 1 }, (_, i) => (i * 1 / levels).toString()).join(' ');
const div = document.createElement('div');
div.innerHTML =
  '<svg>' +
    '<defs>' +
      '<filter id="svg-filter">' +
        '<feComponentTransfer>' +
          `<feFuncR type="discrete" tableValues="${tableValues}"/>` +
          `<feFuncG type="discrete" tableValues="${tableValues}"/>` +
          `<feFuncB type="discrete" tableValues="${tableValues}"/>` +
        '</feComponentTransfer>' +
      '</filter>' +
    '</defs>' +
  '</svg>';
document.body.appendChild(div);
