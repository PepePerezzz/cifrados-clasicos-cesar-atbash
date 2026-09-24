# UI-MESSAGE-001 — `mostrarMensaje`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función con efecto en el DOM |

## Qué hace

Actualiza el aviso general de la aplicación y registra su tipo visual (`info`, `ok` o `error`) en un atributo de datos.

## Contrato

- **Entradas:** texto del aviso y tipo opcional.
- **Salida:** ninguna.
- **Efecto:** modifica contenido y atributo del elemento `#aviso`.

## Seguridad

Utiliza `textContent`; por lo tanto, los mensajes de error derivados de entradas no se interpretan como HTML.
