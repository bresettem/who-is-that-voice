import React from "react";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({
  filmsPerPage,
  totalFilms,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalFilms / filmsPerPage);

  if (totalPages <= 0) {
    return null; // Handle edge case when totalPages is zero or negative
  }

  const getPaginationItems = () => {
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
    const visiblePages = determineVisiblePages();

    return (
      <>
        {renderFirstPage()}
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPrevEllipsis()}
        {visiblePages.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        {renderNextEllipsis()}
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        {renderLastPage()}
      </>
    );
  };

  const determineVisiblePages = () => {
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const renderFirstPage = () => (
    <Pagination.First
      onClick={() => paginate(1)}
      disabled={currentPage === 1}
    />
  );

  const renderLastPage = () => (
    <Pagination.Last
      onClick={() => paginate(totalPages)}
      disabled={currentPage === totalPages}
    />
  );

  const renderPrevEllipsis = () => currentPage > 3 && <Pagination.Ellipsis />;

  const renderNextEllipsis = () =>
    currentPage < totalPages - 2 && <Pagination.Ellipsis />;

  return (
    <Pagination className="justify-content-center">
      {getPaginationItems()}
    </Pagination>
  );
};

export default CustomPagination;
