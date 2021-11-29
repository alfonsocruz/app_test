const errorMessages = err => {
  const messages = {
    /**
     * alternatives
     */
    "alternatives.all": `${err.local.label} no coincide con todos los tipos requeridos`,
    "alternatives.any": `${err.local.label} no coincide con ninguno de los tipos permitidos`,
    "alternatives.match": `${err.local.label} no coincide con ninguno de los tipos permitidos`,
    "alternatives.one": `${err.local.label} coincide con más de un tipo permitido`,
    // "alternatives.types": `${err.local.label}  debe ser uno de {{#types}}`,

    /**
     * any
     */
    // "any.custom": `${err.local.label} failed custom validation because {{#error.message}}`,
    "any.default": `${err.local.label} arrojó un error al ejecutar el método predeterminado`,
    "any.failover": `${err.local.label} arrojó un error al ejecutar el método de conmutación por error`,
    "any.invalid": `${err.local.label} contiene un valor no válido`,
    "any.only": `${err.local.label} no coincide con${
      err.local.valids && err.local.valids.length == 1 ? "" : " uno de "
    } ${err.local.valids}`,
    // "any.ref": `${err.local.label} {{#arg}} references {{:#ref}} which {{#reason}}`,
    "any.required": `${err.local.label} es requerido`,
    "any.unknown": `${err.local.label} no es permitido`,

    /**
     * array
     */
    "array.base": `${err.local.label} debe ser de tipo arreglo`,
    "array.excludes": `${err.local.label} contiene un valor excluído`,
    // "array.hasKnown": `${err.local.label} no contiene al menos una coincidencia obligatoria para el tipo {: #patternLabel}`,
    "array.hasUnknown": `${err.local.label}  no contiene al menos una coincidencia requerida`,
    "array.includes": `${err.local.label}  no coincide con ninguno de los tipos permitidos`,
    // "array.includesRequiredBoth": `${err.local.label}  no contiene {{#knownMisses}} y {{#unknownMisses}} otros valores obligatorios`,
    // "array.includesRequiredKnowns": `${err.local.label}  no contiene {{#knownMisses}}`,
    // "array.includesRequiredUnknowns": `${err.local.label}  no contiene {{#unknownMisses}} valores obligatorios`,
    "array.length": `${err.local.label}  debe contener ${err.local.limit} elementos`,
    "array.max": `${err.local.label}  debe contener menos o igual a ${err.local.limit} elementos`,
    "array.min": `${err.local.label}  debe contener al menos ${err.local.limit} elementos`,
    "array.orderedLength": `${err.local.label}  debe contener como máximo ${err.local.limit} elementos`,
    // "array.sort": `${err.local.label}  debe estar ordenado en {#order} orden por {{#by}}`,
    "array.sort.mismatching": `${err.local.label}  no se puede ordenar debido a que los tipos no coinciden`,
    // "array.sort.unsupported": `${err.local.label}  no se puede ordenar debido a que el tipo {#type} no es compatible`,
    "array.sparse": `${err.local.label}  no debe ser un elemento de matriz disperso`,
    "array.unique": `${err.local.label}  contiene un valor duplicado`,

    /**
     * binary
     */
    "binary.base": `${err.local.label} debe ser un búfer o una cadena`,
    "binary.length": `${err.local.label} debe tener ${err.local.limit} bytes`,
    "binary.max": `${err.local.label} debe ser menor o igual a ${err.local.limit} bytes`,
    "binary.min": `${err.local.label} debe tener al menos ${err.local.limit} bytes`,

    /**
     * boolean
     */
    "boolean.base": `${err.local.label} debe ser de tipo booleano`,

    /**
     * date
     */
    "date.base": `${err.local.label} debe ser una fecha válida`,
    // "date.format": `${err.local.label} debe estar en {msg ("date.format." + #format) || #format} formato`,
    "date.greater": `${err.local.label} debe ser mayor que ${err.local.limit}`,
    "date.less": `${err.local.label} debe ser menor que ${err.local.limit}`,
    "date.max": `${err.local.label} debe ser menor o igual que ${err.local.limit}`,
    "date.min": `${err.local.label} debe ser mayor o igual que ${err.local.limit}`,

    // Messages used in date.format
    "date.format.iso": "Fecha ISO 8601",
    "date.format.javascript": "marca de tiempo o número de milisegundos",
    "date.format.unix": "timestamp or number of seconds",

    /**
     * number
     */
    "number.base": `${err.local.label} debe ser un número`,
    "number.greater": `${err.local.label} debe ser mayor que ${err.local.limit} `,
    "number.infinity": `${err.local.label} no puede ser infinito`,
    "number.integer": `${err.local.label} debe ser un número entero`,
    "number.less": `${err.local.label} debe ser menor que ${err.local.limit} `,
    "number.max": `${err.local.label} debe ser menor o igual que ${err.local.limit} `,
    "number.min": `${err.local.label} debe ser mayor o igual que ${err.local.limit} `,
    "number.multiple": `${err.local.label} debe ser un múltiplo de ${err.local.multiple} `,
    "number.negative": `${err.local.label} debe ser un número negativo`,
    "number.port": `${err.local.label} debe ser un puerto válido`,
    "number.positive": `${err.local.label} debe ser un número positivo`,
    "number.precision": `${err.local.label} no debe tener más de ${err.local.limit} decimales`,
    "number.unsafe": `${err.local.label} debe ser un número seguro`,

    /**
     * string
     */
    "string.alphanum": `${err.local.label} solo debe contener caracteres alfanuméricos`,
    "string.base": `${err.local.label} debe ser una cadena de texto`,
    "string.base64": `${err.local.label} debe ser una cadena base64 válida`,
    "string.creditCard": `${err.local.label} debe ser una tarjeta de crédito`,
    "string.dataUri": `${err.local.label} debe ser una URL válida`,
    "string.domain": `${err.local.label} debe contener un nombre de dominio válido`,
    "string.email": `${err.local.label} debe ser un correo electrónico válido`,
    "string.empty": `${err.local.label} no debe estar vacío`,
    "string.guid": `${err.local.label} debe ser un GUID válido`,
    "string.hex": `${err.local.label} solo debe contener caracteres hexadecimales`,
    "string.hexAlign": `${err.local.label} la representación decodificada hexadecimal debe estar alineada en bytes`,
    "string.hostname": `${err.local.label} debe ser un nombre de host válido`,
    "string.ip": `${err.local.label} debe ser una dirección IP válida con un ${err.local.cidr} CIDR`,
    "string.ipVersion": `${err.local.label} debe ser una dirección IP válida de una de las siguientes versiones ${err.local.version} con un ${err.local.cidr} CIDR`,
    "string.isoDate": `${err.local.label} debe estar en formato iso`,
    "string.isoDuration": `${err.local.label} debe tener una duración ISO 8601 válida`,
    "string.length": `${err.local.label} la longitud debe tener ${err.local.limit} caracteres`,
    "string.lowercase": `${err.local.label} solo debe contener caracteres en minúscula`,
    "string.max": `${err.local.label} la longitud debe ser menor o igual a ${err.local.limit} caracteres`,
    "string.min": `${err.local.label} la longitud debe tener al menos ${err.local.limit} caracteres`,
    "string.normalize": `${err.local.label} debe estar normalizado en Unicode en el formulario ${err.local.form}`,
    "string.token": `${err.local.label} solo debe contener caracteres alfanuméricos y de subrayado`,
    "string.pattern.base": `${err.local.label} no coincide con el patrón requerido`,
    "string.pattern.name": `${err.local.label} no coincide con el patrón ${err.local.name}`,
    "string.pattern.invert.base": `${err.local.label} coincide con el patrón invertido: ${err.local.regex}`,
    "string.pattern.invert.name": `${err.local.label} coincide con el patrón ${err.local.name} invertido`,
    "string.trim": `${err.local.label} no debe tener espacios en blanco iniciales o finales`,
    "string.uri": `${err.local.label} debe ser un uri válido`,
    "string.uriCustomScheme": `${err.local.label} debe ser un uri válido con un esquema que coincida con el patrón ${err.local.scheme}`,
    "string.uriRelativeOnly": `${err.local.label} debe ser un URL relativo válido`,
    "string.uppercase": `${err.local.label} solo debe contener caracteres en mayúsculas`
  };

  return messages[err.code] !== undefined ? messages[err.code] : err.message;
};

module.exports = errorMessages;
