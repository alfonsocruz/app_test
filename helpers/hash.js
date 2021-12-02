const bcrypt = require("bcryptjs");
class Hash {
  EncryptCB(Text) {
    const EncryptWord = bcrypt.hash(Text, 10, (err, EncryptWord) => {
      if (err) {
        return { success: false, word: null, error: err };
      } else {
        return { success: true, word: EncryptWord, err: null };
      }
    });
  }
  async Encrypt(Text) {
    const EncryptWord = await bcrypt.hash(Text, 10);
    return EncryptWord;
  }
  async Compare(Text, TextEncrypt) {
    const Validacion = await bcrypt.compare(Text, TextEncrypt);
    return Validacion;
  }
}
module.exports = new Hash();
