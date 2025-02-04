'use client';

import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import AutocompleteInput from './autocomplete-input';
import { toast } from 'sonner';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { authClient } from '@/lib/auth-client';
import { Label } from '@/components/ui/label';

type FormInput = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
};

export function NewPropertyForm() {
  const { data: session, isPending } = authClient.useSession();
  if (!isPending && !session?.user) redirect('/auth/login');

  const utils = api.useUtils();
  const router = useRouter();
  const [placeQueryTrigger, setPlaceQueryTrigger] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);

  const { control, handleSubmit, setValue, reset } = useForm<FormInput>();
  const createProperty = api.property.createProperty.useMutation();

  const { data: placeDetails } = api.googlePlaces.placeDetails.useQuery(
    {
      placeId: selectedValue,
    },
    {
      enabled: placeQueryTrigger,
    },
  );

  useEffect(() => {
    if (placeDetails) {
      setValue('streetAddress', placeDetails.street);
      setValue('city', placeDetails.city);
      setValue('state', placeDetails.state);
      setValue('postalCode', placeDetails.postalCode);
    }
  }, [placeDetails, setValue]);

  const onSubmit = (data: FormInput) => {
    createProperty.mutate(data, {
      onSuccess: async (property) => {
        if (!property) {
          toast.error('Failed to add property');
          reset();
          return;
        }

        await utils.property.getProperties.invalidate();
        toast.success('Property added successfully');
        reset();
        router.push('/properties');
      },
      onError: () => {
        toast.error('Failed to add property');
      },
    });
    return true;
  };

  const { data: predictions } =
    api.googlePlaces.autocompleteSuggestions.useQuery(
      {
        searchInput: debouncedSearchValue,
      },
      { enabled: debouncedSearchValue.length > 0 },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
      <div className='flex flex-col gap-1'>
        <Label className='text-base font-normal text-dark-500'>
          Address Search
        </Label>
        <AutocompleteInput
          placeholder='Search...'
          items={predictions ?? []}
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          selectedValue={selectedValue}
          onSelectedValueChange={setSelectedValue}
          dataFetchOnSelectionChange={setPlaceQueryTrigger}
        />
      </div>
      <article className='grid grid-cols-[1fr_auto_1fr] place-items-center gap-4'>
        <span className='w-full border-y'></span>
        <h4 className='w-fit font-extralight'>or</h4>
        <span className='w-full border-y'></span>
      </article>
      <div className='flex flex-col gap-1'>
        <Label className='text-base font-normal text-dark-500'>Address</Label>
        <Controller
          name='streetAddress'
          control={control}
          defaultValue=''
          rules={{ required: 'Street Address is required' }}
          render={({ field }) => (
            <Input
              {...field}
              id='streetAddress'
              placeholder='Street Address'
              className='!important min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500'
            />
          )}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <Label className='text-base font-normal text-dark-500'>City</Label>
        <Controller
          name='city'
          control={control}
          defaultValue=''
          rules={{ required: 'City is required' }}
          render={({ field }) => (
            <Input
              {...field}
              id='city'
              placeholder='City'
              className='!important min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500'
            />
          )}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <Label className='text-base font-normal text-dark-500'>State</Label>
        <Controller
          name='state'
          control={control}
          defaultValue=''
          rules={{ required: 'State is required' }}
          render={({ field }) => (
            <Input
              {...field}
              id='state'
              placeholder='State'
              className='!important min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500'
            />
          )}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <Label className='text-base font-normal text-dark-500'>
          Postal Code
        </Label>
        <Controller
          name='postalCode'
          control={control}
          defaultValue=''
          rules={{ required: 'Postal Code is required' }}
          render={({ field }) => (
            <Input
              {...field}
              id='postalCode'
              placeholder='Postal Code'
              className='!important min-h-14 border border-gray-100 bg-light-600 p-4 text-base font-semibold placeholder:font-normal placeholder:text-slate-500'
            />
          )}
        />
      </div>
      <div className='h-2'></div>
      <SubmitButton text='Add Property' isLoading={createProperty.isPending} />
    </form>
  );
}
