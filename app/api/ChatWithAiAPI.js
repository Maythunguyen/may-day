
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function callAiEndpoint(path, payload) {
    const url = `${baseURL}/api/${path}`;
    const isForm = payload instanceof FormData;

    const res = await fetch(url, {
        method: "POST",
        headers: isForm
        ? undefined // browser will set multipart boundaries
        : { "Content-Type": "application/json", Accept: "application/json" },
        body: isForm ? payload : JSON.stringify(payload),
    });

    if (!res.ok) {
        // try to surface server error text to the console
        let msg = `AI request failed (${res.status})`;
        try {
            msg += ": " + (await res.text());
        } catch (_) {
        }
            throw new Error(msg);
    }
    return res.json();
}

export function messageWithAiAPI(message) {
    return callAiEndpoint("message_with_ai", { message });
}
