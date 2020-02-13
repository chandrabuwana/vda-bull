# vda-server
Ini adalah kodingan yang isinya backendnya VDA

USER: (model, controller, route, appjs)
- namaLengkap (string)
- nik (string)
- password (string)
- level (number)
- role (string)
- email (string)
** (C = done, R = done, U = ?, D = ?, Log = done)

RATING: (model, controller, route, appjs)
- userGetId (object)
- userGiftId (object)
- rating (number)
** (C = done, R = done, U = done, D = done)

COMMENT: (model, controller, route, appjs)
- userGetComment (object)
- userGiftComment (object)
- comment (string)
- dateComment (date)
- status (bolean)
** (C = done, R = done, U = done, D = done)

DIVISION: (model,controller,route,appjs)
- division (string)
- divisionUserId (array)
- headUserId (array)(users)
** (C = done, R = done, U = done, D = done)

PROGRAM : (MODEL,controller,route,appjs)
- nameProgram(string)
- date(date)
- userInchargeId (array) users
** (C = done, R = done, U = done, D = done)

ACTIVITY : (MODEL, controller ,route,appjs)
- nameActivity (string)
- date(date)
- userInchargeId (array) users
** (C = done, R = done, U = done, D = done)