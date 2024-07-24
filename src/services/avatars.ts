const defaultAvatar = "/png/default.png";

export async function fetchAvatars(limit: number = 5): Promise<string[]> {
  try {
    const response = await fetch(
      `https://tinyfac.es/api/data?limit=${limit}&quality=0`
    );
    const data = await response.json();
    if (Array.isArray(data)) {
      return data.length > 0
        ? data.map((avatar: { url: string }) => avatar.url)
        : [defaultAvatar];
    } else {
      console.error("The API response is not an array:", data);
      return [defaultAvatar];
    }
  } catch (error) {
    console.error("Error fetching avatars:", error);
    return [defaultAvatar];
  }
}

export async function fetchSingleAvatar(): Promise<string> {
  try {
    const response = await fetch(
      "https://tinyfac.es/api/data?limit=1&quality=0"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0].url;
    } else {
      console.error("Could not retrieve a valid avatar:", data);
      return defaultAvatar;
    }
  } catch (error) {
    console.error("Error fetching an avatar:", error);
    return defaultAvatar;
  }
}
