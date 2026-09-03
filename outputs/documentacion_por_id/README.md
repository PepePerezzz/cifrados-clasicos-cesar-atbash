# Catálogo de documentación por ID

Este directorio contiene una ficha independiente por cada función o bloque importante propuesto para el proyecto. Los archivos son documentación de referencia y no sustituyen el código fuente ni las pruebas.

## Convención

En el código, cada responsabilidad debe incluir un marcador como el siguiente:

```js
/**
 * @doc-id CIPHER-CAESAR-ENC-001
 * @see docs/ids/CIPHER-CAESAR-ENC-001.md
 */
```

Para bloques sin función propia:

```js
// DOC-BLOCK SEC-DOC-MAP-001 START
// ... bloque documentado ...
// DOC-BLOCK SEC-DOC-MAP-001 END
```

El nombre del archivo debe coincidir exactamente con el ID. La evidencia final debe enlazar un commit o etiqueta permanente y nunca una rama cambiante como única referencia.

## Índice

| ID | Responsabilidad | Estado inicial |
|---|---|---|
| [CFG-ALPHABET-001](CFG-ALPHABET-001.md) | Construcción del alfabeto | Verificado localmente |
| [VAL-INPUT-001](VAL-INPUT-001.md) | Validación de entradas | Implementación distribuida |
| [PAYLOAD-FRAME-001](PAYLOAD-FRAME-001.md) | Trama autoverificable | Propuesto |
| [PAYLOAD-VERIFY-001](PAYLOAD-VERIFY-001.md) | Verificación y extracción de la trama | Propuesto |
| [CIPHER-PASSTHROUGH-001](CIPHER-PASSTHROUGH-001.md) | Transformar sólo el charset activo | Verificado localmente |
| [CIPHER-CAESAR-ENC-001](CIPHER-CAESAR-ENC-001.md) | Cifrado César | Verificado localmente |
| [CIPHER-CAESAR-DEC-001](CIPHER-CAESAR-DEC-001.md) | Descifrado César | Verificado localmente |
| [CIPHER-ATBASH-001](CIPHER-ATBASH-001.md) | Transformación Atbash | Verificado localmente |
| [ANALYSIS-FREQUENCY-001](ANALYSIS-FREQUENCY-001.md) | Análisis de frecuencias | Bloque implementado |
| [ANALYSIS-CANDIDATES-001](ANALYSIS-CANDIDATES-001.md) | Generación de hipótesis | Verificado localmente |
| [ANALYSIS-LANGUAGE-SCORE-001](ANALYSIS-LANGUAGE-SCORE-001.md) | Puntaje del español | Prototipo implementado |
| [ANALYSIS-AUTO-DETECT-001](ANALYSIS-AUTO-DETECT-001.md) | Selección automática | Pruebas básicas aprobadas |
| [UI-ENCRYPT-001](UI-ENCRYPT-001.md) | Flujo visual de cifrado | Comprobado localmente |
| [UI-DECRYPT-001](UI-DECRYPT-001.md) | Flujo visual de descifrado | Implementado |
| [UI-OUTPUT-001](UI-OUTPUT-001.md) | Salida segura y única | Implementado |
| [SEC-DOC-MAP-001](SEC-DOC-MAP-001.md) | Vínculo seguro código–documentación | Propuesto |
| [TEST-CIPHERS-001](TEST-CIPHERS-001.md) | Pruebas de César y Atbash | 7 pruebas aprobadas |
| [TEST-AUTODETECT-001](TEST-AUTODETECT-001.md) | Pruebas de detección | 3 pruebas básicas aprobadas |

## Estados permitidos

- **Propuesto:** la ficha existe, pero no hay código enlazado.
- **Implementado:** existe código en un commit permanente.
- **Verificado:** las pruebas asociadas se ejecutaron y aprobaron.
- **Obsoleto:** la responsabilidad fue sustituida y la ficha apunta al ID sucesor.
