import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./PaginationSection.css";

function PaginationSection({
  totalPages = 0,
  currentPage,
  onPageChange,
  currentPageItemsCount,
  totalContacts,
}) {
  if (!totalPages || totalPages === 1) return null;

  const items = [];

  items.push(
    <Pagination.Prev
      key="prev"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    />
  );

  for (let number = 1; number <= totalPages; number++) {
    if (
      number === 1 ||
      number === totalPages ||
      (number >= currentPage - 1 && number <= currentPage + 1)
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    } else if (number === currentPage - 2 || number === currentPage + 2) {
      items.push(<Pagination.Ellipsis key={`ellipsis-${number}`} disabled />);
    }
  }

  items.push(
    <Pagination.Next
      key="next"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    />
  );

  return (
    <div className="pagination-container">
      <p className="pagination-results-text">
        Showing {currentPage} to {currentPageItemsCount} of {totalContacts}{" "}
        results
      </p>
      <Pagination className="justify-content-center">{items}</Pagination>
    </div>
  );
}

export default PaginationSection;
