# Programa web — César y Atbash

Aplicación web estática, sin dependencias externas, que cifra con César o Atbash y conserva literalmente todo grafema que no esté activo en el charset. El descifrado automático genera hipótesis de Atbash y César y sólo presenta la mejor según un puntaje lingüístico basado en frecuencias del español.

## Ejecutar

Desde esta carpeta:

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`. Para ejecutar las pruebas:

```bash
npm test
```

## Regla passthrough implementada

La función central es `transformarSoloActivos` en `js/ciphers.js`. Recorre el texto por grafemas y consulta el mapa del alfabeto activo:

- si el grafema está activo, transforma su índice;
- si no está activo, devuelve exactamente el mismo grafema;
- no normaliza el mensaje, por lo que no reescribe tildes combinadas, emoji, espacios ni saltos de línea.

La misma función es utilizada por cifrado César, descifrado César y Atbash. Su documentación independiente corresponde a `CIPHER-PASSTHROUGH-001`.

## Ejemplos verificados

1. Charset activo: `abcdefghijklmnopqrstuvwxyz`; César `k=3`.
   Entrada: `café 😊\nCasa!`
   Salida: `fdié 😊\nCdvd!`
   Permanecen intactos `é`, el espacio, el emoji, el salto de línea, `C` y `!`.

2. Charset disponible `abc`, pero `a` está desmarcada; charset activo `bc`; César `k=1`.
   Entrada: `a b🙂c á\nb`
   Salida: `a c🙂b á\nc`
   La `a` desmarcada, el emoji, la tilde, los espacios y el salto permanecen sin cambios.

## Limitación académica

César y Atbash no ofrecen seguridad real. Sin metadatos autenticados, no siempre es matemáticamente posible identificar con certeza el método y la clave a partir de mensajes cortos; la interfaz informa confianza y mantiene una sola salida para ajustarse a la rúbrica.
