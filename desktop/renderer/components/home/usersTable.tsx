import { activeUsersState, selectedFileState, showUploadFileState } from "@/atoms";
import { IUser } from "@/types";
import { getDecodedFileData, getUsersFromFileContent, removeDuplicates } from "@/utils/files";
import axios from "axios.config";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import Pagination from "../pagination";
import UserCard from "./userCard";
const people: IUser[] = [
  { id: '234D', firstName: "Lindsay", lastName: "Walton", phoneNumber: '+81 032 424 341', countryCode: "+81", displayName: "Lindsay Walton" },
]


export default function UsersTable() {
  const selectedFile = useRecoilValue(selectedFileState);
  const [gettingFileData, setGettingFileData] = useState(false);
  const [showUploadFile, setShowUploadFile] = useRecoilState(showUploadFileState);
  const [_ac, setActiveUsers] = useRecoilState(activeUsersState);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageUsers, setPageUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageStart = currentPage * 8;
  const pageEnd = pageStart + 8;

  const handlePageChange = ({ selected }) => {
    if (selected === currentPage) return;
    if (selected < 0 || selected >= totalPages) return;
    setCurrentPage(selected);
  };

  useEffect(() => {
    if (users.length > 0) {
      const totalPages = Math.ceil(users.length / 8);
      setTotalPages(totalPages);
      setPageUsers(users.slice(pageStart, pageEnd));
    }
  }, [users, currentPage]);

  const getFileData = async (fileId: string) => {
    setGettingFileData(true);
    try {
      let fileContents: string = "";
      const { data } = await axios.get(`/files/${fileId}`);
      if (data.file) {
        const decodedData = getDecodedFileData(data.file.data);
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
          fileContents = event.target.result as string;
          const users = await getUsersFromFileContent(fileContents);
          const filteredUsers = removeDuplicates(users);
          if (filteredUsers.length < users.length) {
            toast.success("Some users were removed because they were duplicates");
          }
          setUsers(filteredUsers);
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
      const fileContent = await getFileData(selectedFile?._id);
      console.log(fileContent)
    }
    getFileContent();
  }, [selectedFile]);

  return (
    <div className="">
      <div className=" px-4 sm:px-6 lg:px-8 py-3 h-[64vh] overflow-y-auto">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in a current file including their names, locations, and their phone numbers.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => setShowUploadFile(true)}
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
                  {pageUsers.map((person: IUser) => (
                    <UserCard key={person.id} {...person} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
