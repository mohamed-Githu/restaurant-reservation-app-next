"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();

  return (
    <div className="w-full bg-gradient-to-t from-orange-600 via-yellow-400 to-transparent flex items-center h-64 justify-center">
      <form
        action={(formData: FormData) =>
          router.push(`/search?query=${formData.get("search")}`)
        }
        className="flex space-x-4 items-center -mt-10-"
      >
        <Input
          name="search"
          type="text"
          placeholder="State, city or town"
          className="focus:outline-none outline-none h-10 bg-white text-lg"
          style={{ width: 550 }}
          required
        />
        <Button type="submit" className="bg-orange-800 hover:bg-orange-700">
          <Search />
        </Button>
      </form>
    </div>
  );
}
