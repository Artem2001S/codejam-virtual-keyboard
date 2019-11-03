export default function Key(keyCode, keyRu, keyEn, keyCapsRu, keyCapsEn, size = '', isFunctional = false) {
  this.keyCode = keyCode;
  this.keyRu = keyRu;
  this.keyEn = keyEn;
  this.keyCapsRu = keyCapsRu === undefined ? keyRu.toUpperCase() : keyCapsRu;
  this.keyCapsEn = keyCapsEn === undefined ? keyEn.toUpperCase() : keyCapsEn;
  this.size = size;
  this.isFunctional = isFunctional;
}
