import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Gender
              </legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything-gender"
                    name="push-notifications-gender"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything-gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    female
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email-gender"
                    name="push-notifications-gender"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email-gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    male
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing-gender"
                    name="push-notifications-gender"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-nothing-gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    other
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Descent
              </legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything-descent"
                    name="push-notifications-descent"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything-descent"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Asian
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything-descent"
                    name="push-notifications-descent"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything-descent"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    asian
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything-descent"
                    name="push-notifications-descent"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything-descent"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    black
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything-descent"
                    name="push-notifications-descent"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything-descent"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    hispanic
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything-descent"
                    name="push-notifications-descent"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything-descent"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    white
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything-descent"
                    name="push-notifications-descent"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything-descent"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    pacific
                  </label>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything-descent"
                      name="push-notifications-descent"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything-descent"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      indian
                    </label>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything-descent"
                        name="push-notifications-descent"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything-descent"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        other
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                age
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="age"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Link to="/">
                <button className="flex w-full justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">
                  Cancel
                </button>
              </Link>
              <Link to="/">
                <button
                  type="submit"
                  className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
