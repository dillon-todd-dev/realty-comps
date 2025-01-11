"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Prisma } from "@prisma/client";
import { Bath, Bed, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  property: Prisma.PropertyGetPayload<{ include: { propertyDetail: true } }>;
};

const PropertyDetails = ({ property }: Props) => {
  return (
    <div className="mb-8 overflow-hidden rounded-lg shadow-md">
      <div className="md:flex">
        <div className="md:w-1/2 md:flex-shrink-0">
          <Image
            src={property?.imageUrl ?? "/no-image-available.jpg"}
            alt={property?.streetAddress ?? "property"}
            width={600}
            height={400}
            className="h-64 w-full object-cover md:h-full"
          />
        </div>
        <div className="p-8 md:w-1/2">
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            Property ID: {property?.id}
          </div>
          <h1 className="mt-1 text-3xl font-bold">{property?.streetAddress}</h1>
          <p className="mt-2 text-3xl font-bold">$246,000</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center">
              <Bed className="mr-2 h-5 w-5" />
              <span>{property?.propertyDetail?.beds} bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-2 h-5 w-5" />
              <span>
                {property?.propertyDetail?.baths?.toString()} bathrooms
              </span>
            </div>
            <div className="flex items-center">
              <Ruler className="mr-2 h-5 w-5" />
              <span>
                {property?.propertyDetail?.squareFootage?.toString()} sqft
              </span>
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
  );
};

export default PropertyDetails;
