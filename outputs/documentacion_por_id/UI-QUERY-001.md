# UI-QUERY-001 — `$`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función auxiliar de interfaz |

## Qué hace

Recibe un selector CSS y devuelve el primer elemento del documento que coincide mediante `document.querySelector`.

## Contrato

- **Entrada:** selector CSS usado internamente por la aplicación.
- **Salida:** elemento DOM o `null`.
- **Efectos:** ninguno; solo consulta el documento.

## Seguridad

Los selectores están definidos en el código y no provienen de texto libre del usuario. La función no inserta HTML ni evalúa JavaScript.
