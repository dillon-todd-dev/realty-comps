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
import { formatDollarAmount } from '@/lib/utils';
import { api } from '@/trpc/react';
import { type Evaluation } from '@prisma/client';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
  evaluation: Evaluation;
  hardMoneyOpen: boolean;
  setHardMoneyOpen: (open: boolean) => void;
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

const HardMoneyFinancing = ({
  evaluation,
  hardMoneyOpen,
  setHardMoneyOpen,
}: Props) => {
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
  }, [evaluation, hardMoneyFinancingForm]);

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
        onSuccess: async () => {
          toast.success('Successfully updated hard money financing terms');
          await utils.evaluation.getEvaluationById.invalidate({
            evaluationId: evaluation.id,
          });
        },
        onError: () => {
          toast.error('Unable to update hard money financing terms');
        },
      },
    );
  };

  const hardCashToClose: number = useMemo(() => {
    const appraisal = Number(evaluation?.appraisal);
    const survey = Number(evaluation?.survey);
    const inspection = Number(evaluation?.inspection);
    return appraisal + survey + inspection;
  }, [evaluation?.appraisal, evaluation?.survey, evaluation?.inspection]);

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
      rent - propertyTax - propertyInsurance - hoa - mortgageInsurance - misc
    );
  }, [
    evaluation?.rent,
    propertyTax,
    propertyInsurance,
    mortgageInsurance,
    hoa,
    evaluation?.miscellaneous,
  ]);

  return (
    <Collapsible
      open={hardMoneyOpen}
      onOpenChange={setHardMoneyOpen}
      className='w-full'
    >
      <CollapsibleTrigger asChild>
        <Card className='w-full cursor-pointer border-sidebar-border bg-sidebar'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Hard Money Financing</CardTitle>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                hardMoneyOpen ? 'rotate-180 transform' : ''
              }`}
            />
          </CardHeader>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-2'>
        <Card className='mt-6 border-sidebar-border bg-sidebar'>
          <CardContent className='mt-6 space-y-6'>
            <Card className='border-sidebar-border bg-sidebar'>
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
                          <label className='mb-1 block text-sm font-medium'>
                            Loan to Value
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register(
                              'hardLoanToValue',
                            )}
                          />
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
                            Lender & Title Fees
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register(
                              'hardLenderFees',
                            )}
                          />
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
                            Interest Rate (%)
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register(
                              'hardInterestRate',
                            )}
                          />
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
                            # Months to Refi
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register(
                              'hardMonthsToRefi',
                            )}
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
                          <label className='text-sm font-medium'>
                            Roll in Lender Fees?
                          </label>
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
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
                      <h3 className='mb-4 text-lg font-semibold'>
                        Refinance Loan
                      </h3>
                      <div className='space-y-4'>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
                            Loan to Value
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register(
                              'refiLoanToValue',
                            )}
                          />
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
                            Loan Term (years)
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register('refiLoanTerm')}
                          />
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
                            Interest Rate (%)
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register(
                              'refiInterestRate',
                            )}
                          />
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
                            Lender & Title Fees
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register(
                              'refiLenderFees',
                            )}
                          />
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
                            # Months Tax & Ins
                          </label>
                          <Input
                            {...hardMoneyFinancingForm.register(
                              'refiMonthsOfTaxes',
                            )}
                          />
                        </div>
                        <div>
                          <label className='mb-1 block text-sm font-medium'>
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
                          Hard cash to close
                        </TableCell>
                        <TableCell className='text-right'>
                          ${hardCashToClose}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Closing Costs
                        </TableCell>
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
                          {formatDollarAmount(Number(evaluation?.repairs))}
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
                          -${cashFlow.notePayment.toLocaleString()}
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
                          Property Insurance
                        </TableCell>
                        <TableCell className='text-right'>
                          -{formatDollarAmount(propertyInsurance)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className='font-medium'>
                          Mortgage Insurance
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
                        <TableCell className='font-medium'>TOTAL</TableCell>
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

export default HardMoneyFinancing;
