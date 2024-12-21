import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabaseSync("places.db");

export async function init() {
  const promise = new Promise(async (resolve, reject) => {
    try {
      await database.execAsync(`CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          uri TEXT NOT NULL,
          address TEXT NOT NULL,
          title TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        );`);
      console.log("DB Ready!");
      resolve();
    } catch (error) {
      reject(error);
    }
  });

  return promise;
}

export function insertPlace(place) {
  return new Promise(async (resolve, reject) => {
    await database
      .runAsync(
        "INSERT INTO places (uri, address, title, lat, lng) VALUES (?, ?, ?, ?, ?)",
        place.uri,
        place.address,
        place.title,
        place.coordinates.latitude,
        place.coordinates.longitude
      )
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        console.error("Error inserting place:", error);
        reject(error);
      });
  });
}

export async function getAllPlaces() {
  try {
    const allRows = await database.getAllAsync("SELECT * FROM places;");

    const places = allRows.map((row) => ({
      id: row.id,
      uri: row.uri,
      address: row.address,
      title: row.title,
      lat: row.lat,
      lng: row.lng,
    }));

    if (places.length > 0) {
      return places;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error retrieving all places:", error);
    throw error;
  }
}

export async function getPlaceById(id) {
  try {
    const place = await database.getFirstAsync(
      "SELECT * FROM places WHERE id = ?;",
      [id]
    );

    if (place) {
      return place;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error retrieving place by ID:", error);
    throw error;
  }
}
