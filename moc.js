(function () {
  "use strict";

  const MATCH_URL = "https://matchtime.live/nhl-ant/";

  if (typeof window !== "undefined") {
    window.location.replace(MATCH_URL);
  }
})();
