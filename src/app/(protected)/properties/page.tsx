"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { api } from "@/trpc/react";
import { Property } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PROPERTIES_PER_PAGE = 8;

const PropertiesPage = () => {
  const searchParams = useSearchParams();
  const page: string | null = searchParams.get("page");
  const currentPage = page ? parseInt(page) : 1;
  const skip = PROPERTIES_PER_PAGE * (currentPage - 1);
  const { data } = api.property.getProperties.useQuery({
    take: PROPERTIES_PER_PAGE,
    skip,
  });

  console.log(data);

  return (
    <div className="space-y-6">
      <div className="mb-10">
        <PaginationWithLinks
          totalCount={data?.totalProperties || 0}
          pageSize={PROPERTIES_PER_PAGE}
          page={currentPage}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.properties?.map((property: Property) => (
          <Link key={property.id} href={`/properties/${property.id}`}>
            <div className="flex justify-center">
              <Card className="max-w-s w-full">
                <div className="relative">
                  <img
                    src={property.imageUrl!}
                    alt="property"
                    className="w-full rounded-t-lg object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">
                    {property.streetAddress}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {property.city}, {property.state} {property.postalCode}
                  </p>
                  <div className="mx-4 mt-4 flex justify-between">
                    <p>Evaluating</p>
                    {property.createdAt.toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
