import React from "react";

const Pagination = ({ page, setPage, maxPage = 10 }) => {
  const Previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const Next = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <button
          className="btn px-3 py-1 m-1 text-center btn-warning"
          onClick={Previous}
          disabled={page === 1} // Disable button if on the first page
        >
          Previous
        </button>
        <button
          className="btn px-3 py-1 m-1 text-center btn-warning"
          onClick={Next}
          disabled={page === maxPage} // Disable button if on the last page
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
