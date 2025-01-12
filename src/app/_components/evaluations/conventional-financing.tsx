'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { formatDollarAmount, monthlyLoanAmount } from '@/lib/utils';
import { api } from '@/trpc/react';
import { Evaluation } from '@prisma/client';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ConventionalFinancingFormData = {
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  lenderFees: number;
  monthsOfTaxes: number;
  mortgageInsurance: number;
};

// Placeholder calculations (replace with actual calculations in a real app)
const gainsAndReturns = {
  equityCapture: 50000,
  annualCashFlow: 12000,
  returnOnEquityCapture: 15,
  cashOnCashReturn: 8,
};

const cashOutOfPocket = {
  downPayment: 50000,
  closingCosts: 5000,
  prepaidExpenses: 3000,
  repairs: 10000,
  total: 68000,
};

type Props = {
  evaluation: Evaluation;
  conventionalMoneyOpen: boolean;
  setConventionalMoneyOpen: (open: boolean) => void;
};

const ConventionalFinancing = ({
  evaluation,
  conventionalMoneyOpen,
  setConventionalMoneyOpen,
}: Props) => {
  const utils = api.useUtils();
  const conventionalFinancingForm = useForm<ConventionalFinancingFormData>();
  const updateConventionalFinancing =
    api.evaluation.updateConventionalFinancing.useMutation();

  useEffect(() => {
    if (evaluation) {
      conventionalFinancingForm.reset({
        downPayment: Number(evaluation.downPayment),
        loanTerm: Number(evaluation.loanTerm),
        interestRate: Number(evaluation.interestRate),
        lenderFees: Number(evaluation.lenderFees),
        monthsOfTaxes: Number(evaluation.monthsOfTaxes),
        mortgageInsurance: Number(evaluation.mortgageInsurance),
      });
    }
  }, [evaluation, conventionalFinancingForm.reset]);

  const handleConventionalFinancingSubmit = (
    conventionalFinancingData: ConventionalFinancingFormData,
  ) => {
    updateConventionalFinancing.mutate(
      {
        data: {
          downPayment: Number(conventionalFinancingData.downPayment),
          loanTerm: Number(conventionalFinancingData.loanTerm),
          interestRate: Number(conventionalFinancingData.interestRate),
          lenderFees: Number(conventionalFinancingData.lenderFees),
          monthsOfTaxes: Number(conventionalFinancingData.monthsOfTaxes),
          mortgageInsurance: Number(
            conventionalFinancingData.mortgageInsurance,
          ),
        },
        evaluationId: evaluation.id,
      },
      {
        onSuccess: () => {
          toast.success('Successfully updated conventional financing terms');
          utils.evaluation.getEvaluationById.invalidate({
            evaluationId: evaluation.id,
          });
        },
        onError: () => {
          toast.error('Unable to update conventional financing terms');
        },
      },
    );
  };

  const downPayment: number = useMemo(() => {
    const purchasePrice = Number(evaluation?.purchasePrice);
    const downPaymentPercent = Number(evaluation?.downPayment) / 100;
    return purchasePrice * downPaymentPercent;
  }, [evaluation?.purchasePrice, evaluation?.downPayment]);

  const closingCosts: number = useMemo(() => {
    const lenderFees = Number(evaluation?.lenderFees);
    const survey = Number(evaluation?.survey);
    const appraisal = Number(evaluation?.appraisal);
    const inspection = Number(evaluation?.inspection);
    return lenderFees + survey + appraisal + inspection;
  }, [
    evaluation?.lenderFees,
    evaluation?.survey,
    evaluation?.appraisal,
    evaluation?.inspection,
  ]);

  const cashOutOfPocketTotal: number = useMemo(() => {
    const repairs = Number(evaluation?.repairs);
    return downPayment + closingCosts + repairs;
  }, [downPayment, closingCosts, evaluation?.repairs]);

  const notePayment: number = useMemo(() => {
    const purchasePrice = Number(evaluation?.purchasePrice);
    const downPaymentPercent = Number(evaluation?.downPayment) / 100;
    const downPayment = purchasePrice * downPaymentPercent;
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = Number(evaluation?.interestRate) / 100 / 12;
    const loanTermMonths = Number(evaluation?.loanTerm) * 12;
    return monthlyLoanAmount(loanTermMonths, monthlyInterestRate, loanAmount);
  }, [
    evaluation?.purchasePrice,
    evaluation?.downPayment,
    evaluation?.interestRate,
    evaluation?.loanTerm,
  ]);

  const propertyTax: number = useMemo(() => {
    const annualPropertyTax = Number(evaluation?.propertyTax);
    return annualPropertyTax / 12;
  }, [evaluation?.propertyTax]);

  const propertyInsurance: number = useMemo(() => {
    const annualInsurance = Number(evaluation?.insurance);
    return annualInsurance / 12;
  }, [evaluation?.insurance]);

  const mortgageInsurance: number = useMemo(() => {
    const annualInsurance = Number(evaluation?.refiMortgageInsurance);
    return annualInsurance / 12;
  }, [evaluation?.refiMortgageInsurance]);

  const hoa: number = useMemo(() => {
    const annualHoa = Number(evaluation?.hoa);
    return annualHoa / 12;
  }, [evaluation?.hoa]);

  const cashflowTotal: number = useMemo(() => {
    const rent = Number(evaluation?.rent);
    const misc = Number(evaluation?.miscellaneous);
    return (
      rent -
      notePayment -
      propertyTax -
      propertyInsurance -
      hoa -
      mortgageInsurance -
      misc
    );
  }, [
    evaluation?.rent,
    propertyTax,
    propertyInsurance,
    mortgageInsurance,
    hoa,
    evaluation?.miscellaneous,
    notePayment,
  ]);

  return (
    <Collapsible
      open={conventionalMoneyOpen}
      onOpenChange={setConventionalMoneyOpen}
      className='w-full'
    >
      <CollapsibleTrigger asChild>
        <Card className='w-full cursor-pointer border-sidebar-border bg-sidebar'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Conventional Financing</CardTitle>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                conventionalMoneyOpen ? 'rotate-180 transform' : ''
              }`}
            />
          </CardHeader>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2'>
        <Card className='border-sidebar-border bg-sidebar'>
          <CardContent className='mt-4 space-y-6'>
            <Card className='border-sidebar-border bg-sidebar'>
              <CardContent>
                <form
                  onSubmit={conventionalFinancingForm.handleSubmit(
                    handleConventionalFinancingSubmit,
                  )}
                  className='space-y-4 pt-10'
                >
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Down Payment
                      </label>
                      <Input
                        {...conventionalFinancingForm.register('downPayment')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Loan Term (years)
                      </label>
                      <Input
                        {...conventionalFinancingForm.register('loanTerm')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Interest Rate (%)
                      </label>
                      <Input
                        {...conventionalFinancingForm.register('interestRate')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Lender & Title Fees
                      </label>
                      <Input
                        {...conventionalFinancingForm.register('lenderFees')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        # Months Tax & Ins
                      </label>
                      <Input
                        {...conventionalFinancingForm.register('monthsOfTaxes')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Mortgage Ins. Annually
                      </label>
                      <Input
                        {...conventionalFinancingForm.register(
                          'mortgageInsurance',
                        )}
                      />
                    </div>
                  </div>
                  <div className='flex justify-end'>
                    <Button type='submit'>
                      <span>
                        {updateConventionalFinancing.isPending ? (
                          <div className='animate-spin'>
                            <Loader2 />
                          </div>
                        ) : (
                          'Update'
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              <Card className='border-sidebar-border bg-sidebar'>
                <CardHeader>
                  <CardTitle>Gains And Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Equity Capture
                        </TableCell>
                        <TableCell className='text-right'>
                          ${gainsAndReturns.equityCapture.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Annual Cash Flow
                        </TableCell>
                        <TableCell className='text-right'>
                          ${gainsAndReturns.annualCashFlow.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Return On Equity Capture
                        </TableCell>
                        <TableCell className='text-right'>
                          {gainsAndReturns.returnOnEquityCapture}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Cash On Cash Return
                        </TableCell>
                        <TableCell className='text-right'>
                          {gainsAndReturns.cashOnCashReturn}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className='border-sidebar-border bg-sidebar'>
                <CardHeader>
                  <CardTitle>Cash Out Of Pocket</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Down Payment
                        </TableCell>
                        <TableCell className='text-right'>
                          {formatDollarAmount(downPayment)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Closing Costs
                        </TableCell>
                        <TableCell className='text-right'>
                          {formatDollarAmount(closingCosts)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Prepaid Expenses
                        </TableCell>
                        <TableCell className='text-right'>
                          ${cashOutOfPocket.prepaidExpenses.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>Repairs</TableCell>
                        <TableCell className='text-right'>
                          ${Number(evaluation?.repairs).toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-bold'>TOTAL</TableCell>
                        <TableCell className='text-right font-bold'>
                          {formatDollarAmount(cashOutOfPocketTotal)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className='border-sidebar-border bg-sidebar'>
                <CardHeader>
                  <CardTitle>Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Monthly Rent
                        </TableCell>
                        <TableCell className='text-right'>
                          {formatDollarAmount(Number(evaluation?.rent))}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Note Payment
                        </TableCell>
                        <TableCell className='text-right'>
                          -{formatDollarAmount(notePayment)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Property Tax
                        </TableCell>
                        <TableCell className='text-right'>
                          -{formatDollarAmount(propertyTax)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Property Ins.
                        </TableCell>
                        <TableCell className='text-right'>
                          -{formatDollarAmount(propertyInsurance)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Mortgage Ins.
                        </TableCell>
                        <TableCell className='text-right'>
                          -{formatDollarAmount(mortgageInsurance)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>HOA</TableCell>
                        <TableCell className='text-right'>
                          -{formatDollarAmount(hoa)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Misc. Monthly
                        </TableCell>
                        <TableCell className='text-right'>
                          -
                          {formatDollarAmount(
                            Number(evaluation?.miscellaneous),
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-bold'>TOTAL</TableCell>
                        <TableCell className='text-right font-bold'>
                          {formatDollarAmount(cashflowTotal)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ConventionalFinancing;
