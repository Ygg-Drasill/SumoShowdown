export const createSession = async (): Promise<number> => {
    try {
        const response = await fetch("http://localhost:3000/sessions/new", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`Failed to start session: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Full Response Data:", data);

        if (!data.code) {
            throw new Error("code not found in response");
        }

        return data.code.toString().padStart(4, "0");
    } catch (error) {
        console.error("Error starting game:", error);
        throw error;
    }
};

export const fetchPlayers = async (sessionId: string): Promise<{ Players: { Id: number; Name: string }[] }> => {
    try {
        const response = await fetch(`http://localhost:3000/sessions/${sessionId}/info`);
        console.log(response)

        if (!response.ok) {
            throw new Error(`Failed to fetch players: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { Players: data.Players || [] };
    } catch (error) {
        console.error("Error fetching players:", error);
        return { Players: [] };
    }
};

