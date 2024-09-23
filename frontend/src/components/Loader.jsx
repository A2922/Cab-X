import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

function Loader() {
  return (
    <div className="flex justify-center">
      <BiLoaderAlt className="animate-spin text-4xl" />
    </div>
  );
}

export default Loader;
