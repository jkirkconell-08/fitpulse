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
  { id: 15, name: 'Chuleta de cerdo',        cal: 231, prot: 25,  carb: 0,   fat: 14,  serving: '100g', cat: 'proteinas' },
  { id: 16, name: 'Chuleta ahumada',         cal: 190, prot: 22,  carb: 1,   fat: 10,  serving: '100g', cat: 'proteinas' },

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

  // ─── FRITURAS Y ASADOS (no todo es fitness) ─
  { id: 300, name: 'Costilla de cerdo frita',        cal: 320, prot: 22, carb: 0,  fat: 25, serving: '100g', cat: 'frituras' },
  { id: 301, name: 'Costilla de cerdo asada',        cal: 280, prot: 25, carb: 0,  fat: 19, serving: '100g', cat: 'frituras' },
  { id: 302, name: 'Costilla de res asada',          cal: 300, prot: 24, carb: 0,  fat: 22, serving: '100g', cat: 'frituras' },
  { id: 303, name: 'Costillitas BBQ',                cal: 310, prot: 24, carb: 8,  fat: 20, serving: '100g', cat: 'frituras' },
  { id: 304, name: 'Carne frita (res)',              cal: 290, prot: 27, carb: 0,  fat: 20, serving: '100g', cat: 'frituras' },
  { id: 305, name: 'Carne asada (res)',              cal: 250, prot: 28, carb: 0,  fat: 15, serving: '100g', cat: 'frituras' },
  { id: 306, name: 'Bistec frito',                   cal: 275, prot: 26, carb: 2,  fat: 18, serving: '100g', cat: 'frituras' },
  { id: 307, name: 'Bistec a la plancha',            cal: 220, prot: 30, carb: 0,  fat: 10, serving: '100g', cat: 'frituras' },
  { id: 308, name: 'Pollo frito (con piel)',         cal: 260, prot: 22, carb: 8,  fat: 16, serving: '100g', cat: 'frituras' },
  { id: 309, name: 'Pollo frito apanado',            cal: 290, prot: 20, carb: 14, fat: 17, serving: '100g', cat: 'frituras' },
  { id: 310, name: 'Pollo asado (con piel)',         cal: 215, prot: 24, carb: 0,  fat: 13, serving: '100g', cat: 'frituras' },
  { id: 311, name: 'Alitas de pollo fritas',         cal: 290, prot: 22, carb: 8,  fat: 19, serving: '100g', cat: 'frituras' },
  { id: 312, name: 'Alitas de pollo BBQ',            cal: 240, prot: 21, carb: 10, fat: 12, serving: '100g', cat: 'frituras' },
  { id: 313, name: 'Chuleta de cerdo frita',         cal: 275, prot: 24, carb: 2,  fat: 18, serving: '100g', cat: 'frituras' },
  { id: 314, name: 'Chuleta de cerdo asada',         cal: 220, prot: 26, carb: 0,  fat: 12, serving: '100g', cat: 'frituras' },
  { id: 315, name: 'Chicharrón de cerdo',            cal: 545, prot: 61, carb: 0,  fat: 32, serving: '100g', cat: 'frituras' },
  { id: 316, name: 'Chicharrón con carne',           cal: 400, prot: 30, carb: 2,  fat: 30, serving: '100g', cat: 'frituras' },
  { id: 317, name: 'Pescado frito (entero)',         cal: 240, prot: 22, carb: 8,  fat: 14, serving: '100g', cat: 'frituras' },
  { id: 318, name: 'Pescado a la plancha',           cal: 150, prot: 26, carb: 0,  fat: 5,  serving: '100g', cat: 'frituras' },
  { id: 319, name: 'Camarones fritos apanados',      cal: 260, prot: 18, carb: 20, fat: 12, serving: '100g', cat: 'frituras' },
  { id: 320, name: 'Camarones a la plancha',         cal: 120, prot: 24, carb: 1,  fat: 2,  serving: '100g', cat: 'frituras' },
  { id: 321, name: 'Tostones (plátano verde frito)', cal: 240, prot: 1.5, carb: 32, fat: 12, serving: '100g', cat: 'frituras' },
  { id: 322, name: 'Tajadas de guineo verde fritas', cal: 230, prot: 1.5, carb: 33, fat: 10, serving: '100g', cat: 'frituras' },
  { id: 323, name: 'Yuca frita',                     cal: 300, prot: 2,  carb: 45, fat: 12, serving: '100g', cat: 'frituras' },
  { id: 324, name: 'Papas fritas caseras',           cal: 280, prot: 3.5, carb: 35, fat: 14, serving: '100g', cat: 'frituras' },
  { id: 325, name: 'Malanga frita',                  cal: 290, prot: 2,  carb: 40, fat: 13, serving: '100g', cat: 'frituras' },
  { id: 326, name: 'Chorizo asado',                  cal: 420, prot: 22, carb: 2,  fat: 36, serving: '100g', cat: 'frituras' },
  { id: 327, name: 'Longaniza asada',                cal: 400, prot: 20, carb: 3,  fat: 34, serving: '100g', cat: 'frituras' },
  { id: 328, name: 'Anticuchos (brochetas de corazón)', cal: 180, prot: 25, carb: 2, fat: 8, serving: '100g', cat: 'frituras' },
  { id: 329, name: 'Chuzos mixtos (brocheta)',       cal: 220, prot: 24, carb: 4,  fat: 11, serving: '1 unidad', cat: 'frituras' },
  { id: 330, name: 'Carne apanada frita (milanesa)', cal: 280, prot: 24, carb: 12, fat: 15, serving: '100g', cat: 'frituras' },
  { id: 331, name: 'Milanesa de pollo',              cal: 260, prot: 22, carb: 14, fat: 13, serving: '100g', cat: 'frituras' },
  { id: 332, name: 'Cerdo en salsa BBQ',             cal: 260, prot: 22, carb: 10, fat: 14, serving: '100g', cat: 'frituras' },
  { id: 333, name: 'Res desmechada frita',           cal: 270, prot: 26, carb: 3,  fat: 17, serving: '100g', cat: 'frituras' },
  { id: 334, name: 'Hígado frito',                   cal: 220, prot: 25, carb: 5,  fat: 10, serving: '100g', cat: 'frituras' },
  { id: 335, name: 'Riñones guisados',               cal: 150, prot: 22, carb: 2,  fat: 6,  serving: '100g', cat: 'frituras' },
  { id: 336, name: 'Mollejas de pollo fritas',       cal: 190, prot: 24, carb: 2,  fat: 9,  serving: '100g', cat: 'frituras' },
  { id: 337, name: 'Tripas fritas',                  cal: 300, prot: 20, carb: 1,  fat: 24, serving: '100g', cat: 'frituras' },
  { id: 338, name: 'Carnitas de cerdo',              cal: 280, prot: 25, carb: 0,  fat: 19, serving: '100g', cat: 'frituras' },
  { id: 339, name: 'Cabro/chivo asado',              cal: 240, prot: 27, carb: 0,  fat: 14, serving: '100g', cat: 'frituras' },

  // ─── COMIDA RÁPIDA ────────────────────────
  { id: 350, name: 'Hamburguesa doble con queso',    cal: 720, prot: 38, carb: 42, fat: 42, serving: '1 unidad', cat: 'rapida' },
  { id: 351, name: 'Hamburguesa sencilla',           cal: 400, prot: 20, carb: 32, fat: 20, serving: '1 unidad', cat: 'rapida' },
  { id: 352, name: 'Papas fritas grandes (fast food)', cal: 480, prot: 6, carb: 60, fat: 24, serving: '1 orden', cat: 'rapida' },
  { id: 353, name: 'Papas fritas medianas',          cal: 340, prot: 4,  carb: 43, fat: 17, serving: '1 orden', cat: 'rapida' },
  { id: 354, name: 'Nuggets de pollo (6)',           cal: 280, prot: 14, carb: 18, fat: 17, serving: '6 unidades', cat: 'rapida' },
  { id: 355, name: 'Hot dog sencillo',               cal: 290, prot: 11, carb: 24, fat: 17, serving: '1 unidad', cat: 'rapida' },
  { id: 356, name: 'Hot dog con todo',               cal: 400, prot: 15, carb: 30, fat: 24, serving: '1 unidad', cat: 'rapida' },
  { id: 357, name: 'Pizza pepperoni (1 rebanada)',   cal: 300, prot: 13, carb: 34, fat: 13, serving: '1 rebanada', cat: 'rapida' },
  { id: 358, name: 'Pizza hawaiana (1 rebanada)',    cal: 270, prot: 12, carb: 33, fat: 10, serving: '1 rebanada', cat: 'rapida' },
  { id: 359, name: 'Pizza suprema (1 rebanada)',     cal: 310, prot: 14, carb: 32, fat: 14, serving: '1 rebanada', cat: 'rapida' },
  { id: 360, name: 'Sandwich club',                  cal: 550, prot: 28, carb: 42, fat: 28, serving: '1 unidad', cat: 'rapida' },
  { id: 361, name: 'Sandwich de pollo frito',        cal: 500, prot: 24, carb: 45, fat: 22, serving: '1 unidad', cat: 'rapida' },
  { id: 362, name: 'Wrap de pollo',                  cal: 420, prot: 26, carb: 38, fat: 18, serving: '1 unidad', cat: 'rapida' },
  { id: 363, name: 'Quesadilla de pollo',            cal: 450, prot: 22, carb: 38, fat: 22, serving: '1 unidad', cat: 'rapida' },
  { id: 364, name: 'Burrito de carne (fast food)',   cal: 520, prot: 26, carb: 55, fat: 20, serving: '1 unidad', cat: 'rapida' },
  { id: 365, name: 'Burrito de frijoles',            cal: 420, prot: 16, carb: 60, fat: 12, serving: '1 unidad', cat: 'rapida' },
  { id: 366, name: 'Nachos con queso',               cal: 480, prot: 12, carb: 50, fat: 26, serving: '1 orden', cat: 'rapida' },
  { id: 367, name: 'Nachos supremos',                cal: 650, prot: 22, carb: 55, fat: 38, serving: '1 orden', cat: 'rapida' },
  { id: 368, name: 'Aros de cebolla',                cal: 410, prot: 5,  carb: 45, fat: 22, serving: '1 orden', cat: 'rapida' },
  { id: 369, name: 'Papas con queso y tocino',       cal: 520, prot: 16, carb: 45, fat: 30, serving: '1 orden', cat: 'rapida' },
  { id: 370, name: 'Malteada (batido de fast food)', cal: 380, prot: 8,  carb: 60, fat: 12, serving: '1 mediana', cat: 'rapida' },
  { id: 371, name: 'Pollo broaster (pieza)',         cal: 320, prot: 20, carb: 14, fat: 20, serving: '1 pieza', cat: 'rapida' },
  { id: 372, name: 'Combo de pollo frito (2pz+papas)', cal: 780, prot: 38, carb: 55, fat: 44, serving: '1 combo', cat: 'rapida' },
  { id: 373, name: 'Sub de pollo (30cm)',            cal: 620, prot: 34, carb: 65, fat: 22, serving: '1 unidad', cat: 'rapida' },
  { id: 374, name: 'Sub de atún (30cm)',             cal: 580, prot: 26, carb: 60, fat: 24, serving: '1 unidad', cat: 'rapida' },
  { id: 375, name: 'Gyro / shawarma',                cal: 480, prot: 24, carb: 40, fat: 24, serving: '1 unidad', cat: 'rapida' },
  { id: 376, name: 'Fish and chips',                 cal: 620, prot: 28, carb: 55, fat: 32, serving: '1 orden', cat: 'rapida' },
  { id: 377, name: 'Corn dog',                       cal: 280, prot: 8,  carb: 28, fat: 14, serving: '1 unidad', cat: 'rapida' },
  { id: 378, name: 'Papas rizadas (curly fries)',    cal: 350, prot: 4,  carb: 42, fat: 18, serving: '1 orden', cat: 'rapida' },
  { id: 379, name: 'Bagel con queso crema',          cal: 350, prot: 12, carb: 50, fat: 11, serving: '1 unidad', cat: 'rapida' },
  { id: 380, name: 'Chili con carne',                cal: 320, prot: 22, carb: 26, fat: 14, serving: '1 tazón', cat: 'rapida' },
  { id: 381, name: 'Ensalada César con pollo (fast food)', cal: 420, prot: 32, carb: 14, fat: 26, serving: '1 plato', cat: 'rapida' },
  { id: 382, name: 'Papa al horno con todo',         cal: 380, prot: 10, carb: 50, fat: 16, serving: '1 unidad', cat: 'rapida' },
  { id: 383, name: 'Pretzel gigante',                cal: 340, prot: 9,  carb: 68, fat: 3,  serving: '1 unidad', cat: 'rapida' },
  { id: 384, name: 'Donut glaseada',                 cal: 260, prot: 3,  carb: 34, fat: 13, serving: '1 unidad', cat: 'rapida' },
  { id: 385, name: 'Croqueta de pollo',              cal: 180, prot: 8,  carb: 14, fat: 10, serving: '1 unidad', cat: 'rapida' },

  // ─── DESAYUNOS ────────────────────────────
  { id: 400, name: 'Huevos revueltos (2)',           cal: 180, prot: 13, carb: 2,  fat: 13, serving: '2 unidades', cat: 'desayunos' },
  { id: 401, name: 'Huevos fritos (2)',              cal: 190, prot: 12, carb: 1,  fat: 15, serving: '2 unidades', cat: 'desayunos' },
  { id: 402, name: 'Huevos estrellados con jamón',   cal: 260, prot: 18, carb: 2,  fat: 19, serving: '2 unidades', cat: 'desayunos' },
  { id: 403, name: 'Omelette de queso',              cal: 280, prot: 18, carb: 3,  fat: 21, serving: '1 unidad', cat: 'desayunos' },
  { id: 404, name: 'Omelette de vegetales',          cal: 220, prot: 14, carb: 6,  fat: 15, serving: '1 unidad', cat: 'desayunos' },
  { id: 405, name: 'Desayuno típico (huevo, frijol, plátano, queso)', cal: 550, prot: 20, carb: 55, fat: 28, serving: '1 plato', cat: 'desayunos' },
  { id: 406, name: 'Pancakes con miel (3)',          cal: 420, prot: 8,  carb: 70, fat: 12, serving: '3 unidades', cat: 'desayunos' },
  { id: 407, name: 'Waffle con miel',                cal: 380, prot: 7,  carb: 55, fat: 14, serving: '1 unidad', cat: 'desayunos' },
  { id: 408, name: 'Tostadas francesas (2)',         cal: 350, prot: 10, carb: 45, fat: 14, serving: '2 unidades', cat: 'desayunos' },
  { id: 409, name: 'Chilaquiles verdes',             cal: 420, prot: 14, carb: 40, fat: 22, serving: '1 plato', cat: 'desayunos' },
  { id: 410, name: 'Chilaquiles rojos con pollo',    cal: 480, prot: 24, carb: 42, fat: 24, serving: '1 plato', cat: 'desayunos' },
  { id: 411, name: 'Burrito de desayuno',            cal: 460, prot: 20, carb: 40, fat: 24, serving: '1 unidad', cat: 'desayunos' },
  { id: 412, name: 'Sandwich de huevo',              cal: 300, prot: 14, carb: 30, fat: 13, serving: '1 unidad', cat: 'desayunos' },
  { id: 413, name: 'Avena con leche y fruta',        cal: 280, prot: 9,  carb: 48, fat: 6,  serving: '1 tazón', cat: 'desayunos' },
  { id: 414, name: 'Cereal con leche',               cal: 220, prot: 7,  carb: 40, fat: 4,  serving: '1 tazón', cat: 'desayunos' },
  { id: 415, name: 'Yogurt con granola y fruta',     cal: 300, prot: 11, carb: 45, fat: 8,  serving: '1 tazón', cat: 'desayunos' },
  { id: 416, name: 'Smoothie de frutas',             cal: 220, prot: 4,  carb: 48, fat: 2,  serving: '1 vaso (350ml)', cat: 'desayunos' },
  { id: 417, name: 'Batido de banano con leche',     cal: 260, prot: 8,  carb: 42, fat: 6,  serving: '1 vaso', cat: 'desayunos' },
  { id: 418, name: 'Tamal de elote con crema',       cal: 310, prot: 6,  carb: 46, fat: 11, serving: '1 unidad', cat: 'desayunos' },
  { id: 419, name: 'Enfrijoladas',                   cal: 400, prot: 14, carb: 40, fat: 20, serving: '1 plato', cat: 'desayunos' },
  { id: 420, name: 'Molletes',                       cal: 320, prot: 13, carb: 34, fat: 14, serving: '1 unidad', cat: 'desayunos' },
  { id: 421, name: 'Machaca con huevo',              cal: 380, prot: 26, carb: 8,  fat: 26, serving: '1 plato', cat: 'desayunos' },
  { id: 422, name: 'Bagel con huevo y queso',        cal: 400, prot: 18, carb: 42, fat: 17, serving: '1 unidad', cat: 'desayunos' },
  { id: 423, name: 'Concha (pan dulce mexicano)',    cal: 300, prot: 5,  carb: 48, fat: 10, serving: '1 unidad', cat: 'desayunos' },

  // ─── PANADERÍA Y REPOSTERÍA ───────────────
  { id: 450, name: 'Croissant',                      cal: 270, prot: 5,  carb: 30, fat: 14, serving: '1 unidad', cat: 'panaderia' },
  { id: 451, name: 'Croissant de chocolate',         cal: 340, prot: 6,  carb: 38, fat: 18, serving: '1 unidad', cat: 'panaderia' },
  { id: 452, name: 'Dona rellena',                   cal: 300, prot: 4,  carb: 38, fat: 15, serving: '1 unidad', cat: 'panaderia' },
  { id: 453, name: 'Pan francés',                    cal: 130, prot: 4,  carb: 26, fat: 1,  serving: '1 unidad', cat: 'panaderia' },
  { id: 454, name: 'Pan de molde blanco (2 reb.)',   cal: 160, prot: 5,  carb: 30, fat: 2,  serving: '2 rebanadas', cat: 'panaderia' },
  { id: 455, name: 'Pan de molde integral (2 reb.)', cal: 140, prot: 6,  carb: 24, fat: 2,  serving: '2 rebanadas', cat: 'panaderia' },
  { id: 456, name: 'Muffin de arándanos',            cal: 340, prot: 5,  carb: 52, fat: 13, serving: '1 unidad', cat: 'panaderia' },
  { id: 457, name: 'Muffin de chocolate',            cal: 380, prot: 6,  carb: 50, fat: 18, serving: '1 unidad', cat: 'panaderia' },
  { id: 458, name: 'Cupcake decorado',               cal: 300, prot: 3,  carb: 42, fat: 14, serving: '1 unidad', cat: 'panaderia' },
  { id: 459, name: 'Pastel de chocolate (rebanada)', cal: 380, prot: 5,  carb: 50, fat: 18, serving: '1 rebanada', cat: 'panaderia' },
  { id: 460, name: 'Pastel de vainilla (rebanada)',  cal: 340, prot: 4,  carb: 48, fat: 15, serving: '1 rebanada', cat: 'panaderia' },
  { id: 461, name: 'Cheesecake (rebanada)',          cal: 420, prot: 7,  carb: 34, fat: 28, serving: '1 rebanada', cat: 'panaderia' },
  { id: 462, name: 'Tres leches (rebanada)',         cal: 380, prot: 6,  carb: 48, fat: 17, serving: '1 rebanada', cat: 'panaderia' },
  { id: 463, name: 'Flan de caramelo',               cal: 260, prot: 6,  carb: 38, fat: 9,  serving: '1 porción', cat: 'panaderia' },
  { id: 464, name: 'Brownie',                        cal: 300, prot: 4,  carb: 38, fat: 15, serving: '1 unidad', cat: 'panaderia' },
  { id: 465, name: 'Galleta de chocolate (chip)',    cal: 160, prot: 2,  carb: 22, fat: 8,  serving: '1 unidad', cat: 'panaderia' },
  { id: 466, name: 'Galleta rellena (2)',            cal: 150, prot: 2,  carb: 20, fat: 7,  serving: '2 unidades', cat: 'panaderia' },
  { id: 467, name: 'Palito de pan (breadstick)',     cal: 90,  prot: 2,  carb: 15, fat: 2,  serving: '1 unidad', cat: 'panaderia' },
  { id: 468, name: 'Baguette (10cm)',                cal: 180, prot: 6,  carb: 36, fat: 1,  serving: '1 pedazo', cat: 'panaderia' },
  { id: 469, name: 'Empanada dulce',                 cal: 260, prot: 4,  carb: 34, fat: 12, serving: '1 unidad', cat: 'panaderia' },
  { id: 470, name: 'Empanada de queso',              cal: 240, prot: 8,  carb: 26, fat: 11, serving: '1 unidad', cat: 'panaderia' },
  { id: 471, name: 'Pan de plátano (banana bread)',  cal: 260, prot: 4,  carb: 40, fat: 10, serving: '1 rebanada', cat: 'panaderia' },
  { id: 472, name: 'Pie de manzana (rebanada)',      cal: 300, prot: 3,  carb: 44, fat: 13, serving: '1 rebanada', cat: 'panaderia' },
  { id: 473, name: 'Strudel de manzana',             cal: 280, prot: 4,  carb: 38, fat: 13, serving: '1 porción', cat: 'panaderia' },
  { id: 474, name: 'Churro',                         cal: 120, prot: 2,  carb: 14, fat: 7,  serving: '1 unidad', cat: 'panaderia' },
  { id: 475, name: 'Churro relleno de chocolate',    cal: 180, prot: 3,  carb: 22, fat: 9,  serving: '1 unidad', cat: 'panaderia' },
  { id: 476, name: 'Croqueta dulce de coco',         cal: 150, prot: 2,  carb: 20, fat: 7,  serving: '1 unidad', cat: 'panaderia' },
  { id: 477, name: 'Panqué',                         cal: 220, prot: 3,  carb: 30, fat: 10, serving: '1 rebanada', cat: 'panaderia' },
  { id: 478, name: 'Pan de yema',                    cal: 240, prot: 6,  carb: 38, fat: 7,  serving: '1 unidad', cat: 'panaderia' },
  { id: 479, name: 'Bollo relleno de queso',         cal: 320, prot: 8,  carb: 40, fat: 14, serving: '1 unidad', cat: 'panaderia' },

  // ─── MARISCOS ─────────────────────────────
  { id: 500, name: 'Langosta cocida',                cal: 90,  prot: 19, carb: 1,  fat: 1,  serving: '100g', cat: 'mariscos' },
  { id: 501, name: 'Cangrejo cocido',                cal: 97,  prot: 20, carb: 0,  fat: 1.5, serving: '100g', cat: 'mariscos' },
  { id: 502, name: 'Pulpo cocido',                   cal: 164, prot: 30, carb: 4,  fat: 2,  serving: '100g', cat: 'mariscos' },
  { id: 503, name: 'Calamar frito (aros)',           cal: 220, prot: 16, carb: 12, fat: 12, serving: '100g', cat: 'mariscos' },
  { id: 504, name: 'Calamar a la plancha',           cal: 130, prot: 22, carb: 3,  fat: 2,  serving: '100g', cat: 'mariscos' },
  { id: 505, name: 'Ceviche de pescado',             cal: 200, prot: 24, carb: 12, fat: 4,  serving: '1 plato', cat: 'mariscos' },
  { id: 506, name: 'Ceviche de camarón',             cal: 210, prot: 26, carb: 12, fat: 3,  serving: '1 plato', cat: 'mariscos' },
  { id: 507, name: 'Ceviche mixto',                  cal: 230, prot: 26, carb: 14, fat: 5,  serving: '1 plato', cat: 'mariscos' },
  { id: 508, name: 'Coctel de camarón',              cal: 220, prot: 20, carb: 22, fat: 5,  serving: '1 vaso', cat: 'mariscos' },
  { id: 509, name: 'Sopa de mariscos',               cal: 280, prot: 24, carb: 20, fat: 10, serving: '1 tazón', cat: 'mariscos' },
  { id: 510, name: 'Paella de mariscos',             cal: 480, prot: 28, carb: 55, fat: 14, serving: '1 plato', cat: 'mariscos' },
  { id: 511, name: 'Almejas al vapor',               cal: 85,  prot: 15, carb: 3,  fat: 1,  serving: '100g', cat: 'mariscos' },
  { id: 512, name: 'Mejillones al vapor',            cal: 95,  prot: 14, carb: 4,  fat: 2,  serving: '100g', cat: 'mariscos' },
  { id: 513, name: 'Vieiras a la plancha (scallops)', cal: 110, prot: 20, carb: 3, fat: 1,  serving: '100g', cat: 'mariscos' },
  { id: 514, name: 'Pescado empanizado',             cal: 250, prot: 18, carb: 18, fat: 13, serving: '100g', cat: 'mariscos' },
  { id: 515, name: 'Filete de pescado al horno',     cal: 140, prot: 25, carb: 0,  fat: 4,  serving: '100g', cat: 'mariscos' },
  { id: 516, name: 'Salmón a la plancha',            cal: 200, prot: 22, carb: 0,  fat: 12, serving: '100g', cat: 'mariscos' },
  { id: 517, name: 'Trucha al horno',                cal: 170, prot: 24, carb: 0,  fat: 8,  serving: '100g', cat: 'mariscos' },
  { id: 518, name: 'Corvina frita',                  cal: 220, prot: 22, carb: 6,  fat: 12, serving: '100g', cat: 'mariscos' },
  { id: 519, name: 'Róbalo a la plancha',            cal: 150, prot: 25, carb: 0,  fat: 5,  serving: '100g', cat: 'mariscos' },
  { id: 520, name: 'Camarones al ajillo',            cal: 180, prot: 20, carb: 3,  fat: 10, serving: '100g', cat: 'mariscos' },
  { id: 521, name: 'Camarones empanizados',          cal: 240, prot: 18, carb: 18, fat: 12, serving: '100g', cat: 'mariscos' },
  { id: 522, name: 'Sushi roll california (8pzs)',   cal: 260, prot: 9,  carb: 40, fat: 7,  serving: '8 piezas', cat: 'mariscos' },
  { id: 523, name: 'Sashimi de salmón (6pzs)',       cal: 130, prot: 20, carb: 0,  fat: 5,  serving: '6 piezas', cat: 'mariscos' },
  { id: 524, name: 'Sopa de camarón',                cal: 200, prot: 18, carb: 14, fat: 8,  serving: '1 tazón', cat: 'mariscos' },

  // ─── COMIDA MEXICANA ──────────────────────
  { id: 550, name: 'Tacos al pastor (3)',            cal: 420, prot: 22, carb: 36, fat: 20, serving: '3 unidades', cat: 'mexicana' },
  { id: 551, name: 'Tacos de carnitas (3)',          cal: 450, prot: 24, carb: 34, fat: 24, serving: '3 unidades', cat: 'mexicana' },
  { id: 552, name: 'Tacos de pescado (2)',           cal: 320, prot: 16, carb: 30, fat: 15, serving: '2 unidades', cat: 'mexicana' },
  { id: 553, name: 'Tacos dorados (3)',              cal: 380, prot: 14, carb: 32, fat: 22, serving: '3 unidades', cat: 'mexicana' },
  { id: 554, name: 'Enchiladas verdes (3)',          cal: 420, prot: 18, carb: 38, fat: 22, serving: '3 unidades', cat: 'mexicana' },
  { id: 555, name: 'Enchiladas rojas (3)',           cal: 440, prot: 18, carb: 40, fat: 24, serving: '3 unidades', cat: 'mexicana' },
  { id: 556, name: 'Enchiladas suizas (3)',          cal: 480, prot: 20, carb: 38, fat: 28, serving: '3 unidades', cat: 'mexicana' },
  { id: 557, name: 'Pozole rojo',                    cal: 350, prot: 24, carb: 30, fat: 14, serving: '1 tazón', cat: 'mexicana' },
  { id: 558, name: 'Chiles rellenos (2)',            cal: 420, prot: 16, carb: 24, fat: 28, serving: '2 unidades', cat: 'mexicana' },
  { id: 559, name: 'Tamales de puerco (2)',          cal: 400, prot: 14, carb: 46, fat: 18, serving: '2 unidades', cat: 'mexicana' },
  { id: 560, name: 'Tamales verdes (2)',             cal: 380, prot: 12, carb: 48, fat: 15, serving: '2 unidades', cat: 'mexicana' },
  { id: 561, name: 'Sopes (3)',                      cal: 360, prot: 12, carb: 40, fat: 16, serving: '3 unidades', cat: 'mexicana' },
  { id: 562, name: 'Tostadas de tinga (2)',          cal: 340, prot: 16, carb: 32, fat: 15, serving: '2 unidades', cat: 'mexicana' },
  { id: 563, name: 'Fajitas de pollo',               cal: 420, prot: 32, carb: 30, fat: 18, serving: '1 plato', cat: 'mexicana' },
  { id: 564, name: 'Fajitas de res',                 cal: 460, prot: 30, carb: 28, fat: 24, serving: '1 plato', cat: 'mexicana' },
  { id: 565, name: 'Guacamole',                      cal: 160, prot: 2,  carb: 9,  fat: 14, serving: '100g', cat: 'mexicana' },
  { id: 566, name: 'Pico de gallo',                  cal: 30,  prot: 1,  carb: 6,  fat: 0.3, serving: '100g', cat: 'mexicana' },
  { id: 567, name: 'Frijoles refritos',              cal: 140, prot: 8,  carb: 20, fat: 3,  serving: '100g', cat: 'mexicana' },
  { id: 568, name: 'Arroz mexicano',                 cal: 150, prot: 3,  carb: 30, fat: 2,  serving: '100g', cat: 'mexicana' },
  { id: 569, name: 'Elote con mayonesa y queso',     cal: 280, prot: 6,  carb: 32, fat: 14, serving: '1 unidad', cat: 'mexicana' },
  { id: 570, name: 'Esquites',                       cal: 220, prot: 5,  carb: 30, fat: 9,  serving: '1 vaso', cat: 'mexicana' },
  { id: 571, name: 'Torta de jamón',                 cal: 480, prot: 22, carb: 48, fat: 22, serving: '1 unidad', cat: 'mexicana' },
  { id: 572, name: 'Torta ahogada',                  cal: 520, prot: 24, carb: 50, fat: 24, serving: '1 unidad', cat: 'mexicana' },
  { id: 573, name: 'Chalupas (3)',                   cal: 340, prot: 10, carb: 34, fat: 18, serving: '3 unidades', cat: 'mexicana' },
  { id: 574, name: 'Birria de res',                  cal: 380, prot: 28, carb: 12, fat: 24, serving: '1 tazón', cat: 'mexicana' },

  // ─── COMIDA ITALIANA ──────────────────────
  { id: 600, name: 'Espagueti a la boloñesa',        cal: 480, prot: 22, carb: 60, fat: 16, serving: '1 plato', cat: 'italiana' },
  { id: 601, name: 'Espagueti carbonara',            cal: 560, prot: 20, carb: 55, fat: 26, serving: '1 plato', cat: 'italiana' },
  { id: 602, name: 'Lasaña de carne',                cal: 480, prot: 24, carb: 38, fat: 26, serving: '1 porción', cat: 'italiana' },
  { id: 603, name: 'Fettuccine alfredo',             cal: 550, prot: 16, carb: 50, fat: 30, serving: '1 plato', cat: 'italiana' },
  { id: 604, name: 'Penne al pesto',                 cal: 460, prot: 12, carb: 55, fat: 20, serving: '1 plato', cat: 'italiana' },
  { id: 605, name: 'Ravioles de queso',              cal: 420, prot: 16, carb: 50, fat: 16, serving: '1 plato', cat: 'italiana' },
  { id: 606, name: 'Risotto de champiñones',         cal: 380, prot: 9,  carb: 55, fat: 12, serving: '1 plato', cat: 'italiana' },
  { id: 607, name: 'Pizza margarita (1 rebanada)',   cal: 250, prot: 10, carb: 32, fat: 9,  serving: '1 rebanada', cat: 'italiana' },
  { id: 608, name: 'Calzone de jamón y queso',       cal: 560, prot: 24, carb: 55, fat: 26, serving: '1 unidad', cat: 'italiana' },
  { id: 609, name: 'Tiramisú (porción)',             cal: 380, prot: 6,  carb: 36, fat: 22, serving: '1 porción', cat: 'italiana' },
  { id: 610, name: 'Panna cotta',                    cal: 280, prot: 4,  carb: 24, fat: 18, serving: '1 porción', cat: 'italiana' },
  { id: 611, name: 'Bruschetta (2)',                 cal: 160, prot: 4,  carb: 22, fat: 6,  serving: '2 unidades', cat: 'italiana' },
  { id: 612, name: 'Ensalada caprese',               cal: 260, prot: 14, carb: 8,  fat: 20, serving: '1 plato', cat: 'italiana' },
  { id: 613, name: 'Minestrone',                     cal: 180, prot: 7,  carb: 28, fat: 4,  serving: '1 tazón', cat: 'italiana' },
  { id: 614, name: 'Gnocchi con salsa de tomate',    cal: 400, prot: 9,  carb: 70, fat: 8,  serving: '1 plato', cat: 'italiana' },
  { id: 615, name: 'Focaccia (porción)',             cal: 220, prot: 5,  carb: 32, fat: 8,  serving: '1 porción', cat: 'italiana' },

  // ─── COMIDA ASIÁTICA ──────────────────────
  { id: 650, name: 'Arroz frito con pollo',          cal: 480, prot: 20, carb: 60, fat: 16, serving: '1 plato', cat: 'asiatica' },
  { id: 651, name: 'Arroz frito con camarón',        cal: 460, prot: 18, carb: 58, fat: 14, serving: '1 plato', cat: 'asiatica' },
  { id: 652, name: 'Chow mein de pollo',             cal: 440, prot: 20, carb: 50, fat: 16, serving: '1 plato', cat: 'asiatica' },
  { id: 653, name: 'Pollo agridulce',                cal: 480, prot: 22, carb: 50, fat: 18, serving: '1 plato', cat: 'asiatica' },
  { id: 654, name: 'Pollo con brócoli',              cal: 320, prot: 26, carb: 18, fat: 14, serving: '1 plato', cat: 'asiatica' },
  { id: 655, name: 'Pollo kung pao',                 cal: 420, prot: 24, carb: 24, fat: 24, serving: '1 plato', cat: 'asiatica' },
  { id: 656, name: 'Res con vegetales (salteado)',   cal: 360, prot: 26, carb: 20, fat: 18, serving: '1 plato', cat: 'asiatica' },
  { id: 657, name: 'Rollitos primavera (2)',         cal: 180, prot: 4,  carb: 20, fat: 9,  serving: '2 unidades', cat: 'asiatica' },
  { id: 658, name: 'Wonton frito (5)',               cal: 240, prot: 8,  carb: 24, fat: 12, serving: '5 unidades', cat: 'asiatica' },
  { id: 659, name: 'Sopa wonton',                    cal: 180, prot: 10, carb: 18, fat: 6,  serving: '1 tazón', cat: 'asiatica' },
  { id: 660, name: 'Sopa agripicante',               cal: 150, prot: 8,  carb: 14, fat: 6,  serving: '1 tazón', cat: 'asiatica' },
  { id: 661, name: 'Pad thai',                       cal: 460, prot: 18, carb: 55, fat: 18, serving: '1 plato', cat: 'asiatica' },
  { id: 662, name: 'Ramen con cerdo',                cal: 480, prot: 22, carb: 50, fat: 20, serving: '1 tazón', cat: 'asiatica' },
  { id: 663, name: 'Curry de pollo con arroz',       cal: 520, prot: 24, carb: 55, fat: 22, serving: '1 plato', cat: 'asiatica' },
  { id: 664, name: 'Curry verde tailandés',          cal: 460, prot: 18, carb: 30, fat: 30, serving: '1 plato', cat: 'asiatica' },
  { id: 665, name: 'Dumplings al vapor (5)',         cal: 220, prot: 9,  carb: 28, fat: 8,  serving: '5 unidades', cat: 'asiatica' },
  { id: 666, name: 'Teriyaki de pollo',              cal: 420, prot: 28, carb: 45, fat: 12, serving: '1 plato', cat: 'asiatica' },
  { id: 667, name: 'Sushi roll camarón tempura (8pzs)', cal: 340, prot: 10, carb: 45, fat: 12, serving: '8 piezas', cat: 'asiatica' },
  { id: 668, name: 'Edamame',                        cal: 120, prot: 11, carb: 10, fat: 5,  serving: '100g', cat: 'asiatica' },
  { id: 669, name: 'Sopa miso',                      cal: 60,  prot: 4,  carb: 6,  fat: 2,  serving: '1 tazón', cat: 'asiatica' },
  { id: 670, name: 'Bibimbap',                       cal: 550, prot: 24, carb: 70, fat: 18, serving: '1 plato', cat: 'asiatica' },
  { id: 671, name: 'Bulgogi de res',                 cal: 240, prot: 22, carb: 8,  fat: 14, serving: '100g', cat: 'asiatica' },
  { id: 672, name: 'Kimchi',                         cal: 25,  prot: 1.5, carb: 4, fat: 0.5, serving: '100g', cat: 'asiatica' },
  { id: 673, name: 'Satay de pollo (brocheta)',      cal: 150, prot: 14, carb: 4,  fat: 9,  serving: '1 brocheta', cat: 'asiatica' },

  // ─── SALSAS Y CONDIMENTOS ─────────────────
  { id: 700, name: 'Salsa de soya',                  cal: 8,   prot: 1,   carb: 1,  fat: 0,  serving: '1 cda', cat: 'condimentos' },
  { id: 701, name: 'Salsa BBQ',                      cal: 30,  prot: 0.2, carb: 7,  fat: 0.1, serving: '1 cda', cat: 'condimentos' },
  { id: 702, name: 'Salsa picante (tabasco)',        cal: 1,   prot: 0,   carb: 0.2, fat: 0, serving: '1 cdta', cat: 'condimentos' },
  { id: 703, name: 'Salsa ranch',                    cal: 70,  prot: 0.3, carb: 1,  fat: 7,  serving: '1 cda', cat: 'condimentos' },
  { id: 704, name: 'Salsa césar',                    cal: 80,  prot: 0.5, carb: 0.5, fat: 8.5, serving: '1 cda', cat: 'condimentos' },
  { id: 705, name: 'Mostaza',                        cal: 10,  prot: 0.6, carb: 1,  fat: 0.6, serving: '1 cda', cat: 'condimentos' },
  { id: 706, name: 'Ketchup',                        cal: 20,  prot: 0.2, carb: 5,  fat: 0,  serving: '1 cda', cat: 'condimentos' },
  { id: 707, name: 'Salsa inglesa (worcestershire)', cal: 15,  prot: 0,   carb: 3.5, fat: 0, serving: '1 cda', cat: 'condimentos' },
  { id: 708, name: 'Chimichurri',                    cal: 50,  prot: 0.2, carb: 1,  fat: 5,  serving: '1 cda', cat: 'condimentos' },
  { id: 709, name: 'Salsa tártara',                  cal: 65,  prot: 0.1, carb: 1.5, fat: 6.5, serving: '1 cda', cat: 'condimentos' },
  { id: 710, name: 'Aderezo italiano',               cal: 45,  prot: 0,   carb: 1.5, fat: 4.5, serving: '1 cda', cat: 'condimentos' },
  { id: 711, name: 'Aderezo mil islas',              cal: 55,  prot: 0.1, carb: 2.5, fat: 5,  serving: '1 cda', cat: 'condimentos' },
  { id: 712, name: 'Hummus',                         cal: 166, prot: 8,   carb: 14, fat: 10, serving: '100g', cat: 'condimentos' },
  { id: 713, name: 'Salsa de queso (nacho cheese)',  cal: 110, prot: 4,   carb: 4,  fat: 9,  serving: '1/4 taza', cat: 'condimentos' },
  { id: 714, name: 'Vinagreta balsámica',            cal: 45,  prot: 0,   carb: 3,  fat: 3.5, serving: '1 cda', cat: 'condimentos' },
  { id: 715, name: 'Salsa alfredo (frasco)',         cal: 110, prot: 2,   carb: 4,  fat: 10, serving: '1/4 taza', cat: 'condimentos' },
  { id: 716, name: 'Salsa marinara',                 cal: 35,  prot: 1,   carb: 6,  fat: 1,  serving: '1/4 taza', cat: 'condimentos' },
  { id: 717, name: 'Mermelada de fresa',             cal: 50,  prot: 0,   carb: 13, fat: 0,  serving: '1 cda', cat: 'condimentos' },
  { id: 718, name: 'Crema de maní (peanut butter)',  cal: 95,  prot: 4,   carb: 3,  fat: 8,  serving: '1 cda', cat: 'condimentos' },
  { id: 719, name: 'Crema de avellana con cacao',    cal: 100, prot: 1,   carb: 11, fat: 6,  serving: '1 cda', cat: 'condimentos' },

  // ─── MÁS FRUTAS ───────────────────────────
  { id: 750, name: 'Kiwi',                           cal: 42,  prot: 0.8, carb: 10, fat: 0.4, serving: '1 unidad', cat: 'frutas' },
  { id: 751, name: 'Guayaba',                        cal: 37,  prot: 1.4, carb: 8,  fat: 0.5, serving: '1 unidad', cat: 'frutas' },
  { id: 752, name: 'Maracuyá',                       cal: 17,  prot: 0.4, carb: 4,  fat: 0.1, serving: '1 unidad', cat: 'frutas' },
  { id: 753, name: 'Zapote',                         cal: 130, prot: 2,   carb: 34, fat: 1,  serving: '100g', cat: 'frutas' },
  { id: 754, name: 'Marañón (fruta)',                cal: 45,  prot: 0.7, carb: 11, fat: 0.3, serving: '100g', cat: 'frutas' },
  { id: 755, name: 'Nance',                          cal: 65,  prot: 1,   carb: 15, fat: 1,  serving: '100g', cat: 'frutas' },
  { id: 756, name: 'Jocote',                         cal: 74,  prot: 1,   carb: 18, fat: 0.5, serving: '100g', cat: 'frutas' },
  { id: 757, name: 'Tamarindo',                      cal: 239, prot: 2.8, carb: 63, fat: 0.6, serving: '100g', cat: 'frutas' },
  { id: 758, name: 'Granadilla',                     cal: 50,  prot: 1,   carb: 12, fat: 0.3, serving: '1 unidad', cat: 'frutas' },
  { id: 759, name: 'Carambola (starfruit)',          cal: 28,  prot: 1,   carb: 6,  fat: 0.3, serving: '1 unidad', cat: 'frutas' },
  { id: 760, name: 'Litchi',                         cal: 66,  prot: 0.8, carb: 17, fat: 0.4, serving: '100g', cat: 'frutas' },
  { id: 761, name: 'Higo',                           cal: 37,  prot: 0.4, carb: 10, fat: 0.1, serving: '1 unidad', cat: 'frutas' },
  { id: 762, name: 'Ciruela',                        cal: 30,  prot: 0.5, carb: 8,  fat: 0.2, serving: '1 unidad', cat: 'frutas' },
  { id: 763, name: 'Cereza',                         cal: 63,  prot: 1,   carb: 16, fat: 0.2, serving: '100g', cat: 'frutas' },
  { id: 764, name: 'Arándanos',                      cal: 57,  prot: 0.7, carb: 14, fat: 0.3, serving: '100g', cat: 'frutas' },
  { id: 765, name: 'Frambuesa',                      cal: 52,  prot: 1.2, carb: 12, fat: 0.7, serving: '100g', cat: 'frutas' },
  { id: 766, name: 'Mora',                           cal: 43,  prot: 1.4, carb: 10, fat: 0.5, serving: '100g', cat: 'frutas' },
  { id: 767, name: 'Toronja',                        cal: 52,  prot: 1,   carb: 13, fat: 0.2, serving: '1/2 unidad', cat: 'frutas' },
  { id: 768, name: 'Limón',                          cal: 17,  prot: 0.6, carb: 5,  fat: 0.2, serving: '1 unidad', cat: 'frutas' },
  { id: 769, name: 'Coco (pulpa)',                   cal: 354, prot: 3.3, carb: 15, fat: 33, serving: '100g', cat: 'frutas' },
  { id: 770, name: 'Dátil',                          cal: 23,  prot: 0.2, carb: 6,  fat: 0,  serving: '1 unidad', cat: 'frutas' },
  { id: 771, name: 'Ciruela pasa',                   cal: 23,  prot: 0.2, carb: 6,  fat: 0,  serving: '1 unidad', cat: 'frutas' },
  { id: 772, name: 'Uva pasa',                       cal: 90,  prot: 1,   carb: 24, fat: 0.1, serving: '30g', cat: 'frutas' },
  { id: 773, name: 'Fruta de pan frita',             cal: 220, prot: 3,   carb: 40, fat: 6,  serving: '100g', cat: 'frutas' },

  // ─── MÁS VERDURAS ─────────────────────────
  { id: 800, name: 'Coliflor',                       cal: 25,  prot: 2,   carb: 5,  fat: 0.3, serving: '100g', cat: 'verduras' },
  { id: 801, name: 'Berenjena',                      cal: 25,  prot: 1,   carb: 6,  fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 802, name: 'Rábano',                         cal: 16,  prot: 0.7, carb: 3.4, fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 803, name: 'Apio',                           cal: 16,  prot: 0.7, carb: 3,  fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 804, name: 'Remolacha',                      cal: 43,  prot: 1.6, carb: 10, fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 805, name: 'Col rizada (kale)',               cal: 49,  prot: 4.3, carb: 9,  fat: 0.9, serving: '100g', cat: 'verduras' },
  { id: 806, name: 'Repollo',                        cal: 25,  prot: 1.3, carb: 6,  fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 807, name: 'Coles de Bruselas',              cal: 43,  prot: 3.4, carb: 9,  fat: 0.3, serving: '100g', cat: 'verduras' },
  { id: 808, name: 'Champiñones',                    cal: 22,  prot: 3.1, carb: 3.3, fat: 0.3, serving: '100g', cat: 'verduras' },
  { id: 809, name: 'Espárragos',                     cal: 20,  prot: 2.2, carb: 3.9, fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 810, name: 'Alcachofa',                      cal: 60,  prot: 4.2, carb: 13, fat: 0.2, serving: '1 unidad', cat: 'verduras' },
  { id: 811, name: 'Vainicas (ejotes)',              cal: 31,  prot: 1.8, carb: 7,  fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 812, name: 'Habichuelas tiernas',            cal: 35,  prot: 2,   carb: 7,  fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 813, name: 'Nabo',                           cal: 28,  prot: 0.9, carb: 6.4, fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 814, name: 'Puerro',                         cal: 61,  prot: 1.5, carb: 14, fat: 0.3, serving: '100g', cat: 'verduras' },
  { id: 815, name: 'Jengibre',                       cal: 8,   prot: 0.2, carb: 1.8, fat: 0.1, serving: '10g', cat: 'verduras' },
  { id: 816, name: 'Ajo',                            cal: 4,   prot: 0.2, carb: 1,  fat: 0,  serving: '1 diente', cat: 'verduras' },
  { id: 817, name: 'Perejil',                        cal: 4,   prot: 0.4, carb: 0.6, fat: 0.1, serving: '10g', cat: 'verduras' },
  { id: 818, name: 'Cilantro',                       cal: 2,   prot: 0.2, carb: 0.4, fat: 0,  serving: '10g', cat: 'verduras' },
  { id: 819, name: 'Rúcula',                         cal: 25,  prot: 2.6, carb: 3.7, fat: 0.7, serving: '100g', cat: 'verduras' },

  // ─── MÁS LÁCTEOS Y POSTRES ────────────────
  { id: 850, name: 'Requesón',                       cal: 98,  prot: 11,  carb: 3.4, fat: 4.3, serving: '100g', cat: 'lacteos' },
  { id: 851, name: 'Queso crema',                    cal: 100, prot: 2,   carb: 1,  fat: 10, serving: '30g', cat: 'lacteos' },
  { id: 852, name: 'Queso parmesano',                cal: 122, prot: 11,  carb: 1,  fat: 8,  serving: '30g', cat: 'lacteos' },
  { id: 853, name: 'Queso azul',                     cal: 100, prot: 6,   carb: 0.7, fat: 8.1, serving: '30g', cat: 'lacteos' },
  { id: 854, name: 'Queso gouda',                    cal: 113, prot: 7,   carb: 0.6, fat: 9,  serving: '30g', cat: 'lacteos' },
  { id: 855, name: 'Queso provolone',                cal: 100, prot: 7,   carb: 0.6, fat: 7.5, serving: '30g', cat: 'lacteos' },
  { id: 856, name: 'Leche de almendra',              cal: 15,  prot: 0.6, carb: 1.2, fat: 1.1, serving: '100ml', cat: 'lacteos' },
  { id: 857, name: 'Leche de coco',                  cal: 230, prot: 2.3, carb: 6,  fat: 24, serving: '100ml', cat: 'lacteos' },
  { id: 858, name: 'Leche de soya',                  cal: 33,  prot: 3.3, carb: 1.8, fat: 1.8, serving: '100ml', cat: 'lacteos' },
  { id: 859, name: 'Leche condensada',               cal: 60,  prot: 1.5, carb: 10, fat: 1.6, serving: '1 cda', cat: 'lacteos' },
  { id: 860, name: 'Leche evaporada',                cal: 134, prot: 6.8, carb: 10, fat: 7.6, serving: '100ml', cat: 'lacteos' },
  { id: 861, name: 'Helado de vainilla',             cal: 207, prot: 3.5, carb: 24, fat: 11, serving: '100g', cat: 'lacteos' },
  { id: 862, name: 'Paleta de agua',                 cal: 60,  prot: 0,   carb: 15, fat: 0,  serving: '1 unidad', cat: 'lacteos' },
  { id: 863, name: 'Gelatina',                       cal: 62,  prot: 1.5, carb: 14, fat: 0,  serving: '100g', cat: 'lacteos' },
  { id: 864, name: 'Pudín de chocolate',             cal: 150, prot: 3,   carb: 25, fat: 4,  serving: '100g', cat: 'lacteos' },
  { id: 865, name: 'Natilla (postre)',               cal: 130, prot: 3,   carb: 20, fat: 4,  serving: '100g', cat: 'lacteos' },
  { id: 866, name: 'Arroz con leche',                cal: 130, prot: 3,   carb: 24, fat: 2.5, serving: '100g', cat: 'lacteos' },
  { id: 867, name: 'Budín de pan',                   cal: 220, prot: 5,   carb: 34, fat: 7,  serving: '100g', cat: 'lacteos' },
  { id: 868, name: 'Yogurt de fruta',                cal: 130, prot: 4,   carb: 22, fat: 3,  serving: '125g', cat: 'lacteos' },
  { id: 869, name: 'Kéfir',                          cal: 55,  prot: 3.3, carb: 4.5, fat: 2.2, serving: '100ml', cat: 'lacteos' },

  // ─── MÁS SNACKS Y BOTANAS ─────────────────
  { id: 900, name: 'Papas tipo chips (bolsa peq.)',  cal: 160, prot: 2,  carb: 15, fat: 10, serving: '30g', cat: 'snacks' },
  { id: 901, name: 'Tortilla chips con queso',       cal: 150, prot: 2,  carb: 18, fat: 8,  serving: '30g', cat: 'snacks' },
  { id: 902, name: 'Palomitas de maíz naturales',    cal: 110, prot: 3,  carb: 22, fat: 1.3, serving: '30g', cat: 'snacks' },
  { id: 903, name: 'Palomitas con mantequilla',      cal: 150, prot: 2.5, carb: 16, fat: 9, serving: '30g', cat: 'snacks' },
  { id: 904, name: 'Pretzels salados',               cal: 110, prot: 3,  carb: 23, fat: 1,  serving: '30g', cat: 'snacks' },
  { id: 905, name: 'Nachos con queso y jalapeño',    cal: 300, prot: 8,  carb: 30, fat: 16, serving: '100g', cat: 'snacks' },
  { id: 906, name: 'Chicharrón de harina',           cal: 160, prot: 2,  carb: 14, fat: 11, serving: '30g', cat: 'snacks' },
  { id: 907, name: 'Tortilla chips',                 cal: 140, prot: 2,  carb: 18, fat: 7,  serving: '30g', cat: 'snacks' },
  { id: 908, name: 'Cacahuates japoneses',           cal: 150, prot: 5,  carb: 15, fat: 8,  serving: '30g', cat: 'snacks' },
  { id: 909, name: 'Trail mix (frutos secos)',       cal: 140, prot: 4,  carb: 13, fat: 9,  serving: '30g', cat: 'snacks' },
  { id: 910, name: 'Barra de proteína',              cal: 200, prot: 20, carb: 22, fat: 7,  serving: '1 unidad', cat: 'snacks' },
  { id: 911, name: 'Barra de cereal',                cal: 100, prot: 1.5, carb: 20, fat: 2, serving: '1 unidad', cat: 'snacks' },
  { id: 912, name: 'Galletas saladas (crackers)',    cal: 80,  prot: 1.5, carb: 10, fat: 3.5, serving: '5 unidades', cat: 'snacks' },
  { id: 913, name: 'Queso en cubos (snack)',         cal: 110, prot: 7,  carb: 1,  fat: 9,  serving: '30g', cat: 'snacks' },
  { id: 914, name: 'Jamón serrano',                  cal: 60,  prot: 9,  carb: 0,  fat: 2.5, serving: '30g', cat: 'snacks' },
  { id: 915, name: 'Salami',                         cal: 110, prot: 6,  carb: 0.5, fat: 9, serving: '30g', cat: 'snacks' },
  { id: 916, name: 'Pepperoni',                      cal: 130, prot: 6,  carb: 1,  fat: 11, serving: '30g', cat: 'snacks' },
  { id: 917, name: 'Cecina / carne seca (jerky)',    cal: 90,  prot: 15, carb: 3,  fat: 2,  serving: '30g', cat: 'snacks' },
  { id: 918, name: 'Aceitunas verdes',               cal: 40,  prot: 0.3, carb: 1, fat: 4,  serving: '30g', cat: 'snacks' },
  { id: 919, name: 'Aceitunas negras',               cal: 43,  prot: 0.3, carb: 2, fat: 4,  serving: '30g', cat: 'snacks' },
  { id: 920, name: 'Encurtidos (pepinillos)',        cal: 5,   prot: 0.2, carb: 1, fat: 0,  serving: '30g', cat: 'snacks' },
  { id: 921, name: 'Camote frito (chips)',           cal: 140, prot: 1,  carb: 18, fat: 7,  serving: '30g', cat: 'snacks' },
  { id: 922, name: 'Plátano chips',                  cal: 150, prot: 0.7, carb: 17, fat: 9, serving: '30g', cat: 'snacks' },
  { id: 923, name: 'Yuca chips',                     cal: 140, prot: 0.5, carb: 20, fat: 6, serving: '30g', cat: 'snacks' },
  { id: 924, name: 'Maní garapiñado',                cal: 160, prot: 5,  carb: 16, fat: 9,  serving: '30g', cat: 'snacks' },

  // ─── MÁS BEBIDAS ──────────────────────────
  { id: 950, name: 'Vino tinto',                     cal: 125, prot: 0.1, carb: 4, fat: 0,  serving: '1 copa (150ml)', cat: 'bebidas' },
  { id: 951, name: 'Vino blanco',                    cal: 120, prot: 0.1, carb: 3.8, fat: 0, serving: '1 copa (150ml)', cat: 'bebidas' },
  { id: 952, name: 'Ron',                            cal: 97,  prot: 0,  carb: 0,  fat: 0,  serving: '1 shot (44ml)', cat: 'bebidas' },
  { id: 953, name: 'Whisky',                         cal: 105, prot: 0,  carb: 0,  fat: 0,  serving: '1 shot (44ml)', cat: 'bebidas' },
  { id: 954, name: 'Vodka',                          cal: 97,  prot: 0,  carb: 0,  fat: 0,  serving: '1 shot (44ml)', cat: 'bebidas' },
  { id: 955, name: 'Tequila',                        cal: 96,  prot: 0,  carb: 0,  fat: 0,  serving: '1 shot (44ml)', cat: 'bebidas' },
  { id: 956, name: 'Cerveza oscura',                 cal: 190, prot: 1.8, carb: 18, fat: 0, serving: '1 lata (355ml)', cat: 'bebidas' },
  { id: 957, name: 'Margarita (coctel)',             cal: 250, prot: 0.2, carb: 20, fat: 0, serving: '1 vaso', cat: 'bebidas' },
  { id: 958, name: 'Piña colada',                    cal: 280, prot: 1,  carb: 32, fat: 3,  serving: '1 vaso', cat: 'bebidas' },
  { id: 959, name: 'Mojito',                         cal: 150, prot: 0.1, carb: 15, fat: 0, serving: '1 vaso', cat: 'bebidas' },
  { id: 960, name: 'Café con crema',                 cal: 60,  prot: 1,  carb: 4,  fat: 4.5, serving: '1 taza', cat: 'bebidas' },
  { id: 961, name: 'Capuchino',                      cal: 80,  prot: 4,  carb: 7,  fat: 4,  serving: '1 taza', cat: 'bebidas' },
  { id: 962, name: 'Latte',                          cal: 120, prot: 6,  carb: 10, fat: 6,  serving: '1 taza', cat: 'bebidas' },
  { id: 963, name: 'Frappé',                         cal: 250, prot: 4,  carb: 40, fat: 8,  serving: '1 vaso', cat: 'bebidas' },
  { id: 964, name: 'Té helado',                      cal: 90,  prot: 0,  carb: 22, fat: 0,  serving: '1 vaso', cat: 'bebidas' },
  { id: 965, name: 'Limonada',                       cal: 100, prot: 0.2, carb: 26, fat: 0, serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 966, name: 'Horchata',                       cal: 150, prot: 1,  carb: 30, fat: 3,  serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 967, name: 'Chicha de maíz',                 cal: 120, prot: 1,  carb: 28, fat: 0.5, serving: '1 vaso', cat: 'bebidas' },
  { id: 968, name: 'Refresco de tamarindo',          cal: 110, prot: 0.2, carb: 28, fat: 0, serving: '1 vaso', cat: 'bebidas' },
  { id: 969, name: 'Agua saborizada',                cal: 5,   prot: 0,  carb: 1,  fat: 0,  serving: '1 botella', cat: 'bebidas' },
  { id: 970, name: 'Bebida energética',              cal: 115, prot: 0,  carb: 28, fat: 0,  serving: '1 lata (250ml)', cat: 'bebidas' },
  { id: 971, name: 'Isotónica (bebida deportiva)',   cal: 125, prot: 0,  carb: 32, fat: 0,  serving: '1 botella (500ml)', cat: 'bebidas' },
  { id: 972, name: 'Ponche navideño',                cal: 180, prot: 1,  carb: 42, fat: 0.5, serving: '1 vaso', cat: 'bebidas' },

  // ─── MÁS CARBOHIDRATOS / GRANOS ───────────
  { id: 1000, name: 'Quinoa cocida',                 cal: 120, prot: 4.4, carb: 21, fat: 1.9, serving: '100g', cat: 'carbohidratos' },
  { id: 1001, name: 'Cuscús cocido',                 cal: 112, prot: 3.8, carb: 23, fat: 0.2, serving: '100g', cat: 'carbohidratos' },
  { id: 1002, name: 'Garbanzos cocidos',             cal: 164, prot: 8.9, carb: 27, fat: 2.6, serving: '100g', cat: 'carbohidratos' },
  { id: 1003, name: 'Arvejas (guisantes)',           cal: 81,  prot: 5.4, carb: 14, fat: 0.4, serving: '100g', cat: 'carbohidratos' },
  { id: 1004, name: 'Habas cocidas',                 cal: 110, prot: 7.6, carb: 20, fat: 0.4, serving: '100g', cat: 'carbohidratos' },
  { id: 1005, name: 'Atol / maicena',                cal: 130, prot: 1,  carb: 30, fat: 0.5, serving: '1 taza', cat: 'carbohidratos' },
  { id: 1006, name: 'Fideos / tallarines cocidos',   cal: 138, prot: 5,  carb: 27, fat: 1,  serving: '100g', cat: 'carbohidratos' },
  { id: 1007, name: 'Puré de papa',                  cal: 105, prot: 2,  carb: 17, fat: 3.5, serving: '100g', cat: 'carbohidratos' },
  { id: 1008, name: 'Puré de camote',                cal: 95,  prot: 1.6, carb: 22, fat: 0.2, serving: '100g', cat: 'carbohidratos' },

  // ─── MÁS COMIDA HONDUREÑA ─────────────────
  { id: 1050, name: 'Baleada de frijoles y queso',   cal: 420, prot: 15, carb: 46, fat: 20, serving: '1 unidad', cat: 'honduras' },
  { id: 1051, name: 'Yuca con chicharrón',           cal: 480, prot: 18, carb: 45, fat: 26, serving: '1 plato', cat: 'honduras' },
  { id: 1052, name: 'Anafres',                       cal: 380, prot: 16, carb: 24, fat: 24, serving: '1 porción', cat: 'honduras' },
  { id: 1053, name: 'Tacos hondureños (3)',          cal: 400, prot: 16, carb: 38, fat: 20, serving: '3 unidades', cat: 'honduras' },
  { id: 1054, name: 'Montucas',                      cal: 260, prot: 5,  carb: 42, fat: 8,  serving: '1 unidad', cat: 'honduras' },
  { id: 1055, name: 'Yoyos (queso frito, 4)',        cal: 320, prot: 16, carb: 8,  fat: 25, serving: '4 unidades', cat: 'honduras' },
  { id: 1056, name: 'Carne asada hondureña (plato)', cal: 620, prot: 40, carb: 45, fat: 30, serving: '1 plato', cat: 'honduras' },
  { id: 1057, name: 'Pollo con tajadas',             cal: 580, prot: 30, carb: 50, fat: 26, serving: '1 plato', cat: 'honduras' },
  { id: 1058, name: 'Sopa de caracol',               cal: 260, prot: 20, carb: 22, fat: 10, serving: '1 tazón', cat: 'honduras' },
  { id: 1059, name: 'Pastelitos de carne (2)',       cal: 260, prot: 10, carb: 26, fat: 13, serving: '2 unidades', cat: 'honduras' },
  { id: 1060, name: 'Alborotos (palomitas con miel)', cal: 380, prot: 4,  carb: 80, fat: 4, serving: '100g', cat: 'hondurasSnacks' },
  { id: 1061, name: 'Buñuelos (2)',                  cal: 260, prot: 4,  carb: 38, fat: 10, serving: '2 unidades', cat: 'hondurasSnacks' },
  { id: 1062, name: 'Quesadilla hondureña (dulce)',  cal: 320, prot: 6,  carb: 42, fat: 14, serving: '1 unidad', cat: 'hondurasSnacks' },
  { id: 1063, name: 'Sopa de frijoles con chicharrón', cal: 320, prot: 14, carb: 30, fat: 16, serving: '1 tazón', cat: 'honduras' },

  // ─── SOPAS Y CALDOS ───────────────────────
  { id: 1100, name: 'Sopa de verduras',              cal: 90,  prot: 3,   carb: 16, fat: 1.5, serving: '1 tazón', cat: 'sopas' },
  { id: 1101, name: 'Sopa de lentejas',              cal: 180, prot: 11,  carb: 28, fat: 2,  serving: '1 tazón', cat: 'sopas' },
  { id: 1102, name: 'Sopa de garbanzos',             cal: 190, prot: 10,  carb: 30, fat: 3,  serving: '1 tazón', cat: 'sopas' },
  { id: 1103, name: 'Sopa de calabaza',              cal: 120, prot: 3,   carb: 20, fat: 4,  serving: '1 tazón', cat: 'sopas' },
  { id: 1104, name: 'Sopa de tomate',                cal: 100, prot: 2.5, carb: 16, fat: 3,  serving: '1 tazón', cat: 'sopas' },
  { id: 1105, name: 'Sopa de cebolla gratinada',     cal: 250, prot: 9,   carb: 24, fat: 13, serving: '1 tazón', cat: 'sopas' },
  { id: 1106, name: 'Caldo de res',                  cal: 150, prot: 14,  carb: 8,  fat: 7,  serving: '1 tazón', cat: 'sopas' },
  { id: 1107, name: 'Caldo de pollo',                cal: 120, prot: 12,  carb: 6,  fat: 5,  serving: '1 tazón', cat: 'sopas' },
  { id: 1108, name: 'Caldo de gallina',              cal: 180, prot: 18,  carb: 6,  fat: 9,  serving: '1 tazón', cat: 'sopas' },
  { id: 1109, name: 'Sopa de fideos con pollo',      cal: 200, prot: 14,  carb: 24, fat: 6,  serving: '1 tazón', cat: 'sopas' },
  { id: 1110, name: 'Sopa de arroz',                 cal: 140, prot: 5,   carb: 26, fat: 2,  serving: '1 tazón', cat: 'sopas' },
  { id: 1111, name: 'Sopa de papa',                  cal: 160, prot: 4,   carb: 26, fat: 5,  serving: '1 tazón', cat: 'sopas' },
  { id: 1112, name: 'Sopa juliana',                  cal: 110, prot: 4,   carb: 18, fat: 2.5, serving: '1 tazón', cat: 'sopas' },
  { id: 1113, name: 'Crema de champiñones',          cal: 200, prot: 5,   carb: 16, fat: 13, serving: '1 tazón', cat: 'sopas' },
  { id: 1114, name: 'Crema de brócoli',              cal: 180, prot: 6,   carb: 14, fat: 11, serving: '1 tazón', cat: 'sopas' },
  { id: 1115, name: 'Crema de espárragos',           cal: 170, prot: 5,   carb: 14, fat: 10, serving: '1 tazón', cat: 'sopas' },
  { id: 1116, name: 'Sopa de res con vegetales',     cal: 180, prot: 16,  carb: 14, fat: 7,  serving: '1 tazón', cat: 'sopas' },
  { id: 1117, name: 'Consomé de pollo',              cal: 40,  prot: 4,   carb: 3,  fat: 1,  serving: '1 taza', cat: 'sopas' },
  { id: 1118, name: 'Sancocho de gallina',           cal: 320, prot: 22,  carb: 34, fat: 10, serving: '1 tazón', cat: 'sopas' },
  { id: 1119, name: 'Sopa de pescado',               cal: 200, prot: 20,  carb: 12, fat: 8,  serving: '1 tazón', cat: 'sopas' },
  { id: 1120, name: 'Sopa de habichuelas',           cal: 220, prot: 12,  carb: 30, fat: 6,  serving: '1 tazón', cat: 'sopas' },
  { id: 1121, name: 'Sopa de coditos (pasta)',       cal: 210, prot: 8,   carb: 32, fat: 5,  serving: '1 tazón', cat: 'sopas' },
  { id: 1122, name: 'Chupe de camarones',            cal: 320, prot: 20,  carb: 28, fat: 14, serving: '1 tazón', cat: 'sopas' },
  { id: 1123, name: 'Locro (sopa de papa)',          cal: 260, prot: 6,   carb: 36, fat: 10, serving: '1 tazón', cat: 'sopas' },
  { id: 1124, name: 'Ajiaco (sopa colombiana)',      cal: 300, prot: 18,  carb: 38, fat: 8,  serving: '1 tazón', cat: 'sopas' },

  // ─── ENSALADAS ────────────────────────────
  { id: 1125, name: 'Ensalada verde con vinagreta',  cal: 90,  prot: 2,   carb: 8,  fat: 6,  serving: '1 plato', cat: 'ensaladas' },
  { id: 1126, name: 'Ensalada de atún',              cal: 220, prot: 20,  carb: 6,  fat: 13, serving: '1 plato', cat: 'ensaladas' },
  { id: 1127, name: 'Ensalada de pollo',             cal: 260, prot: 24,  carb: 8,  fat: 15, serving: '1 plato', cat: 'ensaladas' },
  { id: 1128, name: 'Ensalada de huevo',             cal: 200, prot: 12,  carb: 4,  fat: 15, serving: '1 plato', cat: 'ensaladas' },
  { id: 1129, name: 'Ensalada de repollo (coleslaw)', cal: 150, prot: 1.5, carb: 12, fat: 11, serving: '100g', cat: 'ensaladas' },
  { id: 1130, name: 'Ensalada rusa',                 cal: 220, prot: 4,   carb: 18, fat: 15, serving: '100g', cat: 'ensaladas' },
  { id: 1131, name: 'Ensalada de quinoa',            cal: 220, prot: 7,   carb: 32, fat: 7,  serving: '1 plato', cat: 'ensaladas' },
  { id: 1132, name: 'Ensalada griega',               cal: 250, prot: 8,   carb: 12, fat: 19, serving: '1 plato', cat: 'ensaladas' },
  { id: 1133, name: 'Ensalada de garbanzos',         cal: 240, prot: 10,  carb: 32, fat: 8,  serving: '1 plato', cat: 'ensaladas' },
  { id: 1134, name: 'Ensalada de frijoles negros y maíz', cal: 210, prot: 9, carb: 34, fat: 4, serving: '1 plato', cat: 'ensaladas' },
  { id: 1135, name: 'Ensalada Waldorf',              cal: 260, prot: 3,   carb: 24, fat: 18, serving: '1 plato', cat: 'ensaladas' },
  { id: 1136, name: 'Ensalada Cobb',                 cal: 420, prot: 28,  carb: 12, fat: 30, serving: '1 plato', cat: 'ensaladas' },
  { id: 1137, name: 'Ensalada de camarón',           cal: 240, prot: 22,  carb: 10, fat: 12, serving: '1 plato', cat: 'ensaladas' },
  { id: 1138, name: 'Ensalada de tomate y aguacate', cal: 180, prot: 2.5, carb: 10, fat: 15, serving: '1 plato', cat: 'ensaladas' },
  { id: 1139, name: 'Ensalada de pepino y cebolla',  cal: 60,  prot: 1,   carb: 8,  fat: 3,  serving: '1 plato', cat: 'ensaladas' },
  { id: 1140, name: 'Ensalada de brotes (sprouts)',  cal: 40,  prot: 3,   carb: 5,  fat: 1,  serving: '100g', cat: 'ensaladas' },
  { id: 1141, name: 'Ensalada de pasta',             cal: 320, prot: 8,   carb: 44, fat: 12, serving: '1 plato', cat: 'ensaladas' },
  { id: 1142, name: 'Ensalada de zanahoria y pasas', cal: 130, prot: 1.5, carb: 22, fat: 5,  serving: '1 plato', cat: 'ensaladas' },
  { id: 1143, name: 'Ensalada de frutas frescas',    cal: 90,  prot: 1,   carb: 22, fat: 0.3, serving: '1 plato', cat: 'ensaladas' },
  { id: 1144, name: 'Ensalada de espinaca con fresas', cal: 160, prot: 3, carb: 14, fat: 10, serving: '1 plato', cat: 'ensaladas' },

  // ─── COMIDA ÁRABE / MEDITERRÁNEA ──────────
  { id: 1145, name: 'Falafel (4)',                   cal: 280, prot: 10,  carb: 30, fat: 14, serving: '4 unidades', cat: 'arabe' },
  { id: 1146, name: 'Falafel wrap',                  cal: 380, prot: 12,  carb: 46, fat: 16, serving: '1 unidad', cat: 'arabe' },
  { id: 1147, name: 'Shawarma de pollo (plato)',     cal: 480, prot: 32,  carb: 30, fat: 24, serving: '1 plato', cat: 'arabe' },
  { id: 1148, name: 'Kebab de cordero',              cal: 320, prot: 26,  carb: 4,  fat: 22, serving: '100g', cat: 'arabe' },
  { id: 1149, name: 'Tabbouleh',                     cal: 140, prot: 3,   carb: 20, fat: 6,  serving: '1 plato', cat: 'arabe' },
  { id: 1150, name: 'Baba ganoush',                  cal: 130, prot: 3,   carb: 10, fat: 9,  serving: '100g', cat: 'arabe' },
  { id: 1151, name: 'Hummus con pan pita',           cal: 320, prot: 10,  carb: 40, fat: 14, serving: '1 porción', cat: 'arabe' },
  { id: 1152, name: 'Pan pita',                      cal: 165, prot: 5.5, carb: 33, fat: 0.7, serving: '1 unidad', cat: 'arabe' },
  { id: 1153, name: 'Dolma (hojas de parra, 5)',     cal: 220, prot: 4,   carb: 30, fat: 10, serving: '5 unidades', cat: 'arabe' },
  { id: 1154, name: 'Kibbeh frito (3)',              cal: 300, prot: 14,  carb: 24, fat: 17, serving: '3 unidades', cat: 'arabe' },
  { id: 1155, name: 'Fattoush',                      cal: 160, prot: 3,   carb: 18, fat: 9,  serving: '1 plato', cat: 'arabe' },
  { id: 1156, name: 'Moussaka',                      cal: 380, prot: 18,  carb: 22, fat: 25, serving: '1 porción', cat: 'arabe' },
  { id: 1157, name: 'Souvlaki de pollo',             cal: 320, prot: 30,  carb: 8,  fat: 18, serving: '1 brocheta', cat: 'arabe' },
  { id: 1158, name: 'Tzatziki',                      cal: 40,  prot: 2,   carb: 3,  fat: 2.5, serving: '30g', cat: 'arabe' },
  { id: 1159, name: 'Shakshuka',                     cal: 260, prot: 14,  carb: 14, fat: 17, serving: '1 plato', cat: 'arabe' },
  { id: 1160, name: 'Baklava',                       cal: 300, prot: 4,   carb: 34, fat: 17, serving: '1 porción', cat: 'arabe' },
  { id: 1161, name: 'Cuscús con verduras',           cal: 220, prot: 6,   carb: 40, fat: 4,  serving: '1 plato', cat: 'arabe' },
  { id: 1162, name: 'Halloumi a la plancha',         cal: 240, prot: 18,  carb: 2,  fat: 18, serving: '100g', cat: 'arabe' },
  { id: 1163, name: 'Muhammara (dip de nuez)',       cal: 150, prot: 3,   carb: 10, fat: 11, serving: '30g', cat: 'arabe' },
  { id: 1164, name: 'Wrap de pollo shawarma',        cal: 460, prot: 28,  carb: 40, fat: 20, serving: '1 unidad', cat: 'arabe' },

  // ─── COMIDA INDIA ─────────────────────────
  { id: 1165, name: 'Pollo tikka masala',            cal: 420, prot: 28,  carb: 20, fat: 25, serving: '1 plato', cat: 'india' },
  { id: 1166, name: 'Chana masala (garbanzos)',      cal: 320, prot: 12,  carb: 44, fat: 11, serving: '1 plato', cat: 'india' },
  { id: 1167, name: 'Dal (curry de lentejas)',       cal: 260, prot: 14,  carb: 36, fat: 7,  serving: '1 plato', cat: 'india' },
  { id: 1168, name: 'Biryani de pollo',              cal: 480, prot: 24,  carb: 60, fat: 15, serving: '1 plato', cat: 'india' },
  { id: 1169, name: 'Naan',                          cal: 260, prot: 8,   carb: 46, fat: 5,  serving: '1 unidad', cat: 'india' },
  { id: 1170, name: 'Samosa (2)',                    cal: 260, prot: 5,   carb: 30, fat: 14, serving: '2 unidades', cat: 'india' },
  { id: 1171, name: 'Pollo tandoori',                cal: 280, prot: 32,  carb: 4,  fat: 14, serving: '100g', cat: 'india' },
  { id: 1172, name: 'Palak paneer',                  cal: 320, prot: 14,  carb: 12, fat: 24, serving: '1 plato', cat: 'india' },
  { id: 1173, name: 'Raita',                         cal: 60,  prot: 3,   carb: 6,  fat: 2.5, serving: '100g', cat: 'india' },
  { id: 1174, name: 'Arroz basmati cocido',          cal: 130, prot: 2.7, carb: 28, fat: 0.3, serving: '100g', cat: 'india' },
  { id: 1175, name: 'Lassi de mango',                cal: 180, prot: 5,   carb: 32, fat: 3,  serving: '1 vaso', cat: 'india' },
  { id: 1176, name: 'Pakoras de vegetales (4)',      cal: 220, prot: 5,   carb: 24, fat: 12, serving: '4 unidades', cat: 'india' },
  { id: 1177, name: 'Curry de camarones',            cal: 340, prot: 22,  carb: 14, fat: 22, serving: '1 plato', cat: 'india' },
  { id: 1178, name: 'Roti',                          cal: 120, prot: 3,   carb: 20, fat: 3,  serving: '1 unidad', cat: 'india' },
  { id: 1179, name: 'Vindaloo de cerdo',             cal: 400, prot: 26,  carb: 16, fat: 26, serving: '1 plato', cat: 'india' },
  { id: 1180, name: 'Korma de pollo',                cal: 440, prot: 26,  carb: 18, fat: 30, serving: '1 plato', cat: 'india' },
  { id: 1181, name: 'Chutney de mango',              cal: 60,  prot: 0.2, carb: 15, fat: 0.1, serving: '1 cda', cat: 'india' },
  { id: 1182, name: 'Papadum (2)',                   cal: 90,  prot: 3,   carb: 12, fat: 3,  serving: '2 unidades', cat: 'india' },

  // ─── COMIDA CARIBEÑA Y CUBANA ─────────────
  { id: 1183, name: 'Mofongo con chicharrón',        cal: 480, prot: 14,  carb: 50, fat: 26, serving: '1 plato', cat: 'caribena' },
  { id: 1184, name: 'Arroz con gandules',            cal: 280, prot: 7,   carb: 50, fat: 6,  serving: '1 taza', cat: 'caribena' },
  { id: 1185, name: 'Pastelón (lasaña de plátano)',  cal: 420, prot: 20,  carb: 38, fat: 22, serving: '1 porción', cat: 'caribena' },
  { id: 1186, name: 'Ropa vieja',                    cal: 340, prot: 28,  carb: 12, fat: 20, serving: '1 plato', cat: 'caribena' },
  { id: 1187, name: 'Moros y cristianos',            cal: 240, prot: 9,   carb: 42, fat: 4,  serving: '1 taza', cat: 'caribena' },
  { id: 1188, name: 'Picadillo cubano',              cal: 300, prot: 22,  carb: 14, fat: 18, serving: '1 plato', cat: 'caribena' },
  { id: 1189, name: 'Vaca frita',                    cal: 320, prot: 30,  carb: 4,  fat: 20, serving: '100g', cat: 'caribena' },
  { id: 1190, name: 'Lechón asado',                  cal: 300, prot: 26,  carb: 0,  fat: 21, serving: '100g', cat: 'caribena' },
  { id: 1191, name: 'Tostones cubanos con mojo',     cal: 260, prot: 2,   carb: 34, fat: 13, serving: '100g', cat: 'caribena' },
  { id: 1192, name: 'Pan cubano con mantequilla',    cal: 220, prot: 6,   carb: 40, fat: 4,  serving: '1 pieza', cat: 'caribena' },
  { id: 1193, name: 'Sandwich cubano',               cal: 520, prot: 30,  carb: 40, fat: 26, serving: '1 unidad', cat: 'caribena' },
  { id: 1194, name: 'Empanada de pollo (caribeña)',  cal: 260, prot: 10,  carb: 26, fat: 13, serving: '1 unidad', cat: 'caribena' },
  { id: 1195, name: 'Alcapurria',                    cal: 240, prot: 5,   carb: 28, fat: 13, serving: '1 unidad', cat: 'caribena' },
  { id: 1196, name: 'Tembleque (postre de coco)',    cal: 220, prot: 2,   carb: 30, fat: 11, serving: '1 porción', cat: 'caribena' },
  { id: 1197, name: 'Flan de coco',                  cal: 260, prot: 5,   carb: 36, fat: 10, serving: '1 porción', cat: 'caribena' },
  { id: 1198, name: 'Guineítos en escabeche',        cal: 180, prot: 1.5, carb: 28, fat: 8,  serving: '100g', cat: 'caribena' },
  { id: 1199, name: 'Bacalaítos fritos (2)',         cal: 220, prot: 10,  carb: 24, fat: 10, serving: '2 unidades', cat: 'caribena' },
  { id: 1200, name: 'Pernil asado',                  cal: 280, prot: 26,  carb: 0,  fat: 19, serving: '100g', cat: 'caribena' },
  { id: 1201, name: 'Habichuelas guisadas',          cal: 200, prot: 10,  carb: 30, fat: 5,  serving: '1 taza', cat: 'caribena' },
  { id: 1202, name: 'Majarete (postre de maíz)',     cal: 200, prot: 3,   carb: 34, fat: 6,  serving: '1 porción', cat: 'caribena' },

  // ─── COMIDA SUDAMERICANA ──────────────────
  { id: 1203, name: 'Arepa de maíz',                 cal: 180, prot: 4,   carb: 36, fat: 2,  serving: '1 unidad', cat: 'sudamericana' },
  { id: 1204, name: 'Arepa rellena de queso',        cal: 320, prot: 12,  carb: 38, fat: 14, serving: '1 unidad', cat: 'sudamericana' },
  { id: 1205, name: 'Bandeja paisa',                 cal: 900, prot: 45,  carb: 70, fat: 50, serving: '1 plato', cat: 'sudamericana' },
  { id: 1206, name: 'Empanada colombiana (2)',       cal: 320, prot: 8,   carb: 30, fat: 18, serving: '2 unidades', cat: 'sudamericana' },
  { id: 1207, name: 'Sancocho colombiano',           cal: 340, prot: 22,  carb: 36, fat: 12, serving: '1 tazón', cat: 'sudamericana' },
  { id: 1208, name: 'Patacones con hogao',           cal: 280, prot: 3,   carb: 36, fat: 14, serving: '100g', cat: 'sudamericana' },
  { id: 1209, name: 'Lechona',                       cal: 340, prot: 24,  carb: 10, fat: 22, serving: '100g', cat: 'sudamericana' },
  { id: 1210, name: 'Lomo saltado',                  cal: 460, prot: 30,  carb: 40, fat: 20, serving: '1 plato', cat: 'sudamericana' },
  { id: 1211, name: 'Ají de gallina',                cal: 420, prot: 26,  carb: 30, fat: 22, serving: '1 plato', cat: 'sudamericana' },
  { id: 1212, name: 'Causa limeña',                  cal: 300, prot: 12,  carb: 40, fat: 11, serving: '1 porción', cat: 'sudamericana' },
  { id: 1213, name: 'Anticuchos peruanos (3)',       cal: 220, prot: 26,  carb: 3,  fat: 11, serving: '3 unidades', cat: 'sudamericana' },
  { id: 1214, name: 'Arroz chaufa',                  cal: 460, prot: 18,  carb: 60, fat: 16, serving: '1 plato', cat: 'sudamericana' },
  { id: 1215, name: 'Ceviche peruano',               cal: 190, prot: 24,  carb: 10, fat: 4,  serving: '1 plato', cat: 'sudamericana' },
  { id: 1216, name: 'Papa a la huancaína',           cal: 320, prot: 8,   carb: 36, fat: 16, serving: '1 plato', cat: 'sudamericana' },
  { id: 1217, name: 'Asado argentino (mix de carnes)', cal: 320, prot: 28, carb: 0, fat: 22, serving: '100g', cat: 'sudamericana' },
  { id: 1218, name: 'Milanesa napolitana',           cal: 420, prot: 28,  carb: 24, fat: 24, serving: '1 unidad', cat: 'sudamericana' },
  { id: 1219, name: 'Empanada argentina de carne (2)', cal: 340, prot: 12, carb: 30, fat: 19, serving: '2 unidades', cat: 'sudamericana' },
  { id: 1220, name: 'Choripán',                      cal: 420, prot: 18,  carb: 32, fat: 25, serving: '1 unidad', cat: 'sudamericana' },
  { id: 1221, name: 'Provoleta',                     cal: 300, prot: 20,  carb: 2,  fat: 24, serving: '100g', cat: 'sudamericana' },
  { id: 1222, name: 'Locro argentino',               cal: 280, prot: 14,  carb: 32, fat: 11, serving: '1 tazón', cat: 'sudamericana' },
  { id: 1223, name: 'Feijoada',                      cal: 420, prot: 26,  carb: 34, fat: 20, serving: '1 plato', cat: 'sudamericana' },
  { id: 1224, name: 'Pão de queijo (3)',             cal: 240, prot: 6,   carb: 24, fat: 13, serving: '3 unidades', cat: 'sudamericana' },
  { id: 1225, name: 'Coxinha',                       cal: 260, prot: 10,  carb: 26, fat: 13, serving: '1 unidad', cat: 'sudamericana' },
  { id: 1226, name: 'Moqueca de pescado',            cal: 340, prot: 26,  carb: 12, fat: 21, serving: '1 plato', cat: 'sudamericana' },
  { id: 1227, name: 'Farofa',                        cal: 180, prot: 2,   carb: 24, fat: 9,  serving: '100g', cat: 'sudamericana' },
  { id: 1228, name: 'Brigadeiro (2)',                cal: 140, prot: 2,   carb: 20, fat: 6,  serving: '2 unidades', cat: 'sudamericana' },
  { id: 1229, name: 'Arepa reina pepiada',           cal: 380, prot: 16,  carb: 40, fat: 18, serving: '1 unidad', cat: 'sudamericana' },
  { id: 1230, name: 'Encebollado ecuatoriano',       cal: 260, prot: 22,  carb: 26, fat: 8,  serving: '1 tazón', cat: 'sudamericana' },

  // ─── POSTRES INTERNACIONALES ──────────────
  { id: 1231, name: 'Macarons (2)',                  cal: 180, prot: 3,   carb: 22, fat: 9,  serving: '2 unidades', cat: 'postres_intl' },
  { id: 1232, name: 'Éclair de chocolate',           cal: 260, prot: 4,   carb: 26, fat: 16, serving: '1 unidad', cat: 'postres_intl' },
  { id: 1233, name: 'Mochi (2)',                     cal: 140, prot: 2,   carb: 30, fat: 1.5, serving: '2 unidades', cat: 'postres_intl' },
  { id: 1234, name: 'Crème brûlée',                  cal: 320, prot: 5,   carb: 24, fat: 23, serving: '1 porción', cat: 'postres_intl' },
  { id: 1235, name: 'Profiteroles (3)',              cal: 300, prot: 5,   carb: 26, fat: 20, serving: '3 unidades', cat: 'postres_intl' },
  { id: 1236, name: 'Panqueque con dulce de leche',  cal: 280, prot: 5,   carb: 40, fat: 11, serving: '1 unidad', cat: 'postres_intl' },
  { id: 1237, name: 'Alfajor',                       cal: 220, prot: 3,   carb: 28, fat: 11, serving: '1 unidad', cat: 'postres_intl' },
  { id: 1238, name: 'Polvorón',                      cal: 90,  prot: 1,   carb: 10, fat: 5,  serving: '1 unidad', cat: 'postres_intl' },
  { id: 1239, name: 'Cocada',                        cal: 160, prot: 1.5, carb: 20, fat: 9,  serving: '1 unidad', cat: 'postres_intl' },
  { id: 1240, name: 'Turrón',                        cal: 180, prot: 4,   carb: 20, fat: 10, serving: '30g', cat: 'postres_intl' },
  { id: 1241, name: 'Macedonia de frutas con crema', cal: 180, prot: 3,   carb: 26, fat: 7,  serving: '1 porción', cat: 'postres_intl' },
  { id: 1242, name: 'Cannoli siciliano',             cal: 280, prot: 6,   carb: 28, fat: 16, serving: '1 unidad', cat: 'postres_intl' },
  { id: 1243, name: 'Sorbete de limón',              cal: 120, prot: 0.3, carb: 30, fat: 0.2, serving: '100g', cat: 'postres_intl' },
  { id: 1244, name: 'Gelato de chocolate',           cal: 220, prot: 4,   carb: 26, fat: 11, serving: '100g', cat: 'postres_intl' },
  { id: 1245, name: 'Mousse de chocolate',           cal: 260, prot: 4,   carb: 22, fat: 18, serving: '1 porción', cat: 'postres_intl' },
  { id: 1246, name: 'Trifle (postre de capas)',      cal: 300, prot: 5,   carb: 40, fat: 13, serving: '1 porción', cat: 'postres_intl' },
  { id: 1247, name: 'Rollo de canela (cinnamon roll)', cal: 380, prot: 6, carb: 52, fat: 16, serving: '1 unidad', cat: 'postres_intl' },
  { id: 1248, name: 'Galleta shortbread (2)',        cal: 140, prot: 1.5, carb: 16, fat: 8,  serving: '2 unidades', cat: 'postres_intl' },
  { id: 1249, name: 'Pastel red velvet (rebanada)',  cal: 400, prot: 5,   carb: 52, fat: 19, serving: '1 rebanada', cat: 'postres_intl' },
  { id: 1250, name: 'Pay de limón (rebanada)',       cal: 340, prot: 5,   carb: 46, fat: 15, serving: '1 rebanada', cat: 'postres_intl' },

  // ─── GUARNICIONES / ACOMPAÑAMIENTOS ───────
  { id: 1251, name: 'Arroz amarillo',                cal: 145, prot: 2.8, carb: 30, fat: 1.5, serving: '100g', cat: 'guarniciones' },
  { id: 1252, name: 'Puré de coliflor',              cal: 70,  prot: 2.5, carb: 8,  fat: 3.5, serving: '100g', cat: 'guarniciones' },
  { id: 1253, name: 'Vegetales al vapor mixtos',     cal: 50,  prot: 2,   carb: 10, fat: 0.3, serving: '100g', cat: 'guarniciones' },
  { id: 1254, name: 'Papas al vapor',                cal: 80,  prot: 2,   carb: 18, fat: 0.1, serving: '100g', cat: 'guarniciones' },
  { id: 1255, name: 'Papas gajo al horno (wedges)',  cal: 180, prot: 3,   carb: 28, fat: 6,  serving: '100g', cat: 'guarniciones' },
  { id: 1256, name: 'Arroz con vegetales',           cal: 180, prot: 4,   carb: 34, fat: 3,  serving: '100g', cat: 'guarniciones' },
  { id: 1257, name: 'Frijoles molidos',              cal: 150, prot: 8,   carb: 22, fat: 3.5, serving: '100g', cat: 'guarniciones' },
  { id: 1258, name: 'Frijoles enteros cocidos',      cal: 130, prot: 8,   carb: 22, fat: 0.5, serving: '100g', cat: 'guarniciones' },
  { id: 1259, name: 'Tortillas integrales (2)',      cal: 180, prot: 5,   carb: 32, fat: 4,  serving: '2 unidades', cat: 'guarniciones' },
  { id: 1260, name: 'Pan de ajo',                    cal: 150, prot: 3,   carb: 18, fat: 7,  serving: '1 rebanada', cat: 'guarniciones' },
  { id: 1261, name: 'Vegetales salteados con ajo',   cal: 90,  prot: 2,   carb: 8,  fat: 6,  serving: '100g', cat: 'guarniciones' },
  { id: 1262, name: 'Chayote guisado',               cal: 45,  prot: 1,   carb: 8,  fat: 1.5, serving: '100g', cat: 'guarniciones' },
  { id: 1263, name: 'Ayote guisado',                 cal: 40,  prot: 1.5, carb: 9,  fat: 0.3, serving: '100g', cat: 'guarniciones' },
  { id: 1264, name: 'Rodajas de tomate con cebolla', cal: 40,  prot: 1,   carb: 7,  fat: 0.5, serving: '100g', cat: 'guarniciones' },
  { id: 1265, name: 'Papitas doradas (baby potatoes)', cal: 140, prot: 2.5, carb: 24, fat: 4, serving: '100g', cat: 'guarniciones' },

  // ─── MÁS PROTEÍNAS / CARNES ───────────────
  { id: 1266, name: 'Pavo asado (pechuga)',          cal: 135, prot: 30,  carb: 0,  fat: 1,  serving: '100g', cat: 'proteinas' },
  { id: 1267, name: 'Pato asado',                    cal: 340, prot: 19,  carb: 0,  fat: 28, serving: '100g', cat: 'proteinas' },
  { id: 1268, name: 'Codorniz asada',                cal: 190, prot: 22,  carb: 0,  fat: 11, serving: '100g', cat: 'proteinas' },
  { id: 1269, name: 'Conejo guisado',                cal: 170, prot: 25,  carb: 1,  fat: 7,  serving: '100g', cat: 'proteinas' },
  { id: 1270, name: 'Venado (carne de caza)',        cal: 150, prot: 30,  carb: 0,  fat: 3,  serving: '100g', cat: 'proteinas' },
  { id: 1271, name: 'Bacalao seco desalado',         cal: 130, prot: 29,  carb: 0,  fat: 1,  serving: '100g', cat: 'proteinas' },
  { id: 1272, name: 'Atún fresco a la plancha',      cal: 145, prot: 27,  carb: 0,  fat: 3,  serving: '100g', cat: 'proteinas' },
  { id: 1273, name: 'Mahi mahi a la plancha',        cal: 140, prot: 26,  carb: 0,  fat: 3.5, serving: '100g', cat: 'proteinas' },
  { id: 1274, name: 'Anchoas',                       cal: 210, prot: 29,  carb: 0,  fat: 10, serving: '30g', cat: 'proteinas' },
  { id: 1275, name: 'Sardinas en lata',              cal: 208, prot: 25,  carb: 0,  fat: 11, serving: '100g', cat: 'proteinas' },
  { id: 1276, name: 'Costillas de cordero',          cal: 290, prot: 25,  carb: 0,  fat: 21, serving: '100g', cat: 'proteinas' },
  { id: 1277, name: 'Pierna de cordero asada',       cal: 250, prot: 27,  carb: 0,  fat: 15, serving: '100g', cat: 'proteinas' },
  { id: 1278, name: 'Res grado premium (ribeye)',    cal: 291, prot: 24,  carb: 0,  fat: 22, serving: '100g', cat: 'proteinas' },
  { id: 1279, name: 'Falda de res (flank steak)',    cal: 200, prot: 27,  carb: 0,  fat: 10, serving: '100g', cat: 'proteinas' },
  { id: 1280, name: 'Solomillo de cerdo',            cal: 143, prot: 26,  carb: 0,  fat: 3.5, serving: '100g', cat: 'proteinas' },

  // ─── MÁS QUESOS ───────────────────────────
  { id: 1281, name: 'Queso brie',                    cal: 334, prot: 21,  carb: 0.5, fat: 28, serving: '100g', cat: 'lacteos' },
  { id: 1282, name: 'Queso camembert',               cal: 300, prot: 20,  carb: 0.5, fat: 24, serving: '100g', cat: 'lacteos' },
  { id: 1283, name: 'Queso feta',                    cal: 264, prot: 14,  carb: 4,  fat: 21, serving: '100g', cat: 'lacteos' },
  { id: 1284, name: 'Queso ricotta',                 cal: 174, prot: 11,  carb: 3,  fat: 13, serving: '100g', cat: 'lacteos' },
  { id: 1285, name: 'Queso manchego',                cal: 400, prot: 26,  carb: 0.5, fat: 33, serving: '100g', cat: 'lacteos' },
  { id: 1286, name: 'Queso panela',                  cal: 230, prot: 18,  carb: 2,  fat: 17, serving: '100g', cat: 'lacteos' },
  { id: 1287, name: 'Queso oaxaca',                  cal: 320, prot: 22,  carb: 2,  fat: 25, serving: '100g', cat: 'lacteos' },
  { id: 1288, name: 'Queso cottage',                 cal: 98,  prot: 11,  carb: 3.4, fat: 4.3, serving: '100g', cat: 'lacteos' },
  { id: 1289, name: 'Queso de cabra',                cal: 364, prot: 22,  carb: 0,  fat: 30, serving: '100g', cat: 'lacteos' },
  { id: 1290, name: 'Queso suizo (emmental)',        cal: 380, prot: 27,  carb: 1.5, fat: 30, serving: '100g', cat: 'lacteos' },
  { id: 1291, name: 'Queso amarillo americano (loncha)', cal: 70, prot: 4, carb: 2, fat: 5, serving: '1 rebanada', cat: 'lacteos' },
  { id: 1292, name: 'Queso philadelphia light',      cal: 60,  prot: 2.5, carb: 2,  fat: 5,  serving: '30g', cat: 'lacteos' },

  // ─── MÁS EMBUTIDOS, NUECES Y SEMILLAS ─────
  { id: 1293, name: 'Mortadela',                     cal: 90,  prot: 4,   carb: 1,  fat: 8,  serving: '30g', cat: 'snacks' },
  { id: 1294, name: 'Jamón cocido',                  cal: 35,  prot: 5,   carb: 0.5, fat: 1.5, serving: '30g', cat: 'snacks' },
  { id: 1295, name: 'Tocino frito (2 tiras)',        cal: 90,  prot: 6,   carb: 0.2, fat: 7,  serving: '2 tiras', cat: 'snacks' },
  { id: 1296, name: 'Prosciutto',                    cal: 65,  prot: 8,   carb: 0,  fat: 3.5, serving: '30g', cat: 'snacks' },
  { id: 1297, name: 'Nueces de macadamia',           cal: 200, prot: 2,   carb: 4,  fat: 21, serving: '30g', cat: 'snacks' },
  { id: 1298, name: 'Nueces de castilla (walnuts)',  cal: 185, prot: 4.3, carb: 4,  fat: 18, serving: '30g', cat: 'snacks' },
  { id: 1299, name: 'Pistachos',                     cal: 160, prot: 6,   carb: 8,  fat: 13, serving: '30g', cat: 'snacks' },
  { id: 1300, name: 'Nueces de la India (cashews)',  cal: 155, prot: 5,   carb: 9,  fat: 12, serving: '30g', cat: 'snacks' },
  { id: 1301, name: 'Semillas de chía',              cal: 70,  prot: 2.5, carb: 6,  fat: 4.5, serving: '15g', cat: 'snacks' },
  { id: 1302, name: 'Semillas de linaza',            cal: 75,  prot: 2.5, carb: 4,  fat: 6,  serving: '15g', cat: 'snacks' },
  { id: 1303, name: 'Semillas de girasol',           cal: 165, prot: 6,   carb: 6,  fat: 14, serving: '30g', cat: 'snacks' },
  { id: 1304, name: 'Semillas de calabaza (pepitoria)', cal: 150, prot: 8, carb: 4, fat: 13, serving: '30g', cat: 'snacks' },
  { id: 1305, name: 'Avellanas',                     cal: 178, prot: 4,   carb: 5,  fat: 17, serving: '30g', cat: 'snacks' },
  { id: 1306, name: 'Piñones',                       cal: 190, prot: 4,   carb: 4,  fat: 19, serving: '30g', cat: 'snacks' },
  { id: 1307, name: 'Coco rallado',                  cal: 190, prot: 2,   carb: 7,  fat: 18, serving: '30g', cat: 'snacks' },
  { id: 1308, name: 'Mix de nueces con miel',        cal: 170, prot: 5,   carb: 12, fat: 12, serving: '30g', cat: 'snacks' },
  { id: 1309, name: 'Mantequilla de almendra',       cal: 98,  prot: 3.4, carb: 3,  fat: 9,  serving: '1 cda', cat: 'snacks' },
  { id: 1310, name: 'Tahini (pasta de sésamo)',      cal: 89,  prot: 2.6, carb: 3.2, fat: 8, serving: '1 cda', cat: 'snacks' },

  // ─── MÁS BEBIDAS ──────────────────────────
  { id: 1311, name: 'Jugo de manzana natural',       cal: 115, prot: 0.3, carb: 28, fat: 0.3, serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 1312, name: 'Jugo de zanahoria',             cal: 95,  prot: 2,   carb: 22, fat: 0.5, serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 1313, name: 'Jugo de piña natural',          cal: 130, prot: 0.5, carb: 32, fat: 0.3, serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 1314, name: 'Jugo de sandía',                cal: 60,  prot: 1,   carb: 15, fat: 0.3, serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 1315, name: 'Jugo verde (detox)',            cal: 90,  prot: 2,   carb: 20, fat: 0.5, serving: '1 vaso (350ml)', cat: 'bebidas' },
  { id: 1316, name: 'Agua fresca de jamaica',        cal: 50,  prot: 0.2, carb: 13, fat: 0,  serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 1317, name: 'Agua fresca de pepino con limón', cal: 30, prot: 0.2, carb: 8, fat: 0, serving: '1 vaso', cat: 'bebidas' },
  { id: 1318, name: 'Chocolate caliente',            cal: 190, prot: 8,   carb: 27, fat: 6,  serving: '1 taza', cat: 'bebidas' },
  { id: 1319, name: 'Atol de elote',                 cal: 150, prot: 3,   carb: 30, fat: 2,  serving: '1 taza', cat: 'bebidas' },
  { id: 1320, name: 'Ponche de frutas caliente',     cal: 140, prot: 0.5, carb: 35, fat: 0,  serving: '1 vaso', cat: 'bebidas' },
  { id: 1321, name: 'Té verde',                      cal: 2,   prot: 0,   carb: 0,  fat: 0,  serving: '1 taza', cat: 'bebidas' },
  { id: 1322, name: 'Té de manzanilla',              cal: 1,   prot: 0,   carb: 0.2, fat: 0, serving: '1 taza', cat: 'bebidas' },
  { id: 1323, name: 'Kombucha',                      cal: 60,  prot: 0,   carb: 14, fat: 0,  serving: '1 vaso (250ml)', cat: 'bebidas' },
  { id: 1324, name: 'Batido de proteína con fruta',  cal: 260, prot: 28,  carb: 30, fat: 3,  serving: '1 vaso', cat: 'bebidas' },
  { id: 1325, name: 'Smoothie verde (espinaca y fruta)', cal: 180, prot: 4, carb: 38, fat: 2, serving: '1 vaso (350ml)', cat: 'bebidas' },
  { id: 1326, name: 'Café americano',                cal: 5,   prot: 0.3, carb: 1,  fat: 0,  serving: '1 taza', cat: 'bebidas' },
  { id: 1327, name: 'Espresso',                      cal: 3,   prot: 0.1, carb: 0.5, fat: 0, serving: '1 shot', cat: 'bebidas' },
  { id: 1328, name: 'Refresco de naranja',           cal: 160, prot: 0,   carb: 44, fat: 0,  serving: '1 lata (355ml)', cat: 'bebidas' },

  // ─── MÁS FRUTAS EXÓTICAS ──────────────────
  { id: 1329, name: 'Pitahaya (fruta del dragón)',   cal: 60,  prot: 1.2, carb: 13, fat: 0.4, serving: '100g', cat: 'frutas' },
  { id: 1330, name: 'Rambután',                      cal: 75,  prot: 0.9, carb: 21, fat: 0.2, serving: '100g', cat: 'frutas' },
  { id: 1331, name: 'Longan',                        cal: 60,  prot: 1.3, carb: 15, fat: 0.1, serving: '100g', cat: 'frutas' },
  { id: 1332, name: 'Mangostán',                     cal: 73,  prot: 0.4, carb: 18, fat: 0.6, serving: '100g', cat: 'frutas' },
  { id: 1333, name: 'Caimito',                       cal: 67,  prot: 0.7, carb: 15, fat: 1,  serving: '100g', cat: 'frutas' },
  { id: 1334, name: 'Anona / chirimoya',             cal: 94,  prot: 2,   carb: 24, fat: 0.3, serving: '100g', cat: 'frutas' },
  { id: 1335, name: 'Guanábana',                     cal: 66,  prot: 1,   carb: 17, fat: 0.3, serving: '100g', cat: 'frutas' },
  { id: 1336, name: 'Icaco',                         cal: 55,  prot: 0.7, carb: 13, fat: 0.3, serving: '100g', cat: 'frutas' },
  { id: 1337, name: 'Membrillo',                     cal: 57,  prot: 0.4, carb: 15, fat: 0.1, serving: '100g', cat: 'frutas' },
  { id: 1338, name: 'Grosella',                      cal: 56,  prot: 1.4, carb: 13, fat: 0.2, serving: '100g', cat: 'frutas' },
  { id: 1339, name: 'Melocotón en almíbar',          cal: 75,  prot: 0.5, carb: 19, fat: 0.1, serving: '100g', cat: 'frutas' },
  { id: 1340, name: 'Fresas con crema',              cal: 150, prot: 2,   carb: 18, fat: 8,  serving: '1 porción', cat: 'frutas' },

  // ─── MÁS VERDURAS ─────────────────────────
  { id: 1341, name: 'Acelga',                        cal: 19,  prot: 1.8, carb: 3.7, fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 1342, name: 'Berros',                        cal: 11,  prot: 2.3, carb: 1.3, fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 1343, name: 'Endivia',                       cal: 17,  prot: 1.3, carb: 3.4, fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 1344, name: 'Hinojo',                        cal: 31,  prot: 1.2, carb: 7.3, fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 1345, name: 'Colinabo',                      cal: 27,  prot: 1.7, carb: 6.2, fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 1346, name: 'Jícama',                        cal: 38,  prot: 0.7, carb: 9,  fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 1347, name: 'Palmito',                       cal: 26,  prot: 2.5, carb: 4.6, fat: 0.5, serving: '100g', cat: 'verduras' },
  { id: 1348, name: 'Verdolaga',                     cal: 16,  prot: 1.3, carb: 3.4, fat: 0.1, serving: '100g', cat: 'verduras' },
  { id: 1349, name: 'Malanga cocida',                cal: 130, prot: 1.5, carb: 30, fat: 0.2, serving: '100g', cat: 'verduras' },
  { id: 1350, name: 'Chile jalapeño',                cal: 29,  prot: 0.9, carb: 6.5, fat: 0.4, serving: '100g', cat: 'verduras' },
  { id: 1351, name: 'Chile habanero',                cal: 40,  prot: 1.9, carb: 8.8, fat: 0.4, serving: '100g', cat: 'verduras' },
  { id: 1352, name: 'Tomate cherry',                 cal: 18,  prot: 0.9, carb: 3.9, fat: 0.2, serving: '100g', cat: 'verduras' },

  // ─── MÁS PANES Y CEREALES ─────────────────
  { id: 1353, name: 'Pan de centeno',                cal: 259, prot: 8.5, carb: 48, fat: 3.3, serving: '100g', cat: 'carbohidratos' },
  { id: 1354, name: 'Pan de avena',                  cal: 246, prot: 9,   carb: 46, fat: 3.5, serving: '100g', cat: 'carbohidratos' },
  { id: 1355, name: 'Tortita de arroz (rice cake)',  cal: 35,  prot: 0.7, carb: 7.3, fat: 0.3, serving: '1 unidad', cat: 'carbohidratos' },
  { id: 1356, name: 'Cereal integral con fibra',     cal: 120, prot: 3,   carb: 28, fat: 1,  serving: '30g', cat: 'carbohidratos' },
  { id: 1357, name: 'Muesli',                        cal: 130, prot: 4,   carb: 22, fat: 3,  serving: '30g', cat: 'carbohidratos' },
  { id: 1358, name: 'Arroz salvaje (wild rice) cocido', cal: 101, prot: 4, carb: 21, fat: 0.3, serving: '100g', cat: 'carbohidratos' },
  { id: 1359, name: 'Bulgur cocido',                 cal: 83,  prot: 3,   carb: 18.6, fat: 0.2, serving: '100g', cat: 'carbohidratos' },
  { id: 1360, name: 'Polenta',                       cal: 85,  prot: 2,   carb: 18, fat: 0.5, serving: '100g', cat: 'carbohidratos' },
  { id: 1361, name: 'Trigo sarraceno cocido',        cal: 92,  prot: 3.4, carb: 20, fat: 0.6, serving: '100g', cat: 'carbohidratos' },
  { id: 1362, name: 'Amaranto cocido',               cal: 102, prot: 4,   carb: 19, fat: 1.6, serving: '100g', cat: 'carbohidratos' },
  { id: 1363, name: 'Pan de hamburguesa',            cal: 140, prot: 5,   carb: 26, fat: 2,  serving: '1 unidad', cat: 'carbohidratos' },
  { id: 1364, name: 'Pan de hot dog',                cal: 120, prot: 4,   carb: 22, fat: 2,  serving: '1 unidad', cat: 'carbohidratos' },

  // ─── MÁS PLATOS HONDUREÑOS ────────────────
  { id: 1365, name: 'Sopa de pata',                  cal: 280, prot: 20,  carb: 20, fat: 14, serving: '1 tazón', cat: 'honduras' },
  { id: 1366, name: 'Tortitas de yuca (2)',          cal: 220, prot: 3,   carb: 36, fat: 7,  serving: '2 unidades', cat: 'honduras' },
  { id: 1367, name: 'Baleada mixta (con carne)',     cal: 560, prot: 26,  carb: 48, fat: 30, serving: '1 unidad', cat: 'honduras' },
  { id: 1368, name: 'Pollo chuco',                   cal: 480, prot: 22,  carb: 45, fat: 24, serving: '1 plato', cat: 'honduras' },
  { id: 1369, name: 'Tapado de mariscos',            cal: 380, prot: 26,  carb: 28, fat: 18, serving: '1 tazón', cat: 'honduras' },
  { id: 1370, name: 'Pinchos de carne (2)',          cal: 260, prot: 24,  carb: 6,  fat: 15, serving: '2 unidades', cat: 'honduras' },
  { id: 1371, name: 'Tortas de plátano hondureñas (2)', cal: 200, prot: 2, carb: 34, fat: 7, serving: '2 unidades', cat: 'hondurasSnacks' },
  { id: 1372, name: 'Cajeta',                        cal: 200, prot: 1.5, carb: 30, fat: 8,  serving: '30g', cat: 'hondurasSnacks' },
  { id: 1373, name: 'Dulce de leche cortada',        cal: 180, prot: 3,   carb: 28, fat: 6,  serving: '100g', cat: 'hondurasSnacks' },
  { id: 1374, name: 'Refresco de ensalada de fruta',  cal: 90,  prot: 1,   carb: 22, fat: 0.3, serving: '1 vaso', cat: 'hondurasSnacks' },

  // ─── MÁS DESAYUNOS ────────────────────────
  { id: 1375, name: 'Huevos rancheros',              cal: 380, prot: 18,  carb: 30, fat: 22, serving: '1 plato', cat: 'desayunos' },
  { id: 1376, name: 'Huevos pochados (2)',           cal: 150, prot: 12,  carb: 1,  fat: 10, serving: '2 unidades', cat: 'desayunos' },
  { id: 1377, name: 'Huevos endiablados (4)',        cal: 200, prot: 12,  carb: 2,  fat: 16, serving: '4 unidades', cat: 'desayunos' },
  { id: 1378, name: 'Tostada con aguacate',          cal: 220, prot: 6,   carb: 22, fat: 12, serving: '1 unidad', cat: 'desayunos' },
  { id: 1379, name: 'Tostada con mantequilla de maní', cal: 260, prot: 9, carb: 26, fat: 14, serving: '1 unidad', cat: 'desayunos' },
  { id: 1380, name: 'Crepas dulces (2)',             cal: 320, prot: 7,   carb: 44, fat: 13, serving: '2 unidades', cat: 'desayunos' },
  { id: 1381, name: 'Yogurt griego con miel y nueces', cal: 260, prot: 14, carb: 24, fat: 12, serving: '1 tazón', cat: 'desayunos' },
  { id: 1382, name: 'Desayuno americano completo',   cal: 650, prot: 28,  carb: 45, fat: 40, serving: '1 plato', cat: 'desayunos' },

  // ─── MÁS FRITURAS ─────────────────────────
  { id: 1383, name: 'Pechuga apanada frita',         cal: 300, prot: 24,  carb: 16, fat: 17, serving: '100g', cat: 'frituras' },
  { id: 1384, name: 'Chicharrón de pollo',           cal: 280, prot: 20,  carb: 10, fat: 18, serving: '100g', cat: 'frituras' },
  { id: 1385, name: 'Costilla ahumada BBQ',          cal: 320, prot: 24,  carb: 6,  fat: 22, serving: '100g', cat: 'frituras' },
  { id: 1386, name: 'Bistec encebollado',            cal: 260, prot: 27,  carb: 6,  fat: 14, serving: '100g', cat: 'frituras' },
  { id: 1387, name: 'Carne en su jugo',              cal: 280, prot: 24,  carb: 8,  fat: 17, serving: '1 tazón', cat: 'frituras' },
  { id: 1388, name: 'Pollo a la leña (pieza)',       cal: 260, prot: 24,  carb: 2,  fat: 17, serving: '1 pieza', cat: 'frituras' },
  { id: 1389, name: 'Res al carbón',                 cal: 270, prot: 28,  carb: 0,  fat: 17, serving: '100g', cat: 'frituras' },
  { id: 1390, name: 'Chuletas ahumadas a la parrilla', cal: 230, prot: 24, carb: 1, fat: 14, serving: '100g', cat: 'frituras' },

  // ─── MÁS COMIDA RÁPIDA ────────────────────
  { id: 1391, name: 'Papas a la francesa con chile y limón', cal: 360, prot: 5, carb: 46, fat: 18, serving: '1 orden', cat: 'rapida' },
  { id: 1392, name: 'Hamburguesa vegetariana',       cal: 380, prot: 16,  carb: 42, fat: 16, serving: '1 unidad', cat: 'rapida' },
  { id: 1393, name: 'Wrap vegetariano',              cal: 340, prot: 10,  carb: 40, fat: 14, serving: '1 unidad', cat: 'rapida' },
  { id: 1394, name: 'Sandwich de pavo',              cal: 380, prot: 22,  carb: 36, fat: 14, serving: '1 unidad', cat: 'rapida' },
  { id: 1395, name: 'Papas con chile y queso (loaded fries)', cal: 560, prot: 16, carb: 48, fat: 34, serving: '1 orden', cat: 'rapida' },
  { id: 1396, name: 'Taco de fast food (crunchy)',   cal: 180, prot: 8,   carb: 14, fat: 10, serving: '1 unidad', cat: 'rapida' },
  { id: 1397, name: 'Burrito supremo',               cal: 620, prot: 28,  carb: 62, fat: 28, serving: '1 unidad', cat: 'rapida' },
  { id: 1398, name: 'Ensalada de fast food con pollo crujiente', cal: 460, prot: 26, carb: 30, fat: 26, serving: '1 plato', cat: 'rapida' },

  // ─── MÁS COMIDA MEXICANA ──────────────────
  { id: 1399, name: 'Flautas (3)',                   cal: 380, prot: 16,  carb: 34, fat: 20, serving: '3 unidades', cat: 'mexicana' },
  { id: 1400, name: 'Huaraches',                     cal: 420, prot: 16,  carb: 42, fat: 20, serving: '1 unidad', cat: 'mexicana' },
  { id: 1401, name: 'Machaca norteña',               cal: 340, prot: 28,  carb: 4,  fat: 22, serving: '1 plato', cat: 'mexicana' },
  { id: 1402, name: 'Barbacoa de res',               cal: 300, prot: 26,  carb: 2,  fat: 20, serving: '100g', cat: 'mexicana' },
  { id: 1403, name: 'Cochinita pibil',               cal: 320, prot: 24,  carb: 8,  fat: 20, serving: '100g', cat: 'mexicana' },
  { id: 1404, name: 'Sopa azteca',                   cal: 220, prot: 10,  carb: 24, fat: 9,  serving: '1 tazón', cat: 'mexicana' },

  // ─── MÁS SALSAS Y CONDIMENTOS ─────────────
  { id: 1405, name: 'Alioli (salsa de ajo)',         cal: 90,  prot: 0.3, carb: 0.5, fat: 10, serving: '1 cda', cat: 'condimentos' },
  { id: 1406, name: 'Salsa criolla',                 cal: 20,  prot: 0.3, carb: 3,  fat: 0.8, serving: '1 cda', cat: 'condimentos' },
  { id: 1407, name: 'Adobo en polvo',                cal: 8,   prot: 0.3, carb: 1.5, fat: 0.1, serving: '1 cdta', cat: 'condimentos' },
  { id: 1408, name: 'Salsa verde (tomatillo)',       cal: 15,  prot: 0.4, carb: 3,  fat: 0.3, serving: '1 cda', cat: 'condimentos' },
  { id: 1409, name: 'Salsa de chile chipotle',       cal: 25,  prot: 0.3, carb: 3,  fat: 1.5, serving: '1 cda', cat: 'condimentos' },
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
  { id: 'condimentos',    name: 'Salsas y aderezos',   icon: 'droplets' },
  { id: 'frituras',       name: 'Frituras y asados',   icon: 'flame' },
  { id: 'rapida',         name: 'Comida rápida',       icon: 'sandwich' },
  { id: 'desayunos',      name: 'Desayunos',           icon: 'egg' },
  { id: 'panaderia',      name: 'Panadería y repostería', icon: 'croissant' },
  { id: 'mariscos',       name: 'Mariscos',            icon: 'fish' },
  { id: 'mexicana',       name: 'Comida mexicana',     icon: 'chef-hat' },
  { id: 'italiana',       name: 'Comida italiana',     icon: 'chef-hat' },
  { id: 'asiatica',       name: 'Comida asiática',     icon: 'chef-hat' },
  { id: 'sopas',          name: 'Sopas y caldos',      icon: 'soup' },
  { id: 'ensaladas',      name: 'Ensaladas',           icon: 'salad' },
  { id: 'arabe',          name: 'Comida árabe',        icon: 'landmark' },
  { id: 'india',          name: 'Comida india',        icon: 'globe' },
  { id: 'caribena',       name: 'Comida caribeña',     icon: 'palm-tree' },
  { id: 'sudamericana',   name: 'Comida sudamericana', icon: 'mountain' },
  { id: 'postres_intl',   name: 'Postres internacionales', icon: 'cake-slice' },
  { id: 'guarniciones',   name: 'Guarniciones',        icon: 'utensils-crossed' },
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

