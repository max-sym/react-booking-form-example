import React from "react"
import {
  DateInput,
  FormSchema,
  GuestsSelect,
  LocationSelect,
  useReactBookingForm,
  BookingForm as BookingFormType,
} from "react-booking-form"
import { FaPlus, FaMinus } from "react-icons/fa"
import { cities } from "./cities"

const searchPlace = async (query) =>
  new Promise((resolve, _reject) => {
    setTimeout(() => resolve(filterAndMapCiies(query)), 600)
  })

const filterAndMapCiies = (query) =>
  cities
    .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
    .map((city) => ({ value: city.toLowerCase(), label: city }))

const defaultLocationOptions = [cities[0], cities[1], cities[2]].map(
  (city) => ({ value: city.toLowerCase(), label: city }),
)

const formSchema: FormSchema = {
  location: {
    type: "location",
    focusOnNext: "checkIn",
    options: { defaultLocationOptions, searchPlace },
  },
  checkIn: {
    type: "date",
    focusOnNext: "guests",
    options: {
      altInput: true,
      altFormat: "M j, Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      wrap: true,
    },
  },
  guests: {
    type: "peopleCount",
    defaultValue: [
      {
        name: "adults",
        label: "Adults",
        description: "Ages 13+",
        value: 1,
        min: 0,
        max: 10,
      },
      {
        name: "children",
        label: "Children",
        description: "Ages 4-12",
        value: 0,
        min: 0,
        max: 10,
      },
      {
        name: "infants",
        label: "Infants",
        description: "Under 4 years old",
        value: 0,
        min: 0,
        max: 10,
      },
    ],
  },
}

const DatePickerInput = ({ placeholder, inputRef }) => (
  <div className="relative flex group h-10 w-full" ref={inputRef}>
    <InputCore type="input" data-input placeholder={placeholder} />
  </div>
)

const DatePicker = (props) => (
  <DateInput className="w-full" inputComponent={DatePickerInput} {...props} />
)

const MenuContainer = React.forwardRef(
  ({ isOpen, children, style, ...props }: any, ref) => (
    <div
      className={`w-full w-64 border border-purple-500 z-10 mt-12 transform transition ease-in-out bg-black bg-opacity-60 backdrop-filter backdrop-blur rounded-3xl overflow-y-auto overflow-x-hidden
        ${
          isOpen
            ? "opacity-100"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }
      `}
      style={{ ...style, maxWidth: "240px" }}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ),
)

const inputClassName =
  "appearance-none border rounded-full w-full outline-none transition pl-4 pr-6 bg-transparent border-purple-500 cursor-pointer flex items-center text-white"

const InputCore = React.forwardRef((props, ref) => (
  <input className={inputClassName} ref={ref} {...props} />
))

const RoundButton = ({ children, ...props }) => (
  <button
    {...props}
    className="appearance-none rounded-full p-2 flex items-center justify-center h-full overflow-hidden border border-gray-500 text-gray-500 hover:text-white hover:bg-purple-500 hover:border-transparent transition ease-in-out disabled:opacity-50"
  >
    {children}
  </button>
)

const OptionComponent = ({
  form,
  name,
  option,
}: {
  form: BookingFormType
  name: string
  option: any
}) => {
  const onPlusClick = () => {
    form.setGuestOptionValue(name, option, option.value + 1)
  }

  const onMinusClick = () => {
    form.setGuestOptionValue(name, option, option.value - 1)
  }

  return (
    <div className="transition ease-in-out relative py-2 px-4 flex justify-between items-center">
      <div>
        <p className="font-title font-bold text-sm text-white">
          {option.label}
        </p>
        <p className="text-white text-sm">{option.description}</p>
      </div>
      <div className="flex justify-center items-center gap-x-2">
        <RoundButton
          onClick={onPlusClick}
          disabled={option.value >= (option.max || 100)}
        >
          <FaPlus />
        </RoundButton>
        <p className="font-title font-bold text-sm text-white">
          {option.value}
        </p>
        <RoundButton onClick={onMinusClick} disabled={option.value === 0}>
          <FaMinus />
        </RoundButton>
      </div>
    </div>
  )
}

const InputComponent = ({ form, name, isLoading, ...props }) => (
  <div className="relative flex group h-10 w-full">
    <InputCore ref={form.refs[name]} {...props} />
  </div>
)

const OptionContainer = ({ children, ...props }) => (
  <div
    className="transition ease-in-out relative py-2 px-4 hover:bg-gray-800 cursor-pointer text-white"
    {...props}
  >
    {children}
  </div>
)

const ControlComponent = ({
  form,
  name,
  placeholder,
  ...props
}: {
  form: BookingFormType
  name: string
  placeholder?: string
}) => {
  const count = form.state[name].totalCount

  return (
    <div className="relative flex group h-10 w-full">
      <div
        className={inputClassName}
        ref={form.refs[name]}
        tabIndex={-1}
        {...props}
      >
        <p>{count ? `${count} guest${count > 1 ? "s" : ""}` : ""} </p>
        <div>{count ? "" : placeholder}</div>
      </div>
    </div>
  )
}

const Label = ({ children }) => (
  <div className="text-sm w-full font-bold mb-1 text-white">{children}</div>
)

export const BookingForm = () => {
  const form = useReactBookingForm({ formSchema })

  return (
    <div
      className="w-full mx-auto rounded-full bg-black bg-opacity-30 backdrop-filter backdrop-blur p-6 flex justify-between flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2 border border-purple-500"
      style={{ boxShadow: "0px 0px 50px #a025da44 inset" }}
    >
      <div className="relative w-full md:w-1/3 border-l-0 flex flex-col justify-center items-center pl-2">
        <Label>{"Location"}</Label>
        <LocationSelect
          form={form}
          menuContainer={MenuContainer}
          optionContainer={OptionContainer}
          inputComponent={InputComponent}
          name="location"
          inputProps={{ placeholder: "Where are you going?" }}
        />
      </div>
      <div className="relative w-full md:w-1/3 border-l-0 flex flex-col justify-center items-center pl-2">
        <Label>{"Check in"}</Label>
        <DatePicker placeholder="Add date" form={form} name={"checkIn"} />
      </div>
      <div className="relative w-full md:w-1/3 border-l-0 flex flex-col justify-center items-center pl-2">
        <Label>{"Guests"}</Label>
        <GuestsSelect
          form={form}
          menuContainer={MenuContainer}
          optionComponent={OptionComponent}
          controlComponent={ControlComponent}
          controlProps={{ placeholder: "Add guests" }}
          name={"guests"}
        />
      </div>
      <div className="relative w-full md:w-1/3 border-l-0 flex flex-col justify-center items-center pl-2">
        <button className="appearance-none mt-5 border w-full h-10 bg-purple-900 hover:bg-purple-500 transition border-purple-500 rounded-full flex justify-center items-center bg-transparent text-white font-bold px-3 font-title-2 uppercase">
          {"Book"}
        </button>
      </div>
    </div>
  )
}
