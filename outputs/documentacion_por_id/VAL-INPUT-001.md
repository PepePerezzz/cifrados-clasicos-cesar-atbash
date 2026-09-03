# VAL-INPUT-001 — Validación de entradas

| Campo | Valor |
|---|---|
| Estado | Implementado de forma distribuida; cobertura adicional pendiente |
| Tipo | Funciones puras y frontera de interfaz |
| Funciones | `validarTexto`, `crearAlfabeto`, `normalizarDesplazamiento` |
| Archivos | [`programa_web/js/app.js`](../programa_web/js/app.js), [`alphabet.js`](../programa_web/js/alphabet.js) y [`ciphers.js`](../programa_web/js/ciphers.js) |
| Rúbrica | Documentación segura y robustez de todos los flujos |

## Qué hace

Comprueba que texto, alfabeto, método y desplazamiento tengan tipos, tamaños y valores permitidos antes de ejecutar cifrado o criptoanálisis. Las funciones lanzan errores controlados que la interfaz convierte en mensajes sin exponer trazas.

## Contrato

- **Entrada:** objeto con `texto`, `alfabeto`, `modo`, `metodo` y `k` opcional.
- **Salida:** `{ valido, datosNormalizados, errores }`.
- **Precondición:** ninguna; es la frontera de confianza del programa.
- **Postcondición:** si `valido` es verdadero, el resto del motor recibe valores dentro de límites.

## Reglas principales

- Texto no vacío y dentro del máximo configurado.
- Alfabeto válido según `CFG-ALPHABET-001`.
- Método limitado a una enumeración cerrada: `caesar` o `atbash`.
- Desplazamiento entero requerido solo para César en modo cifrado.
- Desplazamiento normalizado dentro de `[0, n−1]` y distinto de cero al cifrar.
- Modo limitado a `encrypt` o `decrypt-auto`.

## Seguridad

La función debe fallar de forma cerrada: un valor desconocido no selecciona una ruta por defecto. Los mensajes de error no incluyen trazas, estructuras internas ni datos completos del usuario. Los límites se aplican antes de generar `n` candidatos para evitar bloqueo de la interfaz.

## Complejidad

Tiempo `O(longitud del texto + n)` si incluye la validación del alfabeto; memoria proporcional a los errores y datos normalizados.

## Pruebas asociadas

- Tipos incorrectos y valores `null`.
- Texto vacío o sobre el límite.
- Método desconocido.
- `k` decimal, infinito, no numérico o congruente con cero.
- Descifrado automático sin campo `k`.

## Marcador de código

```js
/** @doc-id VAL-INPUT-001 */
```

## Evidencia

- Límite de mensaje: 20,000 unidades UTF-16 de formulario.
- Límite de charset: 256 grafemas.
- Pruebas de alfabeto y desplazamiento: [`ciphers.test.mjs`](../programa_web/tests/ciphers.test.mjs)
- Cobertura completa y commit público: [PENDIENTE]
