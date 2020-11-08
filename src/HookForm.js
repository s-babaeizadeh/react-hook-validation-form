import React from "react"

import { useForm } from "react-hook-form"
import isEmail from "validator/lib/isEmail"
import _ from "lodash/fp"

const HookForm = () => {
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  console.log(watch("example"))
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input
          name="firstName"
          ref={register({
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
        />
        {_.get("firstName.type", errors) === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {_.get("firstName.type", errors) === "required" && (
          <p>This field is required</p>
        )}
        {_.get("firstName.type", errors) === "pattern" && (
          <p>Alphabetical characters only</p>
        )}

        <label>Email</label>
        <input
          name="email"
          ref={register({
            required: true,
            maxLength: 10,
            validate: (input) => isEmail(input),
          })}
        />
        {errors.email && <p>This field is required</p>}

        <label>Password</label>
        <input
          name="password"
          ref={register({
            required: true,
            minLength: 6,
          })}
        />
        {errors.password && <p>This field is required</p>}
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default HookForm
