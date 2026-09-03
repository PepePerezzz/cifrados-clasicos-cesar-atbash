# TEST-CIPHERS-001 — Suite de pruebas de César y Atbash

| Campo | Valor |
|---|---|
| Estado | Verificado localmente; 7 pruebas de cifrados aprobadas |
| Tipo | Bloque de pruebas automatizadas |
| Archivo | [`programa_web/tests/ciphers.test.mjs`](../programa_web/tests/ciphers.test.mjs) |
| Rúbrica | Evidencia de cifrado, alfabetos y documentación segura |

## Qué hace

Verifica que la configuración del alfabeto y las transformaciones César/Atbash sean correctas, reversibles y consistentes con ASCII y Unicode. Agrupa vectores conocidos, casos límite y pruebas de propiedades.

## Alcance

- `CFG-ALPHABET-001` y `VAL-INPUT-001`.
- `CIPHER-CAESAR-ENC-001` y `CIPHER-CAESAR-DEC-001`.
- `CIPHER-ATBASH-001`.
- `CIPHER-PASSTHROUGH-001` para conservación literal de caracteres inactivos.

## Propiedades obligatorias

```text
descifrarCesar(cifrarCesar(x, k, A), k, A) = x
transformarAtbash(transformarAtbash(x, A), A) = x
```

Las propiedades se prueban con múltiples alfabetos, longitudes y desplazamientos. Además se mantienen vectores pequeños con resultados calculados manualmente para detectar que dos errores inversos se oculten entre sí.

## Casos límite

- Alfabeto de dos símbolos, tamaño par e impar.
- Desplazamientos negativos y mayores que `n`.
- Formas Unicode NFC/NFD, emoji y símbolos fuera del conjunto.
- Entrada vacía según la política definida.
- Duplicados, límite máximo y tipos inválidos.

## Seguridad de las pruebas

Los casos no contienen datos reales, contraseñas ni información personal. La suite no accede a red y debe producir un reporte reproducible. Una prueba omitida no cuenta como aprobada.

## Criterio de aceptación

Todos los vectores y propiedades deben aprobar en el commit enlazado. Se registra comando, entorno, fecha y resumen. El reporte real reemplaza el estado “Propuesto”.

## Marcador de código

```js
// DOC-BLOCK TEST-CIPHERS-001 START
// DOC-BLOCK TEST-CIPHERS-001 END
```

## Evidencia

- Archivo: [`ciphers.test.mjs`](../programa_web/tests/ciphers.test.mjs)
- Comando: `npm test`
- Entorno: Node.js, módulos ECMAScript, sin acceso de red.
- Resultado: 10/10 pruebas totales y 7/7 de cifrados aprobadas el 2 de septiembre de 2026.
- Commit público: [PENDIENTE]
