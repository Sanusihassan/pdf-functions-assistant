import { type _howToSchema } from "./how-to";

export const howToSchema: _howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment utiliser l'assistant PDF ?",
    description: "Étapes pour utiliser l'assistant PDF sur PDFEquips.",
    step: [
        {
            "@type": "HowToStep",
            name: "Étape 1",
            text: "Ouvrez l'outil Assistant PDF sur PDFEquips."
        },
        {
            "@type": "HowToStep",
            name: "Étape 2",
            text: "Téléchargez le fichier PDF que vous souhaitez traiter."
        },
        {
            "@type": "HowToStep",
            name: "Étape 3",
            text: "Ajoutez votre instruction ou demande dans la zone de saisie. Par exemple, vous pouvez demander à l'assistant de résumer, extraire des données ou effectuer des tâches spécifiques."
        },
        {
            "@type": "HowToStep",
            name: "Étape 4",
            text: "Cliquez sur le bouton 'Traiter le PDF' pour démarrer l'opération alimentée par l'IA."
        },
        {
            "@type": "HowToStep",
            name: "Étape 5",
            text: "Attendez les résultats et téléchargez le fichier traité une fois qu'il est prêt."
        }
    ]
};