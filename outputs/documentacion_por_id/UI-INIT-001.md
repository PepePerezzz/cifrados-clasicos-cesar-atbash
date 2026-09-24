# UI-INIT-001 — `iniciar`

| Campo | Valor |
|---|---|
| Archivo | `programa_web/js/app.js` |
| Tipo | Función de inicialización |

## Qué hace

Carga el preset inicial, construye el selector, sincroniza el método y registra todos los eventos de la página: cambio de preset, edición del charset, activación de casillas, selección de método, formularios y botones de copia.

## Contrato

No recibe parámetros ni devuelve valor. Requiere que el DOM definido en `index.html` esté disponible cuando se ejecuta.

## Seguridad y efectos

Centraliza los puntos de entrada de la interfaz. Los eventos delegan en funciones documentadas que validan entradas y usan salidas seguras. Se ejecuta una sola vez al cargar el módulo.
