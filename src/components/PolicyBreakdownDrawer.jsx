import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const PolicyBreakdownDrawer = ({ open, onClose, policy, sumAssured }) => {
  if (!open || !policy) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const breakdown = policy.price.breakdown;

  const breakdownRows = [
    { label: 'Rate per 1000 SA', value: breakdown.rate_per_1000, highlight: false },
    { label: 'High Sum Assured Rebate', value: `-${breakdown.high_sum_assured_rebate}`, highlight: false },
    { label: 'Rate after HSAR', value: breakdown.rate_after_hsar, highlight: false },
    { label: 'Raw Annual Premium', value: formatCurrency(breakdown.raw_annual_premium), highlight: false },
    { label: 'Direct Marketing Discount', value: `${(breakdown.direct_marketing_discount * 100).toFixed(1)}%`, highlight: false },
    { label: 'Annual after Discount', value: formatCurrency(breakdown.annual_after_discount), highlight: false },
    { label: 'GST Year 1', value: formatCurrency(breakdown.gst_first_year), highlight: false },
    { label: 'Total Installment Year 1', value: formatCurrency(breakdown.total_installment_year1), highlight: true },
    { label: 'GST Year 2+', value: formatCurrency(breakdown.gst_subsequent_year), highlight: false },
    { label: 'Total Year 2 onwards', value: formatCurrency(breakdown.total_year2_onwards), highlight: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-md bg-background shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Policy Breakdown</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto p-6 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{policy.name}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {policy.insurer} • Sum Assured: {formatCurrency(sumAssured)}
                </div>
              </CardHeader>
              <CardContent className="space-y-1">
                <div className="text-sm text-muted-foreground">{policy.coverage}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pricing Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {breakdownRows.map((row, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center py-2 border-b border-muted/40 last:border-b-0 ${
                        row.highlight ? 'bg-green-50 dark:bg-green-950/20 px-3 -mx-3 rounded font-medium text-green-700 dark:text-green-400' : ''
                      }`}
                    >
                      <span className="text-sm">{row.label}</span>
                      <span className={`text-sm font-mono ${row.highlight ? 'font-bold' : ''}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="font-medium">Calculation Formula:</div>
                  <div>1. Rate after HSAR = Rate per 1000 - High SA Rebate</div>
                  <div>2. Raw Annual = (Rate after HSAR × Sum Assured) ÷ 1000</div>
                  <div>3. After Discount = Raw Annual × (1 - Direct Marketing Discount)</div>
                  <div>4. Final = After Discount + GST</div>
                </div>
              </CardContent>
            </Card>

            <div className="text-xs text-muted-foreground">
              <strong>Note:</strong> {policy.priceNote}
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t p-6">
            <div className="space-y-3">
              <Button className="w-full">
                Select This Policy
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyBreakdownDrawer;