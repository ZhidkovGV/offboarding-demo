const express = require("express");
const cors = require("cors");

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
      startDate: Date.now() - MS_IN_DAY * Math.floor(Math.random() * 3 + 1),
      targetDate: Date.now() + MS_IN_DAY * Math.floor(Math.random() * 10 + 1),
    };
  });
};

let mockDB = getMockDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Any origin
  res.header("Access-Control-Allow-Methods", "*"); // Any method
  res.header("Access-Control-Allow-Headers", "*"); // Any header
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

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
app.patch("/users/offboard", (req, res) => {
  const { id, equipment } = req.body;
  const process = mockDB.find((v) => v.id === id);
  Object.assign(process, req.body);
  if (equipment) {
    Object.assign(process.employee, { equipment });
  }

  res.send({ success: true });
});

app.post("/reset", (_, res) => {
  mockDB = getMockDB();
  res.send({ success: true });
});

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

app.get("/countries", (_, res) => {
  res.send(countries);
});
const cities = [
  "Tokyo",
  "Delhi",
  "Shanghai",
  "São Paulo",
  "Mumbai",
  "Beijing",
  "Cairo",
  "Dhaka",
  "Mexico City",
  "Osaka",
  "Karachi",
  "Chongqing",
  "Istanbul",
  "Buenos Aires",
  "Kolkata",
  "Lagos",
  "Kinshasa",
  "Manila",
  "Rio de Janeiro",
  "Guangzhou",
  "Los Angeles",
  "Moscow",
  "Shenzhen",
  "Lahore",
  "Bangalore",
  "Paris",
  "Bogotá",
  "Jakarta",
  "Chennai",
  "Lima",
  "Bangkok",
  "Seoul",
  "Nagoya",
  "Hyderabad",
  "London",
  "Tehran",
  "Chicago",
  "Chengdu",
  "Nanjing",
  "Ho Chi Minh City",
  "Wuhan",
  "Hangzhou",
  "Hong Kong",
  "Ahmedabad",
  "Kuala Lumpur",
  "Hanoi",
  "Riyadh",
  "Baghdad",
  "Toronto",
  "Santiago",
  "Dallas",
  "Surat",
  "Houston",
  "Pune",
  "Miami",
  "Singapore",
  "Philadelphia",
  "Atlanta",
  "Fukuoka",
  "Barcelona",
  "Washington, D.C.",
  "Guadalajara",
  "Boston",
  "Shenyang",
  "St. Petersburg",
  "Johannesburg",
  "Qingdao",
  "Dalian",
  "Yangon",
  "Alexandria",
  "Ankara",
  "Chittagong",
  "Melbourne",
  "Montréal",
  "Dubai",
  "Nairobi",
  "Busan",
  "Kabul",
  "Rome",
  "Milan",
  "Medellín",
  "Kuwait City",
  "Sapporo",
  "Tianjin",
  "Damascus",
  "Addis Ababa",
  "Harbin",
  "Brasília",
  "Casablanca",
  "Porto Alegre",
  "Munich",
  "Tashkent",
  "Recife",
  "Fortaleza",
  "Lisbon",
  "Bucharest",
  "Curitiba",
  "Athens",
  "Brussels",
  "Salvador",
  "Havana",
  "Beirut",
  "Copenhagen",
  "Zurich",
  "Stockholm",
  "Helsinki",
  "Vienna",
  "Dublin",
  "Seville",
  "Brisbane",
  "Vancouver",
  "Ottawa",
  "Edmonton",
  "Winnipeg",
  "Halifax",
  "Hobart",
  "Wellington",
  "Honolulu",
  "Anchorage",
  "San Francisco",
  "Warsaw",
  "Kraków",
  "Łódź",
  "Wrocław",
  "Poznań",
  "Gdańsk",
  "Szczecin",
  "Bydgoszcz",
  "Lublin",
  "Katowice",
  "Białystok",
  "Gdynia",
  "Częstochowa",
  "Radom",
  "Toruń",
  "Sosnowiec",
  "Kielce",
  "Rzeszów",
  "Gliwice",
  "Zabrze",
  "Olsztyn",
  "Bielsko-Biała",
  "Bytom",
  "Zielona Góra",
  "Rybnik",
  "Opole",
  "Elbląg",
  "Gorzów Wielkopolski",
  "Dąbrowa Górnicza",
  "Płock",
  "Tychy",
  "Wałbrzych",
  "Włocławek",
  "Tarnów",
  "Chorzów",
  "Koszalin",
  "Legnica",
  "Kalisz",
  "Grudziądz",
  "Słupsk",
  "Jaworzno",
  "Jastrzębie-Zdrój",
  "Nowy Sącz",
  "Jelenia Góra",
  "Konin",
  "Piła",
  "Piotrków Trybunalski",
  "Inowrocław",
  "Lubin",
  "Ostrołęka",
  "Suwałki",
  "Gniezno",
  "Głogów",
  "Chełm",
  "Tarnobrzeg",
  "Przemyśl",
  "Biała Podlaska",
  "Zamość",
  "Ełk",
  "Leszno",
  "Mielec",
  "Stalowa Wola",
  "Tomaszów Mazowiecki",
  "Bełchatów",
  "Ostrów Wielkopolski",
  "Pabianice",
  "Świdnica",
  "Nowa Sól",
  "Świętochłowice",
  "Zgierz",
  "Żory",
  "Tczew",
  "Puławy",
  "Ciechanów",
  "Skarżysko-Kamienna",
  "Żyrardów",
  "Wejherowo",
  "Starachowice",
  "Będzin",
  "Świnoujście",
  "Łomża",
  "Mysłowice",
  "Siemianowice Śląskie",
  "Knurów",
  "Rumia",
  "Kędzierzyn-Koźle",
  "Sopot",
  "Marki",
  "Wodzisław Śląski",
  "Mińsk Mazowiecki",
  "Zawiercie",
  "Otwock",
  "Czechowice-Dziedzice",
  "Kraśnik",
  "Kołobrzeg",
  "Luboń",
  "Sochaczew",
  "Wołomin",
  "Śrem",
  "Bielawa",
];

app.get("/cities", (_, res) => {
  res.send(cities);
});

app.listen(PORT, () => {
  console.log(`Mock app listening on port ${PORT}`);
});

console.log(Math.random() * 1000)
