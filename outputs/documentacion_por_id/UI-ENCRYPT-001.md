# UI-ENCRYPT-001 — `manejarCifrado`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Controlador de evento |

## Qué hace

Impide el envío tradicional del formulario, valida el mensaje, construye el alfabeto activo y ejecuta César o Atbash. Después presenta el resultado, módulo y desplazamiento cuando corresponde.

## Contrato

- **Entrada:** evento `submit`.
- **Salida:** ninguna; actualiza la interfaz.
- **Errores controlados:** método inválido, alfabeto inválido, texto excesivo o desplazamiento equivalente a cero.

## Seguridad

Procesa localmente, limita entradas y delega la salida a `mostrarResultadoSeguro`. Los caracteres inactivos permanecen intactos.
