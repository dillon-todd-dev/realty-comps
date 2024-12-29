"use client";

import { api } from "@/trpc/react";
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

  return <div>{property?.streetAddress}</div>;
};

export default PropertyDetailPage;
