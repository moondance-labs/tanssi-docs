(function () {
  var script = document.currentScript;
  var redirectLocalesCsv =
    (script && script.dataset && script.dataset.redirectLocales) || "";
  var redirectLocales = redirectLocalesCsv
    .split(",")
    .map(function (value) {
      return (value || "").trim().toLowerCase();
    })
    .filter(Boolean);
  if (!redirectLocales.length) return;

  // Site-agnostic base path (works under subpaths like GitHub Pages /<repo>/).
  var basePath = "/";
  try {
    basePath = new URL(document.baseURI).pathname || "/";
  } catch (e) {}
  if (basePath.charAt(0) !== "/") basePath = "/" + basePath;
  if (!basePath.endsWith("/")) basePath += "/";

  var pathname = window.location.pathname || "/";
  var rel = pathname;
  if (basePath !== "/" && rel.indexOf(basePath) === 0) {
    rel = rel.slice(basePath.length);
  } else if (rel.indexOf("/") === 0) {
    rel = rel.slice(1);
  }

  var first = (rel.split("/").filter(Boolean)[0] || "").toLowerCase();
  if (redirectLocales.indexOf(first) === -1) return;

  // Avoid redirect loops.
  var target = (basePath + first + "/404/").replace(/\/{2,}/g, "/");
  if (pathname === target || pathname.indexOf(target) === 0) return;

  window.location.replace(target);
})();
