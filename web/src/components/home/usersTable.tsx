/* eslint-disable react-hooks/exhaustive-deps */
import { activeUsersState, phoneConnectedState, selectedFileState, selectedUsersState, showScanCodeState, showUploadFileState } from "@/atoms";
import axios from "@/axios.config";
import { IUser } from "@/types";
import { getDecodedFileData, getUsersFromFileContent, removeDuplicates } from "@/utils/files";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import Pagination from "../pagination";
import UserCard from "./userCard";
import { whatsappLogout } from "@/utils/logout";
import Loader from "../Loader";


export default function UsersTable() {
  const selectedFile = useRecoilValue(selectedFileState);
  const [gettingFileData, setGettingFileData] = useState(false);
  const [showUploadFile, setShowUploadFile] = useRecoilState(showUploadFileState);
  const [phoneConnected, setPhoneConnected] = useRecoilState(phoneConnectedState);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allChecked, setAllChecked] = useState(false);
  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersState);
  const [_, setShowScanCode] = useRecoilState(showScanCodeState);
  const activeUsers = useRecoilValue(activeUsersState);
  const [_ac, setActiveUsers] = useRecoilState(activeUsersState);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
  const [checked, setChecked] = useState(false);
  const [pageUsers, setPageUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageStart = currentPage * rowsPerPage;
  const pageEnd = pageStart + rowsPerPage;
  const [loggingOut, setLoggingOut] = useState(false);

  const handlePageChange = ({ selected }) => {
    if (selected === currentPage) return;
    if (selected < 0 || selected >= totalPages) return;
    setCurrentPage(selected);
  };

  useEffect(() => {
    if (filteredUsers.length > 0) {
      const totalPages = Math.ceil(users.length / rowsPerPage);
      setTotalPages(totalPages);
      setPageUsers(filteredUsers.slice(pageStart, pageEnd));
    } else {
      setPageUsers([]);
    }
  }, [filteredUsers, currentPage, rowsPerPage]);

  const getFileData = async (fileId: string) => {
    setGettingFileData(true);
    try {
      let fileContents: string = "";
      const { data } = await axios.get(`/files/${fileId}`);
      if (data.file) {
        const decodedData = getDecodedFileData(data.file.data);
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
          fileContents = event.target?.result as string;
          const users = await getUsersFromFileContent(fileContents);
          const filteredUsers = removeDuplicates(users);
          if (filteredUsers.length < users.length) {
            toast.success("Some users were removed because they were duplicates");
          }
          setUsers(filteredUsers);
          setFilteredUsers(filteredUsers)
          setActiveUsers(filteredUsers);
        };
        fileReader.readAsText(decodedData);
      }
    } catch (error) {
      console.log("error occured while fetching from backend : ")
      console.log(error);
    } finally {
      setGettingFileData(false)
    }
  }

  useEffect(() => {
    const getFileContent = async () => {
      await getFileData(selectedFile!._id);
    }
    getFileContent();
  }, [selectedFile]);

  useEffect(() => {
    if (filter === '') return setFilteredUsers(users);
    const filteredUsers = users.filter(user => {
      const { firstName, lastName, displayName, phoneNumber, id, countryCode } = user;
      const searchTerm = filter.toLowerCase();

      return (
        firstName.toLowerCase().includes(searchTerm) ||
        lastName.toLowerCase().includes(searchTerm) ||
        displayName.toLowerCase().includes(searchTerm) ||
        phoneNumber.includes(filter) ||
        id.toLowerCase().includes(searchTerm) ||
        ("+").concat(countryCode).toLowerCase().includes(searchTerm)
      );
    });
    setFilteredUsers(filteredUsers)

  }, [filter]);

  const logout = async () => {
    setLoggingOut(true);
    const data = await whatsappLogout();
    if (data.success === "done") {
      toast.success("Logged out successfully");
      setPhoneConnected(null);
      setLoggingOut(false);
    } else {
      toast.error("An error occured while logging out! try again later");
      setLoggingOut(false);
    }
  }

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
          <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-2">
            {
              !phoneConnected ? (
                <button
                  onClick={() => setShowScanCode(true)}
                  type="button"
                  className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
                >
                  Connect Your Phone
                </button>
              ) :
                <button
                  onClick={logout}
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
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 flex gap-2">

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
                  </tr>
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
