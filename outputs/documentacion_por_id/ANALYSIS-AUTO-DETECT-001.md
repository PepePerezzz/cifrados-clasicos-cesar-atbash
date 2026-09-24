# ANALYSIS-AUTO-DETECT-001 — `detectarYDescifrar`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/analysis.js` |
| Tipo | Función orquestadora exportada |

## Qué hace

Genera hipótesis, puntúa cada texto, ordena las puntuaciones finitas de mayor a menor y devuelve únicamente la mejor. Las puntuaciones no finitas se envían al final. En empate real prefiere Atbash y después el menor desplazamiento.

## Contrato

- **Entradas:** criptograma y alfabeto validado.
- **Salida:** `{ metodo, desplazamiento, texto, confianza }`.
- **Confianza:** alta, media o baja según la diferencia entre los dos mejores puntajes.

## Seguridad y limitaciones

Las alternativas nunca llegan a la interfaz. La confianza es una etiqueta heurística; mensajes cortos, otro idioma o un charset incorrecto pueden producir ambigüedad.

## Complejidad

Dominada por la generación y evaluación: aproximadamente `O(m·n)`.
