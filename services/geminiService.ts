import type { ExerciseData } from '../types';

export const generateExercise = async (topic: string, level: string, difficulty: string): Promise<ExerciseData> => {
    
    // The Gemini API call is now proxied through our own backend server
    // to protect the API key.
    const backendUrl = '/api/generate'; // Relative URL to our backend endpoint

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic, level, difficulty }),
        });

        if (!response.ok) {
            let errorMsg = "Le serveur a rencontré une erreur. Veuillez réessayer plus tard.";
            try {
                // Try to parse a more specific error message from the backend
                const errorData = await response.json();
                if (errorData.error) {
                    errorMsg = `Erreur de l'IA : ${errorData.error}`;
                }
            } catch (e) {
                // Ignore if response is not json
            }
            throw new Error(errorMsg);
        }

        const data: ExerciseData = await response.json();
        
        // Basic validation on the received data
        if (!data.title || !Array.isArray(data.questions) || data.questions.length === 0) {
            throw new Error("L'IA a renvoyé des données invalides. Veuillez réessayer.");
        }
        
        return data;

    } catch (error) {
        console.error("Error fetching exercise from backend:", error);

        // If it's one of our custom user-friendly errors, re-throw it.
        if (error instanceof Error && (error.message.startsWith("L'IA a renvoyé") || error.message.startsWith("Erreur de l'IA") || error.message.startsWith("Le serveur a rencontré"))) {
             throw error;
        }

        // For other errors (like fetch failed due to network issue), throw a different message.
        throw new Error("La connexion au serveur a échoué. Veuillez vérifier votre connexion et réessayer.");
    }
};