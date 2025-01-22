'use client';

import AutocompleteInput from '@/app/_components/autocomplete-input';
import { SubmitButton } from '@/app/_components/submit-button';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';

type FormInput = {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
};

const CreatePropertyPage = () => {
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
    <div className='flex h-full items-center justify-center gap-12'>
      <div>
        <div>
          <h1 className='text-2xl font-semibold'>
            Add a Single-Family Property
          </h1>
          <p className='text-sm text-muted-foreground'>
            Search for an address or enter the details manually
          </p>
        </div>
        <div className='h-4'></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
            <AutocompleteInput
              placeholder='Search...'
              items={predictions ?? []}
              searchValue={searchValue}
              onSearchValueChange={setSearchValue}
              selectedValue={selectedValue}
              onSelectedValueChange={setSelectedValue}
              dataFetchOnSelectionChange={setPlaceQueryTrigger}
            />
            <article className='grid grid-cols-[1fr_auto_1fr] place-items-center gap-4'>
              <span className='w-full border-y'></span>
              <h4 className='w-fit font-extralight'>or</h4>
              <span className='w-full border-y'></span>
            </article>
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
                />
              )}
            />
            <Controller
              name='city'
              control={control}
              defaultValue=''
              rules={{ required: 'City is required' }}
              render={({ field }) => (
                <Input {...field} id='city' placeholder='City' />
              )}
            />
            <Controller
              name='state'
              control={control}
              defaultValue=''
              rules={{ required: 'State is required' }}
              render={({ field }) => (
                <Input {...field} id='state' placeholder='State' />
              )}
            />
            <Controller
              name='postalCode'
              control={control}
              defaultValue=''
              rules={{ required: 'Postal Code is required' }}
              render={({ field }) => (
                <Input {...field} id='postalCode' placeholder='Postal Code' />
              )}
            />
            <div className='h-2'></div>
            <SubmitButton
              text='Add Property'
              isLoading={createProperty.isPending}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyPage;
