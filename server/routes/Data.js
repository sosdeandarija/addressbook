const { v4: uuidv4 } = require("uuid");

const ENTRIES = require("../data/ENTRIES.json");
const ANIMALS = require("../data/ANIMALS.json");

const getEntries = () => {
  return ENTRIES;
};

const getEntry = (uuid) => {
  return ENTRIES.find((user) => user.uuid === uuid);
};

const getEntryIndex = (uuid) => {
  return ENTRIES.findIndex((user) => user.uuid === uuid);
};

const postEntry = ({
  avatarUrl = null,
  firstName,
  lastName,
  country,
  city,
  street,
  postalCode = null,
  birthDate,
  email,
}) => {
  const entry = {
    uuid: uuidv4(),
    avatarUrl,
    firstName,
    lastName,
    country,
    city,
    street,
    postalCode,
    birthDate,
    email,
  };

  ENTRIES.push(entry);
  return entry;
};

const putEntry = (
  entry,
  {
    avatarUrl = null,
    firstName,
    lastName,
    country,
    city,
    street,
    postalCode = null,
    birthDate,
    email,
  }
) => {
  entry.avatarUrl = avatarUrl;
  entry.firstName = firstName;
  entry.lastName = lastName;
  entry.country = country;
  entry.city = city;
  entry.street = street;
  entry.postalCode = postalCode;
  entry.birthDate = birthDate;
  entry.email = email;
};

const deleteEntry = (index) => {
  ENTRIES.splice(index, 1);
};

const getAnimals = () => {
  return ANIMALS;
};

const API = {
  ENTRIES: ENTRIES,
  getEntries: getEntries,
  getEntry: getEntry,
  getEntryIndex: getEntryIndex,
  postEntry: postEntry,
  putEntry: putEntry,
  deleteEntry: deleteEntry,
  getAnimals: getAnimals,
};

module.exports = API;
