"use client";

import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Property } from "@prisma/client";
import Link from "next/link";

const PropertiesPage = () => {
  const { data: properties } = api.property.getProperties.useQuery({
    take: 6,
  });

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties?.map((property: Property) => (
        <Link key={property.id} href={`/properties/${property.id}`}>
          <div className="flex justify-center">
            <Card className="max-w-s w-full">
              <div className="relative">
                <img
                  src={property.imageUrl!}
                  alt="property"
                  className="h-30 w-full rounded-t-lg object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">
                  {property.streetAddress}
                </h2>
                <p className="mt-2 text-gray-600">
                  {property.city}, {property.state} {property.postalCode}
                </p>
              </CardContent>
            </Card>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default PropertiesPage;
