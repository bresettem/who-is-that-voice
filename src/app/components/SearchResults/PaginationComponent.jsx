import React from "react";
import { Pagination } from "react-bootstrap";

export const itemsPerPage = 30;

const PaginationComponent = ({ totalPages, activePage, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => handlePageChange(Math.max(activePage - 1, 1))}
        disabled={activePage === 1}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index}
          active={index + 1 === activePage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(Math.min(activePage + 1, totalPages))}
        disabled={activePage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
