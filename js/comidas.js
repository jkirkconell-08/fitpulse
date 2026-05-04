/* =========================================================
   NutriTrack - Registro de Comidas y Base de Datos de Alimentos
   ========================================================= */

const FOOD_DB = [
  // ─── PROTEÍNAS ────────────────────────────
  { id: 1,  name: 'Pechuga de pollo',       cal: 165, prot: 31,  carb: 0,   fat: 3.6, serving: '100g', cat: 'proteinas' },
  { id: 2,  name: 'Muslo de pollo',          cal: 209, prot: 26,  carb: 0,   fat: 11,  serving: '100g', cat: 'proteinas' },
  { id: 3,  name: 'Carne de res magra',      cal: 250, prot: 26,  carb: 0,   fat: 15,  serving: '100g', cat: 'proteinas' },
  { id: 4,  name: 'Carne molida',            cal: 332, prot: 24,  carb: 0,   fat: 26,  serving: '100g', cat: 'proteinas' },
  { id: 5,  name: 'Cerdo (lomo)',            cal: 143, prot: 26,  carb: 0,   fat: 3.5, serving: '100g', cat: 'proteinas' },
  { id: 6,  name: 'Pescado tilapia',         cal: 128, prot: 26,  carb: 0,   fat: 2.7, serving: '100g', cat: 'proteinas' },
  { id: 7,  name: 'Atún en agua (lata)',     cal: 116, prot: 26,  carb: 0,   fat: 1,   serving: '100g', cat: 'proteinas' },
  { id: 8,  name: 'Salmón',                  cal: 208, prot: 20,  carb: 0,   fat: 13,  serving: '100g', cat: 'proteinas' },
  { id: 9,  name: 'Huevo entero',            cal: 78,  prot: 6,   carb: 0.6, fat: 5,   serving: '1 unidad', cat: 'proteinas' },
  { id: 10, name: 'Clara de huevo',          cal: 17,  prot: 3.6, carb: 0.2, fat: 0.1, serving: '1 unidad', cat: 'proteinas' },
  { id: 11, name: 'Camarones',               cal: 99,  prot: 24,  carb: 0.2, fat: 0.3, serving: '100g', cat: 'proteinas' },
  { id: 12, name: 'Jamón de pavo',           cal: 104, prot: 18,  carb: 2,   fat: 2.5, serving: '100g', cat: 'proteinas' },
  { id: 13, name: 'Salchicha',               cal: 301, prot: 11,  carb: 2,   fat: 27,  serving: '100g', cat: 'proteinas' },
  { id: 14, name: 'Chorizo',                 cal: 455, prot: 24,  carb: 2,   fat: 38,  serving: '100g', cat: 'proteinas' },

  // ─── CARBOHIDRATOS ────────────────────────
  { id: 20, name: 'Arroz blanco cocido',     cal: 130, prot: 2.7, carb: 28,  fat: 0.3, serving: '100g', cat: 'carbohidratos' },
  { id: 21, name: 'Arroz integral cocido',   cal: 123, prot: 2.7, carb: 26,  fat: 1,   serving: '100g', cat: 'carbohidratos' },
  { id: 22, name: 'Frijoles negros cocidos', cal: 132, prot: 8.9, carb: 24,  fat: 0.5, serving: '100g', cat: 'carbohidratos' },
  { id: 23, name: 'Frijoles rojos cocidos',  cal: 127, prot: 8.7, carb: 23,  fat: 0.5, serving: '100g', cat: 'carbohidratos' },
  { id: 24, name: 'Lentejas cocidas',        cal: 116, prot: 9,   carb: 20,  fat: 0.4, serving: '100g', cat: 'carbohidratos' },
  { id: 25, name: 'Tortilla de maíz',        cal: 68,  prot: 1.8, carb: 14,  fat: 0.8, serving: '1 unidad', cat: 'carbohidratos' },
  { id: 26, name: 'Tortilla de harina',      cal: 150, prot: 3.8, carb: 26,  fat: 3.6, serving: '1 unidad', cat: 'carbohidratos' },
  { id: 27, name: 'Pan blanco',              cal: 79,  prot: 2.7, carb: 15,  fat: 1,   serving: '1 rebanada', cat: 'carbohidratos' },
  { id: 28, name: 'Pan integral',            cal: 69,  prot: 3.6, carb: 12,  fat: 1.1, serving: '1 rebanada', cat: 'carbohidratos' },
  { id: 29, name: 'Pasta cocida',            cal: 131, prot: 5,   carb: 25,  fat: 1.1, serving: '100g', cat: 'carbohidratos' },
  { id: 30, name: 'Papa cocida',             cal: 87,  prot: 1.9, carb: 20,  fat: 0.1, serving: '100g', cat: 'carbohidratos' },
  { id: 31, name: 'Camote cocido',           cal: 90,  prot: 2,   carb: 21,  fat: 0.1, serving: '100g', cat: 'carbohidratos' },
  { id: 32, name: 'Plátano maduro frito',    cal: 268, prot: 1.3, carb: 38,  fat: 13,  serving: '100g', cat: 'carbohidratos' },
  { id: 33, name: 'Yuca cocida',             cal: 160, prot: 1.4, carb: 38,  fat: 0.3, serving: '100g', cat: 'carbohidratos' },
  { id: 34, name: 'Avena cocida',            cal: 71,  prot: 2.5, carb: 12,  fat: 1.5, serving: '100g', cat: 'carbohidratos' },
  { id: 35, name: 'Cereal (corn flakes)',    cal: 117, prot: 2,   carb: 27,  fat: 0.3, serving: '30g', cat: 'carbohidratos' },
  { id: 36, name: 'Granola',                 cal: 140, prot: 3,   carb: 21,  fat: 5,   serving: '30g', cat: 'carbohidratos' },

  // ─── FRUTAS ───────────────────────────────
  { id: 40, name: 'Banano',                  cal: 89,  prot: 1.1, carb: 23,  fat: 0.3, serving: '1 unidad', cat: 'frutas' },
  { id: 41, name: 'Manzana',                 cal: 72,  prot: 0.4, carb: 19,  fat: 0.2, serving: '1 unidad', cat: 'frutas' },
  { id: 42, name: 'Naranja',                 cal: 62,  prot: 1.2, carb: 15,  fat: 0.2, serving: '1 unidad', cat: 'frutas' },
  { id: 43, name: 'Mango',                   cal: 135, prot: 1.1, carb: 35,  fat: 0.6, serving: '1 unidad', cat: 'frutas' },
  { id: 44, name: 'Piña',                    cal: 50,  prot: 0.5, carb: 13,  fat: 0.1, serving: '100g', cat: 'frutas' },
  { id: 45, name: 'Papaya',                  cal: 43,  prot: 0.5, carb: 11,  fat: 0.3, serving: '100g', cat: 'frutas' },
  { id: 46, name: 'Sandía',                  cal: 30,  prot: 0.6, carb: 8,   fat: 0.2, serving: '100g', cat: 'frutas' },
  { id: 47, name: 'Uvas',                    cal: 69,  prot: 0.7, carb: 18,  fat: 0.2, serving: '100g', cat: 'frutas' },
  { id: 48, name: 'Fresa',                   cal: 32,  prot: 0.7, carb: 8,   fat: 0.3, serving: '100g', cat: 'frutas' },
  { id: 49, name: 'Aguacate',                cal: 160, prot: 2,   carb: 9,   fat: 15,  serving: '100g', cat: 'frutas' },
  { id: 50, name: 'Melon',                   cal: 34,  prot: 0.8, carb: 8,   fat: 0.2, serving: '100g', cat: 'frutas' },
  { id: 51, name: 'Pera',                    cal: 57,  prot: 0.4, carb: 15,  fat: 0.1, serving: '1 unidad', cat: 'frutas' },
  { id: 52, name: 'Durazno',                 cal: 39,  prot: 0.9, carb: 10,  fat: 0.3, serving: '1 unidad', cat: 'frutas' },

  // ─── VERDURAS ─────────────────────────────
  { id: 60, name: 'Lechuga',                 cal: 15,  prot: 1.4, carb: 2.9, fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 61, name: 'Tomate',                  cal: 18,  prot: 0.9, carb: 3.9, fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 62, name: 'Cebolla',                 cal: 40,  prot: 1.1, carb: 9,   fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 63, name: 'Brócoli',                 cal: 34,  prot: 2.8, carb: 7,   fat: 0.4, serving: '100g', cat: 'verduras' },
  { id: 64, name: 'Zanahoria',               cal: 41,  prot: 0.9, carb: 10,  fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 65, name: 'Chile dulce (pimiento)',   cal: 31,  prot: 1,   carb: 6,   fat: 0.3, serving: '100g', cat: 'verduras' },
  { id: 66, name: 'Pepino',                  cal: 16,  prot: 0.7, carb: 3.6, fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 67, name: 'Espinaca',                cal: 23,  prot: 2.9, carb: 3.6, fat: 0.4, serving: '100g', cat: 'verduras' },
  { id: 68, name: 'Chayote',                 cal: 19,  prot: 0.8, carb: 4.5, fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 69, name: 'Ayote / Calabaza',        cal: 26,  prot: 1,   carb: 7,   fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 70, name: 'Elote / Maíz',            cal: 86,  prot: 3.3, carb: 19,  fat: 1.2, serving: '100g', cat: 'verduras' },
  { id: 71, name: 'Ensalada mixta',          cal: 20,  prot: 1.5, carb: 3.5, fat: 0.2, serving: '100g', cat: 'verduras' },

  // ─── LÁCTEOS ──────────────────────────────
  { id: 80, name: 'Leche entera',            cal: 61,  prot: 3.2, carb: 4.8, fat: 3.3, serving: '100ml', cat: 'lacteos' },
  { id: 81, name: 'Leche descremada',        cal: 34,  prot: 3.4, carb: 5,   fat: 0.1, serving: '100ml', cat: 'lacteos' },
  { id: 82, name: 'Yogurt natural',          cal: 61,  prot: 3.5, carb: 4.7, fat: 3.3, serving: '100g', cat: 'lacteos' },
  { id: 83, name: 'Yogurt griego',           cal: 59,  prot: 10,  carb: 3.6, fat: 0.7, serving: '100g', cat: 'lacteos' },
  { id: 84, name: 'Queso fresco / turrialba',cal: 174, prot: 11,  carb: 3.4, fat: 14,  serving: '100g', cat: 'lacteos' },
  { id: 85, name: 'Queso mozzarella',        cal: 280, prot: 28,  carb: 3.1, fat: 17,  serving: '100g', cat: 'lacteos' },
  { id: 86, name: 'Queso cheddar',           cal: 403, prot: 25,  carb: 1.3, fat: 33,  serving: '100g', cat: 'lacteos' },
  { id: 87, name: 'Crema (natilla)',          cal: 195, prot: 2.1, carb: 3.4, fat: 20,  serving: '100g', cat: 'lacteos' },
  { id: 88, name: 'Mantequilla',             cal: 102, prot: 0.1, carb: 0,   fat: 12,  serving: '1 cda (14g)', cat: 'lacteos' },

  // ─── BEBIDAS ──────────────────────────────
  { id: 90, name: 'Café negro',              cal: 2,   prot: 0.3, carb: 0,   fat: 0,   serving: '1 taza', cat: 'bebidas' },
  { id: 91, name: 'Café con leche',          cal: 40,  prot: 2,   carb: 3,   fat: 2,   serving: '1 taza', cat: 'bebidas' },
  { id: 92, name: 'Jugo de naranja natural', cal: 112, prot: 1.7, carb: 26,  fat: 0.5, serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 93, name: 'Refresco / Gaseosa',      cal: 140, prot: 0,   carb: 39,  fat: 0,   serving: '1 lata (355ml)', cat: 'bebidas' },
  { id: 94, name: 'Agua',                    cal: 0,   prot: 0,   carb: 0,   fat: 0,   serving: '1 vaso', cat: 'bebidas' },
  { id: 95, name: 'Batido de proteína',      cal: 120, prot: 25,  carb: 3,   fat: 1,   serving: '1 scoop + agua', cat: 'bebidas' },
  { id: 96, name: 'Agua de pipa (coco)',     cal: 46,  prot: 1.7, carb: 9,   fat: 0.5, serving: '1 vaso (240ml)', cat: 'bebidas' },
  { id: 97, name: 'Cerveza',                 cal: 153, prot: 1.6, carb: 13,  fat: 0,   serving: '1 lata (355ml)', cat: 'bebidas' },
  { id: 98, name: 'Té sin azúcar',           cal: 2,   prot: 0,   carb: 0.5, fat: 0,   serving: '1 taza', cat: 'bebidas' },

  // ─── SNACKS / POSTRES ─────────────────────
  { id: 100, name: 'Galletas María',         cal: 44,  prot: 0.7, carb: 7.5, fat: 1.3, serving: '1 unidad', cat: 'snacks' },
  { id: 101, name: 'Galletas de avena',      cal: 67,  prot: 1,   carb: 10,  fat: 2.5, serving: '1 unidad', cat: 'snacks' },
  { id: 102, name: 'Chocolate (barra)',       cal: 235, prot: 2.2, carb: 27,  fat: 13,  serving: '45g', cat: 'snacks' },
  { id: 103, name: 'Maní / Manía',           cal: 161, prot: 7,   carb: 4.6, fat: 14,  serving: '28g', cat: 'snacks' },
  { id: 104, name: 'Almendras',              cal: 164, prot: 6,   carb: 6,   fat: 14,  serving: '28g', cat: 'snacks' },
  { id: 105, name: 'Chips / Papas fritas',   cal: 152, prot: 2,   carb: 15,  fat: 10,  serving: '28g', cat: 'snacks' },
  { id: 106, name: 'Helado',                 cal: 207, prot: 3.5, carb: 24,  fat: 11,  serving: '100g', cat: 'snacks' },
  { id: 107, name: 'Barra de granola',       cal: 130, prot: 2,   carb: 20,  fat: 5,   serving: '1 barra', cat: 'snacks' },
  { id: 108, name: 'Pan dulce / Semita',     cal: 350, prot: 6,   carb: 52,  fat: 13,  serving: '1 unidad', cat: 'snacks' },

  // ─── GRASAS Y ACEITES ─────────────────────
  { id: 110, name: 'Aceite de oliva',        cal: 119, prot: 0,   carb: 0,   fat: 14,  serving: '1 cda', cat: 'grasas' },
  { id: 111, name: 'Aceite vegetal',         cal: 120, prot: 0,   carb: 0,   fat: 14,  serving: '1 cda', cat: 'grasas' },
  { id: 112, name: 'Mayonesa',               cal: 94,  prot: 0.1, carb: 0.1, fat: 10,  serving: '1 cda', cat: 'grasas' },
  { id: 113, name: 'Salsa de tomate',        cal: 15,  prot: 0.3, carb: 3.5, fat: 0.1, serving: '1 cda', cat: 'grasas' },
  { id: 114, name: 'Azúcar',                 cal: 49,  prot: 0,   carb: 13,  fat: 0,   serving: '1 cda', cat: 'grasas' },
  { id: 115, name: 'Miel',                   cal: 64,  prot: 0.1, carb: 17,  fat: 0,   serving: '1 cda', cat: 'grasas' },

  // ─── COMIDAS PREPARADAS ───────────────────
  { id: 120, name: 'Gallo pinto',            cal: 175, prot: 5,   carb: 30,  fat: 3.5, serving: '1 taza', cat: 'preparadas' },
  { id: 121, name: 'Casado con pollo',       cal: 650, prot: 35,  carb: 75,  fat: 20,  serving: '1 plato', cat: 'preparadas' },
  { id: 122, name: 'Casado con carne',       cal: 720, prot: 32,  carb: 75,  fat: 28,  serving: '1 plato', cat: 'preparadas' },
  { id: 123, name: 'Sopa negra',             cal: 180, prot: 10,  carb: 30,  fat: 2,   serving: '1 tazón', cat: 'preparadas' },
  { id: 124, name: 'Olla de carne',          cal: 250, prot: 18,  carb: 25,  fat: 8,   serving: '1 tazón', cat: 'preparadas' },
  { id: 125, name: 'Arroz con pollo',        cal: 350, prot: 20,  carb: 40,  fat: 12,  serving: '1 plato', cat: 'preparadas' },
  { id: 126, name: 'Hamburguesa',            cal: 540, prot: 25,  carb: 40,  fat: 30,  serving: '1 unidad', cat: 'preparadas' },
  { id: 127, name: 'Pizza (1 rebanada)',     cal: 285, prot: 12,  carb: 36,  fat: 10,  serving: '1 rebanada', cat: 'preparadas' },
  { id: 128, name: 'Tacos (3)',              cal: 456, prot: 21,  carb: 42,  fat: 22,  serving: '3 unidades', cat: 'preparadas' },
  { id: 129, name: 'Burrito',                cal: 450, prot: 20,  carb: 50,  fat: 18,  serving: '1 unidad', cat: 'preparadas' },
  { id: 130, name: 'Empanada',               cal: 250, prot: 8,   carb: 28,  fat: 12,  serving: '1 unidad', cat: 'preparadas' },
  { id: 131, name: 'Pupusa',                 cal: 200, prot: 7,   carb: 25,  fat: 8,   serving: '1 unidad', cat: 'preparadas' },
  { id: 132, name: 'Sandwich de jamón',      cal: 350, prot: 18,  carb: 34,  fat: 15,  serving: '1 unidad', cat: 'preparadas' },
  { id: 133, name: 'Ensalada César',         cal: 180, prot: 8,   carb: 10,  fat: 12,  serving: '1 plato', cat: 'preparadas' },
  { id: 134, name: 'Sopa de pollo',          cal: 150, prot: 12,  carb: 15,  fat: 4,   serving: '1 tazón', cat: 'preparadas' },
  { id: 135, name: 'Chifrijo',               cal: 550, prot: 22,  carb: 55,  fat: 26,  serving: '1 plato', cat: 'preparadas' },
  // ─── COMIDAS HONDUREÑAS ───────────────────
  { id: 200, name: 'Baleada sencilla',        cal: 380, prot: 14,  carb: 52,  fat: 14,  serving: '1 unidad', cat: 'honduras' },
  { id: 201, name: 'Baleada especial',        cal: 520, prot: 22,  carb: 54,  fat: 24,  serving: '1 unidad', cat: 'honduras' },
  { id: 202, name: 'Sopa de res',             cal: 290, prot: 22,  carb: 28,  fat: 8,   serving: '1 tazón',  cat: 'honduras' },
  { id: 203, name: 'Sopa de pollo',           cal: 220, prot: 18,  carb: 22,  fat: 5,   serving: '1 tazón',  cat: 'honduras' },
  { id: 204, name: 'Sopa de mondongo',        cal: 260, prot: 20,  carb: 24,  fat: 7,   serving: '1 tazón',  cat: 'honduras' },
  { id: 205, name: 'Pastelitos de carne',     cal: 220, prot: 8,   carb: 24,  fat: 11,  serving: '2 unidades', cat: 'honduras' },
  { id: 206, name: 'Catrachas',               cal: 180, prot: 9,   carb: 20,  fat: 7,   serving: '2 unidades', cat: 'honduras' },
  { id: 207, name: 'Enchiladas hondureñas',   cal: 310, prot: 14,  carb: 30,  fat: 15,  serving: '2 unidades', cat: 'honduras' },
  { id: 208, name: 'Nacatamal',               cal: 480, prot: 16,  carb: 60,  fat: 20,  serving: '1 unidad', cat: 'honduras' },
  { id: 209, name: 'Tamales de elote',        cal: 280, prot: 6,   carb: 48,  fat: 8,   serving: '1 unidad', cat: 'honduras' },
  { id: 210, name: 'Ensalada de papa',        cal: 240, prot: 4,   carb: 32,  fat: 11,  serving: '1 taza',   cat: 'honduras' },
  { id: 211, name: 'Elote loco',              cal: 350, prot: 8,   carb: 48,  fat: 15,  serving: '1 unidad', cat: 'honduras' },
  { id: 212, name: 'Plato típico (pollo)',    cal: 720, prot: 38,  carb: 80,  fat: 22,  serving: '1 plato',  cat: 'honduras' },
  { id: 213, name: 'Plato típico (carne)',    cal: 780, prot: 36,  carb: 80,  fat: 28,  serving: '1 plato',  cat: 'honduras' },
  { id: 214, name: 'Machuca',                 cal: 320, prot: 10,  carb: 50,  fat: 9,   serving: '1 tazón',  cat: 'honduras' },
  { id: 215, name: 'Tapado olanchano',        cal: 410, prot: 24,  carb: 42,  fat: 14,  serving: '1 tazón',  cat: 'honduras' },

  // ─── DULCES Y SNACKS HONDUREÑOS ──────────
  { id: 220, name: 'Bombones',               cal: 35,  prot: 0,   carb: 9,   fat: 0,   serving: '1 unidad', cat: 'hondurasSnacks' },
  { id: 221, name: 'Chicles / Goma de mascar',cal: 10, prot: 0,   carb: 2.5, fat: 0,   serving: '1 unidad', cat: 'hondurasSnacks' },
  { id: 222, name: 'Confites / Dulcitos',    cal: 25,  prot: 0,   carb: 6.5, fat: 0.5, serving: '10 unidades', cat: 'hondurasSnacks' },
  { id: 223, name: 'Semitas',                cal: 420, prot: 7,   carb: 62,  fat: 16,  serving: '1 unidad', cat: 'hondurasSnacks' },
  { id: 224, name: 'Rosquillas',             cal: 140, prot: 3,   carb: 22,  fat: 5,   serving: '3 unidades', cat: 'hondurasSnacks' },
  { id: 225, name: 'Torrejas',               cal: 280, prot: 7,   carb: 38,  fat: 12,  serving: '2 unidades', cat: 'hondurasSnacks' },
  { id: 226, name: 'Poleadas',               cal: 190, prot: 4,   carb: 32,  fat: 5,   serving: '1 taza',   cat: 'hondurasSnacks' },
  { id: 227, name: 'Ayote en miel',          cal: 160, prot: 1,   carb: 40,  fat: 0.5, serving: '1 taza',   cat: 'hondurasSnacks' },
  { id: 228, name: 'Rigua',                  cal: 180, prot: 3,   carb: 30,  fat: 6,   serving: '1 unidad', cat: 'hondurasSnacks' },

  // ─── CENTROAMÉRICA / MEXICO ───────────────
  { id: 230, name: 'Pupusa de queso',        cal: 215, prot: 8,   carb: 26,  fat: 9,   serving: '1 unidad', cat: 'preparadas' },
  { id: 231, name: 'Tacos de carne (3)',      cal: 456, prot: 21,  carb: 42,  fat: 22,  serving: '3 unidades', cat: 'preparadas' },
  { id: 232, name: 'Quesadilla',             cal: 480, prot: 18,  carb: 45,  fat: 26,  serving: '1 unidad', cat: 'preparadas' },
  { id: 233, name: 'Marquesitas',            cal: 320, prot: 5,   carb: 42,  fat: 15,  serving: '1 unidad', cat: 'preparadas' },
];

