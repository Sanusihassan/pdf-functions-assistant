import type { HowTo, WithContext } from "schema-dts";
export type howToType = {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    step: {
        "@type": string;
        name: string;
        text: string;
        substeps: string[];
    }[];
};



export const howToSchema: WithContext<HowTo> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use the PDF Assistant?",
    description: "Steps to perform tasks using the PDF Assistant on PDFEquips.",
    step: [
        {
            "@type": "HowToStep",
            name: "Step 1",
            text: "Open the PDF Assistant tool on PDFEquips."
        },
        {
            "@type": "HowToStep",
            name: "Step 2",
            text: "Upload the PDF file you want to process."
        },
        {
            "@type": "HowToStep",
            name: "Step 3",
            text: "Add your prompt or instruction in the input box. For example, you can ask the assistant to summarize, extract data, or perform specific tasks."
        },
        {
            "@type": "HowToStep",
            name: "Step 4",
            text: "Click the 'Process Document' button to start the AI-powered operation."
        },
        {
            "@type": "HowToStep",
            name: "Step 5",
            text: "Wait for the results and download the processed file once it's ready."
        }
    ]
};



export type _howToSchema = typeof howToSchema;