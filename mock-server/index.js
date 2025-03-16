const express = require("express");
const app = express();
const PORT = 3000;
const MOCK_OFFBOARDINGS_AMOUNT = 100;

const MOCK_NAMES = [
  "John",
  "Joanna",
  "Jan",
  "Victoria",
  "Stephan",
  "Hanna",
  "Xi",
  "Bartosz",
  "Jake",
  "Aleksandra",
  "Sherlock",
  "Harry",
  "Fiona",
];
const MOCK_SURNAMES = [
  "Doe",
  "Kowalski",
  "Grey",
  "Black",
  "Potter",
  "Green",
  "Melnik",
  "Portnoy",
  "Senvir",
  "Poddar",
  "Shrek",
];

const MOCK_DEPARTMENTS = ["Engineering", "Sales", "Design", "Marketing"];

const MOCK_EQUIPMENT_NAMES = [
  "Macbook Air",
  "Macbook Pro",
  "Magic Mouse",
  "AirPods",
  "Magic Keyboard",
];

const getRandomFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

const MS_IN_DAY = 86400000;

const getMockEquipment = (userId) =>
  Array.from(
    {
      length: Math.floor(Math.random() * MOCK_EQUIPMENT_NAMES.length + 1), // add one to avoid empty equipment arrays,
    },
    (__, equipmentIndex) => ({
      id: `equipment_id_${userId}_${equipmentIndex}`,
      status: "IN_USE",
      name: getRandomFromArray(MOCK_EQUIPMENT_NAMES),
    }),
  );

const getRandomName = () =>
  `${getRandomFromArray(MOCK_NAMES)} ${getRandomFromArray(MOCK_SURNAMES)}`;

const getMockDB = () => {
  return Array.from({ length: MOCK_OFFBOARDINGS_AMOUNT }, (_, i) => {
    const name = getRandomName();
    const equipment = getMockEquipment(i);

    return {
      employee: {
        id: `id_${i}`,
        name,
        department: getRandomFromArray(MOCK_DEPARTMENTS),
        equipment,
        email: `${name.replace(" ", ".")}@demomail.com`,
      },
      status: "NOT_STARTED",
      id: `${i}_offboarding_id`,
      exitInterviewDate:
        Date.now() + MS_IN_DAY * Math.floor(Math.random() * 3 + 1),
    };
  });
};

let mockDB = getMockDB();

// Disable CORS
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

/**
 * Get all offboarding processes
 */
app.get("/users/offboard", (_, res) => {
  res.send(mockDB);
});

/**
 * Get offboarding process by id
 */
app.get("/users/offboard/:id", (req, res) => {
  const process = mockDB.find(({ id }) => id === req.params.id);

  if (process) {
    res.send(process);
  } else {
    res.status(404).send();
  }
});

/**
 * Update offboarding process entity
 */
app.patch("/users/offboard/:id", ({ params, body }, res) => {
  res.send({ success: true });
});

/**
 * Complete offboarding process making it readonly
 */
app.post("/users/offboard/:id/complete", ({ params: { id } }, res) => {
  res.send({ success: true });
});

app.post("/reset", (_, res) => {
  mockDB = getMockDB();
  res.send({ success: true });
});

app.listen(PORT, () => {
  console.log(`Mock app listening on port ${PORT}`);
});
