import type { ProductFormula } from '@/types/formulas';

export const productFormulas: ProductFormula[] = [
  {
    id: 'detergente-texapon70',
    name: 'Detergente Líquido para Ropa (Texapon 70%)',
    description: 'Fórmula base con Texapon 70%. Relación: 1 kg de Texapon produce 5 kg de detergente líquido.',
    category: 'Detergentes',
    totalBaseAmount: 1000,
    yieldPerLiter: 1,
    ingredients: [
      { name: 'Texapon 70% (Lauril)', code: 'TEX70', amountPerLiter: 200, unit: 'gr' },
      { name: 'Agua', code: 'H2O', amountPerLiter: 750, unit: 'ml' },
      { name: 'Detercon', code: 'DETER', amountPerLiter: 35, unit: 'gr' },
      { name: 'Amida de Coco', code: 'AMIDA', amountPerLiter: 35, unit: 'gr' },
      { name: 'Nonilfenol', code: 'NF', amountPerLiter: 6, unit: 'gr' },
      { name: 'Esencia / Fragancia', code: 'AROMA', amountPerLiter: 6, unit: 'gr' },
      { name: 'Colorante', code: 'COLOR', amountPerLiter: 0.06, unit: 'gr' },
      { name: 'Sal (estabilizador)', code: 'SAL', amountPerLiter: 1.5, unit: 'gr' },
    ],
    mixingOrder: [
      'Disolver el Texapon 70% en agua tibia (30-40°C) revolviendo suavemente.',
      'Agregar el Detercon y mezclar hasta homogeneizar.',
      'Incorporar la Amida de Coco y el Nonilfenol.',
      'Añadir la sal y revolver hasta disolución completa.',
      'Por último, agregar la esencia/fragancia y el colorante.',
      'Dejar reposar 2-4 horas antes de envasar.',
    ],
    notes: [
      'Usar agua destilada o de chorro para mejor calidad.',
      'La temperatura del agua no debe superar los 45°C para evitar degradación.',
      '1 kg de Texapon 70% produce 5 kg de detergente líquido.',
    ],
  },
  {
    id: 'detergente-ariel-28',
    name: 'Detergente Tipo Ariel (Lauril 28%)',
    description: 'Fórmula de detergente líquido concentrado tipo Ariel con Lauril al 28%.',
    category: 'Detergentes',
    totalBaseAmount: 1000,
    yieldPerLiter: 1,
    ingredients: [
      { name: 'Agua', code: 'H2O', amountPerLiter: 813.3, unit: 'ml' },
      { name: 'Lauril 28% (Texapon 28%)', code: 'TEX28', amountPerLiter: 92.2, unit: 'gr' },
      { name: 'Detercon', code: 'DETER', amountPerLiter: 32.5, unit: 'gr' },
      { name: 'Amida de Coco', code: 'AMIDA', amountPerLiter: 47.7, unit: 'gr' },
      { name: 'Nonilfenol', code: 'NF', amountPerLiter: 6.9, unit: 'gr' },
      { name: 'Esencia (Manzana Verde)', code: 'AROMA', amountPerLiter: 5.7, unit: 'gr' },
      { name: 'Colorante', code: 'COLOR', amountPerLiter: 0.05, unit: 'gr' },
      { name: 'Sal (cdtas. de 5 ml)', code: 'SAL', amountPerLiter: 1.6, unit: 'gr' },
    ],
    mixingOrder: [
      'Mezclar el Lauril 28% con 1/3 del agua tibia.',
      'Agregar el Detercon y la Amida de Coco revolviendo constantemente.',
      'Incorporar el Nonilfenol.',
      'Añadir el resto del agua fría.',
      'Agregar sal, esencia y colorante al final.',
      'Mezclar 15-20 minutos y dejar reposar.',
    ],
    notes: [
      'Fórmula más económica usando Lauril al 28%.',
      'Rendimiento alto con buena espuma y limpieza.',
    ],
  },
  {
    id: 'detergente-ariel-70',
    name: 'Detergente Tipo Ariel (Lauril 70%)',
    description: 'Detergente líquido premium con Lauril al 70%. Mayor concentración y poder de limpieza.',
    category: 'Detergentes',
    totalBaseAmount: 1000,
    yieldPerLiter: 1,
    ingredients: [
      { name: 'Agua', code: 'H2O', amountPerLiter: 866.0, unit: 'ml' },
      { name: 'Lauril 70% (Texapon 70%)', code: 'TEX70', amountPerLiter: 50.8, unit: 'gr' },
      { name: 'Detercon', code: 'DETER', amountPerLiter: 34.6, unit: 'gr' },
      { name: 'Amida de Coco', code: 'AMIDA', amountPerLiter: 34.6, unit: 'gr' },
      { name: 'Nonilfenol', code: 'NF', amountPerLiter: 6.1, unit: 'gr' },
      { name: 'Esencia (Manzana Verde)', code: 'AROMA', amountPerLiter: 6.1, unit: 'gr' },
      { name: 'Colorante', code: 'COLOR', amountPerLiter: 0.06, unit: 'gr' },
      { name: 'Sal (cdtas. de 5 ml)', code: 'SAL', amountPerLiter: 1.7, unit: 'gr' },
    ],
    mixingOrder: [
      'Disolver el Lauril 70% en agua tibia (no más de 40°C).',
      'Agregar Detercon y Amida de Coco lentamente.',
      'Mezclar el Nonilfenol.',
      'Incorporar sal y revolver 10 minutos.',
      'Finalizar con esencia y colorante.',
      'Reposar 2 horas antes de envasar.',
    ],
    notes: [
      'Mayor concentración de surfactante = menos producto por lavada.',
      'Más espuma y poder desengrasante.',
    ],
  },
  {
    id: 'detergente-zote',
    name: 'Detergente Tipo Zote (Jabón Líquido)',
    description: 'Fórmula de jabón líquido tipo Zote, base de sosa y aceite. Ideal para ropa delicada.',
    category: 'Detergentes',
    totalBaseAmount: 1000,
    yieldPerLiter: 1,
    ingredients: [
      { name: 'Agua', code: 'H2O', amountPerLiter: 750, unit: 'ml' },
      { name: 'Aceite Vegetal / Grasa', code: 'ACEITE', amountPerLiter: 150, unit: 'gr' },
      { name: 'Sosa Caustica (NaOH) al 50%', code: 'SOSA', amountPerLiter: 50, unit: 'gr' },
      { name: 'Glicerina', code: 'GLIC', amountPerLiter: 20, unit: 'gr' },
      { name: 'Esencia / Fragancia', code: 'AROMA', amountPerLiter: 10, unit: 'gr' },
      { name: 'Colorante', code: 'COLOR', amountPerLiter: 0.2, unit: 'gr' },
      { name: 'Citato de Sodio (suavizante)', code: 'CITRATO', amountPerLiter: 5, unit: 'gr' },
    ],
    mixingOrder: [
      'Preparar la sosa caustica disolviéndola en agua fría (¡usar guantes y protección!).',
      'Calentar el aceite vegetal a 50-60°C.',
      'Agregar la solución de sosa lentamente al aceite caliente revolviendo constantemente.',
      'Batir durante 30-40 minutos hasta obtener traza (consistencia de natillas).',
      'Agregar glicerina y revolver.',
      'Dejar reposar 24 horas.',
      'Diluir con agua fría al gusto de consistencia.',
      'Agregar esencia, colorante y citrato de sodio al final.',
    ],
    notes: [
      '¡PRECAUCIÓN! La sosa caustica es corrosiva. Usar guantes de caucho y lentes.',
      'Mezclar siempre la sosa en agua, nunca al revés.',
      'Dejar reposar mínimo 24 horas para completar la saponificación.',
    ],
  },
  {
    id: 'desengrasante-industrial',
    name: 'Desengrasante Industrial',
    description: 'Fórmula concentrada para limpieza industrial, cocinas, motores y superficies grasosas.',
    category: 'Desengrasantes',
    totalBaseAmount: 1000,
    yieldPerLiter: 1,
    ingredients: [
      { name: 'Agua', code: 'H2O', amountPerLiter: 600, unit: 'ml' },
      { name: 'Nonilfenol (concentrado)', code: 'NF', amountPerLiter: 150, unit: 'gr' },
      { name: 'Texapon 70%', code: 'TEX70', amountPerLiter: 100, unit: 'gr' },
      { name: 'Ácido Sulfónico', code: 'ACIDO', amountPerLiter: 80, unit: 'gr' },
      { name: 'Soda Cáustica al 50%', code: 'SOSA', amountPerLiter: 30, unit: 'gr' },
      { name: 'Amonio Cuaternario', code: 'AMONIO', amountPerLiter: 10, unit: 'gr' },
      { name: 'Alcohol Isopropílico', code: 'ALCOHOL', amountPerLiter: 20, unit: 'ml' },
      { name: 'Colorante (opcional)', code: 'COLOR', amountPerLiter: 0.1, unit: 'gr' },
    ],
    mixingOrder: [
      'Disolver el ácido sulfónico en 1/3 del agua.',
      'En otro recipiente, diluir la soda cáustica en agua fría.',
      'Mezclar ambas soluciones lentamente (neutralización).',
      'Agregar Nonilfenol y Texapon 70%.',
      'Incorporar amonio cuaternario y alcohol isopropílico.',
      'Completar con agua y revolver 20 minutos.',
    ],
    notes: [
      'Usar protección completa: guantes, lentes, mascarilla.',
      'No mezclar directamente soda cáustica con ácido sulfónico concentrado.',
      'Producto de alto poder desengrasante. Diluir 1:10 para uso general.',
    ],
  },
  {
    id: 'suavizante-telas',
    name: 'Suavizante para Telas (Flor de Manzana)',
    description: 'Suavizante de telas con fragancia floral. Deja la ropa suave y aromática.',
    category: 'Suavizantes',
    totalBaseAmount: 1000,
    yieldPerLiter: 1,
    ingredients: [
      { name: 'Alcohol Cetílico', code: 'ALCOHOL', amountPerLiter: 14.2, unit: 'gr' },
      { name: 'Cloruro de Cetrimonio', code: 'CLORURO', amountPerLiter: 14.2, unit: 'gr' },
      { name: 'Agua', code: 'H2O', amountPerLiter: 965.4, unit: 'ml' },
      { name: 'Fragancia (Suave Caricia / Flor de Manzana)', code: 'AROMA', amountPerLiter: 6.1, unit: 'gr' },
      { name: 'Colorante', code: 'COLOR', amountPerLiter: 0.02, unit: 'gr' },
    ],
    mixingOrder: [
      'Calentar el agua a 60-70°C.',
      'Disolver el Alcohol Cetílico en el agua caliente.',
      'Agregar el Cloruro de Cetrimonio y mezclar hasta disolución total.',
      'Dejar enfriar a temperatura ambiente.',
      'Agregar fragancia y colorante.',
      'Mezclar suavemente y dejar reposar 1 hora.',
    ],
    notes: [
      'No agregar fragancia mientras la mezcla esté caliente (>40°C).',
      'Mantener pH entre 4-6 para estabilidad.',
    ],
  },
  {
    id: 'desinfectante-multiusos',
    name: 'Desinfectante Multiusos',
    description: 'Desinfectante para pisos, baños, cocinas y superficies. Elimina bacterias y malos olores.',
    category: 'Desinfectantes',
    totalBaseAmount: 1000,
    yieldPerLiter: 1,
    ingredients: [
      { name: 'Agua', code: 'H2O', amountPerLiter: 966.3, unit: 'ml' },
      { name: 'Texapon 70%', code: 'TEX70', amountPerLiter: 8.3, unit: 'gr' },
      { name: 'Amonio Cuaternario', code: 'AMONIO', amountPerLiter: 0.6, unit: 'gr' },
      { name: 'Nonilfenol', code: 'NF', amountPerLiter: 8.3, unit: 'gr' },
      { name: 'Aroma / Fragancia', code: 'AROMA', amountPerLiter: 16.6, unit: 'gr' },
      { name: 'Colorante', code: 'COLOR', amountPerLiter: 0.06, unit: 'gr' },
    ],
    mixingOrder: [
      'Mezclar el agua con el Texapon 70%.',
      'Agregar Nonilfenol y revolver.',
      'Incorporar el Amonio Cuaternario (agente desinfectante principal).',
      'Añadir fragancia y colorante al final.',
      'Mezclar 10 minutos y dejar reposar.',
    ],
    notes: [
      'El Amonio Cuaternario es el agente biocida principal.',
      'Mantener proporción exacta para efectividad desinfectante.',
      'Para uso doméstico: diluir 1:50 en agua.',
    ],
  },
  {
    id: 'detercon-concentrado',
    name: 'Detercon (Concentrado Base)',
    description: 'Base concentrada Detercon para producción de detergentes. Se diluye antes de uso.',
    category: 'Bases',
    totalBaseAmount: 650,
    yieldPerLiter: 1,
    ingredients: [
      { name: 'Agua', code: 'H2O', amountPerLiter: 527.7, unit: 'ml' },
      { name: 'Ácido Sulfónico', code: 'ACIDO', amountPerLiter: 93.1, unit: 'gr' },
      { name: 'Soda Cáustica al 50%', code: 'SOSA', amountPerLiter: 29.2, unit: 'gr' },
    ],
    mixingOrder: [
      'Disolver el ácido sulfónico en 1/2 del agua.',
      'Preparar solución de soda cáustica con el resto del agua fría.',
      'Mezclar ambas soluciones lentamente (reacción de neutralización).',
      'Revolver 15-20 minutos hasta homogeneizar.',
      'Dejar reposar 2 horas antes de usar.',
    ],
    notes: [
      'Producto concentrado. Diluir antes de usar en fórmulas de detergente.',
      'Neutralización exotérmica: mezclar lentamente.',
    ],
  },
];

