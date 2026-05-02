import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Calculator,
  FlaskConical,
  Droplets,
  AlertCircle,
  RotateCcw,
  FileText,
  Beaker,
  Sparkles,
  Shield,
  SprayCan,
  TestTube,
  Package,
} from 'lucide-react';
import { productFormulas, calculateRecipe, getFormulaById } from '@/data/formulas';
import type { CalculatedRecipe } from '@/types/formulas';
import RecipeCard from '@/components/RecipeCard';
import PriceManager from '@/components/PriceManager';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const categoryIcons: Record<string, React.ReactNode> = {
  Detergentes: <FlaskConical className="w-4 h-4" />,
  Suavizantes: <Sparkles className="w-4 h-4" />,
  Desinfectantes: <Shield className="w-4 h-4" />,
  Desengrasantes: <SprayCan className="w-4 h-4" />,
  Bases: <TestTube className="w-4 h-4" />,
};

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('10');
  const [unit, setUnit] = useState<'liters' | 'gallons'>('liters');
  const [recipe, setRecipe] = useState<CalculatedRecipe | null>(null);
  const [error, setError] = useState<string>('');
  const [ingredientPrices, setIngredientPrices] = useState<Record<string, number>>({});
  const recipeRef = useRef<HTMLDivElement>(null);

  const handleCalculate = useCallback(() => {
    setError('');
    
    if (!selectedProductId) {
      setError('Selecciona un producto para continuar.');
      return;
    }

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      setError('La cantidad debe ser un número mayor a 0.');
      return;
    }

    const formula = getFormulaById(selectedProductId);
    if (!formula) {
      setError('Producto no encontrado.');
      return;
    }

    const liters = unit === 'gallons' ? qty * 3.78541 : qty;
    const calculated = calculateRecipe(formula, liters, ingredientPrices);
    setRecipe(calculated);
  }, [selectedProductId, quantity, unit, ingredientPrices]);

  const handleReset = () => {
    setSelectedProductId('');
    setQuantity('10');
    setUnit('liters');
    setRecipe(null);
    setError('');
  };

  const handleExportPDF = async () => {
    if (!recipeRef.current) return;
    
    try {
      const canvas = await html2canvas(recipeRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      pdf.addImage(imgData, 'PNG', imgX, 10, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`formula-${recipe?.product.id}-${Date.now()}.pdf`);
    } catch (err) {
      setError('Error al generar PDF. Intenta de nuevo.');
    }
  };

  const handleExportImage = async () => {
    if (!recipeRef.current) return;
    
    try {
      const canvas = await html2canvas(recipeRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `formula-${recipe?.product.id}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      setError('Error al generar imagen. Intenta de nuevo.');
    }
  };

  const selectedProduct = getFormulaById(selectedProductId);
  const categories = [...new Set(productFormulas.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <Beaker className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Calculadora de Detergentes</h1>
            <p className="text-xs text-gray-500">Fórmulas precisas para producción casera e industrial</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Main Calculator Card */}
        <Card className="shadow-md border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Nueva Producción</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-500">
                <RotateCcw className="w-4 h-4 mr-1" />
                Limpiar
              </Button>
            </div>
            <CardDescription>
              Selecciona un producto y la cantidad que deseas fabricar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Product Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Tipo de Producto</Label>
              <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                <SelectTrigger className="h-12 text-sm">
                  <SelectValue placeholder="Selecciona un producto..." />
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                  {categories.map(cat => (
                    <div key={cat}>
                      <div className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                        {categoryIcons[cat]}
                        {cat}
                      </div>
                      {productFormulas
                        .filter(p => p.category === cat)
                        .map(product => (
                          <SelectItem key={product.id} value={product.id} className="text-sm py-2">
                            <div className="flex flex-col">
                              <span className="font-medium">{product.name}</span>
                              <span className="text-xs text-gray-400 truncate max-w-[300px]">{product.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedProduct && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    <Package className="w-3 h-3 mr-1" />
                    {selectedProduct.category}
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                    Base: {selectedProduct.totalBaseAmount}gr/ml
                  </Badge>
                  {selectedProduct.id === 'detergente-texapon70' && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                      Relación 1:5
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Input */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Cantidad a Fabricar</Label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || parseFloat(val) >= 0) {
                        setQuantity(val);
                      }
                    }}
                    placeholder="10"
                    className="h-12 text-lg font-semibold"
                  />
                </div>
                <Tabs value={unit} onValueChange={(v) => setUnit(v as 'liters' | 'gallons')} className="w-[140px]">
                  <TabsList className="grid w-full grid-cols-2 h-12">
                    <TabsTrigger value="liters" className="text-xs">
                      <Droplets className="w-3 h-3 mr-1" />
                      Litros
                    </TabsTrigger>
                    <TabsTrigger value="gallons" className="text-xs">
                      Galones
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              {unit === 'gallons' && (
                <p className="text-xs text-gray-400">
                  1 galón = 3.785 litros
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <Alert variant="destructive" className="border-red-300 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-sm">{error}</AlertDescription>
              </Alert>
            )}

            {/* Calculate Button */}
            <Button 
              onClick={handleCalculate} 
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calcular Fórmula
            </Button>
          </CardContent>
        </Card>

        {/* Price Manager */}
        <Card className="shadow-sm border-0">
          <CardContent className="pt-4">
            <PriceManager onPricesChange={setIngredientPrices} />
          </CardContent>
        </Card>

        {/* Results */}
        {recipe && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Resultado de la Fórmula</h2>
            </div>
            
            <RecipeCard
              ref={recipeRef}
              recipe={recipe}
              onExportPDF={handleExportPDF}
              onExportImage={handleExportImage}
            />
          </div>
        )}

        {/* Quick Reference */}
        {!recipe && (
          <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Referencia Rápida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Beaker className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Texapon 70%</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        1 kg de Texapon 70% produce 5 kg de detergente líquido. Relación base 1:5.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Conversión de Unidades</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        1 galón = 3.785 litros. 1 litro de agua ≈ 1 kg. Todas las fórmulas se escalan proporcionalmente.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Seguridad</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Usar guantes y protección ocular al manipular sosa cáustica y ácidos. Mezclar siempre la sosa en agua, nunca al revés.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-gray-400">
        <p>Calculadora de Detergentes v1.0 • Fórmulas basadas en datos reales de producción</p>
        <p className="mt-1">Todas las cantidades son aproximadas. Ajustar según necesidades específicas.</p>
      </footer>
    </div>
  );
}
