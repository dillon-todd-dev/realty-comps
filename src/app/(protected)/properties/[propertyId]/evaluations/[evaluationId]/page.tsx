"use client";

import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}

type ConventionalFinancingFormData = {
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  lenderTitleFees: number;
  monthsTaxIns: number;
  annualMortgageIns: number;
};

type DealTermsFormData = {
  estimatedSalePrice: number;
  sellerContribution: number;
  repairsMakeReady: number;
  insuranceAnnually: number;
  rent: number;
  hardAppraisedPrice: number;
  survey: number;
  hoaAnnually: number;
  inspection: number;
  maxRefiCashback: number;
  purchasePrice: number;
  appraisal: number;
  propertyTaxAnnually: number;
  miscMonthly: number;
};

const properties: Property[] = [];

export default function CreateEvaluationPage() {
  const { evaluationId } = useParams();
  if (!evaluationId) {
    return notFound();
  }

  const { data: evaluation } = api.evaluation.getEvaluationById.useQuery({
    evaluationId: evaluationId as string,
  });

  const dealTermsForm = useForm<DealTermsFormData>();
  const conventionalFinancingForm = useForm<ConventionalFinancingFormData>();

  const handleDealTermsSubmit = (dealTermsData: DealTermsFormData) => {
    console.log(dealTermsData);
  };

  const handleConventionalFinancingSubmit = (
    conventionalFinancingData: ConventionalFinancingFormData,
  ) => {
    console.log(conventionalFinancingData);
  };

  useEffect(() => {
    if (evaluation) {
      dealTermsForm.reset({
        estimatedSalePrice: Number(evaluation.estimatedSalePrice),
        sellerContribution: Number(evaluation.sellerContribution),
        repairsMakeReady: Number(evaluation.repairs),
        insuranceAnnually: Number(evaluation.insurance),
        rent: Number(evaluation.rent),
        hardAppraisedPrice: Number(evaluation.hardAppraisedPrice),
        survey: Number(evaluation.survey),
        hoaAnnually: Number(evaluation.hoa),
        inspection: Number(evaluation.inspection),
        maxRefiCashback: Number(evaluation.maxRefiCashback),
        purchasePrice: Number(evaluation.purchasePrice),
        appraisal: Number(evaluation.appraisal),
        propertyTaxAnnually: Number(evaluation.propertyTax),
        miscMonthly: Number(evaluation.miscellaneous),
      });

      conventionalFinancingForm.reset({
        downPayment: Number(evaluation.downPayment),
        loanTerm: Number(evaluation.loanTerm),
        interestRate: Number(evaluation.interestRate),
        lenderTitleFees: Number(evaluation.lenderFees),
        monthsTaxIns: Number(evaluation.monthsOfTaxes),
        annualMortgageIns: Number(evaluation.mortgageInsurance),
      });
    }
  }, [evaluation, dealTermsForm.reset, conventionalFinancingForm.reset]);

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
    miscMonthly: 100,
    total: 350,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <span>{evaluation?.property.streetAddress}</span>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sale Comparables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="radius"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Radius (miles)
                </label>
                <Input type="number" id="radius" placeholder="Radius" />
              </div>
              <div>
                <label
                  htmlFor="bedsMin"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Beds Min
                </label>
                <Input type="number" id="bedsMin" placeholder="Beds Min" />
              </div>
              <div>
                <label
                  htmlFor="bedsMax"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Beds Max
                </label>
                <Input type="number" id="bedsMax" placeholder="Beds Max" />
              </div>
              <div>
                <label
                  htmlFor="bathsMin"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Baths Min
                </label>
                <Input type="number" id="bathsMin" placeholder="Baths Min" />
              </div>
              <div>
                <label
                  htmlFor="bathsMax"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Baths Max
                </label>
                <Input type="number" id="bathsMax" placeholder="Baths Max" />
              </div>
              <div>
                <label
                  htmlFor="garageMin"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Garage Min
                </label>
                <Input type="number" id="garageMin" placeholder="Garage Min" />
              </div>
              <div>
                <label
                  htmlFor="garageMax"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Garage Max
                </label>
                <Input type="number" id="garageMax" placeholder="Garage Max" />
              </div>
              <div>
                <label
                  htmlFor="yearBuilt"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Year Built +/-
                </label>
                <Input
                  type="number"
                  id="yearBuilt"
                  placeholder="Year Built +/-"
                />
              </div>
              <div>
                <label
                  htmlFor="monthsClosed"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Months Closed
                </label>
                <Input
                  type="number"
                  id="monthsClosed"
                  placeholder="Months Closed"
                />
              </div>
            </div>
            <Button className="mb-4">Search Comparables</Button>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Beds</TableHead>
                  <TableHead>Baths</TableHead>
                  <TableHead>Sqft</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((prop) => (
                  <TableRow key={prop.id}>
                    <TableCell>{prop.address}</TableCell>
                    <TableCell>${prop.price.toLocaleString()}</TableCell>
                    <TableCell>{prop.bedrooms}</TableCell>
                    <TableCell>{prop.bathrooms}</TableCell>
                    <TableCell>{prop.sqft.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal terms, expenses, revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={dealTermsForm.handleSubmit(handleDealTermsSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Estimated Sale Price
                      </label>
                      <Input
                        {...dealTermsForm.register("estimatedSalePrice")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Seller Contribution
                      </label>
                      <Input
                        {...dealTermsForm.register("sellerContribution")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Repairs & Make-ready
                      </label>
                      <Input {...dealTermsForm.register("repairsMakeReady")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Insurance Annually
                      </label>
                      <Input {...dealTermsForm.register("insuranceAnnually")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Rent
                      </label>
                      <Input {...dealTermsForm.register("rent")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Hard Appraised Price
                      </label>
                      <Input
                        {...dealTermsForm.register("hardAppraisedPrice")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Survey
                      </label>
                      <Input {...dealTermsForm.register("survey")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        HOA Annually
                      </label>
                      <Input {...dealTermsForm.register("hoaAnnually")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Inspection
                      </label>
                      <Input {...dealTermsForm.register("inspection")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Max Refi Cashback
                      </label>
                      <Input {...dealTermsForm.register("maxRefiCashback")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Purchase Price
                      </label>
                      <Input {...dealTermsForm.register("purchasePrice")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Appraisal
                      </label>
                      <Input {...dealTermsForm.register("appraisal")} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Property Tax Annually
                      </label>
                      <Input
                        {...dealTermsForm.register("propertyTaxAnnually")}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Misc. Monthly
                      </label>
                      <Input {...dealTermsForm.register("miscMonthly")} />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-4">
                    <Button type="button">Update</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conventional Financing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card>
                  <CardContent>
                    <form
                      onSubmit={conventionalFinancingForm.handleSubmit(
                        handleConventionalFinancingSubmit,
                      )}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Down Payment
                          </label>
                          <Input
                            {...conventionalFinancingForm.register(
                              "downPayment",
                            )}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Loan Term (years)
                          </label>
                          <Input
                            {...conventionalFinancingForm.register("loanTerm")}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Interest Rate (%)
                          </label>
                          <Input
                            {...conventionalFinancingForm.register(
                              "interestRate",
                            )}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Lender & Title Fees
                          </label>
                          <Input
                            {...conventionalFinancingForm.register(
                              "lenderTitleFees",
                            )}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            # Months Tax & Ins
                          </label>
                          <Input
                            {...conventionalFinancingForm.register(
                              "monthsTaxIns",
                            )}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Mortgage Ins. Annually
                          </label>
                          <Input
                            {...conventionalFinancingForm.register(
                              "annualMortgageIns",
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="button">Update</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card>
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

                  <Card>
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
                              $
                              {cashOutOfPocket.prepaidExpenses.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Repairs
                            </TableCell>
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

                  <Card>
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
                              ${cashFlow.monthlyRent.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Note Payment
                            </TableCell>
                            <TableCell className="text-right">
                              ${cashFlow.notePayment.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Property Tax
                            </TableCell>
                            <TableCell className="text-right">
                              ${cashFlow.propertyTax.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Property Ins.
                            </TableCell>
                            <TableCell className="text-right">
                              ${cashFlow.propertyIns.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Mortgage Ins.
                            </TableCell>
                            <TableCell className="text-right">
                              ${cashFlow.mortgageIns.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">HOA</TableCell>
                            <TableCell className="text-right">
                              ${cashFlow.hoa.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Misc. Monthly
                            </TableCell>
                            <TableCell className="text-right">
                              ${cashFlow.miscMonthly.toLocaleString()}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">TOTAL</TableCell>
                            <TableCell className="text-right font-bold">
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

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Hard Money Financing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="loanAmount"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Loan Amount
                    </label>
                    <Input
                      type="number"
                      id="loanAmount"
                      placeholder="Loan Amount"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="interestRateHM"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Interest Rate
                    </label>
                    <Input
                      type="number"
                      id="interestRateHM"
                      placeholder="Interest Rate"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="loanTermHM"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Loan Term (months)
                    </label>
                    <Input
                      type="number"
                      id="loanTermHM"
                      placeholder="Loan Term"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
