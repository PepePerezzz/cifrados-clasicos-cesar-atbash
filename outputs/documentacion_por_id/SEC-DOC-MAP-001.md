# SEC-DOC-MAP-001 — Mapa seguro entre código y documentación

| Campo | Valor |
|---|---|
| Estado | Propuesto; esta carpeta implementa la parte documental |
| Tipo | Bloque de metadatos y proceso de publicación |
| Marcador propuesto | `@doc-id` / `DOC-BLOCK` |
| Archivo propuesto | Todos los módulos y `docs/ids/` |
| Rúbrica | Documentación segura del programa, 10 % |

## Qué hace

Define una relación estable entre una función o bloque importante, su ficha explicativa, sus pruebas y la versión exacta del código. Permite revisar el proyecto sin imprimir ni insertar capturas del código en el informe.

## Reglas del mapa

- Un ID identifica una sola responsabilidad.
- El archivo documental tiene exactamente el mismo nombre que el ID.
- Cada ID activo aparece una vez en el catálogo y al menos una vez en el código.
- La ficha enlaza un commit o etiqueta inmutable y las pruebas asociadas.
- Si una responsabilidad cambia de significado, se crea un ID nuevo y el anterior se marca obsoleto.
- No se incluyen secretos, datos personales, volcados de entorno ni salidas de consola.

## Verificación automatizable

Un script de documentación puede extraer con una expresión restringida los marcadores `@doc-id`, comparar el conjunto con los nombres de archivo y fallar si existen IDs huérfanos, duplicados o fichas sin código. El script no debe ejecutar archivos del proyecto para construir el índice.

## Seguridad de publicación

Antes de publicar se revisan el diff, el historial y los archivos ignorados. Las claves privadas, tokens, cuentas de servicio y archivos `.env` nunca se agregan. Si hubo una exposición, la credencial se revoca o rota antes de limpiar el historial. Los enlaces del informe apuntan al repositorio público y al commit de entrega, no a rutas locales.

## Pruebas asociadas

- Todos los nombres de ficha coinciden con un ID del catálogo.
- No hay dos fichas para la misma responsabilidad.
- Todos los vínculos relativos funcionan dentro del paquete.
- Búsqueda automatizada de patrones de secretos antes de la entrega.
- Revisión manual del commit final.

## Marcador de bloque

```js
// DOC-BLOCK SEC-DOC-MAP-001 START
// Metadatos documentales; nunca secretos ni datos privados.
// DOC-BLOCK SEC-DOC-MAP-001 END
```

## Evidencia pendiente

- URL del repositorio: [PENDIENTE]
- Commit o etiqueta: [PENDIENTE]
- Informe del verificador de IDs: [PENDIENTE]

