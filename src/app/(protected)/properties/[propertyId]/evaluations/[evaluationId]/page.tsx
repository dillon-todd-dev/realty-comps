"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Property {
  id: number;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
}

const properties: Property[] = [
  {
    id: 1,
    address: "123 Main St, Anytown, USA",
    price: 350000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
  },
  {
    id: 2,
    address: "456 Elm St, Somewhere, USA",
    price: 425000,
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2200,
  },
  {
    id: 3,
    address: "789 Oak Ave, Elsewhere, USA",
    price: 550000,
    bedrooms: 5,
    bathrooms: 3,
    sqft: 2800,
  },
  {
    id: 4,
    address: "101 Pine Rd, Nowhere, USA",
    price: 300000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1500,
  },
  {
    id: 5,
    address: "202 Maple Dr, Anywhere, USA",
    price: 475000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
  },
];

export default function EvaluationDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the evaluation data to your backend
    console.log({ propertyId: params.id, rating, comment });
    // After submission, redirect back to the property page
    router.push(`/property/${params.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-3xl font-bold">
          Create Evaluation for Property {params.id}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Evaluation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`h-8 w-8 cursor-pointer ${value <= rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setRating(value)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Comment
                </label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Enter your evaluation..."
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Link href={`/property/${params.id}`} passHref>
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit">Submit Evaluation</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sale Comparables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="radius"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Radius (miles)
                </label>
                <Input type="number" id="radius" placeholder="Radius" />
              </div>
              <div>
                <label
                  htmlFor="bedsMin"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Beds Min
                </label>
                <Input type="number" id="bedsMin" placeholder="Beds Min" />
              </div>
              <div>
                <label
                  htmlFor="bedsMax"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Beds Max
                </label>
                <Input type="number" id="bedsMax" placeholder="Beds Max" />
              </div>
              <div>
                <label
                  htmlFor="bathsMin"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Baths Min
                </label>
                <Input type="number" id="bathsMin" placeholder="Baths Min" />
              </div>
              <div>
                <label
                  htmlFor="bathsMax"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Baths Max
                </label>
                <Input type="number" id="bathsMax" placeholder="Baths Max" />
              </div>
              <div>
                <label
                  htmlFor="garageMin"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Garage Min
                </label>
                <Input type="number" id="garageMin" placeholder="Garage Min" />
              </div>
              <div>
                <label
                  htmlFor="garageMax"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Garage Max
                </label>
                <Input type="number" id="garageMax" placeholder="Garage Max" />
              </div>
              <div>
                <label
                  htmlFor="yearBuilt"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Year Built +/-
                </label>
                <Input
                  type="number"
                  id="yearBuilt"
                  placeholder="Year Built +/-"
                />
              </div>
              <div>
                <label
                  htmlFor="monthsClosed"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Months Closed
                </label>
                <Input
                  type="number"
                  id="monthsClosed"
                  placeholder="Months Closed"
                />
              </div>
            </div>
            <Button className="mb-4">Search Comparables</Button>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Beds</TableHead>
                  <TableHead>Baths</TableHead>
                  <TableHead>Sqft</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((prop) => (
                  <TableRow key={prop.id}>
                    <TableCell>{prop.address}</TableCell>
                    <TableCell>${prop.price.toLocaleString()}</TableCell>
                    <TableCell>{prop.bedrooms}</TableCell>
                    <TableCell>{prop.bathrooms}</TableCell>
                    <TableCell>{prop.sqft.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Deal Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="purchasePrice"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Purchase Price
                      </label>
                      <Input
                        type="number"
                        id="purchasePrice"
                        placeholder="Purchase Price"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="downPayment"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Down Payment
                      </label>
                      <Input
                        type="number"
                        id="downPayment"
                        placeholder="Down Payment"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="interestRate"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Interest Rate
                      </label>
                      <Input
                        type="number"
                        id="interestRate"
                        placeholder="Interest Rate"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="loanTerm"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Loan Term (years)
                      </label>
                      <Input
                        type="number"
                        id="loanTerm"
                        placeholder="Loan Term"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="propertyTax"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Property Tax
                      </label>
                      <Input
                        type="number"
                        id="propertyTax"
                        placeholder="Property Tax"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="insurance"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Insurance
                      </label>
                      <Input
                        type="number"
                        id="insurance"
                        placeholder="Insurance"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="maintenance"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Maintenance
                      </label>
                      <Input
                        type="number"
                        id="maintenance"
                        placeholder="Maintenance"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="utilities"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Utilities
                      </label>
                      <Input
                        type="number"
                        id="utilities"
                        placeholder="Utilities"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="monthlyRent"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Monthly Rent
                      </label>
                      <Input
                        type="number"
                        id="monthlyRent"
                        placeholder="Monthly Rent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="otherIncome"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Other Income
                      </label>
                      <Input
                        type="number"
                        id="otherIncome"
                        placeholder="Other Income"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Hard Money Financing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="loanAmount"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Loan Amount
                    </label>
                    <Input
                      type="number"
                      id="loanAmount"
                      placeholder="Loan Amount"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="interestRateHM"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Interest Rate
                    </label>
                    <Input
                      type="number"
                      id="interestRateHM"
                      placeholder="Interest Rate"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="loanTermHM"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Loan Term (months)
                    </label>
                    <Input
                      type="number"
                      id="loanTermHM"
                      placeholder="Loan Term"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
