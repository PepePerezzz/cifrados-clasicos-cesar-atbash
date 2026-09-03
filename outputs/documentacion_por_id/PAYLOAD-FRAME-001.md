# PAYLOAD-FRAME-001 — Creación de una trama verificable

| Campo | Valor |
|---|---|
| Estado | Propuesto; mecanismo recomendado para mensajes creados por la aplicación |
| Tipo | Función asíncrona pura |
| Función propuesta | `crearTramaVerificable(texto, alfabeto)` |
| Archivo propuesto | `js/protocol.js` |
| Rúbrica | Descifrado automático y salida única, 30 % + 15 % |

## Qué hace

Transforma el texto claro en una secuencia autoverificable antes de aplicar César o Atbash. La trama incluye versión, longitud y una etiqueta corta derivada de SHA-256, codificadas como índices del alfabeto. Esto permite reconocer automáticamente cuál candidato recuperó un mensaje generado por la propia aplicación, incluso cuando la oración es demasiado corta para un análisis estadístico fiable.

## Contrato

- **Entrada:** texto normalizado y objeto de alfabeto válido.
- **Salida:** promesa de una secuencia de grafemas pertenecientes al alfabeto activo.
- **Precondición:** `n` debe satisfacer el mínimo que establezca el formato.
- **Postcondición:** la trama puede validarse y retirar mediante `PAYLOAD-VERIFY-001`.

## Estructura lógica

1. Marca mágica expresada como índices, no como caracteres ASCII fijos.
2. Versión del formato.
3. Longitud del contenido codificada en base `n`.
4. Contenido del usuario representado por índices y escapes definidos.
5. Prefijo de una huella SHA-256 sobre versión, longitud y contenido.

Los tamaños exactos y la codificación deben quedar fijados en el código y en pruebas de compatibilidad. La etiqueta puede calcularse con `crypto.subtle.digest` sin enviar datos a un servidor.

## Seguridad y limitaciones

La trama **no** vuelve seguros a César ni Atbash, no es una firma digital y no autentica a la persona que creó el mensaje. Al no usar una clave secreta, alguien puede fabricar una trama válida. Su única finalidad es seleccionar automáticamente el candidato correcto dentro de esta demostración. El encabezado también aporta texto conocido al atacante, lo que refuerza el carácter didáctico y no protector del proyecto.

## Complejidad

Tiempo y memoria `O(m)`, donde `m` es la longitud del mensaje.

## Pruebas asociadas

- Trama vacía y mensaje con longitud mínima.
- Texto con símbolos dentro y fuera del alfabeto según la codificación definida.
- Misma entrada produce la misma trama si el protocolo es determinista.
- Un solo bit o índice modificado invalida la etiqueta con probabilidad muy alta.

## Marcador de código

```js
/** @doc-id PAYLOAD-FRAME-001 */
```

## Evidencia pendiente

- Especificación binaria/de índices definitiva: [PENDIENTE]
- Enlace permanente al código: [PENDIENTE]
- Vectores de prueba: [PENDIENTE]

