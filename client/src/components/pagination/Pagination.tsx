import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { GlobalButton } from "../globalButton/GlobalButton";
import styles from "./pagination.module.scss";

interface PaginationProps {
  ITEMS_PER_PAGE: number;
  currentPage: number;
  totalPages: number;
  filteredAndSortedTasks: Array<any>;
  handlePageChange: (value: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  ITEMS_PER_PAGE,
  currentPage,
  totalPages,
  filteredAndSortedTasks,
  handlePageChange,
}) => {
  const startIndex = ITEMS_PER_PAGE * (currentPage - 1) + 1;
  const endIndex = Math.min(
    ITEMS_PER_PAGE * currentPage,
    filteredAndSortedTasks.length
  );

  const navButtons = [
    {
      label: <FaAngleDoubleLeft />,
      page: 1,
      disabled: currentPage === 1,
    },
    {
      label: <FaAngleLeft />,
      page: currentPage - 1,
      disabled: currentPage === 1,
    },
    {
      label: <FaAngleRight />,
      page: currentPage + 1,
      disabled: currentPage === totalPages,
    },
    {
      label: <FaAngleDoubleRight />,
      page: totalPages,
      disabled: currentPage === totalPages,
    },
  ];

  return (
    <div className={styles.pagination}>
      {/* Display range and total count */}
      <span className={styles.totalList}>
        {startIndex} to {endIndex} of {filteredAndSortedTasks.length}
      </span>

      {/* Navigation buttons */}
      {navButtons.map(({ label, page, disabled }, index) => (
        <GlobalButton
          key={index}
          variant="none"
          onClick={() => handlePageChange(page)}
          disabled={disabled}
        >
          {label}
        </GlobalButton>
      ))}

      {/* Current page display */}
      <span className={styles.pageList}>
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};
