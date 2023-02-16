import React, { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Form, Input, Button } from 'components/index'

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <Sidebar>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <Form handleSubmit={handleSubmit}>
          <Input
            input={{
              label: "Email address",
              id: 'email', 
              name: 'email',
              type: 'email', 
              required: true, 
              value: email,
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setEmail(event.target.value)
                }
              }} 
            />

          <Input
            input={{
              label: "Password",
              id: 'password', 
              name: 'password',
              type: 'password', 
              required: true, 
              value: password,
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setPassword(event.target.value)
                }
              }} 
            />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <Button type='submit' label='Sign in' />
        </Form>
      </div>
    </Sidebar>
  )
}