const FOOD_CATEGORIES = [
  { id: 'proteinas',      name: 'Proteínas',          icon: 'beef' },
  { id: 'carbohidratos',  name: 'Carbohidratos',       icon: 'wheat' },
  { id: 'frutas',         name: 'Frutas',              icon: 'apple' },
  { id: 'verduras',       name: 'Verduras',            icon: 'leaf' },
  { id: 'lacteos',        name: 'Lácteos',             icon: 'milk' },
  { id: 'bebidas',        name: 'Bebidas',             icon: 'coffee' },
  { id: 'snacks',         name: 'Snacks / Postres',    icon: 'cookie' },
  { id: 'grasas',         name: 'Grasas / Condimentos',icon: 'droplets' },
  { id: 'preparadas',     name: 'Comidas preparadas',  icon: 'utensils' },
  { id: 'honduras',       name: 'Platos hondureños',   icon: 'map-pin' },
  { id: 'hondurasSnacks', name: 'Dulces hondureños',   icon: 'candy' },
];

const MEAL_TYPES = [
  { id: 'desayuno',     name: 'Desayuno',    icon: 'sunrise',  hora: '06:00-09:00' },
  { id: 'merienda_am',  name: 'Merienda AM', icon: 'cup-soda', hora: '09:00-11:00' },
  { id: 'almuerzo',     name: 'Almuerzo',    icon: 'utensils', hora: '11:00-14:00' },
  { id: 'merienda_pm',  name: 'Merienda PM', icon: 'apple',    hora: '14:00-17:00' },
  { id: 'cena',         name: 'Cena',        icon: 'moon',     hora: '17:00-21:00' },
];

