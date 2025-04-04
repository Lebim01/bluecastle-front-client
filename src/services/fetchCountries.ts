async function fetchCountries() {
  const response = await fetch(`/location/countries`);

  if (!response.ok) {
    throw new Error("Countries fetch failed");
  }

  return response.json();
}

export default fetchCountries;
