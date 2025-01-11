"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/react";
import { Evaluation } from "@prisma/client";
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
          toast.success("Successfully updated conventional financing terms");
          utils.evaluation.getEvaluationById.invalidate({
            evaluationId: evaluation.id,
          });
        },
        onError: () => {
          toast.error("Unable to update conventional financing terms");
        },
      },
    );
  };

  const propertyTax: string = useMemo(() => {
    const annualPropertyTax = Number(evaluation?.propertyTax);
    if (annualPropertyTax === 0) {
      return "0";
    }
    const monthlyPropertyTax = annualPropertyTax / 12;
    return monthlyPropertyTax.toLocaleString();
  }, [evaluation?.propertyTax]);

  const propertyInsurance: string = useMemo(() => {
    const annualInsurance = Number(evaluation?.insurance);
    if (annualInsurance === 0) {
      return "0";
    }
    const monthlyInsurance = annualInsurance / 12;
    return monthlyInsurance.toLocaleString();
  }, [evaluation?.insurance]);

  const mortgageInsurance: string = useMemo(() => {
    const annualInsurance = Number(evaluation?.refiMortgageInsurance);
    if (annualInsurance === 0) {
      return "0";
    }
    const monthlyInsurance = annualInsurance / 12;
    return monthlyInsurance.toLocaleString();
  }, [evaluation?.refiMortgageInsurance]);

  const hoa: string = useMemo(() => {
    const annualHoa = Number(evaluation?.hoa);
    if (annualHoa === 0) {
      return "0";
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
    return total <= 0
      ? "-$" + total.toLocaleString()
      : "$" + total.toLocaleString();
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
      open={conventionalMoneyOpen}
      onOpenChange={setConventionalMoneyOpen}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Card className="w-full cursor-pointer border-sidebar-border bg-sidebar">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Conventional Financing</CardTitle>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                conventionalMoneyOpen ? "rotate-180 transform" : ""
              }`}
            />
          </CardHeader>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <Card className="border-sidebar-border bg-sidebar">
          <CardContent className="mt-4 space-y-6">
            <Card className="border-sidebar-border bg-sidebar">
              <CardContent>
                <form
                  onSubmit={conventionalFinancingForm.handleSubmit(
                    handleConventionalFinancingSubmit,
                  )}
                  className="space-y-4 pt-10"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Down Payment
                      </label>
                      <Input
                        {...conventionalFinancingForm.register("downPayment")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Loan Term (years)
                      </label>
                      <Input
                        {...conventionalFinancingForm.register("loanTerm")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Interest Rate (%)
                      </label>
                      <Input
                        {...conventionalFinancingForm.register("interestRate")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Lender & Title Fees
                      </label>
                      <Input
                        {...conventionalFinancingForm.register("lenderFees")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        # Months Tax & Ins
                      </label>
                      <Input
                        {...conventionalFinancingForm.register("monthsOfTaxes")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Mortgage Ins. Annually
                      </label>
                      <Input
                        {...conventionalFinancingForm.register(
                          "mortgageInsurance",
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">
                      <span>
                        {updateConventionalFinancing.isPending ? (
                          <div className="animate-spin">
                            <Loader2 />
                          </div>
                        ) : (
                          "Update"
                        )}
                      </span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="border-sidebar-border bg-sidebar">
                <CardHeader>
                  <CardTitle>Gains And Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Equity Capture
                        </TableCell>
                        <TableCell className="text-right">
                          ${gainsAndReturns.equityCapture.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Annual Cash Flow
                        </TableCell>
                        <TableCell className="text-right">
                          ${gainsAndReturns.annualCashFlow.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Return On Equity Capture
                        </TableCell>
                        <TableCell className="text-right">
                          {gainsAndReturns.returnOnEquityCapture}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Cash On Cash Return
                        </TableCell>
                        <TableCell className="text-right">
                          {gainsAndReturns.cashOnCashReturn}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-sidebar-border bg-sidebar">
                <CardHeader>
                  <CardTitle>Cash Out Of Pocket</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Down Payment
                        </TableCell>
                        <TableCell className="text-right">
                          ${cashOutOfPocket.downPayment.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Closing Costs
                        </TableCell>
                        <TableCell className="text-right">
                          ${cashOutOfPocket.closingCosts.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Prepaid Expenses
                        </TableCell>
                        <TableCell className="text-right">
                          ${cashOutOfPocket.prepaidExpenses.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Repairs</TableCell>
                        <TableCell className="text-right">
                          ${cashOutOfPocket.repairs.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">TOTAL</TableCell>
                        <TableCell className="text-right font-bold">
                          ${cashOutOfPocket.total.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border-sidebar-border bg-sidebar">
                <CardHeader>
                  <CardTitle>Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Monthly Rent
                        </TableCell>
                        <TableCell className="text-right">
                          ${Number(evaluation?.rent).toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Note Payment
                        </TableCell>
                        <TableCell className="text-right">
                          -${cashFlow.notePayment.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Property Tax
                        </TableCell>
                        <TableCell className="text-right">
                          -${propertyTax}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Property Ins.
                        </TableCell>
                        <TableCell className="text-right">
                          -${propertyInsurance}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Mortgage Ins.
                        </TableCell>
                        <TableCell className="text-right">
                          -$
                          {Number(
                            evaluation?.mortgageInsurance,
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">HOA</TableCell>
                        <TableCell className="text-right">-${hoa}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Misc. Monthly
                        </TableCell>
                        <TableCell className="text-right">
                          -${Number(evaluation?.miscellaneous).toLocaleString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">TOTAL</TableCell>
                        <TableCell className="text-right font-bold">
                          {cashflowTotal}
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
