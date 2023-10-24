/* eslint-disable react-hooks/exhaustive-deps */
import { IUser } from "@/types";
import Loader from "../Loader";
import Pagination from "../pagination";
import UserCard from "./userCard";
import UsersTableHeader from "./usersTableHeader";
import useContacts from "@/hooks/useContacts";
import useAuth from "@/hooks/useAuth";
import { useRecoilState } from "recoil";
import { showScanCodeState, showUploadFileState } from "@/atoms";
import { showNoApiModalAtom, showNoReservationModalAtom } from "@/store/atoms";


export default function ContactsTable() {
  const { filter, setFilter, phoneConnected, activeReservation, searchingActiveReservation, logout, loggingOut, currentPage, pageUsers, totalPages, rowsPerPage, setRowsPerPage, handlePageChange, allChecked, setAllChecked, setSelectedUsers, checked, setChecked, filteredUsers,setActiveReservation,searchForActiveReservation } = useContacts();
  const [showUploadFile, setShowUploadFile] = useRecoilState(showUploadFileState);
  const [_, setShowScanCode] = useRecoilState(showScanCodeState);
  const [_ss, setShowNoReservation] = useRecoilState(showNoReservationModalAtom);
  const [__, setShowNoApi] = useRecoilState(showNoApiModalAtom);
  const { user } = useAuth();

  return (
    <div className="pt-4">
      <div className=" px-4 sm:px-6 lg:px-8 py-3 h-[64vh] overflow-y-auto">
        <div className="sm:flex sm:items-center justify-between">
          <div className="">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>

          </div>
          <input
            id="filterInput"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name, phone number,country code..."
            className="border-2 py-1 px-5 w-2/4 focus:ring-1 ring-blue-600 focus:outline-none"
          />
          {
            (user?.plan !== "enterprise" && phoneConnected && activeReservation) && (
              // countdown showing when the phone will be disconnected
              <div>
                <p className="text-sm text-gray-600">Your phone will be disconnected in <span className="text-red-600 font-semibold"> {new Date(activeReservation!.endsAt).getMinutes() - new Date().getMinutes()} minutes</span></p>
              </div>
            )
          }

          <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-2">
            {
              !phoneConnected ? (
                <button
                  onClick={async () => {
                    if (user?.plan === "enterprise") {
                      user?.api ? setShowScanCode(true) : setShowNoApi(true);
                    } else {
                      const reservation = await searchForActiveReservation();
                      if (reservation) {
                        setShowScanCode(true);
                        setActiveReservation(reservation);
                      } else {
                        setShowNoReservation(true);
                      }
                    }
                  }}
                  type="button"
                  className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
                >
                  {searchingActiveReservation ? <Loader /> : "Connect Your Phone"}
                </button>
              ) :
                <button
                  onClick={() => logout()}
                  type="button"
                  className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
                >
                  {loggingOut ? <Loader /> : "Disconnect Phone"}
                </button>
            }
            <button
              onClick={() => setShowUploadFile(true)}
              type="button"
              className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
            >
              upload a new list
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="space-y-1">
                  <div className="flex items-center gap-2 pl-2">
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
                  <UsersTableHeader />
                </thead>

                <tbody className="bg-white">
                  {pageUsers.length > 0 && pageUsers.map((person: IUser) => (
                    <UserCard key={person.id} {...person} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} options={[10, 25, 50, 100]} />
    </div>
  )
}