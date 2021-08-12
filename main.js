window.onload = function () {
   const error = (text, fail = true) => {
      document.title = `Downloader - ${fail ? 'Failed' : 'Success'}`;
      document.body.innerHTML = `<div>${text}</div>`;
   };
   if (!window.location.search) error('No Parameters');
   else window.DownloadApi.convert(window.location.search, error);
};