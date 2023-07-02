import { IFile, IUser } from "@/types"
import Pagination from "../pagination"

const people: IUser[] = [
  { id: '234D', address: 'Tokyo - Japan', firstName: "Lindsay", lastName: "Walton", phoneNumber: '+81 032 424 341', countryCode: "+81", displayName: "Lindsay Walton" },
]


export default function UsersTable({_id}:IFile) {
  
  return (
    <div className="">
      <div className=" px-4 sm:px-6 lg:px-8 py-3 max-h-[75vh] overflow-y-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in a current file including their names, locations, and their phone numbers.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              upload a new file
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      FirstName
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      LastName
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Display Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Country Code
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {new Array(20).fill(people[0]).map((person: IUser, index) => (
                    <tr key={index} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 flex items-center gap-4 ">
                        <div className="flex items-center ">
                          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <span>
                          #{person.id}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.firstName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.lastName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.displayName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium pl-6">{person.countryCode}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  )
}