/* Medidas alternativas para describir la cantidad de un alimento — no todo
   se registra en gramos: media taza, cucharada, plato, etc. Cada medida SÍ
   recalcula las calorías/macros reales de ese alimento (no es solo una
   etiqueta): se parte del peso real de su porción base (ej. "100g", "1 taza",
   "1 cda (14g)") y se escala con equivalencias estándar de gramos por medida.
   Si un alimento no tiene un peso base identificable (ej. "1 unidad" sin
   gramos, como un huevo o un banano) solo se ofrece "Porción" y "Personalizada",
   para no inventar una conversión sin base real. */
const MEASURE_UNITS = [
  { id: 'porcion',       label: 'Porción (como viene)' },
  { id: 'gramos',        label: 'Gramos' },
  { id: 'ml',            label: 'Mililitros' },
  { id: 'taza',          label: 'Taza' },
  { id: 'media_taza',    label: 'Media taza' },
  { id: 'cda',           label: 'Cucharada' },
  { id: 'cdta',          label: 'Cucharadita' },
  { id: 'plato',         label: 'Plato' },
  { id: 'tazon',         label: 'Tazón' },
  { id: 'personalizada', label: 'Personalizada' },
];

// Gramos (o ml) estándar por medida — las mismas equivalencias que usa la
// mayoría de apps de nutrición (1 taza ≈ 240ml/g, 1 cda ≈ 15g, etc.).
const MEASURE_GRAMS = { taza: 240, media_taza: 120, cda: 15, cdta: 5, plato: 350, tazon: 300 };

