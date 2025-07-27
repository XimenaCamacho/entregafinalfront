export async function fetchData(route) {
  const response = await fetch(route);
  if (!response.ok) throw new Error(`Error al cargar ${route}`);
  return await response.json();
}
