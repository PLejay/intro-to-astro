---
title: Islands
---

Astro supports "__component islands__", which implement __selective hydration__.

Islands are __isolated__, __interactive UI components__ loading client-side javascript.

This means all non-essential javascript is stripped from the page and pre-loaded, but selective sections retain interactivity, as a compromise between __speed__ and __power__.

Island components can be written in a variety of supported frameworks, even different ones for each island.

> Time for a [quick demonstration](/calculator)