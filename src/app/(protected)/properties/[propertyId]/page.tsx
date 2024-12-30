"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import React, { use } from "react";

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  console.log("property id", propertyId);
  if (!propertyId) {
    return notFound();
  }

  const { data: property } = api.property.getPropertyById.useQuery({
    propertyId: propertyId as string,
  });

  return (
    <div className="h-full w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Property Details</div>
        <Button variant="outline" asChild>
          <Link href="/properties">
            <MoveLeft className="mr-2 size-4" />
            Back to properties
          </Link>
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="max-w-xs">
          <img src={property?.imageUrl!} alt="property" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <h1 className="text-xl font-medium">{property?.streetAddress}</h1>
          <p>
            {property?.city}, {property?.state} {property?.postalCode}
          </p>
          <p>{property?.createdAt.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