/* Intenta deducir cuántos gramos (o ml) representa la porción base de un
   alimento a partir de su texto "serving" (ej. "100g" -> 100, "1 taza" -> 240,
   "1 cda (14g)" -> 14). Devuelve null si no se puede determinar (ej. "1 unidad",
   "1 barra") — en ese caso no se pueden derivar otras medidas para ese alimento. */
function _gramsForServing(serving) {
  if (!serving) return null;
  let m = serving.match(/(\d+(?:\.\d+)?)\s*g\b/i);
  if (m) return parseFloat(m[1]);
  m = serving.match(/(\d+(?:\.\d+)?)\s*ml\b/i);
  if (m) return parseFloat(m[1]);
  const low = serving.toLowerCase();
  if (low.includes('media taza')) return MEASURE_GRAMS.media_taza;
  if (low.includes('taza')) return MEASURE_GRAMS.taza;
  if (low.includes('cdta') || low.includes('cucharadita')) return MEASURE_GRAMS.cdta;
  if (low.includes('cda') || low.includes('cucharada')) return MEASURE_GRAMS.cda;
  if (low.includes('tazón') || low.includes('tazon')) return MEASURE_GRAMS.tazon;
  if (low.includes('plato')) return MEASURE_GRAMS.plato;
  if (low.includes('vaso')) return MEASURE_GRAMS.taza;
  return null;
}

