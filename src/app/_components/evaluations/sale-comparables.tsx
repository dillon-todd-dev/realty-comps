'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const properties: any[] = [];

const SaleComparables = () => {
  return (
    <Card className='border-sidebar-border bg-sidebar'>
      <CardHeader>
        <CardTitle>Sale Comparables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <label htmlFor='radius' className='mb-1 block text-sm font-medium'>
              Max Radius (miles)
            </label>
            <Input type='number' id='radius' placeholder='Radius' />
          </div>
          <div>
            <label htmlFor='beds' className='mb-1 block text-sm font-medium'>
              Beds
            </label>
            <Input type='number' id='beds' placeholder='Beds' />
          </div>
          <div>
            <label htmlFor='baths' className='mb-1 block text-sm font-medium'>
              Baths
            </label>
            <Input type='number' id='baths' placeholder='Baths' />
          </div>
          <div>
            <label
              htmlFor='squareFootage'
              className='mb-1 block text-sm font-medium'
            >
              Square Footage
            </label>
            <Input
              type='number'
              id='squareFootage'
              placeholder='Square Footage'
            />
          </div>
          <div>
            <label htmlFor='daysOld' className='mb-1 block text-sm font-medium'>
              Days Old
            </label>
            <Input type='number' id='daysOld' defaultValue={1} />
          </div>
        </div>
        <Button className='mb-4'>Search Comparables</Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Subdivision</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Beds</TableHead>
              <TableHead>Baths</TableHead>
              <TableHead>Garage</TableHead>
              <TableHead>Built</TableHead>
              <TableHead>Sqft</TableHead>
              <TableHead>List</TableHead>
              <TableHead>Sold</TableHead>
              <TableHead>Include</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((prop) => (
              <TableRow key={prop.id}>
                <TableCell>{prop.address}</TableCell>
                <TableCell>{prop.subdivision}</TableCell>
                <TableCell>{prop.bedrooms}</TableCell>
                <TableCell>{prop.bathrooms}</TableCell>
                <TableCell>{prop.garage}</TableCell>
                <TableCell>{prop.built}</TableCell>
                <TableCell>{prop.sqft}</TableCell>
                <TableCell>{prop.list}</TableCell>
                <TableCell>{prop.sold}</TableCell>
                <TableCell>
                  <Input type='checkbox' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SaleComparables;
