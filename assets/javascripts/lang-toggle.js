(function () {
  function splitPath(pathname) {
    return (pathname || "/").split("/").filter(Boolean);
  }

  function normalizeBasePrefix(prefix) {
    if (!prefix) return "/";
    if (prefix[prefix.length - 1] !== "/") return prefix + "/";
    return prefix;
  }

  function pathHasLocale(pathname, locale) {
    return splitPath(pathname).indexOf(locale) !== -1;
  }

  function resolveHrefPath(link) {
    var href = link.getAttribute("href") || "";
    try {
      return new URL(href, window.location.href).pathname || "";
    } catch (err) {
      return "";
    }
  }

  function guessDefaultLocale(links, locales) {
    var defaultLocale = "";
    links.forEach(function (link) {
      var lang = link.getAttribute("hreflang") || "";
      var hrefPath = resolveHrefPath(link);
      if (lang && hrefPath && !pathHasLocale(hrefPath, lang) && !defaultLocale) {
        defaultLocale = lang;
      }
    });

    if (!defaultLocale) {
      var htmlLang = document.documentElement.getAttribute("lang") || "";
      if (locales.indexOf(htmlLang) !== -1) {
        defaultLocale = htmlLang;
      }
    }

    return defaultLocale || locales[0] || "";
  }

  function resolveBasePrefix(pathname, locales, links, defaultLocale) {
    var parts = splitPath(pathname);
    var localeIndex = -1;
    for (var i = 0; i < parts.length; i++) {
      if (locales.indexOf(parts[i]) !== -1) {
        localeIndex = i;
        break;
      }
    }

    if (localeIndex !== -1) {
      var baseParts = parts.slice(0, localeIndex);
      var basePath = "/" + baseParts.join("/");
      return normalizeBasePrefix(basePath === "/" ? "/" : basePath);
    }

    var defaultLink = null;
    links.forEach(function (link) {
      if (!defaultLink && link.getAttribute("hreflang") === defaultLocale) {
        defaultLink = link;
      }
    });
    if (defaultLink) {
      return normalizeBasePrefix(resolveHrefPath(defaultLink));
    }

    for (var j = 0; j < links.length; j++) {
      var link = links[j];
      var lang = link.getAttribute("hreflang") || "";
      var hrefPath = resolveHrefPath(link);
      if (lang && hrefPath && pathHasLocale(hrefPath, lang)) {
        var linkParts = splitPath(hrefPath);
        var idx = linkParts.indexOf(lang);
        var prefixParts = linkParts.slice(0, idx);
        var prefixPath = "/" + prefixParts.join("/");
        return normalizeBasePrefix(prefixPath === "/" ? "/" : prefixPath);
      }
    }

    if (links.length) {
      return normalizeBasePrefix(resolveHrefPath(links[0]));
    }

    return "/";
  }

  function pickActiveLocale(locales, pathname, fallback) {
    var parts = splitPath(pathname);
    for (var i = 0; i < parts.length; i++) {
      if (locales.indexOf(parts[i]) !== -1) {
        return parts[i];
      }
    }
    return fallback || locales[0] || "";
  }

  function syncLanguageToggle() {
    var pathname = window.location.pathname || "/";
    var languageLinks = document.querySelectorAll(
      '[data-md-component="language"] a[hreflang]'
    );
    var label = document.querySelector(
      '[data-md-component="language"] .language-picker__label'
    );

    if (!languageLinks.length) return;

    var locales = [];
    languageLinks.forEach(function (link) {
      var lang = link.getAttribute("hreflang") || "";
      if (lang && locales.indexOf(lang) === -1) locales.push(lang);
    });

    var defaultLocale = guessDefaultLocale(languageLinks, locales);
    var activeLocale = pickActiveLocale(locales, pathname, defaultLocale);
    var basePrefix = resolveBasePrefix(pathname, locales, languageLinks, defaultLocale);

    languageLinks.forEach(function (link) {
      var lang = link.getAttribute("hreflang") || "";
      if (!lang) return;

      var href = basePrefix;
      if (lang !== defaultLocale) {
        href = basePrefix + lang + "/";
      }
      link.setAttribute("href", href);
      link.classList.toggle("is-active", lang === activeLocale);
    });

    if (label && activeLocale) {
      label.textContent = activeLocale.toUpperCase();
    }
  }

  document.addEventListener("DOMContentLoaded", syncLanguageToggle);
})();
