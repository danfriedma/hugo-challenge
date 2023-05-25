import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import schema from '../prisma/schema.ts'


const InsuranceApplicationForm = ({defaultData, onSubmit, formSubmitText}) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: defaultData ?  defaultData : {
      vehicles: [{ vin: '', year: '', make: '', model: '' }],
      people: []
    },
    resolver: zodResolver(schema)
  });

  function Vehicles({control}) {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
      control,
      name: "vehicles",
    })

    return (
      <div>
        {
          fields.map((vehicle, index) => (
            <div key={vehicle.id}>
              <div>
                <label htmlFor={`vin-${index}`}>Vehicle VIN</label>
                <input type="text" id={`vin-${index}`} {...register(`vehicles.${index}.vin`)} />
                {errors.vehicles && errors.vehicles[index] && errors.vehicles[index].vin && <p className="error-message">{errors.vehicles[index].vin.message}</p>}
              </div>
              <div>
                <label htmlFor={`year-${index}`}>Vehicle Year</label>
                <input type="number" id={`year-${index}`} {...register(`vehicles.${index}.year`)} />
                {errors.vehicles && errors.vehicles[index] && errors.vehicles[index].year && <p className="error-message">{errors.vehicles[index].year.message}</p>}
              </div>
              <div>
                <label htmlFor={`make-${index}`}>Vehicle Make</label>
                <input type="text" id={`make-${index}`} {...register(`vehicles.${index}.make`)} />
                {errors.vehicles && errors.vehicles[index] && errors.vehicles[index].make && <p className="error-message">{errors.vehicles[index].make.message}</p>}
              </div>
              <div>
                <label htmlFor={`model-${index}`}>Vehicle Model</label>
                <input type="text" id={`model-${index}`} {...register(`vehicles.${index}.model`)} />
                {errors.vehicles && errors.vehicles[index] && errors.vehicles[index].model && <p className="error-message">{errors.vehicles[index].model.message}</p>}
              </div>
              {
                // todo: create delete method on backend
                // (fields.length > 1 && <button onClick={() => remove(index)}>Remove Vehicle</button>)
              }
            </div>))

        }
        {(fields.length < 3 && <button onClick={() => append({ vin: '', year: '', make: '', model: '' })}>Add Vehicle</button>)}
      </div>
      )
  }

  function People({control}) {
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
      control,
      name: "people",
    })

    return (
      <div>
        {
          fields.map((people, index) => (
            <div key={people.id}>
              <input type="hidden" {...register(`people.${index}.id`)}/>
              <div>
                <label htmlFor={`firstName-${index}`}>Additional Person First Name</label>
                <input type="text" id={`firstName-${index}`} {...register(`people.${index}.firstName`)} />
                {errors.people && errors.people[index] && errors.people[index].firstName && <p className="error-message">{errors.people[index].firstName.message}</p>}
              </div>
              <div>
                <label htmlFor={`lastName-${index}`}>Additional Person Last Name</label>
                <input type="text" id={`lastName-${index}`} {...register(`people.${index}.lastName`)} />  {errors.people && errors.people[0] && errors.people[index].lastName && <p className="error-message">{errors.people[0].lastName.message}</p>}
              </div>
              <div>
                <label htmlFor={`dob-${index}`}>Additional Person Date of Birth</label>
                <input type="date" id={`dob-${index}`} {...register(`people.${index}.dateOfBirth`, {valueAsDate: true})} />
                {errors.people && errors.people[index] && errors.people[index].dateOfBirth && <p className="error-message">{errors.people[index].dateOfBirth.message}</p>}
              </div>
              <div>
                <label htmlFor={`relationship-${index}`}>Additional Person Relationship</label>
                <select id={`relationship${index}`} {...register(`people.${index}.relationship`)}>
                  <option value="">--Please Select--</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Parent">Parent</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
                {errors.people && errors.people[index] && errors.people[index].relationship && <p className="error-message">{errors.people[index].relationship.message}</p>}
              </div>
              {
                // todo: create delete method on backend
                // (fields.length >= 1 && <button onClick={() => remove(index)}>Remove Person</button>)
              }
            </div>))
        }
        {(fields.length < 5 && <button onClick={() => append({ firstName: '', lastName: '', dateOfBirth: '', relationship: '' })}>Add Person</button>)}
      </div>
      )
  }


  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register(`id`)} />
      <input type="hidden" {...register(`addressId`)} />
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" {...register("firstName")} />
        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" {...register("lastName")} />
        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
      </div>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input type="date" id="dateOfBirth" {...register("dateOfBirth", {valueAsDate: true})} />
        {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth.message}</p>}
      </div>
      <div>
        <label htmlFor="street">Street Address</label>
        <input type="text" id="street" {...register("address.street")} />
        {errors.address && errors.address.street && <p className="error-message">{errors.address.street.message}</p>}
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input type="text" id="city" {...register("address.city")} />
        {errors.address && errors.address.city && <p className="error-message">{errors.address.city.message}</p>}
      </div>
      <div>
        <label htmlFor="state">State</label>
        <input type="text" id="state" {...register("address.state")} />
        {errors.address && errors.address.state && <p className="error-message">{errors.address.state.message}</p>}
      </div>
      <div>
        <label htmlFor="zipcode">Zip Code</label>
        <input type="text" id="zipcode" {...register("address.zipcode")} />
        {errors.address && errors.address.zipcode && <p className="error-message">{errors.address.zipcode.message}</p>}
      </div>
      {
        <Vehicles control={control}/>
      }
      {
        <People control={control}/>
      }
      <div>
        <button type="submit">{formSubmitText || "Submit"}</button>
      </div>
  </form>
  )
}

export default InsuranceApplicationForm;
