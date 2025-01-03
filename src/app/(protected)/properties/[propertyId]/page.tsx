"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Bath, Bed, MoveLeft, Ruler } from "lucide-react";
import Image from "next/image";
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
    <div className="min-h-[calc(100vh-9rem)] p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg shadow-md">
        <div className="md:flex">
          <div className="md:w-1/2 md:flex-shrink-0">
            <Image
              src={property?.imageUrl!}
              alt={property?.streetAddress!}
              width={600}
              height={400}
              className="h-64 w-full object-cover md:h-full"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
              Property ID: {property?.id}
            </div>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              {property?.streetAddress}
            </h1>
            <p className="mt-2 text-3xl font-bold text-gray-900">$150,000</p>
            <div className="mt-4 flex justify-between text-gray-600">
              <div className="flex items-center">
                <Bed className="mr-2 h-5 w-5" />
                <span>3 bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-2 h-5 w-5" />
                <span>2 bathrooms</span>
              </div>
              <div className="flex items-center">
                <Ruler className="mr-2 h-5 w-5" />
                <span>1500 sqft</span>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <Button className="mr-4">Schedule Viewing</Button>
              <Link
                href="/properties"
                className="text-indigo-500 transition-colors hover:text-indigo-600"
              >
                Back to Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
