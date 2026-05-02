import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Printer, Download, AlertTriangle, CheckCircle, Beaker, Droplets, Scale } from 'lucide-react';
import type { CalculatedRecipe } from '@/types/formulas';

interface RecipeCardProps {
  recipe: CalculatedRecipe;
  onExportPDF: () => void;
  onExportImage: () => void;
}

const RecipeCard = React.forwardRef<HTMLDivElement, RecipeCardProps>(
  ({ recipe, onExportPDF, onExportImage }, ref) => {
    const { product, ingredients, quantityLiters, quantityGallons, totalCost } = recipe;

    const getUnitLabel = (unit: string) => {
      switch (unit) {
        case 'ml': return 'ml';
        case 'gr': return 'gr';
        case 'gotas': return 'gotas';
        case 'cdtas': return 'cdtas';
        default: return unit;
      }
    };

    return (
      <div ref={ref} className="w-full bg-white p-6 rounded-xl border shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Beaker className="w-3 h-3 mr-1" />
                {product.category}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Droplets className="w-3 h-3 mr-1" />
                {quantityLiters.toFixed(1)} L
              </Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Scale className="w-3 h-3 mr-1" />
                {quantityGallons.toFixed(2)} gal
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Fecha</div>
            <div className="font-medium text-gray-900">
              {new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Ingredients Table */}
        <Card className="mb-4 border-0 shadow-none">
          <CardHeader className="px-0 pt-0 pb-2">
            <CardTitle className="text-lg">Ingredientes y Cantidades</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Código</TableHead>
                  <TableHead className="font-semibold text-gray-700">Ingrediente</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Cantidad</TableHead>
                  <TableHead className="font-semibold text-gray-700">Unidad</TableHead>
                  {totalCost > 0 && (
                    <TableHead className="font-semibold text-gray-700 text-right">Costo</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredients.map((ing, idx) => (
                  <TableRow key={idx} className="hover:bg-blue-50/50 transition-colors">
                    <TableCell className="font-mono text-xs text-gray-500">{ing.code}</TableCell>
                    <TableCell className="font-medium text-gray-900">{ing.name}</TableCell>
                    <TableCell className="text-right font-semibold text-gray-900">
                      {ing.amount >= 1000 ? ing.amount.toLocaleString('es-ES', { maximumFractionDigits: 1 }) : ing.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-gray-600">{getUnitLabel(ing.unit)}</TableCell>
                    {totalCost > 0 && (
                      <TableCell className="text-right text-gray-600">
                        {ing.cost > 0 ? `$${ing.cost.toFixed(2)}` : '-'}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalCost > 0 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex justify-between items-center">
                <span className="font-medium text-green-800">Costo Total Estimado:</span>
                <span className="text-xl font-bold text-green-700">${totalCost.toFixed(2)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mixing Order */}
        <Card className="mb-4 border-0 shadow-none">
          <CardHeader className="px-0 pt-0 pb-2">
            <CardTitle className="text-lg">Orden de Mezcla Recomendado</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <ol className="space-y-2">
              {product.mixingOrder.map((step, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Notes / Warnings */}
        {product.notes.length > 0 && (
          <div className="space-y-2">
            {product.notes.map((note, idx) => (
              <Alert
                key={idx}
                variant={note.includes('PRECAUCIÓN') || note.includes('cau') || note.includes('corros') ? 'destructive' : 'default'}
                className={
                  note.includes('PRECAUCIÓN') || note.includes('cau') || note.includes('corros')
                    ? 'border-red-300 bg-red-50 text-red-900'
                    : 'border-blue-200 bg-blue-50 text-blue-900'
                }
              >
                {note.includes('PRECAUCIÓN') || note.includes('cau') || note.includes('corros') ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                )}
                <AlertDescription className="text-sm">{note}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Footer */}
        <Separator className="my-4" />
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>Calculadora de Detergentes v1.0</span>
          <span>Fórmula base: {product.totalBaseAmount}gr/ml por litro</span>
        </div>

        {/* Export Buttons - only visible in UI, not in export */}
        <div className="flex gap-2 mt-6 print:hidden">
          <Button onClick={onExportPDF} variant="outline" className="flex-1">
            <Printer className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button onClick={onExportImage} variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Descargar Imagen
          </Button>
        </div>
      </div>
    );
  }
);

RecipeCard.displayName = 'RecipeCard';

export default RecipeCard;
