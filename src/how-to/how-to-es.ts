import { type _howToSchema } from "./how-to";

export const howToSchema: _howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "¿Cómo usar el asistente de PDF?",
    description: "Pasos para utilizar el asistente de PDF en PDFEquips.",
    step: [
        {
            "@type": "HowToStep",
            name: "Paso 1",
            text: "Abre la herramienta Asistente de PDF en PDFEquips."
        },
        {
            "@type": "HowToStep",
            name: "Paso 2",
            text: "Carga el archivo PDF que deseas procesar."
        },
        {
            "@type": "HowToStep",
            name: "Paso 3",
            text: "Agrega tu indicación o instrucción en el cuadro de texto. Por ejemplo, puedes pedir al asistente que resuma, extraiga datos o realice tareas específicas."
        },
        {
            "@type": "HowToStep",
            name: "Paso 4",
            text: "Haz clic en el botón 'Procesar PDF' para iniciar la operación impulsada por IA."
        },
        {
            "@type": "HowToStep",
            name: "Paso 5",
            text: "Espera los resultados y descarga el archivo procesado cuando esté listo."
        }
    ]
};
