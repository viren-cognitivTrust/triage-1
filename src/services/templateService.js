const ejs = require('ejs');

function renderUserTemplate(template, data) {
  return ejs.render(template, data, { async: false });
}

module.exports = {
  renderUserTemplate
};