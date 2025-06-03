import { useState } from 'react';

interface UpsellComponentProps {
  planName: string;
  onUpsellSelect: (upsellId: string, selected: boolean) => void;
  selectedUpsells: string[];
}

export const UpsellComponent = ({ planName, onUpsellSelect, selectedUpsells }: UpsellComponentProps) => {
  // Determinar upsells disponíveis com base no plano selecionado
  const getAvailableUpsells = () => {
    switch (planName) {
      case 'Starter':
        return [
          { id: 'campanha-vendas', name: 'Campanha de vendas', price: 'R$97/mês' },
          { id: 'reconhecimento-marca', name: 'Campanha de reconhecimento de marca', price: 'R$77/mês' }
        ];
      case 'Aceleração':
        return [
          { id: 'landing-extra', name: 'Landing page adicional', price: 'R$97/mês' },
          { id: 'consultoria', name: 'Consultoria estratégica mensal', price: 'R$197/mês' }
        ];
      case 'Crescimento Exponencial':
        return [
          { id: 'relatorio-personalizado', name: 'Relatórios personalizados semanais', price: 'R$147/mês' },
          { id: 'gestao-redes', name: 'Gestão de redes sociais', price: 'R$297/mês' }
        ];
      default:
        return [];
    }
  };

  const availableUpsells = getAvailableUpsells();

  if (availableUpsells.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h4 className="font-semibold mb-3">Turbine seus resultados</h4>
      <div className="space-y-3">
        {availableUpsells.map((upsell) => (
          <div key={upsell.id} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <input
              id={upsell.id}
              type="checkbox"
              checked={selectedUpsells.includes(upsell.id)}
              onChange={(e) => onUpsellSelect(upsell.id, e.target.checked)}
              className="mr-3 h-5 w-5 text-primary focus:ring-primary"
            />
            <label htmlFor={upsell.id} className="text-sm flex-1 cursor-pointer">
              <span className="font-medium block">{upsell.name}</span>
              <span className="text-gray-600 dark:text-gray-400 text-xs">Potencialize seus resultados</span>
            </label>
            <span className="text-sm font-semibold text-primary">{upsell.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
