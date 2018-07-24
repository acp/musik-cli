const fs = require('fs'),
      axios = require('axios'),
      cheerio = require('cheerio'),
      print = console.log,
      param = process.argv[2];

function search() {
  axios.get(param)
    .then(function (response) {
      if (response.status == 200) {
        const body = response.data;
        const $ = cheerio.load(body);

        let title = $('h1.header_with_cover_art-primary_info-title.header_with_cover_art-primary_info-title--white').text(),
        artist = $('h2 a.header_with_cover_art-primary_info-primary_artist').text(),
        releaseDate = $('div.metadata_unit').eq(0).text(),
        imageLink = $('img[class="cover_art-image"]').attr('src');

        stringify(title, artist, releaseDate, imageLink)
      }
    })
}

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
  <center><a href="${param}" target="_blank" class="link-genius">View on Genius</a>
  </center>
  `

  print(str+str2+str3)
}

search()