export function getFormulaById(id: string): ProductFormula | undefined {
  return productFormulas.find((p) => p.id === id);
}

export function calculateRecipe(
  formula: ProductFormula,
  quantityLiters: number,
  ingredientPrices: Record<string, number>
): import('@/types/formulas').CalculatedRecipe {
  const calculatedIngredients = formula.ingredients.map((ing) => {
    const amount = ing.amountPerLiter * quantityLiters;
    const unitPrice = ingredientPrices[ing.code] || 0;
    let cost = 0;

    if (unitPrice > 0) {
      if (ing.unit === 'ml') {
        cost = (amount / 1000) * unitPrice; // precio por litro
      } else if (ing.unit === 'gr') {
        cost = (amount / 1000) * unitPrice; // precio por kg
      } else if (ing.unit === 'gotas') {
        // aprox 20 gotas = 1 ml
        cost = (amount / 20 / 1000) * unitPrice;
      } else if (ing.unit === 'cdtas') {
        // aprox 5 ml por cucharadita
        cost = (amount * 5 / 1000) * unitPrice;
      }
    }

    return {
      name: ing.name,
      code: ing.code,
      amount: Math.round(amount * 100) / 100,
      unit: ing.unit,
      cost: Math.round(cost * 100) / 100,
    };
  });

  const totalCost = calculatedIngredients.reduce((sum, ing) => sum + ing.cost, 0);
  const totalAmount = calculatedIngredients.reduce((sum, ing) => {
    return ing.unit === 'ml' ? sum + ing.amount : sum;
  }, 0);

  return {
    product: formula,
    quantityLiters,
    quantityGallons: Math.round(quantityLiters * 0.264172 * 100) / 100,
    ingredients: calculatedIngredients,
    totalCost: Math.round(totalCost * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
}
