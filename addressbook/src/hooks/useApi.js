export function useApi() {
  async function getEntries(url) {
    const response = await fetch(url);
    return await response.json();
  }

  async function deleteEntry(url) {
    const response = await fetch(url, { method: "DELETE" });
    return response.status === 200;
  }

  return { getEntries, deleteEntry };
}
