export interface DonationEvent {
  id: string;
  name: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  category: string;
  date: string;
  location: string;
}

export interface Transaction {
  id: string;
  date: string;
  donor: string;
  event: string;
  amount: number;
}

export const objectives = [
  {
    id: "ayuda-humanitaria",
    title: "Ayuda Humanitaria Inmediata",
    description: "Comprar víveres, agua y medicinas para personas afectadas por desastres naturales en México.",
    category: "ayuda",
  },
  {
    id: "reconstruccion",
    title: "Reconstrucción de Hogares",
    description: "Reconstruir viviendas y comunidades devastadas, devolviendo la dignidad a las familias.",
    category: "reconstruccion",
  },
  {
    id: "educacion",
    title: "Educación y Futuro",
    description: "Proveer material escolar y apoyo educativo a niños afectados para que no pierdan su futuro.",
    category: "educacion",
  },
];

export const events: DonationEvent[] = [
  {
    id: "huracan-otis",
    name: "Huracán Otis – Guerrero",
    description: "Apoyo a familias afectadas por el huracán categoría 5 en Acapulco y la costa de Guerrero.",
    image: "huracan",
    goal: 5000000,
    raised: 3250000,
    category: "ayuda",
    date: "2025-10-25",
    location: "Guerrero",
  },
  {
    id: "inundaciones-tabasco",
    name: "Inundaciones en Tabasco",
    description: "Rescate y ayuda humanitaria para comunidades afectadas por las inundaciones en Tabasco.",
    image: "inundaciones",
    goal: 2000000,
    raised: 1100000,
    category: "ayuda",
    date: "2025-09-15",
    location: "Tabasco",
  },
  {
    id: "terremoto-oaxaca",
    name: "Terremoto en Oaxaca",
    description: "Reconstrucción de viviendas y escuelas dañadas por el sismo en comunidades de Oaxaca.",
    image: "terremoto",
    goal: 3500000,
    raised: 2800000,
    category: "reconstruccion",
    date: "2025-07-20",
    location: "Oaxaca",
  },
  {
    id: "sequia-chihuahua",
    name: "Sequía en Chihuahua",
    description: "Provisión de agua potable y apoyo alimentario a comunidades rurales afectadas por la sequía.",
    image: "sequia",
    goal: 1500000,
    raised: 600000,
    category: "educacion",
    date: "2025-11-01",
    location: "Chihuahua",
  },
];

export const transactions: Transaction[] = [
  { id: "1", date: "2025-12-15", donor: "María García", event: "Huracán Otis – Guerrero", amount: 500 },
  { id: "2", date: "2025-12-14", donor: "Anónimo", event: "Inundaciones en Tabasco", amount: 1000 },
  { id: "3", date: "2025-12-14", donor: "Carlos Mendoza", event: "Terremoto en Oaxaca", amount: 250 },
  { id: "4", date: "2025-12-13", donor: "Fundación Azteca", event: "Huracán Otis – Guerrero", amount: 50000 },
  { id: "5", date: "2025-12-13", donor: "Anónimo", event: "Sequía en Chihuahua", amount: 200 },
  { id: "6", date: "2025-12-12", donor: "Roberto Sánchez", event: "Terremoto en Oaxaca", amount: 1500 },
  { id: "7", date: "2025-12-12", donor: "Anónimo", event: "Inundaciones en Tabasco", amount: 300 },
  { id: "8", date: "2025-12-11", donor: "Patricia López", event: "Huracán Otis – Guerrero", amount: 750 },
  { id: "9", date: "2025-12-11", donor: "Empresa XYZ S.A.", event: "Sequía en Chihuahua", amount: 25000 },
  { id: "10", date: "2025-12-10", donor: "Anónimo", event: "Terremoto en Oaxaca", amount: 100 },
  { id: "11", date: "2025-12-10", donor: "Juan Pérez", event: "Huracán Otis – Guerrero", amount: 400 },
  { id: "12", date: "2025-12-09", donor: "Anónimo", event: "Inundaciones en Tabasco", amount: 2000 },
];
