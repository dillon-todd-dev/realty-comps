"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { Evaluation } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type DealTermsFormData = {
  estimatedSalePrice: number;
  sellerContribution: number;
  repairs: number;
  insurance: number;
  rent: number;
  hardAppraisedPrice: number;
  survey: number;
  hoa: number;
  inspection: number;
  maxRefiCashback: number;
  purchasePrice: number;
  appraisal: number;
  propertyTax: number;
  miscellaneous: number;
};

type Props = {
  evaluation: Evaluation;
};

const DealTerms = ({ evaluation }: Props) => {
  const utils = api.useUtils();
  const dealTermsForm = useForm<DealTermsFormData>();
  const updateDealTerms = api.evaluation.updateDealTerms.useMutation();

  useEffect(() => {
    if (evaluation) {
      dealTermsForm.reset({
        estimatedSalePrice: Number(evaluation.estimatedSalePrice),
        sellerContribution: Number(evaluation.sellerContribution),
        repairs: Number(evaluation.repairs),
        insurance: Number(evaluation.insurance),
        rent: Number(evaluation.rent),
        hardAppraisedPrice: Number(evaluation.hardAppraisedPrice),
        survey: Number(evaluation.survey),
        hoa: Number(evaluation.hoa),
        inspection: Number(evaluation.inspection),
        maxRefiCashback: Number(evaluation.maxRefiCashback),
        purchasePrice: Number(evaluation.purchasePrice),
        appraisal: Number(evaluation.appraisal),
        propertyTax: Number(evaluation.propertyTax),
        miscellaneous: Number(evaluation.miscellaneous),
      });
    }
  }, [evaluation, dealTermsForm.reset]);

  const handleDealTermsSubmit = (dealTermsData: DealTermsFormData) => {
    updateDealTerms.mutate(
      {
        data: {
          estimatedSalePrice: Number(dealTermsData.estimatedSalePrice),
          sellerContribution: Number(dealTermsData.sellerContribution),
          repairs: Number(dealTermsData.repairs),
          insurance: Number(dealTermsData.insurance),
          rent: Number(dealTermsData.rent),
          hardAppraisedPrice: Number(dealTermsData.hardAppraisedPrice),
          survey: Number(dealTermsData.survey),
          hoa: Number(dealTermsData.hoa),
          inspection: Number(dealTermsData.inspection),
          maxRefiCashback: Number(dealTermsData.maxRefiCashback),
          purchasePrice: Number(dealTermsData.purchasePrice),
          appraisal: Number(dealTermsData.appraisal),
          propertyTax: Number(dealTermsData.propertyTax),
          miscellaneous: Number(dealTermsData.miscellaneous),
        },
        evaluationId: evaluation.id,
      },
      {
        onSuccess: () => {
          toast.success("Successfully updated deal terms");
          utils.evaluation.getEvaluationById.invalidate({
            evaluationId: evaluation.id,
          });
        },
        onError: () => {
          toast.error("Unable to update deal terms");
        },
      },
    );
  };

  return (
    <Card className="border-sidebar-border bg-sidebar">
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
              <label className="mb-1 block text-sm font-medium">
                Estimated Sale Price
              </label>
              <Input {...dealTermsForm.register("estimatedSalePrice")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Seller Contribution
              </label>
              <Input {...dealTermsForm.register("sellerContribution")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Repairs & Make-ready
              </label>
              <Input {...dealTermsForm.register("repairs")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Insurance Annually
              </label>
              <Input {...dealTermsForm.register("insurance")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Rent</label>
              <Input {...dealTermsForm.register("rent")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Hard Appraised Price
              </label>
              <Input {...dealTermsForm.register("hardAppraisedPrice")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Survey</label>
              <Input {...dealTermsForm.register("survey")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                HOA Annually
              </label>
              <Input {...dealTermsForm.register("hoa")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Inspection
              </label>
              <Input {...dealTermsForm.register("inspection")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Max Refi Cashback
              </label>
              <Input {...dealTermsForm.register("maxRefiCashback")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Purchase Price
              </label>
              <Input {...dealTermsForm.register("purchasePrice")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Appraisal
              </label>
              <Input {...dealTermsForm.register("appraisal")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Property Tax Annually
              </label>
              <Input {...dealTermsForm.register("propertyTax")} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Misc. Monthly
              </label>
              <Input {...dealTermsForm.register("miscellaneous")} />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button type="submit">
              <span>
                {updateDealTerms.isPending ? (
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
  );
};

export default DealTerms;
