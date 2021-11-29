const bcrypt = require("bcryptjs");
class Hash {
  EncryptCB(Text) {
    const EncryptWord = bcrypt.hash(Text, 10, (err, EncryptWord) => {
      if (err) {
        // console.log("Error Hash:>", err);
        return { success: false, word: null, error: err };
      } else {
        // console.log("Hash:> " + EncryptWord);
        return { success: true, word: EncryptWord, err: null };
      }
    });
    // console.log("EncryptWord", EncryptWord);
  }
  async Encrypt(Text) {
    //encriptar texto
    const EncryptWord = await bcrypt.hash(Text, 10);
    return EncryptWord;
  }
  async Compare(Text, TextEncrypt) {
    const Validacion = await bcrypt.compare(Text, TextEncrypt);
    return Validacion;
  }
}
module.exports = new Hash();
