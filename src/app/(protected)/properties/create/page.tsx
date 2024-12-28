"use client";

import AutocompleteInput from "@/app/_components/autocomplete-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const items = [
  {
    value: "test-1",
    label: "Test 1",
  },
  {
    value: "test-2",
    label: "Test 2",
  },
  {
    value: "test-3",
    label: "Test 3",
  },
];

type FormInput = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
};

const CreatePropertyPage = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const { register, handleSubmit, reset } = useForm<FormInput>();
  const createProperty = api.property.createProperty.useMutation();

  const onSubmit = (data: FormInput) => {
    createProperty.mutate(data, {
      onSuccess: () => {
        toast.success("Property added successfully");
        reset();
      },
      onError: () => {
        toast.error("Failed to add property");
      },
    });
    return true;
  };

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/property-investment.png" className="h-56 w-auto" />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Add a Single-Family Property
          </h1>
          <p className="text-sm text-muted-foreground">
            Search for an address or enter the details manually
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <AutocompleteInput
              placeholder="Search..."
              items={items}
              selectedValue={selectedValue}
              onSelectedValueChange={setSelectedValue}
            />
            <article className="grid grid-cols-[1fr_auto_1fr] place-items-center gap-4">
              <span className="w-full border-y"></span>
              <h4 className="w-fit font-extralight">or</h4>
              <span className="w-full border-y"></span>
            </article>
            <Input
              {...register("streetAddress")}
              required
              placeholder="Street Address"
            />
            <Input {...register("city")} required placeholder="City" />
            <Input {...register("state")} required placeholder="State" />
            <Input
              {...register("postalCode")}
              required
              placeholder="Postal Code"
            />
            <div className="h-2"></div>
            <Button type="submit">Add Property</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyPage;