const Comidas = {
  fecha: null,

  init() {
    this._initDarkMode();
    this.fecha = Storage.today();
    this.cart = []; // multi-select cart
    this._render();
  },

  _initDarkMode() {
    const isLight = Storage.getDarkMode() === 'light';
    if (isLight) { document.body.classList.add('light'); document.body.classList.remove('dark'); }
    else { document.body.classList.remove('light'); document.body.classList.add('dark'); }
    const toggle = document.getElementById('dark-toggle');
    if (toggle) {
      const fresh = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(fresh, toggle);
      fresh.addEventListener('click', () => {
        const nowLight = document.body.classList.toggle('light');
        document.body.classList.toggle('dark', !nowLight);
        Storage.setDarkMode(nowLight ? 'light' : 'dark');
      });
    }
  },

  _render() {
    const container = document.getElementById('comidas-container');
    if (!container) return;

    const registro = Storage.obtenerComidas(this.fecha);
    const config   = Storage.obtenerConfig();
    const metaCal  = config.metaCal || 2200;
    // Macro targets based on calorie goal
    const metaProt = Math.round(metaCal * 0.30 / 4);  // 30% prot
    const metaCarb = Math.round(metaCal * 0.45 / 4);  // 45% carbs
    const metaFat  = Math.round(metaCal * 0.25 / 9);  // 25% fat

    const totals = this._calcTotals(registro);
    const isToday = this.fecha === Storage.today();
    const fechaLabel = isToday ? 'Hoy' : this._formatFecha(this.fecha);

    container.innerHTML = `
      <!-- Navegador de fecha -->
      <div class="date-nav fade-in">
        <button id="btn-prev-day" class="date-nav-btn" title="Día anterior">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="date-nav-center" id="date-nav-center-click">
          <span class="date-nav-label">${fechaLabel}</span>
          <span class="date-nav-sublabel">
            ${isToday ? 'Toca para cambiar de día' : this.fecha}
            <span class="date-nav-edit">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </span>
          </span>
          <input type="date" id="date-picker" value="${this.fecha}" max="${Storage.today()}" class="date-picker-hidden">
        </div>
        <button id="btn-next-day" class="date-nav-btn" ${isToday ? 'disabled' : ''} title="Día siguiente">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <!-- Resumen calórico -->
      <div class="cal-summary fade-in">
        <div class="cal-circle-wrap">
          <div class="cal-circle" id="cal-circle">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" stroke-width="8"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="${totals.cal > metaCal ? 'var(--danger)' : 'var(--brand)'}" stroke-width="8" stroke-dasharray="${Math.min(314, (totals.cal / metaCal) * 314)} 314" stroke-linecap="round" transform="rotate(-90 60 60)"/>
            </svg>
            <div class="cal-circle-text">
              <span class="cal-num">${totals.cal}</span>
              <span class="cal-label">/ ${metaCal} kcal</span>
            </div>
          </div>
        </div>
        <!-- Macros consumido vs meta -->
        <div class="macros-row">
          <div class="macro-item">
            <div class="macro-bar prot"><div style="width:${Math.min(100,(totals.prot/metaProt)*100)}%"></div></div>
            <span class="macro-val">${totals.prot}g</span>
            <span class="macro-meta">/ ${metaProt}g</span>
            <span class="macro-lbl">Proteína</span>
          </div>
          <div class="macro-item">
            <div class="macro-bar carb"><div style="width:${Math.min(100,(totals.carb/metaCarb)*100)}%"></div></div>
            <span class="macro-val">${totals.carb}g</span>
            <span class="macro-meta">/ ${metaCarb}g</span>
            <span class="macro-lbl">Carbos</span>
          </div>
          <div class="macro-item">
            <div class="macro-bar fatt"><div style="width:${Math.min(100,(totals.fat/metaFat)*100)}%"></div></div>
            <span class="macro-val">${totals.fat}g</span>
            <span class="macro-meta">/ ${metaFat}g</span>
            <span class="macro-lbl">Grasas</span>
          </div>
        </div>
        <div class="cal-remaining ${totals.cal > metaCal ? 'over' : ''}">
          ${totals.cal > metaCal
            ? `Excedido por <strong>${totals.cal - metaCal} kcal</strong>`
            : `Restantes: <strong>${metaCal - totals.cal} kcal</strong>`}
        </div>
      </div>

      <!-- Botones acción -->
      <div style="display:flex;gap:8px;margin-bottom:20px;">
        <button id="btn-add-food" class="btn btn-primary" style="flex:1;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Agregar
        </button>
        <button id="btn-historial-comidas" class="btn btn-secondary" style="flex:1;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Historial
        </button>
      </div>

      <!-- Lista de comidas -->
      <div id="meals-list"></div>
    `;

    this._renderMealsList(registro);
    if (typeof Icons !== 'undefined') Icons.init();

    // Date navigation
    document.getElementById('btn-prev-day').addEventListener('click', () => this._changeDay(-1));
    document.getElementById('btn-next-day')?.addEventListener('click', () => this._changeDay(1));
    // The date input is layered over center — changes fire on select
    document.getElementById('date-picker').addEventListener('change', (e) => {
      if (e.target.value) { this.fecha = e.target.value; this._render(); }
    });

    document.getElementById('btn-add-food').addEventListener('click', () => this._showFoodSearch());
    document.getElementById('btn-historial-comidas').addEventListener('click', () => this._showHistorialComidas());
  },

  _formatFecha(f) {
    const d = new Date(f + 'T12:00:00');
    return DIAS_SEMANA[d.getDay()] + ' ' + d.getDate() + ' ' + MESES[d.getMonth()];
  },

  _changeDay(delta) {
    const d = new Date(this.fecha + 'T12:00:00');
    d.setDate(d.getDate() + delta);
    const newDate = d.toISOString().split('T')[0];
    if (newDate <= Storage.today()) { this.fecha = newDate; this._render(); }
  },

  _showHistorialComidas() {
    const overlay = document.getElementById('food-overlay');
    if (!overlay) return;
    overlay.classList.add('active');
    const closeBtn = document.getElementById('food-overlay-close');
    closeBtn.onclick = () => overlay.classList.remove('active');

    const resultsDiv = document.getElementById('food-search-results');
    const catBtns   = document.getElementById('food-cat-btns');
    const searchInput = document.getElementById('food-search-input');
    searchInput.style.display = 'none';
    catBtns.innerHTML = '';

    // Build 14-day history
    let html = '<div style="padding:4px 0;"><h3 style="font-size:1rem;font-weight:800;margin-bottom:12px;">Historial de comidas</h3>';
    for (let i = 0; i < 14; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const f = d.toISOString().split('T')[0];
      const reg = Storage.obtenerComidas(f);
      const items = reg.comidas || [];
      if (items.length === 0 && i > 0) continue;
      const cal = Math.round(items.reduce((s,c) => s + c.cal * c.cantidad, 0));
      const label = i === 0 ? 'Hoy' : DIAS_SEMANA[d.getDay()] + ' ' + d.getDate() + ' ' + MESES[d.getMonth()];
      html += `
        <div style="background:var(--bg-card);border-radius:12px;padding:12px 14px;margin-bottom:8px;cursor:pointer;border:1px solid var(--border);" onclick="Comidas.fecha='${f}';Comidas._render();document.getElementById('food-overlay').classList.remove('active');">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-weight:700;font-size:0.9rem;">${label}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">${items.length} alimentos registrados</div>
            </div>
            <div style="font-weight:800;font-size:1rem;color:var(--brand);">${cal} kcal</div>
          </div>
        </div>`;
    }
    html += '</div>';
    resultsDiv.innerHTML = html;
    searchInput.style.display = '';
  },


  _calcTotals(registro) {
    const items = registro.comidas || [];
    return {
      cal: Math.round(items.reduce((s, i) => s + (i.cal * i.cantidad), 0)),
      prot: Math.round(items.reduce((s, i) => s + (i.prot * i.cantidad), 0) * 10) / 10,
      carb: Math.round(items.reduce((s, i) => s + (i.carb * i.cantidad), 0) * 10) / 10,
      fat: Math.round(items.reduce((s, i) => s + (i.fat * i.cantidad), 0) * 10) / 10,
    };
  },

  _renderMealsList(registro) {
    const container = document.getElementById('meals-list');
    if (!container) return;

    const items = registro.comidas || [];

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state fade-in">
          <p>No has registrado comidas hoy.<br>Toca "+ Ingresar comida" para empezar.</p>
        </div>
      `;
      return;
    }

    // Group by meal type
    const groups = {};
    MEAL_TYPES.forEach(m => groups[m.id] = []);
    items.forEach(i => {
      if (!groups[i.tipo]) groups[i.tipo] = [];
      groups[i.tipo].push(i);
    });

    let html = '';
    MEAL_TYPES.forEach(meal => {
      const mealItems = groups[meal.id];
      if (mealItems.length === 0) return;

      const mealCal = Math.round(mealItems.reduce((s, i) => s + (i.cal * i.cantidad), 0));

      html += `
        <div class="meal-group fade-in">
          <div class="meal-group-header">
            <span class="meal-group-icon"><i data-lucide="${meal.icon}" style="width:18px;height:18px;vertical-align:middle;"></i></span>
            <span class="meal-group-name">${meal.name}</span>
            <span class="meal-group-cal">${mealCal} kcal</span>
          </div>
          <div class="meal-group-items">
      `;

      mealItems.forEach(item => {
        html += `
          <div class="meal-item">
            <div class="meal-item-info">
              <div class="meal-item-name">${item.nombre}</div>
              <div class="meal-item-detail">${item.cantidad > 1 ? item.cantidad + 'x ' : ''}${item.serving || ''} · ${Math.round(item.cal * item.cantidad)} kcal</div>
            </div>
            <button class="meal-item-del" data-id="${item.id}" title="Eliminar"><i data-lucide="x" style="width:16px;height:16px;pointer-events:none;"></i></button>
          </div>
        `;
      });

      html += `</div></div>`;
    });

    container.innerHTML = html;

    // Delete buttons
    Icons.init();
    container.querySelectorAll('.meal-item-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        this._deleteFood(id);
      });
    });
  },

  _deleteFood(id) {
    const registro = Storage.obtenerComidas(this.fecha);
    registro.comidas = (registro.comidas || []).filter(c => c.id !== id);
    Storage.guardarComidas(this.fecha, registro);
    this._render();
  },

  /* ────── Food Search Overlay — Multi-Select Cart ────── */
  _showFoodSearch() {
    const overlay = document.getElementById('food-overlay');
    if (!overlay) return;
    overlay.classList.add('active');

    this.cart = []; // reset cart each time

    const searchInput = document.getElementById('food-search-input');
    const resultsDiv  = document.getElementById('food-search-results');
    const catBtns     = document.getElementById('food-cat-btns');
    const closeBtn    = document.getElementById('food-overlay-close');

    // Cart bar (floating)
    let cartBar = overlay.querySelector('.cart-bar');
    if (!cartBar) {
      cartBar = document.createElement('div');
      cartBar.className = 'cart-bar';
      cartBar.innerHTML = `
        <div class="cart-bar-info">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19a2 2 0 001.99-1.79l1.01-7.2H6"/></svg>
          <span id="cart-count">0 seleccionados</span>
          <span id="cart-kcal" style="color:var(--brand-light);font-weight:800;"></span>
        </div>
        <button id="cart-confirm" class="btn btn-primary" style="padding:8px 18px;font-size:0.85rem;">Agregar</button>
      `;
      overlay.querySelector('.overlay-content').appendChild(cartBar);
    }
    this._updateCartBar();

    // Category buttons
    catBtns.innerHTML = `<button class="cat-btn active" data-cat="all">Todos</button>` +
      FOOD_CATEGORIES.map(c => `<button class="cat-btn" data-cat="${c.id}"><i data-lucide="${c.icon}" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i>${c.name}</button>`).join('') +
      `<button class="cat-btn" data-cat="custom"><i data-lucide="pencil" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i>Personalizado</button>`;

    let currentCat = 'all';

    const renderResults = (filter = '', cat = 'all') => {
      if (cat === 'custom') {
        resultsDiv.innerHTML = this._renderCustomForm();
        this._bindCustomForm(overlay);
        cartBar.style.display = 'none';
        return;
      }
      cartBar.style.display = '';

      let foods = FOOD_DB;
      if (cat !== 'all') foods = foods.filter(f => f.cat === cat);
      if (filter.trim()) {
        const q = filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        foods = foods.filter(f => f.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q));
      }

      if (foods.length === 0) {
        resultsDiv.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">No se encontraron alimentos. Usa "Personalizado" para agregar uno nuevo.</p>';
        return;
      }

      resultsDiv.innerHTML = foods.map(f => {
        const inCart = this.cart.some(c => c.id === f.id);
        return `
          <div class="food-result${inCart ? ' in-cart' : ''}" data-food-id="${f.id}">
            <label class="food-result-check">
              <input type="checkbox" class="food-cb" data-food-id="${f.id}" ${inCart ? 'checked' : ''}>
              <span class="food-cb-box"></span>
            </label>
            <div class="food-result-info">
              <div class="food-result-name">${f.name}</div>
              <div class="food-result-detail">${f.serving} · ${f.cal} kcal · P:${f.prot}g C:${f.carb}g G:${f.fat}g</div>
            </div>
          </div>`;
      }).join('');

      // Wire checkboxes
      resultsDiv.querySelectorAll('.food-cb').forEach(cb => {
        cb.addEventListener('change', () => {
          const id = parseInt(cb.dataset.foodId);
          const food = FOOD_DB.find(f => f.id === id);
          if (!food) return;
          if (cb.checked) {
            if (!this.cart.some(c => c.id === id)) this.cart.push({ ...food, qty: 1 });
            cb.closest('.food-result').classList.add('in-cart');
          } else {
            this.cart = this.cart.filter(c => c.id !== id);
            cb.closest('.food-result').classList.remove('in-cart');
          }
          this._updateCartBar();
        });
      });

      Icons.init(resultsDiv);
    };

    renderResults();

    searchInput.value = '';
    searchInput.focus();
    searchInput.addEventListener('input', () => renderResults(searchInput.value, currentCat));

    catBtns.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCat = btn.dataset.cat;
        renderResults(searchInput.value, currentCat);
      });
    });

    Icons.init(catBtns);

    document.getElementById('cart-confirm')?.addEventListener('click', () => {
      if (this.cart.length === 0) { this._toast('Selecciona al menos un alimento', 'warning'); return; }
      this._showCartConfirm(overlay);
    });

    closeBtn.onclick = () => { overlay.classList.remove('active'); this.cart = []; };
  },

  _updateCartBar() {
    const count = this.cart.length;
    const kcal  = this.cart.reduce((t, f) => t + (f.cal * (f.qty || 1)), 0);
    const el    = document.getElementById('cart-count');
    const ek    = document.getElementById('cart-kcal');
    const btn   = document.getElementById('cart-confirm');
    if (el) el.textContent = count === 0 ? 'Ninguno seleccionado' : `${count} seleccionado${count > 1 ? 's' : ''}`;
    if (ek) ek.textContent = count > 0 ? `· ${Math.round(kcal)} kcal` : '';
    if (btn) btn.disabled = count === 0;
  },

  /* Cart confirm: set qty + meal type for each selected item */
  _showCartConfirm(overlay) {
    const modal = document.getElementById('food-add-modal');
    if (!modal) return;
    modal.classList.add('active');

    const now = new Date();
    const h   = now.getHours();
    let autoType = 'cena';
    if (h < 9) autoType = 'desayuno';
    else if (h < 11) autoType = 'merienda_am';
    else if (h < 14) autoType = 'almuerzo';
    else if (h < 17) autoType = 'merienda_pm';

    modal.innerHTML = `
      <div class="overlay-content" style="max-width:420px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <h2 style="font-size:1.05rem;font-weight:800;">Confirmar selección</h2>
          <button id="cart-modal-close" style="background:none;border:none;color:var(--text-muted);font-size:1.4rem;cursor:pointer;">✕</button>
        </div>

        <!-- Global meal type -->
        <div style="margin-bottom:14px;">
          <label style="font-size:0.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">Asignar a comida</label>
          <select id="cart-global-tipo" style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:10px;background:var(--bg-input);color:var(--text-primary);font-size:0.9rem;">
            ${MEAL_TYPES.map(m => `<option value="${m.id}" ${m.id === autoType ? 'selected' : ''}>${m.name}</option>`).join('')}
          </select>
        </div>

        <!-- Items list -->
        <div id="cart-items-list" style="display:flex;flex-direction:column;gap:8px;max-height:300px;overflow-y:auto;margin-bottom:14px;">
          ${this.cart.map((f, i) => `
            <div style="display:flex;align-items:center;gap:10px;background:var(--bg-input);border-radius:10px;padding:10px 12px;">
              <div style="flex:1;min-width:0;">
                <div style="font-weight:700;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${f.name}</div>
                <div style="font-size:0.72rem;color:var(--text-muted);">${f.serving} · ${f.cal} kcal</div>
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                <button class="cart-qty-btn minus" data-idx="${i}" style="width:28px;height:28px;border-radius:8px;border:1.5px solid var(--border);background:var(--bg-card);color:var(--text-primary);font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">−</button>
                <input type="number" class="cart-qty-input" data-idx="${i}" value="${f.qty || 1}" min="0.5" step="0.5"
                  style="width:44px;text-align:center;padding:4px;border:1.5px solid var(--border);border-radius:8px;background:var(--bg-input);color:var(--text-primary);font-size:0.9rem;">
                <button class="cart-qty-btn plus" data-idx="${i}" style="width:28px;height:28px;border-radius:8px;border:1.5px solid var(--border);background:var(--bg-card);color:var(--text-primary);font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">+</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div id="cart-total-preview" style="text-align:center;font-size:0.85rem;color:var(--text-muted);margin-bottom:14px;"></div>

        <div style="display:flex;gap:10px;">
          <button id="cart-modal-cancel" class="btn btn-secondary" style="flex:1;">Cancelar</button>
          <button id="cart-modal-confirm" class="btn btn-primary" style="flex:2;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>
            Agregar ${this.cart.length} alimento${this.cart.length > 1 ? 's' : ''}
          </button>
        </div>
      </div>
    `;

    const updateTotal = () => {
      const total = this.cart.reduce((t, f) => t + (f.cal * (f.qty || 1)), 0);
      const el = document.getElementById('cart-total-preview');
      if (el) el.textContent = `Total: ${Math.round(total)} kcal`;
    };
    updateTotal();

    // Qty buttons
    modal.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const input = modal.querySelector(`.cart-qty-input[data-idx="${idx}"]`);
        let val = parseFloat(input.value) || 1;
        if (btn.classList.contains('plus'))  val = Math.min(10, val + 0.5);
        if (btn.classList.contains('minus')) val = Math.max(0.5, val - 0.5);
        input.value = val; this.cart[idx].qty = val;
        updateTotal(); this._updateCartBar();
      });
    });
    modal.querySelectorAll('.cart-qty-input').forEach(inp => {
      inp.addEventListener('change', () => {
        const idx = parseInt(inp.dataset.idx);
        this.cart[idx].qty = parseFloat(inp.value) || 1;
        updateTotal(); this._updateCartBar();
      });
    });

    document.getElementById('cart-modal-close').onclick  = () => modal.classList.remove('active');
    document.getElementById('cart-modal-cancel').onclick = () => modal.classList.remove('active');
    document.getElementById('cart-modal-confirm').onclick = () => {
      const tipo = document.getElementById('cart-global-tipo').value;
      const registro = Storage.obtenerComidas(this.fecha);
      if (!registro.comidas) registro.comidas = [];
      this.cart.forEach(f => {
        registro.comidas.push({ id: Date.now() + Math.random(), nombre: f.name, cal: f.cal, prot: f.prot, carb: f.carb, fat: f.fat, serving: f.serving, cantidad: f.qty || 1, tipo });
      });
      Storage.guardarComidas(this.fecha, registro);
      modal.classList.remove('active');
      overlay.classList.remove('active');
      this.cart = [];
      this._render();
      this._toast(`✅ ${registro.comidas.length > 1 ? registro.comidas.length + ' alimentos' : 'Alimento'} agregado`);
    };
  },

  _renderCustomForm() {
    return `
      <div class="custom-food-form" style="padding:16px;">
        <div class="config-row"><label>Nombre del alimento</label><input type="text" id="cf-name" placeholder="Ej: Sopa casera"></div>
        <div class="config-row"><label>Calorías (kcal)</label><input type="number" id="cf-cal" placeholder="0"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          <div class="config-row"><label>Proteína (g)</label><input type="number" id="cf-prot" placeholder="0" step="0.1"></div>
          <div class="config-row"><label>Carbos (g)</label><input type="number" id="cf-carb" placeholder="0" step="0.1"></div>
          <div class="config-row"><label>Grasas (g)</label><input type="number" id="cf-fat" placeholder="0" step="0.1"></div>
        </div>
        <div class="config-row"><label>Porción</label><input type="text" id="cf-serving" placeholder="Ej: 1 plato"></div>
        <div class="config-row">
          <label>Tipo de comida</label>
          <select id="cf-tipo">
            ${MEAL_TYPES.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
          </select>
        </div>
        <button id="cf-save" class="btn btn-primary btn-full" style="margin-top:12px;">Agregar</button>
      </div>
    `;
  },

  _bindCustomForm(overlay) {
    const btn = document.getElementById('cf-save');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const name = document.getElementById('cf-name').value.trim();
      const cal = parseFloat(document.getElementById('cf-cal').value) || 0;
      const prot = parseFloat(document.getElementById('cf-prot').value) || 0;
      const carb = parseFloat(document.getElementById('cf-carb').value) || 0;
      const fat = parseFloat(document.getElementById('cf-fat').value) || 0;
      const serving = document.getElementById('cf-serving').value.trim() || '1 porción';
      const tipo = document.getElementById('cf-tipo').value;

      if (!name) return;

      const registro = Storage.obtenerComidas(this.fecha);
      if (!registro.comidas) registro.comidas = [];
      registro.comidas.push({
        id: Date.now(),
        nombre: name, cal, prot, carb, fat, serving, cantidad: 1, tipo
      });
      Storage.guardarComidas(this.fecha, registro);
      overlay.classList.remove('active');
      this._render();
      this._toast(`${name} agregado`);
    });
  },

  _showAddModal(food, overlay) {
    const modal = document.getElementById('food-add-modal');
    if (!modal) return;
    modal.classList.add('active');

    modal.innerHTML = `
      <div class="overlay-content" style="max-width:380px;">
        <h2 style="font-size:1.1rem;margin-bottom:4px;">${food.name}</h2>
        <p style="margin-bottom:16px;">${food.serving} · ${food.cal} kcal</p>
        <div class="config-row">
          <label>Cantidad (porciones)</label>
          <input type="number" id="add-qty" value="1" min="0.5" step="0.5" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg-input);color:var(--text-primary);font-size:1.1rem;text-align:center;">
        </div>
        <div class="config-row">
          <label>Tipo de comida</label>
          <select id="add-tipo" style="width:100%;padding:10px;border:1px solid var(--border);border-radius:var(--radius-sm);background:var(--bg-input);color:var(--text-primary);font-size:0.9rem;">
            ${MEAL_TYPES.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
          </select>
        </div>
        <div id="add-preview" style="text-align:center;color:var(--text-secondary);font-size:0.85rem;margin-bottom:12px;">
          ${food.cal} kcal · P:${food.prot}g C:${food.carb}g G:${food.fat}g
        </div>
        <div style="display:flex;gap:10px;">
          <button id="add-cancel" class="btn btn-secondary" style="flex:1;">Cancelar</button>
          <button id="add-confirm" class="btn btn-primary" style="flex:1;">Agregar</button>
        </div>
      </div>
    `;

    // Auto-select meal type based on current time
    const now = new Date();
    const h = now.getHours();
    let autoType = 'cena';
    if (h < 9) autoType = 'desayuno';
    else if (h < 11) autoType = 'merienda_am';
    else if (h < 14) autoType = 'almuerzo';
    else if (h < 17) autoType = 'merienda_pm';
    document.getElementById('add-tipo').value = autoType;

    const qtyInput = document.getElementById('add-qty');
    qtyInput.addEventListener('input', () => {
      const q = parseFloat(qtyInput.value) || 1;
      document.getElementById('add-preview').textContent =
        `${Math.round(food.cal * q)} kcal · P:${(food.prot * q).toFixed(1)}g C:${(food.carb * q).toFixed(1)}g G:${(food.fat * q).toFixed(1)}g`;
    });

    document.getElementById('add-cancel').onclick = () => modal.classList.remove('active');
    document.getElementById('add-confirm').onclick = () => {
      const qty = parseFloat(qtyInput.value) || 1;
      const tipo = document.getElementById('add-tipo').value;

      const registro = Storage.obtenerComidas(this.fecha);
      if (!registro.comidas) registro.comidas = [];
      registro.comidas.push({
        id: Date.now(),
        nombre: food.name,
        cal: food.cal,
        prot: food.prot,
        carb: food.carb,
        fat: food.fat,
        serving: food.serving,
        cantidad: qty,
        tipo
      });
      Storage.guardarComidas(this.fecha, registro);

      modal.classList.remove('active');
      overlay.classList.remove('active');
      this._render();
      this._toast(`${food.name} agregado (${Math.round(food.cal * qty)} kcal)`);
    };
  },

  _toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast success';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }
};
