# Documentación segura por función

Esta carpeta documenta el programa sin publicar capturas, credenciales, datos privados ni copias completas del código. Cada función tiene un identificador único escrito tanto en el archivo fuente mediante `@doc-id` como en una ficha Markdown independiente.

## Inventario

### Configuración del alfabeto

| ID | Función |
|---|---|
| [CFG-GRAPHEME-SEGMENT-001](CFG-GRAPHEME-SEGMENT-001.md) | `segmentarGrafemas` |
| [CFG-ALPHABET-001](CFG-ALPHABET-001.md) | `crearAlfabeto` |

### Cifrados

| ID | Función |
|---|---|
| [CIPHER-SHIFT-NORMALIZE-001](CIPHER-SHIFT-NORMALIZE-001.md) | `normalizarDesplazamiento` |
| [CIPHER-PASSTHROUGH-001](CIPHER-PASSTHROUGH-001.md) | `transformarSoloActivos` |
| [CIPHER-CAESAR-ENC-001](CIPHER-CAESAR-ENC-001.md) | `cifrarCesar` |
| [CIPHER-CAESAR-DEC-001](CIPHER-CAESAR-DEC-001.md) | `descifrarCesar` |
| [CIPHER-ATBASH-001](CIPHER-ATBASH-001.md) | `transformarAtbash` |

### Análisis automático

| ID | Función |
|---|---|
| [ANALYSIS-TEXT-NORMALIZE-001](ANALYSIS-TEXT-NORMALIZE-001.md) | `textoAnalizable` |
| [ANALYSIS-LANGUAGE-SCORE-001](ANALYSIS-LANGUAGE-SCORE-001.md) | `puntuarEspanol` |
| [ANALYSIS-CANDIDATES-001](ANALYSIS-CANDIDATES-001.md) | `generarCandidatos` |
| [ANALYSIS-AUTO-DETECT-001](ANALYSIS-AUTO-DETECT-001.md) | `detectarYDescifrar` |

### Interfaz y validación

| ID | Función |
|---|---|
| [UI-QUERY-001](UI-QUERY-001.md) | `$` |
| [UI-SYMBOL-NAME-001](UI-SYMBOL-NAME-001.md) | `nombreVisible` |
| [UI-MESSAGE-001](UI-MESSAGE-001.md) | `mostrarMensaje` |
| [UI-CHARSET-SELECTOR-001](UI-CHARSET-SELECTOR-001.md) | `reconstruirSelector` |
| [UI-ACTIVE-ALPHABET-001](UI-ACTIVE-ALPHABET-001.md) | `alfabetoActivo` |
| [VAL-TEXT-001](VAL-TEXT-001.md) | `validarTexto` |
| [UI-SAFE-OUTPUT-001](UI-SAFE-OUTPUT-001.md) | `mostrarResultadoSeguro` |
| [UI-METHOD-STATE-001](UI-METHOD-STATE-001.md) | `actualizarEstadoMetodo` |
| [UI-ENCRYPT-001](UI-ENCRYPT-001.md) | `manejarCifrado` |
| [UI-DECRYPT-001](UI-DECRYPT-001.md) | `manejarDescifrado` |
| [UI-COPY-001](UI-COPY-001.md) | `copiarSalida` |
| [UI-INIT-001](UI-INIT-001.md) | `iniciar` |

## Reglas de seguridad documental

- Las fichas explican contratos y comportamiento; no duplican archivos completos.
- No contienen contraseñas, tokens, rutas privadas, datos personales ni secretos.
- Cada ID pertenece a una sola función.
- Los enlaces son relativos y siguen funcionando al publicar el repositorio.
- El inventario esperado es de **23 funciones y 23 fichas**.
