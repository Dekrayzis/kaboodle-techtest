export const getAccommodations = async () => {
  try {
    const data = await (await fetch("/api/accommodation")).json();
    return data.accommodations;
  } catch (err) {
    console.error(err);
  }
};

export function getAllResorts() {
  return getAccommodations();
}

export const filterAccommodations = async (type) => {
  const allResorts = await getAllResorts();

  if (type !== "" || type !== "Any") {
    const filteredResorts = allResorts.filter(
      (resort) => resort.type.name === type
    );
    return filteredResorts;
  }

  return allResorts;
};

export const getAccommodationTypes = async () => {
  let accommodationTypes = [];
  let typeNames = [];

  const allResorts = await getAccommodations();

  //-- Get all accommodation types from data
  //-- Remove duplicate type names.
  //-- build type object array structure
  allResorts.map(({ type }) => typeNames.push(type.name));

  let tempArray = [...new Set(typeNames)];
  tempArray.map((type, idx) => {
    accommodationTypes.push({ id: idx, value: type });
  });

  return accommodationTypes;
};
