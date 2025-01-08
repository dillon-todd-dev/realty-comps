"use client";

import PropertyDetails from "@/app/_components/property-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { BarChart, DollarSign, Loader2, Trash, TrendingUp } from "lucide-react";
import Link from "next/link";
import { notFound, redirect, useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  console.log("property id", propertyId);
  if (!propertyId) {
    return notFound();
  }

  const { data: property } = api.property.getPropertyById.useQuery({
    propertyId: propertyId as string,
  });

  const { data: evaluations } = api.evaluation.getEvaluations.useQuery({
    propertyId: propertyId as string,
  });

  const createEvaluation = api.evaluation.createEvaluation.useMutation();

  const handleCreateEvaluation = () => {
    createEvaluation.mutate(
      { propertyId: property?.id! },
      {
        onSuccess: ({ id }) => {
          toast.success("Successfully Created Evaluation!");
          redirect(`/properties/${property?.id}/evaluations/${id}`);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <PropertyDetails property={property!} />

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Property Evaluations</h2>
              <Button onClick={handleCreateEvaluation}>
                <span>
                  {createEvaluation.isPending ? (
                    <div className="animate-spin">
                      <Loader2 />
                    </div>
                  ) : (
                    "Create Evaluation"
                  )}
                </span>
              </Button>
            </div>
            {evaluations ? (
              <div className="space-y-4">
                {evaluations.map((evaluation) => (
                  <Card key={evaluation.id}>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-semibold">
                          Evaluation {evaluation.id}
                        </span>
                        <span className="text-sm text-gray-500">
                          {evaluation.createdAt}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className="flex flex-col items-center">
                          <DollarSign className="mb-1 h-6 w-6 text-green-500" />
                          <p className="text-xs font-medium text-gray-500">
                            Equity Capture
                          </p>
                          <p className="text-sm font-bold">
                            ${evaluation.equityCapture.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <TrendingUp className="mb-1 h-6 w-6 text-blue-500" />
                          <p className="text-xs font-medium text-gray-500">
                            Annual Cash Flow
                          </p>
                          <p className="text-sm font-bold">
                            ${evaluation.annualCashFlow.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <BarChart className="mb-1 h-6 w-6 text-purple-500" />
                          <p className="text-xs font-medium text-gray-500">
                            Return On Capital Gain
                          </p>
                          <p className="text-sm font-bold">
                            {(evaluation.returnOnCapitalGain * 100).toFixed(2)}%
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <DollarSign className="mb-1 h-6 w-6 text-yellow-500" />
                          <p className="text-xs font-medium text-gray-500">
                            Cash On Cash Return
                          </p>
                          <p className="text-sm font-bold">
                            {(evaluation.cashOnCashReturn * 100).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/properties/${property?.id}/evaluations/${evaluation.id}`}
                          >
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No evaluations available for this property.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
