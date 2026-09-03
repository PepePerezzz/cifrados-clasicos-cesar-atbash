# PAYLOAD-VERIFY-001 — Verificación y extracción de la trama

| Campo | Valor |
|---|---|
| Estado | Propuesto; pendiente de vincular al código real |
| Tipo | Función asíncrona pura |
| Función propuesta | `verificarTrama(candidato, alfabeto)` |
| Archivo propuesto | `js/protocol.js` |
| Rúbrica | Detección automática y presentación de una sola línea |

## Qué hace

Examina un candidato descifrado, comprueba la marca, versión, longitud y etiqueta de verificación y, si todos los controles coinciden, devuelve únicamente la oración original. Permite descartar hipótesis incorrectas sin pedir al usuario que elija entre rotaciones.

## Contrato

- **Entrada:** candidato expresado en grafemas y el mismo alfabeto usado al cifrar.
- **Salida:** `{ valida: true, texto }` o `{ valida: false, motivo }`.
- **Precondición:** candidato dentro de los límites definidos.
- **Postcondición:** nunca expone contenido parcial como si estuviera verificado.

## Algoritmo

1. Convertir grafemas a índices mediante el mapa del alfabeto.
2. Comprobar la marca y una versión soportada.
3. Decodificar longitud y verificar límites antes de reservar memoria.
4. Extraer el contenido y la etiqueta declarada.
5. Recalcular SHA-256 sobre el mismo formato canónico.
6. Comparar ambas etiquetas y devolver el contenido solo si coinciden.

## Seguridad

Debe validar longitudes antes de cortar arreglos, rechazar datos adicionales no definidos y no registrar candidatos fallidos. Si se compara una etiqueta, es preferible evitar una salida temprana dependiente de cada byte, aunque en este uso sin secreto no exista un riesgo de canal lateral comparable al de un MAC. El motivo interno puede ser detallado para pruebas, pero la interfaz debe usar un mensaje general.

## Complejidad

Tiempo y memoria `O(m)` por candidato. Para evitar costos excesivos, primero se comprueban campos estructurales baratos y luego se calcula la huella.

## Pruebas asociadas

- Trama válida producida por `PAYLOAD-FRAME-001`.
- Marca, versión, longitud, contenido o etiqueta alterados.
- Candidato truncado y datos sobrantes.
- Ningún candidato válido y más de un candidato válido, ambos tratados como error.

## Marcador de código

```js
/** @doc-id PAYLOAD-VERIFY-001 */
```

## Evidencia pendiente

- Enlace permanente al código: [PENDIENTE]
- Vectores de prueba compartidos con el creador: [PENDIENTE]
- Manejo real de errores: [PENDIENTE]

