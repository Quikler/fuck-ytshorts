(async () => {
  // link to this amazing function: https://stackoverflow.com/a/61511955/23143871
  function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  function removeElement(elem) {
    console.log("fuck you:", elem);
    const elemParent = elem.parentNode;
    elemParent.removeChild(elem);
  }

  // Remove initially

  // Slide side bar Shorts button
  waitForElm('a[title="Shorts"][id="endpoint"][class="yt-simple-endpoint style-scope ytd-guide-entry-renderer"]')
    .then(e => removeElement(e.parentNode));

  // Side bar Short button element
  waitForElm('ytd-mini-guide-entry-renderer[aria-label="Shorts"]')
    .then(e => removeElement(e));

  // listen for youtube short shit
  while (true) {
    // grid-shelf-view-model

    // selectors to track for 
    // - '.ytGridShelfViewModelHost' - shorts group class
    // - 'ytm-shorts-lockup-view-model' - shorts video element on your search
    // - 'ytd-rich-section-renderer' - shorts group video element on your feed

    const elm = await waitForElm('.ytGridShelfViewModelHost, ytm-shorts-lockup-view-model, ytd-rich-section-renderer');
    removeElement(elm);
  }
})();
