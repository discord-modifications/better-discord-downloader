import Downloader from './downloader.js';

function respond(text, fail = true) {
   document.title = `Downloader - ${fail ? 'Failed' : 'Success'}`;
   document.body.innerHTML = `<div>${text}</div>`;
};

window.onload = async function () {
   if (!window.location.search) {
      return respond('No Parameters');
   }

   try {
      await Downloader.handle(window.location.search);
      respond('Download successful, you may now close this tab.', false);
   } catch (e) {
      console.error(e);
      respond(`Failed to download addon.`);
   }
};