import { Button } from "@/components/ui/button";
import { Property } from "@prisma/client";
import { Bath, Bed, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  property: Property;
};

const PropertyDetails = ({ property }: Props) => {
  return (
    <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
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
          <p className="mt-2 text-3xl font-bold text-gray-900">$246,000</p>
          <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
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
              <span>1900 sqft</span>
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
