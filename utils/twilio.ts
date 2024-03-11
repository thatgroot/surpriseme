export async function sendMessage(to: string, audio: string) {
  try {
    const response = await fetch("http://192.168.1.29:3000/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: to,
        audio: audio,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
    } else {
      console.error("Error sending SMS:", response.statusText);
    }
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
