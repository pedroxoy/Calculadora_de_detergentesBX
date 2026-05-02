import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

export interface IngredientPrice {
  code: string;
  name: string;
  pricePerKgOrL: number; // precio por kg (para sólidos) o por litro (para líquidos)
  unit: 'kg' | 'L';
}

interface PriceManagerProps {
  onPricesChange: (prices: Record<string, number>) => void;
}

const defaultIngredients: IngredientPrice[] = [
  { code: 'TEX70', name: 'Texapon 70% / Lauril 70%', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'TEX28', name: 'Texapon 28% / Lauril 28%', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'H2O', name: 'Agua', pricePerKgOrL: 0, unit: 'L' },
  { code: 'DETER', name: 'Detercon', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'AMIDA', name: 'Amida de Coco', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'NF', name: 'Nonilfenol', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'AROMA', name: 'Esencia / Fragancia', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'COLOR', name: 'Colorante', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'SAL', name: 'Sal', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'SOSA', name: 'Sosa Cáustica al 50%', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'ACIDO', name: 'Ácido Sulfónico', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'ALCOHOL', name: 'Alcohol Cetílico', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'CLORURO', name: 'Cloruro de Cetrimonio', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'AMONIO', name: 'Amonio Cuaternario', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'ACEITE', name: 'Aceite Vegetal / Grasa', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'GLIC', name: 'Glicerina', pricePerKgOrL: 0, unit: 'kg' },
  { code: 'CITRATO', name: 'Citato de Sodio', pricePerKgOrL: 0, unit: 'kg' },
];

const STORAGE_KEY = 'detergent-calculator-prices';

export default function PriceManager({ onPricesChange }: PriceManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prices, setPrices] = useState<IngredientPrice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return defaultIngredients.map(def => {
          const found = parsed.find((p: IngredientPrice) => p.code === def.code);
          return found ? { ...def, pricePerKgOrL: found.pricePerKgOrL } : def;
        });
      }
    } catch { /* ignore */ }
    return defaultIngredients;
  });

  useEffect(() => {
    const priceMap: Record<string, number> = {};
    prices.forEach(p => {
      if (p.pricePerKgOrL > 0) {
        priceMap[p.code] = p.pricePerKgOrL;
      }
    });
    onPricesChange(priceMap);
  }, [prices, onPricesChange]);

  const handlePriceChange = (code: string, value: string) => {
    const numValue = parseFloat(value);
    setPrices(prev => {
      const updated = prev.map(p =>
        p.code === code ? { ...p, pricePerKgOrL: isNaN(numValue) ? 0 : Math.max(0, numValue) } : p
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const hasAnyPrice = prices.some(p => p.pricePerKgOrL > 0);

  return (
    <Card className="border-0 shadow-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
            <CardHeader className="px-0 py-2 flex flex-row items-center gap-2 w-full">
              <DollarSign className="w-5 h-5 text-green-600" />
              <CardTitle className="text-base font-semibold text-gray-800">
                Precios de Insumos (Opcional)
              </CardTitle>
              {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400 ml-auto" /> : <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />}
            </CardHeader>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="px-0 pt-2">
            <p className="text-sm text-gray-500 mb-3">
              Ingresa el precio por kg o por litro de cada insumo para calcular el costo de producción.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {prices.map((ing) => (
                <div key={ing.code} className="space-y-1">
                  <Label htmlFor={`price-${ing.code}`} className="text-xs text-gray-600">
                    {ing.name} <span className="text-gray-400">({ing.unit})</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <Input
                      id={`price-${ing.code}`}
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={ing.pricePerKgOrL || ''}
                      onChange={(e) => handlePriceChange(ing.code, e.target.value)}
                      className="pl-6 text-sm h-9"
                    />
                  </div>
                </div>
              ))}
            </div>
            {hasAnyPrice && (
              <p className="text-xs text-green-600 mt-3 font-medium">
                Los precios ingresados se guardan automáticamente en tu navegador.
              </p>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
