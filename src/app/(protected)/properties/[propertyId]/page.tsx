"use client";

import { api } from "@/trpc/react";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { propertyId: string };
};

const PropertyDetailPage = ({ params }: Props) => {
  const propertyId = React.use(params);
  console.log("property id", propertyId);
  if (!propertyId) {
    return notFound();
  }

  const { data: property } = api.property.getPropertyById.useQuery({
    propertyId,
  });

  return <div>{property?.id}</div>;
};

export default PropertyDetailPage;
