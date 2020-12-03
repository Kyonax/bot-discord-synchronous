//Importación de paquetes JS de Node.js
const Path = require("path");
const Axios = require("axios");
PNG = require("pngjs").PNG;
var fs = require("fs"),
  gm = require("gm"),
  imageMagick = gm.subClass({
    imageMagick: true,
  });
module.exports = {
  download: async function (imageUrl) {
    const url = imageUrl;
    const path = Path.resolve(
      __dirname,
      "",
      "../../../database/multimedia/images/magik/lastImage.jpg"
    );    

    const response = await Axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
      response.data.on("end", () => {
        resolve();
      });

      response.data.on("error", (err) => {
        reject(err);
      });
    });
  },
  downloadUser: async function (imageUrl, name) {
    const url = imageUrl;
    const path = Path.resolve(
      __dirname,
      "",
      `../../../database/multimedia/images/users/avatar/${name}.png`
    );
    const response = await Axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    response.data.pipe(fs.createWriteStream(path));

    return new Promise((resolve, reject) => {
      response.data.on("end", () => {
        resolve();
      });

      response.data.on("error", (err) => {
        reject(err);
      });
    });
  },
  circleImage: async function (inImage, name) {
    const CIRCLE_PATH = Path.resolve(__dirname, "", `../../../database/multimedia/images/users/circleAvatar/${name}CircleImage.png`)

    fs.createReadStream(__dirname + inImage)
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            var radius = this.height / 2;
            if (
              y >=
                Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2)) +
                  radius ||
              y <=
                -Math.sqrt(Math.pow(radius, 2) - Math.pow(x - radius, 2)) +
                  radius
            ) {
              this.data[idx + 3] = 0;
            }
          }
        }
        this.pack().pipe(
          fs.createWriteStream(CIRCLE_PATH)
        );
      });
  },
  resizeImage: async function (name) {
    gm(
      `database/multimedia/images/users/circleAvatar/${name}CircleImage.png`
    )
      .resize(198, 198)
      .write(
        `database/multimedia/images/users/circleAvatar/${name}CircleImageR.png`,
        function (err) {
          if (err) console.log("Error!: " + err);
        }
      );
  },
};
