import { rest } from "msw";
import mapillary from "./mapillary.json"; // This faked endpoint will always return the same ID

export default [rest.get("https://graph.mapillary.com/images", function (req, res, ctx) {
  return res(ctx.json(mapillary));
})];
//# sourceMappingURL=handlers.js.map