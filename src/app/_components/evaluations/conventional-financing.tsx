'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { api } from '@/trpc/react';
import { Evaluation } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
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

const cashFlow = {
  monthlyRent: 2000,
  notePayment: 1200,
  propertyTax: 200,
  propertyIns: 100,
  mortgageIns: 50,
  hoa: 0,
  miscellaneous: 100,
  total: 350,
};

type Props = {
  evaluation: Evaluation;
};

const ConventionalFinancing = ({ evaluation }: Props) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conventional Financing</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Card>
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
                  <Input {...conventionalFinancingForm.register('loanTerm')} />
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
                    {...conventionalFinancingForm.register('mortgageInsurance')}
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
          <Card>
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

          <Card>
            <CardHeader>
              <CardTitle>Cash Out Of Pocket</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>Down Payment</TableCell>
                    <TableCell className='text-right'>
                      ${cashOutOfPocket.downPayment.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Closing Costs</TableCell>
                    <TableCell className='text-right'>
                      ${cashOutOfPocket.closingCosts.toLocaleString()}
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
                      ${cashOutOfPocket.repairs.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>TOTAL</TableCell>
                    <TableCell className='text-right font-bold'>
                      ${cashOutOfPocket.total.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium'>Monthly Rent</TableCell>
                    <TableCell className='text-right'>
                      ${cashFlow.monthlyRent.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Note Payment</TableCell>
                    <TableCell className='text-right'>
                      ${cashFlow.notePayment.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Property Tax</TableCell>
                    <TableCell className='text-right'>
                      ${cashFlow.propertyTax.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Property Ins.</TableCell>
                    <TableCell className='text-right'>
                      ${cashFlow.propertyIns.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Mortgage Ins.</TableCell>
                    <TableCell className='text-right'>
                      ${cashFlow.mortgageIns.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>HOA</TableCell>
                    <TableCell className='text-right'>
                      ${cashFlow.hoa.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Misc. Monthly</TableCell>
                    <TableCell className='text-right'>
                      ${cashFlow.miscellaneous.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>TOTAL</TableCell>
                    <TableCell className='text-right font-bold'>
                      ${cashFlow.total.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConventionalFinancing;