/* Medidas disponibles para un alimento. Los alimentos personalizados
   ("Míos") quedan bloqueados a la única medida con la que se crearon —
   no se puede cambiar ni al guardarlos ni al seleccionarlos después. */
function _measuresForFood(food) {
  if (!food) return ['porcion', 'personalizada'];
  if (food.cat === 'custom') return ['porcion'];
  const grams = _gramsForServing(food.serving);
  const ids = ['porcion'];
  if (grams) {
    ids.push('gramos');
    if (food.cat === 'bebidas') ids.push('ml');
    ids.push('taza', 'media_taza', 'cda', 'cdta', 'plato', 'tazon');
  }
  ids.push('personalizada');
  return ids;
}

/* Calorías/macros reales de "1 unidad" de la medida elegida para ese
   alimento (ej. 1 cucharada de aceite vs. 1 cucharada de pollo NO pesan ni
   valen lo mismo — se deriva del peso real de cada alimento, no de una
   tabla genérica compartida). */
function _macrosForMeasure(food, measureId) {
  const id = measureId || 'porcion';
  if (id === 'porcion' || id === 'personalizada') {
    return { cal: food.cal, prot: food.prot, carb: food.carb, fat: food.fat, label: '' };
  }
  const gramsBase = _gramsForServing(food.serving);
  if (!gramsBase) {
    return { cal: food.cal, prot: food.prot, carb: food.carb, fat: food.fat, label: MEASURE_UNITS.find(u => u.id === id)?.label || '' };
  }
  const targetGrams = (id === 'gramos' || id === 'ml') ? 1 : MEASURE_GRAMS[id];
  const f = targetGrams / gramsBase;
  const round2 = n => Math.round(n * 100) / 100;
  return {
    cal:  round2(food.cal  * f),
    prot: round2(food.prot * f),
    carb: round2(food.carb * f),
    fat:  round2(food.fat  * f),
    label: id === 'gramos' ? 'g' : id === 'ml' ? 'ml' : (MEASURE_UNITS.find(u => u.id === id)?.label || '')
  };
}

