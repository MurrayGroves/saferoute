import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";

// eslint-disable-next-line prettier/prettier
function run(_ref) {
  var query = _ref.query,
      url = _ref.url;
  return fetch("".concat(url, "/geocode/stopClusters?query=").concat(query)).then(function (res) {
    return res.text();
  }).then(function (res) {
    return JSON.parse("{\"results\": ".concat(res, "}"));
  });
}
/**
 * Search for an address using
 * OTP Geocoder
 *
 * @param  {Object} $0
 * @param  {string} $0.url  The OTP instance, ending with /default/
 * @param  {string} $0.text query
 * @return {Promise}        A Promise that'll get resolved with the autocomplete result
 */


function autocomplete(_x) {
  return _autocomplete.apply(this, arguments);
}

function _autocomplete() {
  _autocomplete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
    var url, text;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = _ref2.url, text = _ref2.text;
            return _context.abrupt("return", run({
              query: text,
              url: url
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _autocomplete.apply(this, arguments);
}

function search() {
  console.warn("Not implemented");
  return null;
}

function reverse() {
  console.warn("Not implemented");
  return null;
}

export { autocomplete, reverse, search };
//# sourceMappingURL=index.js.map