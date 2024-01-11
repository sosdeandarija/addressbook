## Features

### List

Main "screen" consists of `[+ Add]` button and `Search` input at the top and tabular list of entries bellow. It is possible to:

- Add new entry
- Search entries (server-side)
- Edit entries
- Delete entries
- Fetch weather data for particular entry (using external API)

#### API

- `GET /api/entries`
- `GET /api/entries?serach=:query`

![LIST](https://user-images.githubusercontent.com/92777255/178690654-1a2eaf9b-4635-4032-8308-f086f73c070f.png)

![LIST MOBILE](https://user-images.githubusercontent.com/92777255/178690669-6763bdaf-d1b1-4413-9b39-05aa2faae908.png)

### Add / Edit / Delete

Both adding new entry and editing existing one is done using the same component(s) implemented as modal with form validation.

#### API

- `POST /api/entries`
- `POST /api/v2/entries` - multipart/form-data
- `PUT /api/v2/entries/:uuid` - multipart/form-data
- `DELETE /api/entries/:uuid`
- `PATCH /api/entries`

### New entry - POST /api/v2/entries

This API receives `multipart/form-data`:

| Field        | Description                                                               | Required |
| ------------ | ------------------------------------------------------------------------- | -------- |
| `avatar`     | binary content (file)                                                     | No       |
| `avatarUrl`  | path of previous avatar; if passed, this will be used instead of `avatar` | No       |
| `firstName`  | text/plain                                                                | **Yes**  |
| `lastName`   | text/plain                                                                | No       |
| `country`    | text/plain                                                                | No       |
| `city`       | text/plain                                                                | No       |
| `street`     | text/plain                                                                | No       |
| `postalCode` | text/plain                                                                | No       |
| `birthDate`  | text/plain (ISO string representation of `Date` instance)                 | No       |
| `email`      | text/plain                                                                | No       |

Upon successful call, status `200` is returned along with JSON carrying all info about newly-created entry.

![ADD](https://user-images.githubusercontent.com/92777255/178691934-28580899-c647-4b44-af61-7b3ec0280fb4.png)

### Update existing entry - PUT /api/v2/entries/:uuid

This API receives `multipart/form-data`:

| Field        | Description                                                               | Required |
| ------------ | ------------------------------------------------------------------------- | -------- |
| `avatar`     | binary content (file)                                                     | No       |
| `avatarUrl`  | path of previous avatar; if passed, this will be used instead of `avatar` | No       |
| `firstName`  | text/plain                                                                | **Yes**  |
| `lastName`   | text/plain                                                                | No       |
| `country`    | text/plain                                                                | No       |
| `city`       | text/plain                                                                | No       |
| `street`     | text/plain                                                                | No       |
| `postalCode` | text/plain                                                                | No       |
| `birthDate`  | text/plain (ISO string representation of `Date` instance)                 | No       |
| `email`      | text/plain                                                                | No       |

Upon successful call, status `200` is returned along with JSON carrying all info about changed entry.

Deletion is done per entry using the delete icon or by selecting multiple entries and clicking on newly-shown `[- Delete]` button. Both delete "flows" are accompanied by a confirmation modal.

![DELETE](https://user-images.githubusercontent.com/92777255/178692151-e7d741f5-0fc4-4d05-bf26-d1c7c70d90a1.png)

Bulk delete is possible by calling `PATCH` and sending JSON in the form of `{ delete: [uuid1, uuid2, uuid3, ...] }`

### Weather Data

Basic weather data is fetched using external API (on demand).

Clicking on the weather icon shows Weather modal with detailed Weather data for that particular address entry.

![WEATHER](https://user-images.githubusercontent.com/92777255/178692235-390b3586-3f6b-4488-a0e2-9f69081e96df.png)
