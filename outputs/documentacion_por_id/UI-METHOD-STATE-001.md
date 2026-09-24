# UI-METHOD-STATE-001 — `actualizarEstadoMetodo`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función de presentación |

## Qué hace

Consulta el método seleccionado. Si es César, muestra y habilita el desplazamiento; para Atbash lo oculta y deshabilita porque ese algoritmo no usa clave numérica.

## Contrato

No recibe parámetros ni devuelve valor. Modifica las propiedades `hidden` y `disabled` de los controles relacionados.

## Seguridad

Solo cambia el estado visual; la función de cifrado vuelve a validar el método antes de procesar el mensaje.
