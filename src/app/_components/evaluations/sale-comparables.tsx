"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const properties: any[] = [];

const SaleComparables = () => {
  return (
    <Card className="border-sidebar-border bg-sidebar">
      <CardHeader>
        <CardTitle>Sale Comparables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="radius" className="mb-1 block text-sm font-medium">
              Radius (miles)
            </label>
            <Input type="number" id="radius" placeholder="Radius" />
          </div>
          <div>
            <label htmlFor="bedsMin" className="mb-1 block text-sm font-medium">
              Beds Min
            </label>
            <Input type="number" id="bedsMin" placeholder="Beds Min" />
          </div>
          <div>
            <label htmlFor="bedsMax" className="mb-1 block text-sm font-medium">
              Beds Max
            </label>
            <Input type="number" id="bedsMax" placeholder="Beds Max" />
          </div>
          <div>
            <label
              htmlFor="bathsMin"
              className="mb-1 block text-sm font-medium"
            >
              Baths Min
            </label>
            <Input type="number" id="bathsMin" placeholder="Baths Min" />
          </div>
          <div>
            <label
              htmlFor="bathsMax"
              className="mb-1 block text-sm font-medium"
            >
              Baths Max
            </label>
            <Input type="number" id="bathsMax" placeholder="Baths Max" />
          </div>
          <div>
            <label
              htmlFor="garageMin"
              className="mb-1 block text-sm font-medium"
            >
              Garage Min
            </label>
            <Input type="number" id="garageMin" placeholder="Garage Min" />
          </div>
          <div>
            <label
              htmlFor="garageMax"
              className="mb-1 block text-sm font-medium"
            >
              Garage Max
            </label>
            <Input type="number" id="garageMax" placeholder="Garage Max" />
          </div>
          <div>
            <label
              htmlFor="yearBuilt"
              className="mb-1 block text-sm font-medium"
            >
              Year Built +/-
            </label>
            <Input type="number" id="yearBuilt" placeholder="Year Built +/-" />
          </div>
          <div>
            <label
              htmlFor="monthsClosed"
              className="mb-1 block text-sm font-medium"
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
  );
};

export default SaleComparables;
