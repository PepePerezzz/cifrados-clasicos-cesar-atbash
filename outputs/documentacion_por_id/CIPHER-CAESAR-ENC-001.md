# CIPHER-CAESAR-ENC-001 — `cifrarCesar`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/ciphers.js` |
| Tipo | Función pura exportada |

## Qué hace

Cifra un texto desplazando cada símbolo activo `k` posiciones hacia delante. Normaliza el desplazamiento y delega el recorrido a `transformarSoloActivos`.

## Regla

`destino = (posición + desplazamiento) mod módulo`.

## Contrato

- **Entradas:** texto, entero `k` y alfabeto validado.
- **Salida:** criptograma César.
- **Passthrough:** todo símbolo inactivo permanece intacto.

## Seguridad y complejidad

No ofrece seguridad criptográfica moderna; se usa con fines educativos. Tiempo y memoria `O(n)`.
