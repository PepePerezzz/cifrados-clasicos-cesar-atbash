# Criptoanálisis automático de los cifrados César y Atbash

## Memoria técnica y académica del proyecto

**Institución:** [NOMBRE DE LA INSTITUCIÓN]  
**Asignatura:** [NOMBRE DE LA ASIGNATURA]  
**Docente:** [NOMBRE DEL DOCENTE]  
**Alumno(a) o integrantes:** [NOMBRES COMPLETOS]  
**Matrícula(s):** [MATRÍCULAS]  
**Grupo:** [GRUPO]  
**Fecha de entrega:** 2 de septiembre de 2026  
**Versión documentada:** `v1.0.0`  
**Liga pública del programa:** <https://pepeperezzz.github.io/cifrados-clasicos-cesar-atbash/>  
**Liga pública del código documentado:** <https://github.com/PepePerezzz/cifrados-clasicos-cesar-atbash/tree/v1.0.0>

<!-- PAGEBREAK -->

## Índice

1. [Introducción](#1-introducción)
2. [Objetivos](#2-objetivos)
3. [Desarrollo](#3-desarrollo)
   1. [Alcance y criterios de aceptación](#31-alcance-y-criterios-de-aceptación)
   2. [Arquitectura implementada](#32-arquitectura-implementada)
   3. [Documentación segura mediante identificadores](#33-documentación-segura-mediante-identificadores)
   4. [Alfabeto configurable: ASCII y Unicode](#34-alfabeto-configurable-ascii-y-unicode)
   5. [Cifrado César y Atbash](#35-cifrado-césar-y-atbash)
   6. [Descifrado e identificación automáticos](#36-descifrado-e-identificación-automáticos)
   7. [Aplicación del método de al-Kindī](#37-aplicación-del-método-de-al-kindī)
   8. [Salida única y validación automática](#38-salida-única-y-validación-automática)
   9. [Interfaz y experiencia de usuario](#39-interfaz-y-experiencia-de-usuario)
   10. [Seguridad y privacidad](#310-seguridad-y-privacidad)
   11. [Publicación del sitio y del código](#311-publicación-del-sitio-y-del-código)
   12. [Plan de pruebas](#312-plan-de-pruebas)
   13. [Trazabilidad con la rúbrica](#313-trazabilidad-con-la-rúbrica)
   14. [Catálogo de funciones y bloques por ID](#314-catálogo-de-funciones-y-bloques-por-id)
   15. [Limitaciones y uso ético](#315-limitaciones-y-uso-ético)
4. [Conclusión](#4-conclusión)
5. [Bibliografía](#5-bibliografía)
6. [Anexos](#6-anexos)

<!-- PAGEBREAK -->

> **Estado del documento.** La implementación está preparada en `programa_web/`, su suite automatizada registra 10 pruebas aprobadas y la versión de entrega se identifica con la etiqueta `v1.0.0`. Las ligas públicas se incluyen en la portada; sólo los datos académicos que debe proporcionar el estudiante permanecen entre corchetes. El detector es una demostración educativa y no se afirma que tenga exactitud universal.

## 1. Introducción

Desde que las personas comenzaron a registrar información, también surgió la necesidad de controlar quién podía comprenderla. Los cifrados clásicos por sustitución representan una etapa importante de esa historia: modifican cada símbolo del mensaje mediante una regla conocida por emisor y receptor. Entre los ejemplos más difundidos se encuentran César, que desplaza los símbolos dentro de un alfabeto ordenado, y Atbash, que sustituye el primero por el último, el segundo por el penúltimo y así sucesivamente. Ambos permiten enseñar con claridad los conceptos de alfabeto, clave, reversibilidad y aritmética modular, pero su sencillez también evidencia por qué ocultar la apariencia de un texto no equivale a protegerlo de forma robusta.

La contribución de Abū Yūsuf Yaʿqūb ibn Isḥāq al-Kindī —أبو يوسف يعقوب بن إسحاق الكندي— fue decisiva para convertir el descifrado de sustituciones simples en un procedimiento sistemático. En su *Risāla fī istikhrāj al-muʿammā*, tratado del siglo IX conservado y publicado en una edición moderna, explicó que las letras de un idioma aparecen con frecuencias desiguales y que esas regularidades sobreviven a una sustitución monoalfabética. Por tanto, es posible contar los símbolos de un criptograma, ordenar sus frecuencias y compararlas con las de textos conocidos en el mismo idioma. Al-Kindī complementó el conteo con asociaciones entre letras, rasgos fonéticos, palabras probables y estructuras del lenguaje. Su trabajo constituye una forma temprana de inferencia estadística aplicada al criptoanálisis (Al-Kadi, 1992; Broemeling, 2011).

En términos actuales, este procedimiento puede entenderse como un ataque de solo texto cifrado: no exige conocer la clave ni entrar al equipo que generó el mensaje; aprovecha la información que el propio método de cifrado deja expuesta. No es “hackeo” en el sentido de vulnerar una computadora, sino ruptura de la confidencialidad de un esquema criptográfico débil. César y Atbash son especialmente vulnerables porque cada símbolo claro siempre produce el mismo símbolo cifrado. Así conservan repeticiones, patrones y, en conjunto, la distribución del idioma (Menezes, van Oorschot y Vanstone, 1996).

Para un alfabeto de tamaño *n*, César solo ofrece *n* desplazamientos posibles, incluido el desplazamiento cero. Un programa puede probarlos todos en una fracción de segundo y valorar cuál resultado se parece más al español. Atbash es todavía más limitado: no tiene una clave variable y aplicar la transformación dos veces recupera el texto original. Ampliar el conjunto a todo el ASCII imprimible o a símbolos Unicode no elimina el problema. En César, el espacio de búsqueda solo crece de manera lineal con *n*; en Atbash continúa existiendo una única transformación. Además, ninguno de los dos métodos proporciona autenticación, integridad o resistencia ante patrones conocidos.

Por estas razones, el sistema descrito en este documento tiene un propósito exclusivamente educativo. Integra las ideas de al-Kindī mediante conteo de frecuencias y las refuerza con n-gramas y vocabulario del español para identificar automáticamente el tipo de cifrado y, cuando corresponda, el desplazamiento César. El sistema no debe utilizarse para contraseñas, expedientes, datos personales ni comunicaciones sensibles. En aplicaciones reales se requieren algoritmos modernos revisados públicamente, como AES, y modos autenticados que aporten confidencialidad e integridad (NIST, 2023; NIST, 2007).

## 2. Objetivos

### 2.1 Objetivo general

Desarrollar, probar y publicar una aplicación web educativa capaz de cifrar oraciones mediante César o Atbash sobre un alfabeto configurable —incluidos caracteres ASCII y símbolos Unicode— y de descifrar automáticamente textos naturales en español, identificando el método y, para César, el desplazamiento empleado, mediante análisis de frecuencias inspirado en al-Kindī y mostrando únicamente la solución seleccionada por el sistema.

### 2.2 Objetivos específicos

- Segmentar y validar el conjunto ordenado de símbolos proporcionado por el usuario, con coincidencia literal y controles individuales de activación.
- Implementar transformaciones reversibles de César y Atbash sin depender de servicios externos.
- Permitir que el usuario elija el método y el desplazamiento durante el cifrado.
- Generar internamente las hipótesis Atbash y César durante el descifrado.
- Aplicar frecuencias del español, n-gramas y vocabulario para puntuar las hipótesis sin intervención humana.
- Presentar una sola línea descifrada, junto con el método detectado y el desplazamiento cuando sea César.
- Verificar el comportamiento mediante pruebas reproducibles con ASCII, caracteres acentuados y símbolos no ASCII.
- Publicar el programa y su código documentado sin credenciales, información privada ni dependencias innecesarias.

## 3. Desarrollo

### 3.1 Alcance y criterios de aceptación

La solución se plantea como una aplicación web estática ejecutada por completo en el navegador. El alcance funcional comprende dos operaciones: cifrar mediante un método elegido por el usuario y descifrar mediante detección automática. El sistema recibe texto y un alfabeto ordenado; calcula el módulo matemático *n* como la cantidad de símbolos únicos del alfabeto y conserva, de acuerdo con la decisión de diseño, todo grafema que no pertenezca al conjunto activo.

Se considera aceptado el flujo de cifrado cuando el usuario puede elegir César o Atbash, configurar el alfabeto, introducir un desplazamiento válido para César y obtener un criptograma reproducible. Se considera aceptado el flujo de descifrado cuando el programa evalúa internamente las alternativas, determina el método, determina el desplazamiento si selecciona César y muestra solo un resultado. La versión implementada usa análisis lingüístico inspirado en al-Kindī y señala mediante una confianza cualitativa cuándo la separación entre los dos mejores candidatos es pequeña.

| Requisito funcional | Criterio observable | Evidencia que debe anexarse |
|---|---|---|
| Alfabeto configurable | Acepta ASCII y Unicode; cada grafema puede activarse o desactivarse | Pruebas y liga al ID `CFG-ALPHABET-001` |
| Passthrough | Todo grafema inactivo permanece literal y en el mismo orden | 10 pruebas y `CIPHER-PASSTHROUGH-001` |
| Cifrado seleccionable | César solicita *k*; Atbash no lo solicita | Interfaz y pruebas locales implementadas |
| Detección automática | No pide al usuario elegir una rotación | Pruebas básicas de `ANALYSIS-AUTO-DETECT-001` |
| Identificación César | Informa el desplazamiento normalizado | Resultado automatizado y prueba asociada |
| Salida única | La interfaz nunca lista candidatos | Prueba de DOM y `UI-SAFE-OUTPUT-001` |
| Uso de al-Kindī | Emplea conteo de frecuencias dentro del puntaje | Pruebas unitarias y `ANALYSIS-LANGUAGE-SCORE-001` |
| Publicación | Dos ligas HTTPS verificables | URL del sitio, URL del repositorio y commit |

### 3.2 Arquitectura implementada

La arquitectura separa responsabilidades para que cada parte pueda revisarse y probarse sin depender de la interfaz. Esta separación reduce errores, evita que la lógica criptográfica quede mezclada con el DOM y facilita documentar el proyecto con identificadores estables.

```text
outputs/
├── programa_web/
│   ├── index.html              # interfaz accesible
│   ├── styles.css              # presentación adaptable
│   ├── package.json            # comando de pruebas
│   ├── js/
│   │   ├── app.js              # coordinación y salida con textContent
│   │   ├── alphabet.js         # segmentación y mapa del charset
│   │   ├── ciphers.js          # passthrough, César y Atbash
│   │   └── analysis.js         # hipótesis y puntaje del español
│   └── tests/
│       ├── ciphers.test.mjs
│       └── analysis.test.mjs
└── documentacion_por_id/
    └── [UN ARCHIVO POR CADA ID]
```

El flujo de datos propuesto es el siguiente:

1. La interfaz recibe texto, método, alfabeto y, si corresponde, desplazamiento.
2. `VAL-TEXT-001` valida el tamaño; `CFG-GRAPHEME-SEGMENT-001` segmenta y `CFG-ALPHABET-001` valida literalmente el conjunto.
3. En cifrado, la función César o Atbash transforma únicamente los símbolos pertenecientes al alfabeto.
4. En descifrado, `ANALYSIS-CANDIDATES-001` genera hipótesis y `ANALYSIS-LANGUAGE-SCORE-001` las puntúa.
5. `ANALYSIS-AUTO-DETECT-001` selecciona una hipótesis de forma determinista.
6. `UI-SAFE-OUTPUT-001` escribe la salida como texto, sin interpretar contenido suministrado por el usuario como HTML.

### 3.3 Documentación segura mediante identificadores

No se recomienda insertar capturas del código ni copiar archivos completos dentro del informe. Las imágenes se vuelven obsoletas, no permiten búsqueda y pueden exponer información que después se retire del repositorio. En su lugar, cada función o bloque importante recibe un identificador único y una ficha Markdown independiente. El comentario en el código contiene solamente el ID y la ruta documental.

```js
/**
 * @doc-id CIPHER-CAESAR-ENC-001
 * @see ../../documentacion_por_id/CIPHER-CAESAR-ENC-001.md
 */
```

La versión actual documenta exclusivamente funciones reales: cada función tiene un solo ID y cada ID una sola ficha. Cada ficha independiente documenta responsabilidad, entradas, salidas, algoritmo, complejidad, errores y seguridad. La liga al código debe apuntar a un commit o etiqueta permanente, no a números de línea de una rama cambiante. Antes de hacer público el repositorio se debe comprobar que el historial no contiene contraseñas, tokens, claves privadas, archivos `.env`, credenciales de servicios o datos personales. Si una credencial se filtra, primero se revoca o rota; borrarla en un commit posterior no la elimina del historial.

### 3.4 Alfabeto configurable: ASCII y Unicode

ASCII es una codificación, no un método de seguridad. Para respetar la base solicitada y admitir símbolos externos, el programa debe incluir al menos dos presets —letras ASCII y ASCII imprimible de los códigos 32 a 126— además de un modo personalizado Unicode. El conjunto personalizado puede contener, por ejemplo, `ñ`, `á`, `¿`, `€` o emoji.

La implementación no debe sumar directamente valores de código ASCII, porque esa estrategia produce huecos, caracteres de control y errores cuando el conjunto es personalizado. En cambio, cada símbolo se busca dentro de un arreglo ordenado *A*. La transformación opera sobre la posición del símbolo y usa el tamaño del arreglo como módulo.

| Concepto | Símbolo | Definición |
|---|---|---|
| Módulo matemático | *n* | Número de grafemas únicos del alfabeto activo |
| Desplazamiento César | *k* | Cantidad de posiciones que se avanza o retrocede |
| Módulo o tipo de cifrado | — | Opción de interfaz: César o Atbash |

Reglas de coincidencia implementadas:

- No normalizar el texto del mensaje. Normalizarlo modificaría unidades que, por la regla de passthrough, deben conservarse exactamente.
- Comparar cada grafema de forma literal con el charset activo. `á` y la secuencia `a` + acento combinante son entradas diferentes.
- Segmentar por grafemas con `Intl.Segmenter` cuando esté disponible y usar puntos de código mediante `Array.from` como alternativa compatible.
- Rechazar un alfabeto con menos de dos símbolos.
- Eliminar repeticiones al construir los controles visuales y hacer que el núcleo rechace cualquier arreglo activo duplicado.
- Limitar la longitud del alfabeto y del mensaje para evitar bloqueos del navegador.
- Conservar sin cambio los grafemas que no estén activados, aunque estuvieran disponibles antes de que el usuario desmarcara su casilla.
- Mostrar al usuario el valor calculado de *n* y el desplazamiento normalizado *k′*.

Las fichas [CFG-GRAPHEME-SEGMENT-001](documentacion_por_id/CFG-GRAPHEME-SEGMENT-001.md) y [CFG-ALPHABET-001](documentacion_por_id/CFG-ALPHABET-001.md) formalizan el charset; [VAL-TEXT-001](documentacion_por_id/VAL-TEXT-001.md) define el límite del mensaje y [CIPHER-PASSTHROUGH-001](documentacion_por_id/CIPHER-PASSTHROUGH-001.md) documenta el recorrido compartido por los tres algoritmos.

#### 3.4.1 Regla de caracteres fuera de la lista

La función `transformarSoloActivos` recibe el texto, el alfabeto activo y una operación de índices. Para cada grafema consulta el mapa. Si no encuentra una posición, devuelve exactamente el grafema recibido; si lo encuentra, aplica la transformación modular. César para cifrar, César para descifrar y Atbash utilizan esta misma función, lo que impide divergencias entre rutas.

```js
const posicion = alfabeto.indice.get(grafema);
if (posicion === undefined) return grafema;
return alfabeto.simbolos[resolverIndice(posicion, alfabeto.modulo)];
```

Ejemplo 1: con `abcdefghijklmnopqrstuvwxyz` y César `k=3`, la entrada `café 😊\nCasa!` produce `fdié 😊\nCdvd!`. La `é`, el emoji, el salto de línea, la mayúscula y el signo permanecen intactos.

Ejemplo 2: si el charset disponible es `abc` pero `a` se desmarca, el conjunto activo es `bc`. Con César `k=1`, `a b🙂c á\nb` produce `a c🙂b á\nc`. Sólo `b` y `c` cambian.

### 3.5 Cifrado César y Atbash

Sea *A* un alfabeto ordenado de tamaño *n* y sea *xᵢ* el símbolo que ocupa la posición *i*. Para César, primero se normaliza cualquier desplazamiento entero mediante:

```text
k′ = ((k mod n) + n) mod n
```

El cifrado se define como:

```text
Eₖ(xᵢ) = x₍ᵢ₊ₖ′₎ mod n
```

El descifrado se define como:

```text
Dₖ(xᵢ) = x₍ᵢ₋ₖ′₎ mod n
```

Para evitar una “cifra” idéntica al original, la interfaz debe rechazar *k′ = 0* durante el cifrado, aunque el motor pueda aceptarlo en pruebas internas. Las fichas [CIPHER-CAESAR-ENC-001](documentacion_por_id/CIPHER-CAESAR-ENC-001.md) y [CIPHER-CAESAR-DEC-001](documentacion_por_id/CIPHER-CAESAR-DEC-001.md) documentan ambas operaciones.

Atbash invierte la posición dentro del alfabeto:

```text
A(xᵢ) = xₙ₋₁₋ᵢ
```

La misma operación cifra y descifra porque `A(A(x)) = x`. No existe un desplazamiento ni una clave variable. La responsabilidad se documenta en [CIPHER-ATBASH-001](documentacion_por_id/CIPHER-ATBASH-001.md).

En la pantalla de cifrado, el usuario selecciona el método. Cuando elige César se habilita el campo *k*; cuando elige Atbash se deshabilita y se limpia ese campo. El resultado se calcula localmente y debe acompañarse de un botón de copia que use la API del portapapeles solo después de una acción explícita.

### 3.6 Descifrado e identificación automáticos

El descifrado es el componente de mayor peso de la rúbrica. El usuario no introduce el tipo de cifrado ni la clave. El motor sigue este procedimiento:

1. Valida el criptograma y reconstruye exactamente el alfabeto usado.
2. Genera una hipótesis Atbash.
3. Genera las hipótesis César para cada desplazamiento permitido `k = 1, …, n − 1`.
4. Normaliza una copia de cada candidato sólo para el análisis lingüístico; la versión que podría mostrarse no se modifica.
5. Calcula frecuencias de letras y la distancia respecto al español.
6. Añade puntuaciones de n-gramas, palabras frecuentes y penalizaciones por secuencias improbables.
7. Ordena las hipótesis por puntaje total y aplica una regla de desempate fija.
8. Mide internamente la diferencia entre los dos mejores resultados como señal de confianza.
9. Devuelve una única estructura con `texto`, `metodo`, `desplazamiento` y `confianza`; nunca devuelve la lista completa a la capa visual.

El componente de frecuencias puede emplear la estadística chi cuadrada:

```text
χ² = Σₗ ((Oₗ − Eₗ)² / Eₗ)
```

`Oₗ` representa la frecuencia observada de la letra *l* y `Eₗ` la frecuencia esperada para un texto español de la misma longitud. Un valor menor indica mayor compatibilidad. Para comparar señales distintas se propone una función general:

```text
S(c) = −α·χ²(c) + β·Lₙ₋gramas(c) + γ·Cpalabras(c) − δ·Pimprobable(c)
```

El prototipo fija de forma transparente `α=1`, `β=2.5`, `γ=14` y `δ=8`, además de una penalización por desviación de la proporción de vocales. Para charsets amplios también suma `25·coberturaLetras` y resta `5·símbolosNoLingüísticos`; así, una hipótesis con unas pocas letras estadísticamente plausibles no puede superar fácilmente a una oración legible rodeada de puntuación normal. Estos pesos permiten una demostración reproducible, pero deben calibrarse con un corpus y evaluarse con otro antes de informar exactitud. [ANALYSIS-CANDIDATES-001](documentacion_por_id/ANALYSIS-CANDIDATES-001.md), [ANALYSIS-LANGUAGE-SCORE-001](documentacion_por_id/ANALYSIS-LANGUAGE-SCORE-001.md) y [ANALYSIS-AUTO-DETECT-001](documentacion_por_id/ANALYSIS-AUTO-DETECT-001.md) separan generación, evaluación y decisión.

### 3.7 Aplicación del método de al-Kindī

El conocimiento histórico no aparece como un párrafo decorativo; se traduce en operaciones ejecutables. El conteo de frecuencias constituye la base del puntaje, mientras que las asociaciones de letras y palabras extienden la misma intuición lingüística para textos modernos en español.

| Idea descrita por al-Kindī | Aplicación computacional |
|---|---|
| Contar las letras de un texto del idioma | Modelo de frecuencias esperadas del español |
| Contar los símbolos del criptograma | Histograma calculado por `ANALYSIS-LANGUAGE-SCORE-001` |
| Comparar los órdenes de frecuencia | Distancia chi cuadrada de cada candidato |
| Revisar asociaciones entre letras | Puntaje de bigramas y trigramas |
| Considerar palabras o fórmulas probables | Cobertura de un vocabulario controlado |
| Refinar hipótesis | Puntaje combinado y regla de desempate |
| Elegir la lectura más probable | Selector automático sin lista visible |

El análisis de frecuencias se documenta en [ANALYSIS-LANGUAGE-SCORE-001](documentacion_por_id/ANALYSIS-LANGUAGE-SCORE-001.md) y la preparación de su copia en [ANALYSIS-TEXT-NORMALIZE-001](documentacion_por_id/ANALYSIS-TEXT-NORMALIZE-001.md). El modelo nunca modifica el texto candidato que se muestra; analiza una copia normalizada para evitar perder mayúsculas, signos o grafemas.

### 3.8 Salida única y validación automática

La identificación perfecta no puede garantizarse para toda cadena arbitraria. Un criptograma de uno o dos caracteres puede admitir varias lecturas válidas, y una cadena aleatoria no contiene necesariamente estadísticas del español. Por ejemplo, con el alfabeto A–Z el criptograma `B` produce `Y` mediante Atbash y `A` mediante César con desplazamiento 1; ambas son unidades lingüísticas posibles. Esta indeterminación es matemática, no un defecto que pueda eliminarse aumentando la velocidad del programa.

La versión implementada genera una hipótesis Atbash y `n−1` hipótesis César, puntúa todas con frecuencias, palabras y n-gramas del español, ordena de manera determinista y entrega sólo la primera. La interfaz informa método, desplazamiento cuando aplica y una confianza cualitativa calculada a partir del margen frente al segundo lugar. No expone la colección de candidatos ni solicita selección humana.

Para criptogramas externos, el prototipo siempre muestra el candidato superior y etiqueta un margen pequeño como confianza baja. Esto satisface la salida única, pero no garantiza que la frase elegida sea correcta en textos ambiguos. La evaluación final debe medir la precisión con un corpus separado y reconocer explícitamente esta limitación.

### 3.9 Interfaz y experiencia de usuario

La página distingue claramente dos modos: **Cifrar** y **Descifrar automáticamente**. Ambos comparten el editor de charset, las casillas de activación y el contador del módulo *n*.

En el modo de cifrado se presentan el texto, el alfabeto, el selector César/Atbash y el campo de desplazamiento condicionado a César. En el modo de descifrado solo se solicitan criptograma y alfabeto. La respuesta visible contiene una línea de texto, una etiqueta de método y, si corresponde, el desplazamiento detectado. La confianza actual es una categoría heurística basada en el margen, no una probabilidad estadística.

Controles mínimos de accesibilidad y claridad:

- Asociar cada etiqueta con su control mediante anidación semántica o `for` e `id`.
- Permitir navegación completa con teclado y mostrar un foco visible.
- Exponer errores con texto, no solo con color.
- Usar una región `aria-live="polite"` para anunciar el resultado.
- Conservar contraste suficiente y diseño adaptable a móvil.
- Desactivar el botón mientras exista un error de validación.
- No borrar automáticamente el texto introducido después de procesarlo.

Los controladores se describen en [UI-ENCRYPT-001](documentacion_por_id/UI-ENCRYPT-001.md) y [UI-DECRYPT-001](documentacion_por_id/UI-DECRYPT-001.md); la salida se limita mediante [UI-SAFE-OUTPUT-001](documentacion_por_id/UI-SAFE-OUTPUT-001.md).

### 3.10 Seguridad y privacidad

Aunque el proyecto demuestra métodos inseguros, su aplicación web debe construirse de manera segura. La opción más simple es no incluir servidor, base de datos, analítica ni cuentas de usuario. El texto se procesa en memoria dentro del navegador y no se conserva al recargar. Esta afirmación solo debe mantenerse en la versión final después de revisar el código y la pestaña de red.

Medidas requeridas:

- Escribir cualquier entrada del usuario con `textContent` o propiedades de formulario; nunca concatenarla en `innerHTML`.
- No usar `eval`, `Function`, `document.write` ni manejadores construidos desde texto.
- Validar tamaño, tipo, desplazamiento y alfabeto antes de iniciar una búsqueda de candidatos.
- Imponer límites razonables para evitar consumo excesivo de CPU y memoria con alfabetos o mensajes enormes.
- No registrar el texto claro, el criptograma ni el historial en consola, almacenamiento local o servicios remotos.
- No solicitar credenciales: una aplicación César/Atbash estática no necesita claves de API.
- Definir una Política de Seguridad de Contenido cuando el proveedor lo permita y cargar recursos solo desde el mismo origen.
- Revisar dependencias y preferir JavaScript estándar para reducir la superficie de ataque.
- Publicar mediante HTTPS y comprobar la página en una sesión privada.
- Añadir `.gitignore`, protección contra envío de secretos y revisión del diff antes de cada publicación.

Ejemplo de política inicial, que debe ajustarse a los recursos realmente usados:

```text
Content-Security-Policy: default-src 'self'; script-src 'self';
style-src 'self'; img-src 'self' data:; object-src 'none';
base-uri 'none'; frame-ancestors 'none'
```

El [índice de documentación segura](documentacion_por_id/README.md) define el vínculo entre código e IDs. [UI-SAFE-OUTPUT-001](documentacion_por_id/UI-SAFE-OUTPUT-001.md) incluye la defensa frente a inyección en el DOM. OWASP recomienda precisamente tratar `textContent` como un destino seguro para texto no confiable y evitar insertar entradas en contextos HTML ejecutables (OWASP Foundation, s. f.).

### 3.11 Publicación del sitio y del código

Para una aplicación compuesta únicamente por HTML, CSS y JavaScript, GitHub Pages es la ruta recomendada porque genera naturalmente las dos ligas solicitadas: una para el programa y otra para el repositorio. La configuración oficial permite publicar desde la raíz o desde `/docs` en una rama seleccionada. También puede emplearse Firebase Hosting, producto de Google que ofrece HTTPS y canales de vista previa. La memoria final debe conservar únicamente el proveedor realmente utilizado.

Procedimiento aplicado con GitHub Pages:

1. Se creó un repositorio público sin secretos ni datos personales innecesarios.
2. Se incluyeron el programa, las pruebas y `documentacion_por_id/` con sus fichas por ID.
3. Antes de publicar se ejecutó `npm test` y se conservaron las pruebas reproducibles en el repositorio.
4. Se creó la etiqueta inmutable de entrega `v1.0.0`.
5. GitHub Pages sirve la rama `gh-pages`, generada exclusivamente desde `outputs/programa_web`.
6. Se verificó que la publicación HTTPS abre sin iniciar sesión y que carga la interfaz completa.

Evidencia de publicación:

| Dato | Valor verificado |
|---|---|
| URL pública del programa | <https://pepeperezzz.github.io/cifrados-clasicos-cesar-atbash/> |
| URL pública del repositorio | <https://github.com/PepePerezzz/cifrados-clasicos-cesar-atbash> |
| Commit o etiqueta | [`v1.0.0`](https://github.com/PepePerezzz/cifrados-clasicos-cesar-atbash/tree/v1.0.0) |
| Fecha de despliegue | 2 de septiembre de 2026 |
| Proveedor | GitHub Pages desde la rama `gh-pages` |
| Verificación privada/móvil | URL verificada sin iniciar sesión; diseño adaptable incluido |

GitHub advierte que los archivos publicados con Pages deben considerarse accesibles públicamente. Las credenciales de automatización, si llegaran a existir, deben almacenarse como secretos del flujo de CI/CD y jamás incorporarse al JavaScript entregado al navegador. Para este proyecto no se necesita ninguna credencial externa.

### 3.12 Plan de pruebas

Las pruebas unitarias verifican propiedades del algoritmo; las pruebas de integración verifican el flujo completo y las pruebas de interfaz confirman que solo exista una salida visible. Ningún caso debe marcarse como aprobado antes de ejecutar la versión enlazada en la portada.

| ID de prueba | Caso | Resultado esperado | Resultado real | Estado |
|---|---|---|---|---|
| TC-01 | Ida y vuelta César con minúsculas y `k=3` | Recupera exactamente el original | Coincide | Aprobada |
| TC-02 | Ida y vuelta Atbash con charset parcial | Recupera exactamente el original | Coincide | Aprobada |
| TC-03 | César con desplazamiento negativo | Normaliza *k* y conserva passthrough | Coincide | Aprobada |
| TC-04 | ASCII imprimible 32–126 | Cifra espacios cuando están activos | Coincide | Aprobada |
| TC-05 | Acentos, emoji y salto fuera del charset | No rompe ni altera esos grafemas | Coincide | Aprobada |
| TC-06 | Símbolo y letra desmarcada | Los conserva sin cambio | Coincide | Aprobada |
| TC-07 | Alfabeto de un símbolo | Rechaza la operación con mensaje claro | Error controlado | Aprobada |
| TC-08 | Símbolos literales duplicados | Rechaza e identifica la duplicación | Error controlado | Aprobada |
| TC-09 | Detección César sobre muestra larga | Devuelve una línea, método y *k=7* | Coincide | Aprobada |
| TC-10 | Detección Atbash sobre muestra larga | Devuelve una línea y método correctos | Coincide | Aprobada |
| TC-11 | Conteo de hipótesis | Genera Atbash más `n−1` rotaciones | `n` candidatos | Aprobada |
| TC-12 | Texto corto ambiguo | Informa evidencia insuficiente; no lista hipótesis | [PENDIENTE] | No ejecutada |
| TC-13 | Entrada con `<img onerror=...>` | Se muestra como texto; no crea nodos ejecutables | [PENDIENTE] | No ejecutada |
| TC-14 | Mensaje y alfabeto sobre el límite | Rechaza antes del análisis intensivo | [PENDIENTE] | No ejecutada |

Las dos propiedades algebraicas principales son:

```text
descifrarCesar(cifrarCesar(texto, k), k) = texto
atbash(atbash(texto)) = texto
```

Las pruebas reproducibles de `tests/ciphers.test.mjs`, `tests/analysis.test.mjs` y `tests/large-charset.test.mjs` cubren reversibilidad, límites y detección automática. Si se publica un porcentaje de aciertos, deben quedar disponibles el conjunto evaluado, la versión del modelo, la fórmula exacta y el comando de ejecución.

### 3.13 Trazabilidad con la rúbrica

| Apartado de la rúbrica | Peso | Sección o evidencia | Estado actual |
|---|---:|---|---|
| Portada | 2 % | Portada de esta memoria | Ligas incluidas; faltan sólo los datos académicos del estudiante |
| Índice | 2 % | Índice navegable | Documentado |
| Introducción y al-Kindī | 5 % | Sección 1 y bibliografía académica | Documentado |
| Objetivo | 3 % | Sección 2 | Documentado |
| Documentación segura | 10 % | Secciones 3.2, 3.3 y fichas por ID | Implementada y enlazada a la etiqueta pública `v1.0.0` |
| Conjunto ASCII/no ASCII | 5 % | Sección 3.4 | Implementado y probado |
| Selección y cifrado | 10 % | Sección 3.5 | Implementado y probado |
| Detección tipo y módulo | 30 % | Secciones 3.6 y 3.8 | Prototipo probado; falta calibración amplia |
| Publicación | 10 % | Sección 3.11 | Repositorio público, flujo de Pages y ligas HTTPS |
| Conocimiento de al-Kindī y salida única | 15 % | Secciones 3.7 y 3.8 | Implementado; falta corpus amplio de evaluación |
| Conclusión | 5 % | Sección 4 | Documentado según el estado real |
| Bibliografía | 3 % | Sección 5 | Documentado |

### 3.14 Catálogo de funciones y bloques por ID

Los nombres y firmas corresponden a la implementación real. Cada función tiene un ID único y una ficha independiente.

| ID | Función o bloque | Responsabilidad principal |
|---|---|---|
| [CFG-GRAPHEME-SEGMENT-001](documentacion_por_id/CFG-GRAPHEME-SEGMENT-001.md) | `segmentarGrafemas` | Separar texto en grafemas |
| [CFG-ALPHABET-001](documentacion_por_id/CFG-ALPHABET-001.md) | `crearAlfabeto` | Validar y construir el alfabeto |
| [CIPHER-SHIFT-NORMALIZE-001](documentacion_por_id/CIPHER-SHIFT-NORMALIZE-001.md) | `normalizarDesplazamiento` | Ajustar cualquier entero al módulo |
| [CIPHER-PASSTHROUGH-001](documentacion_por_id/CIPHER-PASSTHROUGH-001.md) | `transformarSoloActivos` | Conservar literalmente todo grafema inactivo |
| [CIPHER-CAESAR-ENC-001](documentacion_por_id/CIPHER-CAESAR-ENC-001.md) | `cifrarCesar` | Aplicar desplazamiento positivo modular |
| [CIPHER-CAESAR-DEC-001](documentacion_por_id/CIPHER-CAESAR-DEC-001.md) | `descifrarCesar` | Aplicar desplazamiento inverso modular |
| [CIPHER-ATBASH-001](documentacion_por_id/CIPHER-ATBASH-001.md) | `transformarAtbash` | Reflejar posiciones del alfabeto |
| [ANALYSIS-TEXT-NORMALIZE-001](documentacion_por_id/ANALYSIS-TEXT-NORMALIZE-001.md) | `textoAnalizable` | Preparar una copia para análisis |
| [ANALYSIS-CANDIDATES-001](documentacion_por_id/ANALYSIS-CANDIDATES-001.md) | `generarCandidatos` | Enumerar Atbash y todas las rotaciones César |
| [ANALYSIS-LANGUAGE-SCORE-001](documentacion_por_id/ANALYSIS-LANGUAGE-SCORE-001.md) | `puntuarEspanol` | Combinar frecuencias, n-gramas y léxico |
| [ANALYSIS-AUTO-DETECT-001](documentacion_por_id/ANALYSIS-AUTO-DETECT-001.md) | `detectarYDescifrar` | Elegir de forma determinista una sola salida |
| [UI-QUERY-001](documentacion_por_id/UI-QUERY-001.md) | `$` | Consultar un elemento del DOM |
| [UI-SYMBOL-NAME-001](documentacion_por_id/UI-SYMBOL-NAME-001.md) | `nombreVisible` | Etiquetar caracteres de control |
| [UI-MESSAGE-001](documentacion_por_id/UI-MESSAGE-001.md) | `mostrarMensaje` | Presentar avisos seguros |
| [UI-CHARSET-SELECTOR-001](documentacion_por_id/UI-CHARSET-SELECTOR-001.md) | `reconstruirSelector` | Crear casillas del charset |
| [UI-ACTIVE-ALPHABET-001](documentacion_por_id/UI-ACTIVE-ALPHABET-001.md) | `alfabetoActivo` | Construir el conjunto habilitado |
| [VAL-TEXT-001](documentacion_por_id/VAL-TEXT-001.md) | `validarTexto` | Limitar el tamaño del mensaje |
| [UI-SAFE-OUTPUT-001](documentacion_por_id/UI-SAFE-OUTPUT-001.md) | `mostrarResultadoSeguro` | Escribir texto sin interpretar HTML |
| [UI-METHOD-STATE-001](documentacion_por_id/UI-METHOD-STATE-001.md) | `actualizarEstadoMetodo` | Sincronizar controles por método |
| [UI-ENCRYPT-001](documentacion_por_id/UI-ENCRYPT-001.md) | `manejarCifrado` | Coordinar validación, cifrado y presentación |
| [UI-DECRYPT-001](documentacion_por_id/UI-DECRYPT-001.md) | `manejarDescifrado` | Coordinar el análisis automático |
| [UI-COPY-001](documentacion_por_id/UI-COPY-001.md) | `copiarSalida` | Copiar resultados al portapapeles |
| [UI-INIT-001](documentacion_por_id/UI-INIT-001.md) | `iniciar` | Inicializar estado y eventos |

### 3.15 Limitaciones y uso ético

La calidad del descifrado estadístico depende del idioma, la longitud, el corpus y la similitud entre el texto analizado y el modelo. Un mensaje muy corto, nombres propios, abreviaturas, código o una lengua no modelada pueden producir baja confianza. Los alfabetos personalizados que cifran espacios y signos también modifican las fronteras visibles de palabra; el sistema puede recuperarlas al probar la clave correcta, pero los candidatos incorrectos resultan más difíciles de comparar.

El programa no debe presentarse como herramienta para vulnerar cuentas, interceptar comunicaciones privadas o evadir controles de acceso. Su objeto es demostrar por qué los cifrados clásicos filtran estructura y cómo el análisis estadístico puede explotarla. Los mensajes usados en pruebas deben ser propios, públicos o creados específicamente para la práctica.

## 4. Conclusión

El proyecto integra dos dimensiones complementarias. Por un lado, implementa los cifrados César y Atbash sobre un alfabeto ordenado y configurable, de modo que la misma lógica trabaje con presets ASCII o símbolos Unicode y deje intacto todo grafema inactivo. Por otro, convierte el descifrado en un proceso automático: el motor genera hipótesis, compara sus regularidades con un modelo del español y entrega una sola solución acompañada del método y, cuando corresponde, del desplazamiento César.

La aportación de al-Kindī permite comprender la debilidad esencial de estos métodos. Una sustitución cambia los símbolos, pero conserva suficientes regularidades del idioma para que un análisis cuantitativo recupere información. El conteo de frecuencias funciona como fundamento histórico y computacional; los n-gramas y el vocabulario refinan la selección en oraciones más breves. Al mismo tiempo, reconocer los casos ambiguos evita confundir una aproximación estadística con una garantía matemática.

La documentación por IDs ofrece una forma segura, mantenible y verificable de explicar el código sin recurrir a impresiones. Cada responsabilidad tiene una ficha propia y puede enlazarse a un commit permanente y a pruebas reproducibles. Las medidas de salida segura, procesamiento local y ausencia de secretos reducen riesgos ajenos al objetivo didáctico.

El cumplimiento final de la rúbrica depende de completar los datos académicos de portada y conservar la evidencia del flujo de despliegue y sus pruebas. La implementación, sus ligas públicas y sus pruebas automatizadas permiten demostrar de forma práctica que César y Atbash son útiles para aprender aritmética modular e historia del criptoanálisis, pero no son mecanismos adecuados para proteger información contemporánea.

## 5. Bibliografía

Al-Kadi, I. A. (1992). Origins of cryptology: The Arab contributions. *Cryptologia, 16*(2), 97–126. [DOI](https://doi.org/10.1080/0161-119291866801)

Al-Kindī, Y. ibn I. (2003). *Risāla fī istikhrāj al-muʿammā*. En M. Mrayati, Y. Meer Alam y M. H. al-Tayyan (Eds.), *Al-Kindi’s Treatise on Cryptanalysis* (Arabic Origins of Cryptology, Vol. 1). King Faisal Center for Research and Islamic Studies y King Abdulaziz City for Science and Technology. [WorldCat](https://search.worldcat.org/title/54117314)

Broemeling, L. D. (2011). An account of early statistical inference in Arab cryptology. *The American Statistician, 65*(4), 255–257. [DOI](https://doi.org/10.1198/tas.2011.10191)

Firebase. (s. f.). *Get started with Firebase Hosting*. [Documentación](https://firebase.google.com/docs/hosting/quickstart)

GitHub. (s. f.-a). *Configuring a publishing source for your GitHub Pages site*. [Documentación](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

GitHub. (s. f.-b). *Push protection*. [Documentación](https://docs.github.com/en/code-security/concepts/secret-security/push-protection)

Kaeding, T. (2023). *Classical substitution ciphers and group theory*. IACR Cryptology ePrint Archive, Report 2023/669. [IACR ePrint](https://eprint.iacr.org/2023/669)

Menezes, A. J., van Oorschot, P. C., y Vanstone, S. A. (1996). *Handbook of Applied Cryptography*. CRC Press. [Capítulo 7](https://cacr.uwaterloo.ca/hac/about/chap7.pdf)

National Institute of Standards and Technology. (2007). *Recommendation for Block Cipher Modes of Operation: Galois/Counter Mode (GCM) and GMAC* (SP 800-38D). [DOI](https://doi.org/10.6028/NIST.SP.800-38D)

National Institute of Standards and Technology. (2023). *Advanced Encryption Standard (AES)* (FIPS PUB 197, actualización 1). [DOI](https://doi.org/10.6028/NIST.FIPS.197-upd1)

OWASP Foundation. (s. f.). *Cross Site Scripting Prevention Cheat Sheet*. [Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

Unicode Consortium. (2025). *Unicode Standard Annex #29: Unicode Text Segmentation* (rev. 47, Unicode 17.0.0). [UAX #29](https://www.unicode.org/reports/tr29/)

## 6. Anexos

### Anexo A. Lista de comprobación antes de entregar

- Sustituir todos los campos entre corchetes de la portada.
- Confirmar que la URL del programa abre por HTTPS sin iniciar sesión.
- Confirmar que la URL del repositorio permite revisar el commit de entrega.
- Buscar y eliminar secretos antes de publicar; rotar cualquier secreto que haya sido expuesto.
- Verificar que cada marcador `@doc-id` tenga una ficha con el mismo nombre.
- Ejecutar todas las pruebas y reemplazar “No ejecutada” por el resultado real.
- Adjuntar el comando, navegador y versión usados en las pruebas.
- Validar que descifrado no muestre una lista de candidatos.
- Confirmar que la entrada con HTML se represente como texto.
- Revisar ortografía, numeración, tabla de contenido y ligas.
- Crear una etiqueta o commit final y evitar cambios posteriores sin actualizar la documentación.

### Anexo B. Evidencia mínima de la versión final

| Evidencia | Liga o resultado |
|---|---|
| Programa publicado | <https://pepeperezzz.github.io/cifrados-clasicos-cesar-atbash/> |
| Código documentado | <https://github.com/PepePerezzz/cifrados-clasicos-cesar-atbash> |
| Commit/etiqueta | [`v1.0.0`](https://github.com/PepePerezzz/cifrados-clasicos-cesar-atbash/tree/v1.0.0) |
| Reporte de pruebas | [`outputs/programa_web/tests/`](https://github.com/PepePerezzz/cifrados-clasicos-cesar-atbash/tree/v1.0.0/outputs/programa_web/tests) y `npm test` |
| Modelo de español y licencia | Implementación educativa propia en `outputs/programa_web/js/analysis.js` |
| Matriz de IDs completa | `documentacion_por_id/README.md` |

### Anexo C. Convención de estados para las fichas

- **Propuesto:** existe la especificación, pero no se ha enlazado código.
- **Implementado:** existe código enlazado a un commit.
- **Verificado:** las pruebas asociadas se ejecutaron y aprobaron.
- **Obsoleto:** el código fue reemplazado; la ficha conserva el historial y apunta al ID sucesor.
