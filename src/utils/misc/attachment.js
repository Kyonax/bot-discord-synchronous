const {
  attachIsImagePNG,
  attachIsImageJPG,
  attachIsImageJPEG,
} = require("../misc/functions");
const { download } = require("../magik/functions");
//Exportación de la funcion de Attachments Images
module.exports = {
  attachMessageImage: async function (attachments) {
    //Mensaje es una Imagen
    if (attachments.size > 0) {
      if (
        attachIsImagePNG(attachments) ||
        attachIsImageJPG(attachments) ||
        attachIsImageJPEG(attachments)
      ) {
        download(attachments.url);
      }
    }
  },
};
