const got = require('got');
const url = process.argv[2];

(async () => {
    console.time('Process');
    
    const response = await got(url);
    const html = response.body;

    const title = html.match(/<h1\n            class="header_with_cover_art-primary_info-title header_with_cover_art-primary_info-title--white"\n          >(.+?)<\/h1>/i)[1];
    const artist = html.match(/<a\n              href=".+?"\n              class="header_with_cover_art-primary_info-primary_artist"\n            >(.+?)<\/a>/i)[1];
    const release_date = html.match(/<div class="metadata_unit">(.+?)<\/div>/i)[1];
    const image = html.match(/<img alt=".+?" class="cover_art-image" src="(.+?)" srcset=".+?" \/>/i)[1];

    console.timeEnd('Process');

    stringify(title, artist, release_date, image);
})();

function stringify(title, artist, releaseDate, imageLink) {
  let str = `
  ### ${title}
  <br>
  <center><img src="${imageLink}" class="img-album"></center>
  <br>
  `;

  let str2 = "\n  ```\n  By : " + artist + "\n  Released : " + releaseDate + "\n  ```";
  
  let str3 = `
  <br>
  <center><a href="${url}" target="_blank" class="link-genius">View on Genius</a>
  </center>
  `

  console.log(str+str2+str3)
}