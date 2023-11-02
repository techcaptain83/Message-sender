/* eslint-disable react-hooks/exhaustive-deps */
import useContacts from "@/hooks/useContacts";
import { pageUsersState } from "@/store/contactsTableStates";
import { IUser } from "@/types";
import { useRecoilValue } from "recoil";
import Pagination from "../pagination";
import ContactCard from "./contactCard";
import ContactsTableHeader from "./contactsTableHeader";


export default function ContactsTable() {
  const { currentPage, totalPages, rowsPerPage, setRowsPerPage, handlePageChange, allChecked, setAllChecked, setSelectedUsers, checked, setChecked, filteredUsers } = useContacts();
  const pageUsers = useRecoilValue(pageUsersState);


  return (
    <>
      <div className="pt-4">
        <div className=" px-4 sm:px-6 lg:px-8 py-3 h-[70vh] overflow-y-auto space-y-4">
          <ContactsTableHeader />
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="space-y-1">
                    <div className="flex items-center gap-x-2">
                      <div className="flex items-center gap-1">
                        <input type="checkbox"
                          checked={allChecked}
                          defaultChecked={allChecked}
                          onClick={() => {
                            setAllChecked(!allChecked);
                            if (allChecked) {
                              setChecked(false);
                              setSelectedUsers([]);
                            } else {
                              setChecked(true);
                              setSelectedUsers(filteredUsers);
                            }
                          }}
                        />
                        <span className="text-sm">Select All on list</span>
                      </div>
                      <div className="flex items-center gap-2 pl-2">
                        <input type="checkbox"
                          checked={checked}
                          defaultChecked={checked}
                          onClick={() => {
                            setChecked(!checked);
                            if (checked) {
                              setAllChecked(false);
                              setSelectedUsers([]);
                            } else {
                              setSelectedUsers(pageUsers);
                            }
                          }}
                        />
                        <span className="text-sm">Select All on page</span>
                      </div>
                    </div>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3 flex gap-2">
                        <span>ID</span>
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        First Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Last Name
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
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Display Text
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {pageUsers.length > 0 && pageUsers.map((person: IUser) => (
                      <ContactCard key={person.id} {...person} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Pagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} options={[10, 25, 50, 100]} />
      </div>
    </>
  )
}