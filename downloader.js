export default class Downloader {
   static handle(params) {
      const link = Downloader.convert(params);
      if (!link) throw 'Failed to convert.';

      return Downloader.download(link);
   }

   static convert(params) {
      if (typeof params !== 'string') return null;

      const links = Downloader.links;
      for (const type in links) {
         const parsedType = (params.split(`?${type}=`)[1] || '').split('?')[0] || '';
         if (parsedType) {
            return links[type](parsedType);
         }
      }

      throw 'Failed to convert.';
   }

   static get links() {
      return {
         plugin: arg => `https://raw.githubusercontent.com/discord-modifications/better-discord-plugins/master/${arg}/${arg}.plugin.js`,
         theme: arg => `https://raw.githubusercontent.com/discord-modifications/${arg}/master/${arg.split('-').map(a => `${a[0].toUpperCase()}${a.slice(1)}`).join('')}.theme.css`,
         custom: arg => `https://raw.githubusercontent.com/discord-modifications/better-discord-plugins/master/${arg}`
      };
   }

   static async download(url) {
      if (!url) throw `Missing URL.`;
      if (!~url.indexOf('raw.githubusercontent.com') && !~url.indexOf('github.io')) {
         throw `${url} isn't a valid GitHub File URL.`;
      }

      const res = await fetch(url).then(r => r.blob());
      window.download(res, url.split('/').pop());
   }
}