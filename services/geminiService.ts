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
            let errorMsg = `Server responded with status: ${response.status}`;
            try {
                // Try to parse a more specific error message from the backend
                const errorData = await response.json();
                errorMsg = errorData.error || errorMsg;
            } catch (e) {
                // Ignore if response is not json
            }
            throw new Error(errorMsg);
        }

        const data: ExerciseData = await response.json();
        
        // Basic validation on the received data
        if (!data.title || !Array.isArray(data.questions) || data.questions.length === 0) {
            throw new Error("Invalid data structure received from the server.");
        }
        
        return data;

    } catch (error) {
        console.error("Error fetching exercise from backend:", error);
        // Re-throw a more user-friendly error message
        throw new Error("La génération de l'exercice a échoué. Veuillez vérifier votre connexion et réessayer.");
    }
};
