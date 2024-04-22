"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();

  return (
    <div className="w-full flex items-center h-64 justify-center">
      <form
        action={(formData: FormData) =>
          router.push(`/search?location=${formData.get("search")}`)
        }
        className="flex space-x-4 items-center -mt-12 *:shadow-lg"
      >
        <Input
          name="search"
          type="text"
          placeholder="State, city or town"
          className="focus:outline-none outline-none bg-white text-lg p-4 py-5"
          style={{ width: 550 }}
          required
        />
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
          <Search />
        </Button>
      </form>
    </div>
  );
}
