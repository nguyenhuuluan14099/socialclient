import IconSearch from "components/icons/IconSearch";
import ModalBase from "components/modal/ModalBase";
import SearchModalContent from "components/modal/ModalContent/SearchModalContent";
import React, { useState } from "react";

const Search = () => {
  // const { sideBar } = useSelector((state) => state.global);
  const [showSearch, setShowSearch] = useState(false);

  const handleToggleSearch = () => {
    // dispatch(toggleSideBar(!sideBar));
    setShowSearch(!showSearch);
  };
  return (
    <>
      {showSearch && (
        <ModalBase
          type="sideBar"
          animationRoot="primary"
          visible={showSearch}
          onClose={handleToggleSearch}
        >
          <SearchModalContent onClose={handleToggleSearch}></SearchModalContent>
        </ModalBase>
      )}

      <div
        onClick={handleToggleSearch}
        className="flex cursor-pointer dark:hover:bg-[#111] hover:bg-[#ccc] hover:font-bold  group transition-all rounded-lg p-2 pl-4 items-center gap-x-3"
      >
        <p>
          <IconSearch></IconSearch>
        </p>
        <p className={` `}>Search</p>
      </div>
    </>
  );
};

export default Search;
