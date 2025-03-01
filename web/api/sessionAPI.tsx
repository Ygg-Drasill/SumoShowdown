export const createSession = async (): Promise<string> => {
    try {
        const response = await fetch("http://192.168.0.134:3000/sessions/new", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to start session");
        }

        const data = await response.json();
        return data.sessionCode;
    } catch (error) {
        console.error("Error starting game:", error);
        throw error;
    }
};