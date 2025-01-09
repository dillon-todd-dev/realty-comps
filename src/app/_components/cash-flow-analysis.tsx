"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CashFlowAnalysis = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    estimatedSalePrice: "",
    sellerContribution: "",
    repairsMakeReady: "",
    insuranceAnnually: "",
    rent: "",
    hardAppraisedPrice: "",
    survey: "",
    hoaAnnually: "",
    inspection: "",
    maxRefiCashback: "",
    purchasePrice: "",
    appraisal: "",
    propertyTaxAnnually: "",
    miscMonthly: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the evaluation data to your backend
    console.log({ propertyId: params.id, ...formData });
    // After submission, redirect back to the property page
    router.push(`/property/${params.id}`);
  };

  return (
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="estimatedSalePrice"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Estimated Sale Price
                  </label>
                  <Input
                    type="number"
                    id="estimatedSalePrice"
                    name="estimatedSalePrice"
                    value={formData.estimatedSalePrice}
                    onChange={handleChange}
                    placeholder="Estimated Sale Price"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sellerContribution"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Seller Contribution
                  </label>
                  <Input
                    type="number"
                    id="sellerContribution"
                    name="sellerContribution"
                    value={formData.sellerContribution}
                    onChange={handleChange}
                    placeholder="Seller Contribution"
                  />
                </div>
                <div>
                  <label
                    htmlFor="repairsMakeReady"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Repairs & Make-ready
                  </label>
                  <Input
                    type="number"
                    id="repairsMakeReady"
                    name="repairsMakeReady"
                    value={formData.repairsMakeReady}
                    onChange={handleChange}
                    placeholder="Repairs & Make-ready"
                  />
                </div>
                <div>
                  <label
                    htmlFor="insuranceAnnually"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Insurance Annually
                  </label>
                  <Input
                    type="number"
                    id="insuranceAnnually"
                    name="insuranceAnnually"
                    value={formData.insuranceAnnually}
                    onChange={handleChange}
                    placeholder="Insurance Annually"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rent"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Rent
                  </label>
                  <Input
                    type="number"
                    id="rent"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    placeholder="Rent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="hardAppraisedPrice"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Hard Appraised Price
                  </label>
                  <Input
                    type="number"
                    id="hardAppraisedPrice"
                    name="hardAppraisedPrice"
                    value={formData.hardAppraisedPrice}
                    onChange={handleChange}
                    placeholder="Hard Appraised Price"
                  />
                </div>
                <div>
                  <label
                    htmlFor="survey"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Survey
                  </label>
                  <Input
                    type="number"
                    id="survey"
                    name="survey"
                    value={formData.survey}
                    onChange={handleChange}
                    placeholder="Survey"
                  />
                </div>
                <div>
                  <label
                    htmlFor="hoaAnnually"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    HOA Annually
                  </label>
                  <Input
                    type="number"
                    id="hoaAnnually"
                    name="hoaAnnually"
                    value={formData.hoaAnnually}
                    onChange={handleChange}
                    placeholder="HOA Annually"
                  />
                </div>
                <div>
                  <label
                    htmlFor="inspection"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Inspection
                  </label>
                  <Input
                    type="number"
                    id="inspection"
                    name="inspection"
                    value={formData.inspection}
                    onChange={handleChange}
                    placeholder="Inspection"
                  />
                </div>
                <div>
                  <label
                    htmlFor="maxRefiCashback"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Max Refi Cashback
                  </label>
                  <Input
                    type="number"
                    id="maxRefiCashback"
                    name="maxRefiCashback"
                    value={formData.maxRefiCashback}
                    onChange={handleChange}
                    placeholder="Max Refi Cashback"
                  />
                </div>
                <div>
                  <label
                    htmlFor="purchasePrice"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Purchase Price
                  </label>
                  <Input
                    type="number"
                    id="purchasePrice"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    placeholder="Purchase Price"
                  />
                </div>
                <div>
                  <label
                    htmlFor="appraisal"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Appraisal
                  </label>
                  <Input
                    type="number"
                    id="appraisal"
                    name="appraisal"
                    value={formData.appraisal}
                    onChange={handleChange}
                    placeholder="Appraisal"
                  />
                </div>
                <div>
                  <label
                    htmlFor="propertyTaxAnnually"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Property Tax Annually
                  </label>
                  <Input
                    type="number"
                    id="propertyTaxAnnually"
                    name="propertyTaxAnnually"
                    value={formData.propertyTaxAnnually}
                    onChange={handleChange}
                    placeholder="Property Tax Annually"
                  />
                </div>
                <div>
                  <label
                    htmlFor="miscMonthly"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Misc. Monthly
                  </label>
                  <Input
                    type="number"
                    id="miscMonthly"
                    name="miscMonthly"
                    value={formData.miscMonthly}
                    onChange={handleChange}
                    placeholder="Misc. Monthly"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <Button type="button" onClick={handleUpdate}>
                  Update
                </Button>
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
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label
                        htmlFor="downPayment"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Down Payment
                      </label>
                      <Input
                        type="number"
                        id="downPayment"
                        name="downPayment"
                        value={conventionalFinancing.downPayment}
                        onChange={handleConventionalFinancingChange}
                        placeholder="Down Payment"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="loanTerm"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Loan Term (years)
                      </label>
                      <Input
                        type="number"
                        id="loanTerm"
                        name="loanTerm"
                        value={conventionalFinancing.loanTerm}
                        onChange={handleConventionalFinancingChange}
                        placeholder="Loan Term"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="interestRate"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Interest Rate (%)
                      </label>
                      <Input
                        type="number"
                        id="interestRate"
                        name="interestRate"
                        value={conventionalFinancing.interestRate}
                        onChange={handleConventionalFinancingChange}
                        placeholder="Interest Rate"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lenderTitleFees"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Lender & Title Fees
                      </label>
                      <Input
                        type="number"
                        id="lenderTitleFees"
                        name="lenderTitleFees"
                        value={conventionalFinancing.lenderTitleFees}
                        onChange={handleConventionalFinancingChange}
                        placeholder="Lender & Title Fees"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="monthsTaxIns"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        # Months Tax & Ins
                      </label>
                      <Input
                        type="number"
                        id="monthsTaxIns"
                        name="monthsTaxIns"
                        value={conventionalFinancing.monthsTaxIns}
                        onChange={handleConventionalFinancingChange}
                        placeholder="# Months Tax & Ins"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mortgageInsAnnually"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Mortgage Ins. Annually
                      </label>
                      <Input
                        type="number"
                        id="mortgageInsAnnually"
                        name="mortgageInsAnnually"
                        value={conventionalFinancing.mortgageInsAnnually}
                        onChange={handleConventionalFinancingChange}
                        placeholder="Mortgage Ins. Annually"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleConventionalFinancingUpdate}
                    >
                      Update
                    </Button>
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
                <Input type="number" id="loanTermHM" placeholder="Loan Term" />
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default CashFlowAnalysis;
