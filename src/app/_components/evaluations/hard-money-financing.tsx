'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { api } from '@/trpc/react';
import { Evaluation } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
  evaluation: Evaluation;
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

type HardMoneyFinancingFormData = {
  hardLoanToValue: number;
  hardLenderFees: number;
  hardInterestRate: number;
  hardMonthsToRefi: number;
  hardRollInLenderFees: boolean;
  hardWeeksUntilLeased: number;
  refiLoanToValue: number;
  refiLoanTerm: number;
  refiInterestRate: number;
  refiLenderFees: number;
  refiMonthsOfTaxes: number;
  refiMortgageInsurance: number;
};

const HardMoneyFinancing = ({ evaluation }: Props) => {
  const utils = api.useUtils();
  const hardMoneyFinancingForm = useForm<HardMoneyFinancingFormData>();
  const updateHardMoneyFinancing =
    api.evaluation.updateHardMoneyFinancing.useMutation();

  useEffect(() => {
    if (evaluation) {
      hardMoneyFinancingForm.reset({
        hardLoanToValue: Number(evaluation.hardLoanToValue),
        hardLenderFees: Number(evaluation.hardLenderFees),
        hardInterestRate: Number(evaluation.hardInterestRate),
        hardMonthsToRefi: Number(evaluation.hardMonthsToRefi),
        hardRollInLenderFees: Boolean(evaluation.hardRollInLenderFees),
        hardWeeksUntilLeased: Number(evaluation.hardWeeksUntilLeased),
        refiLoanToValue: Number(evaluation.refiLoanToValue),
        refiLoanTerm: Number(evaluation.refiLoanTerm),
        refiInterestRate: Number(evaluation.refiInterestRate),
        refiLenderFees: Number(evaluation.refiLenderFees),
        refiMonthsOfTaxes: Number(evaluation.refiMonthsOfTaxes),
        refiMortgageInsurance: Number(evaluation.refiMortgageInsurance),
      });
    }
  }, [evaluation, hardMoneyFinancingForm.reset]);

  const handleHardMoneySubmit = (
    hardMoneyFinancingData: HardMoneyFinancingFormData,
  ) => {
    updateHardMoneyFinancing.mutate(
      {
        data: {
          hardLoanToValue: Number(hardMoneyFinancingData.hardLoanToValue),
          hardLenderFees: Number(hardMoneyFinancingData.hardLenderFees),
          hardInterestRate: Number(hardMoneyFinancingData.hardInterestRate),
          hardMonthsToRefi: Number(hardMoneyFinancingData.hardMonthsToRefi),
          hardRollInLenderFees: Boolean(
            hardMoneyFinancingData.hardRollInLenderFees,
          ),
          hardWeeksUntilLeased: Number(
            hardMoneyFinancingData.hardWeeksUntilLeased,
          ),
          refiLoanToValue: Number(hardMoneyFinancingData.refiLoanToValue),
          refiLoanTerm: Number(hardMoneyFinancingData.refiLoanTerm),
          refiInterestRate: Number(hardMoneyFinancingData.refiInterestRate),
          refiLenderFees: Number(hardMoneyFinancingData.refiLenderFees),
          refiMonthsOfTaxes: Number(hardMoneyFinancingData.refiMonthsOfTaxes),
          refiMortgageInsurance: Number(
            hardMoneyFinancingData.refiMortgageInsurance,
          ),
        },
        evaluationId: evaluation.id,
      },
      {
        onSuccess: () => {
          toast.success('Successfully updated hard money financing terms');
          utils.evaluation.getEvaluationById.invalidate({
            evaluationId: evaluation.id,
          });
        },
        onError: () => {
          toast.error('Unable to update hard money financing terms');
        },
      },
    );
  };

  const hardCashToClose: string = useMemo(() => {
    const appraisal = Number(evaluation?.appraisal);
    const survey = Number(evaluation?.survey);
    const inspection = Number(evaluation?.inspection);
    const total = appraisal + survey + inspection;
    return total.toLocaleString();
  }, [evaluation?.appraisal, evaluation?.survey, evaluation?.inspection]);

  const propertyTax: string = useMemo(() => {
    const annualPropertyTax = Number(evaluation?.propertyTax);
    if (annualPropertyTax === 0) {
      return '0';
    }
    const monthlyPropertyTax = annualPropertyTax / 12;
    return monthlyPropertyTax.toLocaleString();
  }, [evaluation?.propertyTax]);

  const propertyInsurance: string = useMemo(() => {
    const annualInsurance = Number(evaluation?.insurance);
    if (annualInsurance === 0) {
      return '0';
    }
    const monthlyInsurance = annualInsurance / 12;
    return monthlyInsurance.toLocaleString();
  }, [evaluation?.insurance]);

  const mortgageInsurance: string = useMemo(() => {
    const annualInsurance = Number(evaluation?.mortgageInsurance);
    if (annualInsurance === 0) {
      return '0';
    }
    const monthlyInsurance = annualInsurance / 12;
    return monthlyInsurance.toLocaleString();
  }, [evaluation?.mortgageInsurance]);

  const hoa: string = useMemo(() => {
    const annualHoa = Number(evaluation?.hoa);
    if (annualHoa === 0) {
      return '0';
    }
    const monthlyHoa = annualHoa / 12;
    return monthlyHoa.toLocaleString();
  }, [evaluation?.hoa]);

  const cashflowTotal: string = useMemo(() => {
    const rent = Number(evaluation?.rent);
    const propTax = Number(propertyTax);
    const propIns = Number(propertyInsurance);
    const mortIns = Number(mortgageInsurance);
    const propHoa = Number(hoa);
    const misc = Number(evaluation?.miscellaneous);
    const total = rent - propTax - propIns - propHoa - mortIns - misc;
    return total.toLocaleString();
  }, [
    evaluation?.rent,
    propertyTax,
    propertyInsurance,
    mortgageInsurance,
    hoa,
    evaluation?.miscellaneous,
  ]);

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle>Hard Money Financing</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <Card>
          <CardContent>
            <form
              onSubmit={hardMoneyFinancingForm.handleSubmit(
                handleHardMoneySubmit,
              )}
              className='space-y-4 pt-10'
            >
              <div className='grid h-full grid-cols-1 gap-6 lg:grid-cols-2'>
                <div className='h-full'>
                  <h3 className='mb-4 text-lg font-semibold'>
                    Hard Money Loan
                  </h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Loan to Value
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register('hardLoanToValue')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Lender & Title Fees
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register('hardLenderFees')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Interest Rate (%)
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register('hardInterestRate')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        # Months to Refi
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register('hardMonthsToRefi')}
                      />
                    </div>
                    <div className='flex items-center'>
                      <Input
                        {...hardMoneyFinancingForm.register(
                          'hardRollInLenderFees',
                        )}
                        type='checkbox'
                        className='mr-2 h-4 w-4'
                      />
                      <label className='text-sm font-medium text-gray-700'>
                        Roll in Lender Fees?
                      </label>
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Weeks Until Leased
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register(
                          'hardWeeksUntilLeased',
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className='h-full'>
                  <h3 className='mb-4 text-lg font-semibold'>Refinance Loan</h3>
                  <div className='space-y-4'>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Loan to Value
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register('refiLoanToValue')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Loan Term (years)
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register('refiLoanTerm')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Interest Rate (%)
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register('refiInterestRate')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Lender & Title Fees
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register('refiLenderFees')}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        # Months Tax & Ins
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register(
                          'refiMonthsOfTaxes',
                        )}
                      />
                    </div>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Mortgage Ins. Annually
                      </label>
                      <Input
                        {...hardMoneyFinancingForm.register(
                          'refiMortgageInsurance',
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-6 flex justify-end'>
                <Button type='submit'>
                  <span>
                    {updateHardMoneyFinancing.isPending ? (
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

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
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
                    <TableCell className='font-medium'>
                      Hard cash to close
                    </TableCell>
                    <TableCell className='text-right'>
                      ${hardCashToClose}
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
                      ${Number(evaluation?.rent).toLocaleString()}
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
                    <TableCell className='text-right'>{propertyTax}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Property Ins.</TableCell>
                    <TableCell className='text-right'>
                      {propertyInsurance}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Mortgage Ins.</TableCell>
                    <TableCell className='text-right'>
                      {mortgageInsurance}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>HOA</TableCell>
                    <TableCell className='text-right'>{hoa}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>Misc. Monthly</TableCell>
                    <TableCell className='text-right'>
                      ${Number(evaluation?.miscellaneous).toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='font-medium'>TOTAL</TableCell>
                    <TableCell className='text-right font-bold'>
                      ${cashflowTotal}
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

export default HardMoneyFinancing;
