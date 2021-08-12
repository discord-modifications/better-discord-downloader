window.DownloadApi = {
   converter: {
      plugin: arg => `https://raw.githubusercontent.com/slow/better-discord-plugins/master/${arg}/${arg}.plugin.js`,
      theme: arg => `https://raw.githubusercontent.com/slow/${arg}/master/${arg.split('-').map(a => `${a[0].toUpperCase()}${a.slice(1)}`).join('')}.theme.css`
   },
   convert: (parameterString, error) => {
      if (typeof parameterString == 'string') for (let parameter in window.DownloadApi.converter) {
         let arg = (parameterString.split(`?${parameter}=`)[1] || '').split('?')[0] || '';
         if (arg) {
            window.DownloadApi.download(window.DownloadApi.converter[parameter](arg), error);
            break;
         }
         else if (parameterString.endsWith(`?${parameter}`)) {
            window.DownloadApi.download(window.DownloadApi.converter[parameter](), error);
            break;
         }
      }
   },
   download: (url, error) => {
      if (!url) return error && error('No URL!');
      if (url.indexOf('raw.githubusercontent.com') == -1 && url.indexOf('github.io') == -1) return error && error(`<a href='${url}'>${url}</a> not a valid GitHub File URL!`);
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function () {
         if (this.status == 200) {
            const tempLink = document.createElement('a');
            tempLink.href = window.URL.createObjectURL(new Blob([this.response], { type: `text/${url.split('.').pop()}` }));
            tempLink.download = url.split('/').pop();
            tempLink.click();
         }
         if (this.status == 404) error && error(`GitHub File <a href'${url}'>${url}</a> does not exist!`);
      };
      xhttp.onerror = function () { error && error(`GitHub File <a href='${url}'>${url}</a> does not exist!`); };
      xhttp.open('GET', url, true);
      xhttp.send();
      error('Download was successful, you may now close this page.', false)
   }
};