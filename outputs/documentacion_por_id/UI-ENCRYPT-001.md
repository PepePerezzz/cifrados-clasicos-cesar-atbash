# UI-ENCRYPT-001 — Flujo de interfaz para cifrar

| Campo | Valor |
|---|---|
| Estado | Implementado y comprobado en navegador local |
| Tipo | Controlador de evento |
| Función | `manejarCifrado(evento)` |
| Archivo | [`programa_web/js/app.js`](../programa_web/js/app.js) |
| Rúbrica | Selección del módulo y cifrado, 10 % |

## Qué hace

Lee los controles de la pantalla de cifrado, impide el envío tradicional del formulario, valida la entrada, construye el alfabeto activo, ejecuta César o Atbash y presenta el criptograma mediante la salida segura.

## Contrato

- **Entrada:** evento de envío y referencias a controles ya localizados.
- **Salida:** efecto controlado sobre mensajes de validación y región de resultado.
- **Precondición:** el manejador se registra una sola vez al iniciar la página.
- **Postcondición:** el texto no sale del navegador ni se inserta como HTML.

## Flujo

1. `preventDefault()`.
2. Leer valores con `.value` y validar longitud, alfabeto y método.
3. Construir el alfabeto sólo con las casillas activas.
4. Normalizar `k` y rechazar un desplazamiento equivalente a cero.
5. Invocar explícitamente César o Atbash.
6. Pasar el resultado a `UI-OUTPUT-001` y anunciar el estado.

## Seguridad y accesibilidad

No concatena selectores ni nombres de función a partir de la entrada. No usa `innerHTML`. Los errores se asocian al control correspondiente y se anuncian en una región accesible. El portapapeles solo se usa tras un clic explícito.

## Pruebas asociadas

- Habilitación de `k` solo para César.
- Bloqueo ante datos inválidos.
- Una ejecución por envío.
- Salida correcta para ambos métodos.
- Ninguna solicitud de red durante el proceso.

## Marcador de código

```js
/** @doc-id UI-ENCRYPT-001 */
```

## Evidencia

- Código local: [`app.js`](../programa_web/js/app.js)
- Comprobación local: la casilla `a` desmarcada permaneció literal junto con emoji, tilde y salto de línea.
- Automatización de navegador y commit público: [PENDIENTE]
