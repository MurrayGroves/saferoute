import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { rest } from "msw";
import autocomplete from "./autocomplete.json";
import hereAutocomplete from "./hereAutocomplete.json";

function sleep(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
}

export default [rest.get("https://ws-st.trimet.org/pelias/v1/autocomplete", function (req, res, ctx) {
  return res(ctx.json(autocomplete));
}), rest.get("https://slow.trimet.org/pelias/v1/autocomplete", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(req, res, ctx) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return sleep(3000);

          case 2:
            return _context.abrupt("return", res(ctx.json(autocomplete)));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()), rest.get("https://autosuggest.search.hereapi.com/v1/autosuggest", function (req, res, ctx) {
  return res(ctx.json(hereAutocomplete));
})];
//# sourceMappingURL=handlers.js.map