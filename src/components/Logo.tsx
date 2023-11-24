import Image from "next/image";

export function Logo(props) {
  return (
    <div className="flex w-fit shrink-0 gap-2 items-center ">
      <Image src="/logo.png" width={40} height={40} alt="logo" />
      <p className="font-semibold text-gray-600 text-lg">Chatmaid</p>
    </div>
  );
}
