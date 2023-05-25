import * as z from 'zod';

const schema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be 50 characters or less'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must be 50 characters or less'),
  dateOfBirth: z.date().refine((date) => {
    const age = new Date(Date.now() - date.getTime()).getUTCFullYear() - 1970;
    return age >= 16;
  }, { message: 'You must be at least 16 years old to apply for insurance' }),
  address: z.object({
    id: z.string().optional(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string().min(5, 'Zip code must be 5 digits').max(5, 'Zip code must be 5 digits').regex(/^\d{5}$/, 'Zip code must be a valid 5-digit US zip code')
  }),
  addressId: z.string(),
  vehicles: z.array(z.object({
    id: z.string().optional(),
    vin: z.string(),
    year: z.coerce.number().min(1985, 'Year must be 1985 or later').max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
    make: z.string(),
    model: z.string(),
  })).min(1, 'You must have at least one vehicle').max(3, 'You cannot have more than 3 vehicles'),
  people: z.array(z.object({
    id: z.string().optional(),
    firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be 50 characters or less'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must be 50 characters or less'),
    dateOfBirth: z.date().refine((date) => {
      const age = new Date(Date.now() - date.getTime()).getUTCFullYear() - 1970;
      return age >= 16;
    }, { message: 'You must be at least 16 years old to be added as an additional person' }),
    relationship: z.string().min(2, 'Relationship must be at least 2 characters').max(50, 'Relationship must be 50 characters or less')
  })).max(5, 'You cannot add more than 5 additional people')
});

export default schema
