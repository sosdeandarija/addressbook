const {
  API_GET_ENTRIES_ROUTE,
  API_GET_ENTRY_ROUTE,
  API_POST_ENTRY_ROUTE,
  API_POST_V2_ENTRY_ROUTE,
  API_PUT_ENTRY_ROUTE,
  API_PUT_V2_ENTRY_ROUTE,
  API_DELETE_ENTRY_ROUTE,
  API_PATCH_ENTRIES_ROUTE,
  API_GET_ANIMALS_ROUTE,
} = require("../Routes");
const {
  getEntries,
  getEntry,
  postEntry,
  putEntry,
  deleteEntry,
  getEntryIndex,
  getAnimals,
} = require("../Data");
const joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: "./dist/app/uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

const multerUpload = multer({ storage: multerStorage });

const UUID_VALIDATOR = joi.string().uuid();

const NEW_ENTRY_VALIDATOR = joi.object({
  avatarUrl: joi.string().allow("", null),
  firstName: joi.string().required(),
  lastName: joi.string().allow("", null),
  country: joi.string().allow("", null),
  city: joi.string().allow("", null),
  street: joi.string().allow("", null),
  postalCode: joi.string().allow("", null),
  birthDate: joi.date().allow(null),
  email: joi.string().email().allow("", null),
});

const getAvatarUrl = (url, file) => {
  if (url) return url;
  if (file) return `uploads/${file.filename}`;
  return null;
};

const setupApiRoutes = (server) => {
  // GET /api/entries
  // GET /api/entries?search=:query
  server.get(API_GET_ENTRIES_ROUTE, (req, res) => {
    const entries = getEntries();

    if (req.query && req.query.search) {
      // Very naive implementation of search.
      res.status(200).json(
        entries.filter((entry) =>
          Object.keys(entry).some((key) => {
            if (key === "uuid" || key === "avatarUrl") return false;

            return `${entry[key]}`
              .toLocaleLowerCase()
              .includes(req.query.search.toLocaleLowerCase());
          })
        )
      );
    } else res.status(200).json(entries);
  });

  // GET /api/entries/:uuid
  server.get(API_GET_ENTRY_ROUTE, (req, res) => {
    const uuid = req.params.uuid;

    const { error } = UUID_VALIDATOR.validate(uuid);
    if (error) return res.status(500).json({ error: error });

    const entry = getEntry(req.params.uuid);

    if (entry) return res.status(200).json(entry);
    else return res.sendStatus(500);
  });

  // POST /api/entries
  server.post(API_POST_ENTRY_ROUTE, (req, res) => {
    const newEntryPayload = req.body;

    const { error } = NEW_ENTRY_VALIDATOR.validate(newEntryPayload);
    if (error) return res.status(500).json({ error: error });

    const newEntry = postEntry(newEntryPayload);
    return res.status(200).json(newEntry);
  });

  // POST /api/v2/entries
  server.post(
    API_POST_V2_ENTRY_ROUTE,
    multerUpload.single("avatar"),
    (req, res) => {
      const newEntryPayload = req.body;

      const { error } = NEW_ENTRY_VALIDATOR.validate(newEntryPayload);
      if (error) return res.status(500).json({ error: error });

      const newEntry = postEntry({
        ...newEntryPayload,
        avatarUrl: getAvatarUrl(newEntryPayload.avatarUrl, req.file),
      });

      return res.status(200).json(newEntry);
    }
  );

  // PUT /api/entries/:uuid
  server.put(API_PUT_ENTRY_ROUTE, (req, res) => {
    const uuid = req.params.uuid;

    const { error } = UUID_VALIDATOR.validate(uuid);
    if (error) return res.status(500).json({ error: error });

    const entry = getEntry(uuid);

    if (entry) {
      const newData = req.body;

      const { error } = NEW_ENTRY_VALIDATOR.validate(newData);
      if (error) return res.status(500).json({ error: error });

      putEntry(entry, newData);

      return res.status(200).json(entry);
    } else return res.sendStatus(500);
  });

  // PUT /api/v2/entries/:uuid
  server.put(
    API_PUT_V2_ENTRY_ROUTE,
    multerUpload.single("avatar"),
    (req, res) => {
      const uuid = req.params.uuid;

      const { error } = UUID_VALIDATOR.validate(uuid);
      if (error) return res.status(500).json({ error: error });

      const entry = getEntry(uuid);

      if (entry) {
        const newData = req.body;

        const { error } = NEW_ENTRY_VALIDATOR.validate(newData);
        if (error) return res.status(500).json({ error: error });

        putEntry(entry, {
          ...newData,
          avatarUrl: getAvatarUrl(newData.avatarUrl, req.file),
        });

        return res.status(200).json(entry);
      } else return res.sendStatus(500);
    }
  );

  // DELETE /api/entries/:uuid
  server.delete(API_DELETE_ENTRY_ROUTE, (req, res) => {
    const uuid = req.params.uuid;

    const { error } = UUID_VALIDATOR.validate(uuid);
    if (error) return res.status(500).json({ error });

    const index = getEntryIndex(uuid);

    if (index !== -1) {
      deleteEntry(index);
      return res.sendStatus(200);
    } else return res.sendStatus(500);
  });

  // PATCH /api/entries
  server.patch(API_PATCH_ENTRIES_ROUTE, (req, res) => {
    const uuids = req.body.delete;

    const errors = uuids.map((uuid) => UUID_VALIDATOR.validate(uuid).error);
    const hasErrors = errors.some((error) => error);

    if (hasErrors) return res.status(500).json({ errors });

    const response = { deleted: 0 };

    for (const uuid of uuids) {
      const index = getEntryIndex(uuid);

      if (index !== -1) {
        deleteEntry(index);
        response.deleted++;
      } else return res.status(500).json(response);
    }

    return res.status(200).json(response);
  });

  // GET /api/animals
  server.get(API_GET_ANIMALS_ROUTE, (req, res) => {
    res.status(200).json(getAnimals());
  });

  //GET /api/test
  server.get("/api/test", (req, res) => {
    setTimeout(() => {
      res.sendStatus(200);
    },2000);
  });

  //GET /api/test-error
  server.get("/api/test-error", (reg, res) => {
    setTimeout(() => {
      res.sendStatus(500).json({msg: "ERROR HAPPENED!!"});
    },2000);
  })

};

module.exports = setupApiRoutes;
