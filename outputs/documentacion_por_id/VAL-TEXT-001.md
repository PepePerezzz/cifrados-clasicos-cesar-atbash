# VAL-TEXT-001 — `validarTexto`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función de validación |

## Qué hace

Comprueba que un mensaje no supere el límite configurado de 20,000 unidades de cadena antes de cifrar o generar candidatos de descifrado.

## Contrato

- **Entrada:** texto del formulario.
- **Salida:** ninguna cuando es válido.
- **Error:** `RangeError` cuando excede el límite.

## Seguridad

Reduce el riesgo de bloquear la interfaz con entradas excesivas. La validación se realiza antes del trabajo criptográfico costoso. Complejidad `O(1)` para consultar la longitud.
