# Cifrados clásicos: César y Atbash

Proyecto web académico para cifrar y descifrar mensajes con César y Atbash usando un alfabeto configurable. El descifrado automático aplica análisis de frecuencias inspirado en el trabajo de Al-Kindi y muestra únicamente la hipótesis con mejor puntuación.

## Enlaces de entrega

- Programa web: <https://pepeperezzz.github.io/cifrados-clasicos-cesar-atbash/>
- Código documentado: <https://github.com/PepePerezzz/cifrados-clasicos-cesar-atbash>
- Documentación principal: [`outputs/Documentacion_Proyecto_Cifrados_Clasicos.md`](outputs/Documentacion_Proyecto_Cifrados_Clasicos.md)
- Documentación segura consolidada: [`outputs/Documentacion_Segura_Funciones.pdf`](outputs/Documentacion_Segura_Funciones.pdf)

## Funciones principales

- Cifrado César con módulo/desplazamiento seleccionable.
- Cifrado Atbash.
- Descifrado automático que evalúa César y Atbash.
- Charset editable mediante preajustes, entrada personalizada y selección carácter por carácter.
- Regla *passthrough*: todo carácter que no esté activo en el charset permanece intacto y en su posición original.
- Procesamiento local en el navegador, sin enviar los mensajes a un servidor.

## Ejecutar localmente

```bash
cd outputs/programa_web
npm test
python3 -m http.server 8000
```

Después, abrir <http://localhost:8000>.

## Estructura

```text
outputs/
├── programa_web/                 # Sitio estático y pruebas
├── Documentacion_Segura_Funciones.pdf # IDs y explicación de todas las funciones
├── Documentacion_Proyecto_Cifrados_Clasicos.md
└── Documentacion_Proyecto_Cifrados_Clasicos.docx
```

> Aviso: César y Atbash se incluyen con fines educativos. No deben usarse para proteger información real.
