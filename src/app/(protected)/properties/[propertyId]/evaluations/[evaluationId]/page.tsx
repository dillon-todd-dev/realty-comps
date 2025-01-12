"use client";

import { notFound, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import DealTerms from "@/app/_components/evaluations/deal-terms";
import ConventionalFinancing from "@/app/_components/evaluations/conventional-financing";
import HardMoneyFinancing from "@/app/_components/evaluations/hard-money-financing";
import SaleComparables from "@/app/_components/evaluations/sale-comparables";
import { useState } from "react";

export default function EvaluationPage() {
  const [hardMoneyOpen, setHardMoneyOpen] = useState(false);
  const [conventionalMoneyOpen, setConventionalMoneyOpen] = useState(false);

  const { evaluationId } = useParams();
  if (!evaluationId) {
    return notFound();
  }

  const { data: evaluation, error } = api.evaluation.getEvaluationById.useQuery(
    {
      evaluationId: evaluationId as string,
    },
  );

  if (error) {
    return notFound();
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <span>{evaluation?.property.address.street}</span>
        </div>
        <SaleComparables />
        <Card className="border-sidebar-border bg-sidebar">
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <DealTerms evaluation={evaluation!} />
            <ConventionalFinancing
              evaluation={evaluation!}
              conventionalMoneyOpen={conventionalMoneyOpen}
              setConventionalMoneyOpen={setConventionalMoneyOpen}
            />
            <HardMoneyFinancing
              evaluation={evaluation!}
              hardMoneyOpen={hardMoneyOpen}
              setHardMoneyOpen={setHardMoneyOpen}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
