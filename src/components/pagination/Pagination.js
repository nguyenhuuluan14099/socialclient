import { useAuth } from "components/context/Auth-Context";
import Table from "components/table/Table";
import TablePost from "components/table/TablePost";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  if (currentItems[0]?.email) {
    return (
      <div className="py-4">
        <Table currentItems={currentItems}></Table>
      </div>
    );
  } else {
    return (
      <div className="py-4">
        <TablePost currentItems={currentItems}></TablePost>
      </div>
    );
  }
}

export function PaginatedItems({ data, itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  if (!data) return;
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="pagination"
      />
      <Items currentItems={currentItems} />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the component rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById('container')
// );
