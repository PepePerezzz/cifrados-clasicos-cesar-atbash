# UI-DECRYPT-001 — `manejarDescifrado`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Controlador de evento |

## Qué hace

Valida el criptograma, construye el alfabeto activo y llama a `detectarYDescifrar`. Muestra exclusivamente la mejor hipótesis junto con método, desplazamiento César y confianza.

## Contrato

- **Entrada:** evento `submit`.
- **Salida:** ninguna; actualiza la interfaz.
- **Errores:** se capturan, se limpia la salida y se presenta un aviso seguro.

## Seguridad y rúbrica

No expone la lista de candidatos ni solicita que el usuario elija uno. Todo el análisis ocurre localmente y la salida usa `textContent`.