const Comidas = {
  fecha: null,

  init() {
    this.fecha = Storage.today();
    this._render();
    const params = new URLSearchParams(location.search);
    if (params.get('openSearch')) {
      const presetTipo = params.get('tipo');
      setTimeout(() => this._showFoodSearch(presetTipo), 50);
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
      <div class="cal-summary fade-in" style="text-align:left;">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:16px;">
          <div>
            <div class="font-mono" style="font-size:11px;letter-spacing:.06em;color:var(--text-muted);margin-bottom:4px;">CONSUMIDAS</div>
            <div class="font-display" style="font-weight:800;font-size:48px;line-height:.9;">${totals.cal}</div>
          </div>
          <div style="text-align:right;">
            <div class="font-mono" style="font-size:11px;letter-spacing:.06em;color:var(--text-muted);margin-bottom:4px;">${totals.cal > metaCal ? 'EXCEDIDAS' : 'RESTAN'}</div>
            <div class="font-display" style="font-weight:800;font-size:28px;line-height:1;color:${totals.cal > metaCal ? 'var(--danger)' : 'var(--lime)'};">${Math.abs(metaCal - totals.cal)}</div>
          </div>
        </div>
        <div style="height:10px;border-radius:999px;background:var(--bg-input);overflow:hidden;margin-bottom:18px;">
          <div style="width:${Math.min(100,(totals.cal/metaCal)*100)}%;height:100%;border-radius:999px;background:linear-gradient(90deg,#7C3AED,var(--lime));"></div>
        </div>
        <div style="display:flex;gap:10px;">
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="font-mono" style="font-size:10px;color:var(--text-muted);">PROT</span><span class="font-mono" style="font-size:10px;font-weight:700;">${totals.prot}g</span></div>
            <div style="height:5px;border-radius:999px;background:var(--bg-input);"><div style="width:${Math.min(100,(totals.prot/metaProt)*100)}%;height:100%;border-radius:999px;background:var(--lime);"></div></div>
          </div>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="font-mono" style="font-size:10px;color:var(--text-muted);">CARB</span><span class="font-mono" style="font-size:10px;font-weight:700;">${totals.carb}g</span></div>
            <div style="height:5px;border-radius:999px;background:var(--bg-input);"><div style="width:${Math.min(100,(totals.carb/metaCarb)*100)}%;height:100%;border-radius:999px;background:#A78BFA;"></div></div>
          </div>
          <div style="flex:1;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span class="font-mono" style="font-size:10px;color:var(--text-muted);">GRAS</span><span class="font-mono" style="font-size:10px;font-weight:700;">${totals.fat}g</span></div>
            <div style="height:5px;border-radius:999px;background:var(--bg-input);"><div style="width:${Math.min(100,(totals.fat/metaFat)*100)}%;height:100%;border-radius:999px;background:var(--amber);"></div></div>
          </div>
        </div>
      </div>

      <!-- Botón acción -->
      <button id="btn-add-food" class="btn-lime" style="width:100%;height:56px;border:none;border-radius:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:20px;">
        <i data-lucide="plus" style="width:19px;height:19px"></i>Agregar alimento
      </button>

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
    const histBtn = document.getElementById('btn-historial-comidas');
    if (histBtn) histBtn.onclick = () => this._showHistorialComidas();
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
    const isToday = this.fecha === Storage.today();
    const currentType = isToday ? this._autoMealType() : null;

    // Solo la comida "en curso" (franja horaria actual) queda abierta; el resto se colapsa.
    if (!this._expandedMeals || this._expandedMealsFecha !== this.fecha) {
      this._expandedMeals = new Set(isToday ? [currentType] : MEAL_TYPES.map(m => m.id));
      this._expandedMealsFecha = this.fecha;
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
      if (mealItems.length === 0) {
        if (meal.id !== currentType) return;
        html += `
          <div class="meal-group fade-in" style="background:transparent;border:1px dashed var(--border-strong);box-shadow:none;">
            <div class="meal-group-header" style="background:transparent;border-bottom:none;cursor:pointer;" data-add-meal="${meal.id}">
              <span class="meal-group-icon"><i data-lucide="${meal.icon}" style="width:18px;height:18px;vertical-align:middle;color:var(--text-muted);"></i></span>
              <span class="meal-group-name" style="color:var(--lime);">+ Añadir ${meal.name.toLowerCase()}</span>
            </div>
          </div>`;
        return;
      }

      const mealCal = Math.round(mealItems.reduce((s, i) => s + (i.cal * i.cantidad), 0));
      const expanded = this._expandedMeals.has(meal.id);

      html += `
        <div class="meal-group fade-in">
          <div class="meal-group-header" data-toggle-meal="${meal.id}" style="cursor:pointer;">
            <span class="meal-group-icon"><i data-lucide="${meal.icon}" style="width:18px;height:18px;vertical-align:middle;"></i></span>
            <span class="meal-group-name">${meal.name}</span>
            <span class="meal-group-cal">${mealCal} kcal</span>
            <i data-lucide="chevron-down" style="width:16px;height:16px;color:var(--text-dim);margin-left:6px;transform:rotate(${expanded ? 180 : 0}deg);transition:transform .2s;"></i>
          </div>
      `;

      if (expanded) {
        html += `<div class="meal-group-items">`;
        mealItems.forEach(item => {
          html += `
            <div class="meal-item" data-id="${item.id}" style="cursor:pointer;">
              <div class="meal-item-info">
                <div class="meal-item-name">${item.nombre}</div>
                <div class="meal-item-detail">${(item.medidaUnitId === 'gramos' || item.medidaUnitId === 'ml') ? `${item.cantidad}${item.medida}` : `${item.cantidad}x ${item.medida || item.serving || ''}`} · ${Math.round(item.cal * item.cantidad)} kcal</div>
              </div>
              <button class="meal-item-del" data-id="${item.id}" title="Eliminar"><i data-lucide="x" style="width:16px;height:16px;pointer-events:none;"></i></button>
            </div>
          `;
        });
        html += `</div>`;
      }

      html += `</div>`;
    });

    if (!html) {
      html = `<div class="empty-state fade-in"><p>No hay comidas registradas este día.</p></div>`;
    }

    container.innerHTML = html;

    container.querySelectorAll('[data-add-meal]').forEach(row => {
      row.addEventListener('click', () => this._showFoodSearch());
    });

    container.querySelectorAll('[data-toggle-meal]').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.toggleMeal;
        if (this._expandedMeals.has(id)) this._expandedMeals.delete(id);
        else this._expandedMeals.add(id);
        this._renderMealsList(registro);
      });
    });

    // Delete buttons
    Icons.init(container);
    container.querySelectorAll('.meal-item-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseFloat(e.target.closest('.meal-item-del').dataset.id);
        this._deleteFood(id);
      });
    });
    container.querySelectorAll('.meal-item').forEach(row => {
      row.addEventListener('click', () => this._showQtyEditor(parseFloat(row.dataset.id)));
    });
  },

  _showQtyEditor(id) {
    const registro = Storage.obtenerComidas(this.fecha);
    const item = (registro.comidas || []).find(c => c.id === id);
    if (!item) return;
    const modal = document.getElementById('food-add-modal');
    if (!modal) return;
    modal.classList.add('active');

    // Alimentos "Míos" (personalizados) quedan bloqueados a la única medida
    // con la que se crearon — items viejos sin este flag se tratan como
    // no-bloqueados y usan sus propios valores base como referencia.
    const locked = !!item.medidaLocked;
    const base = {
      cal: item.baseCal ?? item.cal, prot: item.baseProt ?? item.prot,
      carb: item.baseCarb ?? item.carb, fat: item.baseFat ?? item.fat,
      serving: item.baseServing ?? item.serving,
      cat: locked ? 'custom' : undefined
    };
    const availableIds = _measuresForFood(base);

    let qty = item.cantidad;
    let medidaSel = item.medidaUnitId || 'porcion';
    let medidaCustom = medidaSel === 'personalizada' ? (item.medida || '') : '';

    const draw = () => {
      const m = _macrosForMeasure(base, medidaSel);
      modal.innerHTML = `
        <div class="overlay-content" style="max-width:360px;">
          <h2 style="font-size:1.05rem;margin-bottom:4px;">${item.nombre}</h2>
          <p style="color:var(--text-muted);margin-bottom:16px;">${m.cal} kcal por ${medidaSel === 'porcion' ? (base.serving || 'porción') : m.label}</p>
          <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:18px;">
            <button id="qty-dec" style="width:44px;height:44px;border-radius:50%;border:2px solid var(--border);background:var(--bg-input);color:var(--text-primary);font-size:1.4rem;cursor:pointer;">−</button>
            <input id="qty-val" type="number" step="${medidaSel === 'gramos' || medidaSel === 'ml' ? '1' : '0.25'}" min="${medidaSel === 'gramos' || medidaSel === 'ml' ? '1' : '0.25'}" value="${qty}" style="font-size:1.6rem;font-weight:800;width:84px;text-align:center;background:var(--bg-input);border:1.5px solid var(--border);border-radius:10px;color:var(--text-primary);font-family:inherit;">
            <button id="qty-inc" style="width:44px;height:44px;border-radius:50%;border:2px solid var(--border);background:var(--bg-input);color:var(--text-primary);font-size:1.4rem;cursor:pointer;">+</button>
          </div>
          ${locked ? `
          <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:14px;">Medida: <strong style="color:var(--text-secondary);">${base.serving || 'porción'}</strong> · fija desde que se creó este alimento en "Míos".</p>
          ` : `
          <div class="config-row" style="margin-bottom:${medidaSel === 'personalizada' ? '12' : '18'}px;">
            <label>Medida</label>
            <select id="qty-medida">
              ${MEASURE_UNITS.filter(u => availableIds.includes(u.id)).map(u => `<option value="${u.id}" ${u.id === medidaSel ? 'selected' : ''}>${u.label}</option>`).join('')}
            </select>
          </div>
          ${medidaSel === 'personalizada' ? `
          <div class="config-row" style="margin-bottom:18px;">
            <label>Describe la medida</label>
            <input type="text" id="qty-medida-custom" placeholder="Ej: 1 plato grande" value="${medidaCustom}">
          </div>` : ''}
          `}
          <div style="display:flex;gap:10px;">
            <button id="qty-cancel" class="btn btn-secondary" style="flex:1;">Cancelar</button>
            <button id="qty-save" class="btn btn-primary" style="flex:1;">Guardar</button>
          </div>
        </div>
      `;
      const step = medidaSel === 'gramos' || medidaSel === 'ml' ? 1 : 0.25;
      document.getElementById('qty-dec').onclick = () => { qty = Math.max(step, +(qty - step).toFixed(2)); draw(); };
      document.getElementById('qty-inc').onclick = () => { qty = +(qty + step).toFixed(2); draw(); };
      document.getElementById('qty-val').oninput = (e) => { qty = parseFloat(e.target.value) || qty; };
      document.getElementById('qty-medida')?.addEventListener('change', (e) => {
        medidaSel = e.target.value;
        qty = (medidaSel === 'gramos' || medidaSel === 'ml') ? (_gramsForServing(base.serving) || 100) : 1;
        draw();
      });
      document.getElementById('qty-medida-custom')?.addEventListener('input', (e) => { medidaCustom = e.target.value; });
      document.getElementById('qty-cancel').onclick = () => modal.classList.remove('active');
      document.getElementById('qty-save').onclick = () => {
        const finalMacros = _macrosForMeasure(base, medidaSel);
        item.cantidad = Math.max(step, qty);
        item.medidaUnitId = medidaSel;
        item.medida = medidaSel === 'porcion' ? ''
          : medidaSel === 'personalizada' ? (medidaCustom.trim() || 'Personalizada')
          : finalMacros.label;
        item.cal = finalMacros.cal; item.prot = finalMacros.prot; item.carb = finalMacros.carb; item.fat = finalMacros.fat;
        item.baseCal = base.cal; item.baseProt = base.prot; item.baseCarb = base.carb; item.baseFat = base.fat; item.baseServing = base.serving;
        Storage.guardarComidas(this.fecha, registro);
        modal.classList.remove('active');
        this._render();
      };
    };
    draw();
  },

  _deleteFood(id) {
    const registro = Storage.obtenerComidas(this.fecha);
    registro.comidas = (registro.comidas || []).filter(c => c.id !== id);
    Storage.guardarComidas(this.fecha, registro);
    this._render();
  },

  /* ────── Buscar alimento — sheet a pantalla completa, "+" agrega al instante ────── */
  _autoMealType() {
    const h = new Date().getHours();
    if (h < 9) return 'desayuno';
    if (h < 11) return 'merienda_am';
    if (h < 14) return 'almuerzo';
    if (h < 17) return 'merienda_pm';
    return 'cena';
  },

  /* Selecciona varios alimentos -> ajusta cantidad de cada uno -> elige
     el horario -> guarda todo junto (en vez de agregar uno a la vez).
     presetTipo: cuando se llega desde "marca el hábito" en Hoy, precarga
     ese horario en vez de adivinarlo por la hora actual. */
  _showFoodSearch(presetTipo) {
    const overlay = document.getElementById('food-overlay');
    if (!overlay) return;
    overlay.classList.add('active', 'full');

    const searchInput = document.getElementById('food-search-input');
    const resultsDiv  = document.getElementById('food-search-results');
    const catBtns     = document.getElementById('food-cat-btns');
    const closeBtn    = document.getElementById('food-overlay-close');
    const cartBarEl   = document.getElementById('food-cart-bar');

    searchInput.style.display = '';
    catBtns.style.display = '';
    cartBarEl.innerHTML = '';

    catBtns.innerHTML = `<button class="cat-btn active" data-cat="all">Todos</button>` +
      `<button class="cat-btn" data-cat="mios"><i data-lucide="star" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i>Mios</button>` +
      FOOD_CATEGORIES.map(c => `<button class="cat-btn" data-cat="${c.id}"><i data-lucide="${c.icon}" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i>${c.name}</button>`).join('') +
      `<button class="cat-btn" data-cat="custom"><i data-lucide="pencil" style="width:15px;height:15px;vertical-align:middle;margin-right:4px;"></i>Crear alimento</button>`;

    let currentCat = 'all';
    const selection = new Map(); // id (string) -> { food, qty }

    const renderCartBar = () => {
      if (selection.size === 0) { cartBarEl.innerHTML = ''; return; }
      cartBarEl.innerHTML = `
        <div class="cart-bar">
          <div class="cart-bar-info"><i data-lucide="shopping-basket" style="width:16px;height:16px;"></i>${selection.size} seleccionado${selection.size > 1 ? 's' : ''}</div>
          <button id="cart-confirm" class="btn-lime" style="height:44px;padding:0 18px;border:none;border-radius:12px;cursor:pointer;font-size:14px;display:flex;align-items:center;gap:6px;">Continuar<i data-lucide="arrow-right" style="width:15px;height:15px;"></i></button>
        </div>`;
      Icons.init(cartBarEl);
      document.getElementById('cart-confirm').onclick = () => showReview();
    };

    const renderResults = (filter = '', cat = 'all') => {
      if (cat === 'custom') {
        resultsDiv.innerHTML = this._renderCustomForm();
        this._bindCustomForm(overlay);
        return;
      }

      let foods = cat === 'mios' ? Storage.getCustomFoods() : FOOD_DB;
      if (cat !== 'all' && cat !== 'mios') foods = foods.filter(f => f.cat === cat);
      if (filter.trim()) {
        const q = filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        foods = foods.filter(f => f.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q));
      }

      if (foods.length === 0) {
        resultsDiv.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:20px;">${cat === 'mios' ? 'Aun no tienes alimentos guardados. Usa "Crear alimento".' : 'No se encontraron alimentos. Usa "Crear alimento" para agregar uno nuevo.'}</p>`;
        return;
      }

      resultsDiv.innerHTML = foods.map(f => `
        <div class="food-result ${selection.has(String(f.id)) ? 'in-cart' : ''}" data-food-id="${f.id}">
          <span class="food-cb-box"></span>
          <div class="food-result-info">
            <div class="food-result-name">${f.name}${f.cat === 'custom' ? ' <span class="font-mono" style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:5px;background:rgba(167,139,250,.16);color:var(--brand-light);">MIO</span>' : ''}</div>
            <div class="food-result-detail">${f.serving} . ${f.cal} kcal . P:${f.prot}g C:${f.carb}g G:${f.fat}g</div>
          </div>
        </div>`).join('');

      resultsDiv.querySelectorAll('.food-result').forEach(row => {
        row.addEventListener('click', () => {
          const id = String(row.dataset.foodId);
          const food = foods.find(f => String(f.id) === id);
          if (!food) return;
          if (selection.has(id)) selection.delete(id);
          else selection.set(id, { food, qty: 1 });
          row.classList.toggle('in-cart', selection.has(id));
          renderCartBar();
        });
      });
    };

    const showReview = () => {
      if (selection.size === 0) return;
      searchInput.style.display = 'none';
      catBtns.style.display = 'none';

      let tipo = MEAL_TYPES.some(m => m.id === presetTipo) ? presetTipo : this._autoMealType();

      const renderReviewFooter = () => {
        cartBarEl.innerHTML = `<button id="review-save" class="btn-lime" style="width:100%;height:52px;border:none;border-radius:16px;cursor:pointer;font-size:16px;">Guardar ${selection.size} alimento${selection.size > 1 ? 's' : ''}</button>`;
        document.getElementById('review-save').onclick = () => {
          const registro = Storage.obtenerComidas(this.fecha);
          if (!registro.comidas) registro.comidas = [];
          selection.forEach(entry => {
            const locked = entry.food.cat === 'custom';
            const medidaUnitId = locked ? 'porcion' : (entry.medidaUnitId || 'porcion');
            const m = _macrosForMeasure(entry.food, medidaUnitId);
            const medida = medidaUnitId === 'porcion' ? ''
              : medidaUnitId === 'personalizada' ? ((entry.medidaCustom || '').trim() || 'Personalizada')
              : m.label;
            registro.comidas.push({
              id: Date.now() + Math.random(), nombre: entry.food.name,
              cal: m.cal, prot: m.prot, carb: m.carb, fat: m.fat,
              baseCal: entry.food.cal, baseProt: entry.food.prot, baseCarb: entry.food.carb, baseFat: entry.food.fat,
              serving: entry.food.serving, baseServing: entry.food.serving,
              cantidad: entry.qty, tipo, medidaUnitId, medida, medidaLocked: locked
            });
          });
          Storage.guardarComidas(this.fecha, registro);
          const n = selection.size;
          overlay.classList.remove('active', 'full');
          this._render();
          this._toast(`${n} alimento${n > 1 ? 's' : ''} agregado${n > 1 ? 's' : ''}`);
          this._autoMarkHabit(tipo);
        };
      };

      const renderReviewItems = () => {
        const wrap = document.getElementById('review-items');
        if (!wrap) return;
        wrap.innerHTML = [...selection.entries()].map(([id, entry]) => {
          const locked = entry.food.cat === 'custom';
          const medidaSel = locked ? 'porcion' : (entry.medidaUnitId || 'porcion');
          const m = _macrosForMeasure(entry.food, medidaSel);
          const availableIds = _measuresForFood(entry.food);
          return `
          <div class="meal-item" style="cursor:default;flex-wrap:wrap;">
            <div class="meal-item-info">
              <div class="meal-item-name">${entry.food.name}</div>
              <div class="meal-item-detail">${m.cal} kcal por ${medidaSel === 'porcion' ? (entry.food.serving || 'porci\u00f3n') : m.label}</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
              <button class="rev-qty-dec" data-id="${id}" style="width:28px;height:28px;border-radius:50%;border:1.5px solid var(--border-strong);background:var(--bg-input);color:var(--text-primary);cursor:pointer;">\u2212</button>
              <span style="min-width:26px;text-align:center;font-weight:700;font-size:0.85rem;">${entry.qty}</span>
              <button class="rev-qty-inc" data-id="${id}" style="width:28px;height:28px;border-radius:50%;border:1.5px solid var(--border-strong);background:var(--bg-input);color:var(--text-primary);cursor:pointer;">+</button>
              <button class="rev-remove" data-id="${id}" title="Quitar" style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px;display:flex;"><i data-lucide="x" style="width:16px;height:16px;pointer-events:none;"></i></button>
            </div>
            ${locked ? `
            <div style="width:100%;font-size:0.72rem;color:var(--text-muted);margin-top:6px;">Medida: <strong style="color:var(--text-secondary);">${entry.food.serving || 'porci\u00f3n'}</strong> \u00b7 fija (alimento personalizado)</div>
            ` : `
            <div style="width:100%;display:flex;gap:8px;align-items:center;margin-top:8px;">
              <select class="rev-medida" data-id="${id}" style="flex:1;min-width:0;padding:8px 10px;border-radius:9px;border:1.5px solid var(--border);background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.78rem;">
                ${MEASURE_UNITS.filter(u => availableIds.includes(u.id)).map(u => `<option value="${u.id}" ${u.id === medidaSel ? 'selected' : ''}>${u.label}</option>`).join('')}
              </select>
              ${medidaSel === 'personalizada' ? `<input type="text" class="rev-medida-custom" data-id="${id}" placeholder="Ej: 1 plato grande" value="${entry.medidaCustom || ''}" style="flex:1;min-width:0;padding:8px 10px;border-radius:9px;border:1.5px solid var(--border);background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.78rem;">` : ''}
            </div>
            `}
          </div>
        `; }).join('');
        Icons.init(wrap);
        renderReviewFooter();

        wrap.querySelectorAll('.rev-qty-dec').forEach(b => b.onclick = () => {
          const e = selection.get(b.dataset.id); if (!e) return;
          const step = (e.medidaUnitId === 'gramos' || e.medidaUnitId === 'ml') ? 1 : 0.25;
          e.qty = Math.max(step, +(e.qty - step).toFixed(2));
          renderReviewItems();
        });
        wrap.querySelectorAll('.rev-qty-inc').forEach(b => b.onclick = () => {
          const e = selection.get(b.dataset.id); if (!e) return;
          const step = (e.medidaUnitId === 'gramos' || e.medidaUnitId === 'ml') ? 1 : 0.25;
          e.qty = +(e.qty + step).toFixed(2);
          renderReviewItems();
        });
        wrap.querySelectorAll('.rev-medida').forEach(sel => sel.onchange = () => {
          const e = selection.get(sel.dataset.id); if (!e) return;
          e.medidaUnitId = sel.value;
          e.qty = (sel.value === 'gramos' || sel.value === 'ml') ? (_gramsForServing(e.food.serving) || 100) : 1;
          renderReviewItems();
        });
        wrap.querySelectorAll('.rev-medida-custom').forEach(inp => inp.addEventListener('input', () => {
          const e = selection.get(inp.dataset.id); if (!e) return;
          e.medidaCustom = inp.value;
        }));
        wrap.querySelectorAll('.rev-remove').forEach(b => b.onclick = () => {
          selection.delete(b.dataset.id);
          if (selection.size === 0) {
            searchInput.style.display = '';
            catBtns.style.display = '';
            renderResults(searchInput.value, currentCat);
            renderCartBar();
            return;
          }
          renderReviewItems();
        });
      };

      resultsDiv.innerHTML = `
        <button id="cart-back" style="background:none;border:none;color:var(--text-muted);display:flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:700;padding:0 0 14px;cursor:pointer;">
          <i data-lucide="chevron-left" style="width:16px;height:16px;"></i>Volver a buscar
        </button>
        <div class="cfg-label">\u00bfEn qu\u00e9 comida?</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;" id="review-meal-chips">
          ${MEAL_TYPES.map(m => `<button class="cat-btn review-meal-btn ${m.id === tipo ? 'active' : ''}" data-tipo="${m.id}">${m.name}</button>`).join('')}
        </div>
        <div class="cfg-label">Alimentos seleccionados</div>
        <div id="review-items"></div>
      `;
      Icons.init(resultsDiv);

      document.getElementById('cart-back').onclick = () => {
        searchInput.style.display = '';
        catBtns.style.display = '';
        renderResults(searchInput.value, currentCat);
        renderCartBar();
      };

      resultsDiv.querySelectorAll('.review-meal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          tipo = btn.dataset.tipo;
          resultsDiv.querySelectorAll('.review-meal-btn').forEach(b => b.classList.toggle('active', b === btn));
        });
      });

      renderReviewItems();
    };

    renderResults();
    renderCartBar();

    searchInput.value = '';
    searchInput.focus();
    searchInput.oninput = () => renderResults(searchInput.value, currentCat);

    catBtns.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCat = btn.dataset.cat;
        renderResults(searchInput.value, currentCat);
      });
    });

    Icons.init(catBtns);

    closeBtn.onclick = () => overlay.classList.remove('active', 'full');
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

      Storage.saveCustomFood({ name, cal, prot, carb, fat, serving });

      const registro = Storage.obtenerComidas(this.fecha);
      if (!registro.comidas) registro.comidas = [];
      registro.comidas.push({
        id: Date.now(),
        nombre: name, cal, prot, carb, fat, baseCal: cal, baseProt: prot, baseCarb: carb, baseFat: fat,
        serving, baseServing: serving, cantidad: 1, tipo, medidaUnitId: 'porcion', medida: '', medidaLocked: true
      });
      Storage.guardarComidas(this.fecha, registro);
      overlay.classList.remove('active', 'full');
      this._render();
      this._toast(`${name} agregado y guardado en Míos`);
      this._autoMarkHabit(tipo);
    });
  },

  _toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast success';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  },

  /* Si el hábito del día correspondiente a este horario existe y aún no
     estaba marcado, se marca solo — así "Desayuno completo" no hay que
     tocarlo a mano si ya registraste qué desayunaste. */
  _autoMarkHabit(tipo) {
    if (typeof markMealHabitDone !== 'function') return;
    const item = markMealHabitDone(this.fecha, tipo);
    if (item) this._toast(`Hábito "${item.label}" marcado automáticamente`);
  }
};
