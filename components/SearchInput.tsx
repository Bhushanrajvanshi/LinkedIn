import React from 'react';
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  return (
    <div>
        <Input 
        type="text" 
        placeholder="Search"
        className="bg-[#DEF3F8] w-88 rounded-lg border-none" />
    </div>
  )
}

export default SearchInput