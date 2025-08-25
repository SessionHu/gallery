// discrete colors level
const levels = 50;
// generate tableValues for feFuncR/G/B
const tableValues = Array.from({ length: levels + 1 }, (_, i) => (i * 1 / levels).toString()).join(' ');
// create filter
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
// append to body
document.body.appendChild(div);
