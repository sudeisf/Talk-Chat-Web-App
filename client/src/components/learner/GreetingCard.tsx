import { Button } from "../ui/button";
import Image from "next/image";
import avatar from "../../../public/svg/cool-guy.svg"

export default function GreetingCard() {
      return (
            <div className="max-w-7xl mt-4 w-full mx-auto bg-gradient-to-br from-orange-500 flex justify-around via-red-400 to-orange-400 h-[220px] rounded-md shadow-xs">
                <div className="justify-center flex flex-col gap-3">
                <h1 className="text-white font-pt text-5xl capitalize p-y">wellcome to Talkit , Sudeis !</h1>
                  <p className="text-white font-rubik text-md capitalize">Best palce to get feedback from users</p>
                  <Button className="bg-white text-black rounded-sm w-1/3 hover:bg-accent">Ask Questions</Button>
                </div>
                <div className="relative w-[400px] h-[250px] -ml-10 -mt-5">
  <Image src={avatar} fill alt="" className="object-center rounded-md" />
</div>
        </div>
      );
    }