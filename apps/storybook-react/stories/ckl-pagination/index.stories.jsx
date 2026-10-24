import React, { useState } from "react";
import { CklPagination } from "@components-kit/react-ckl-pagination";

export default {
  title: "components/ckl-pagination",
  component: CklPagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    numPages: 10,
    current: 1,
    itemToShow: 7,
  },
  argTypes: {
    numPages: {
      control: "number",
      description: "Total number of pages",
    },
    current: {
      control: "number",
      description: "Current active page (1-based)",
    },
    itemToShow: {
      control: "number",
      description: "Number of pagination items shown",
    },
    onPageUpdated: {
      action: "onPageUpdated",
      description: "Emitted when a page is selected",
    },
  },
};

function ControlledPagination(args) {
  const [currentPage, setCurrentPage] = useState(args.current || 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    args.onPageUpdated?.(page);
  };

  return <CklPagination {...args} current={currentPage} onPageUpdated={handlePageChange} />;
}

export const Primary = {
  render: (args) => <ControlledPagination {...args} />,
};

export const Interactive = {
  args: {
    numPages: 20,
    current: 5,
    itemToShow: 7,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.current || 5);

    return (
      <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        <div style={{ marginBottom: "16px", color: "#334155" }}>
          Active Page: <strong>{currentPage}</strong> of {args.numPages}
        </div>
        <CklPagination
          {...args}
          current={currentPage}
          onPageUpdated={(page) => {
            setCurrentPage(page);
            args.onPageUpdated?.(page);
          }}
        />
      </div>
    );
  },
};

export const SmallPageCount = {
  args: {
    numPages: 4,
    current: 2,
    itemToShow: 7,
  },
  render: (args) => <ControlledPagination {...args} />,
};

export const LargePageCount = {
  args: {
    numPages: 50,
    current: 25,
    itemToShow: 7,
  },
  render: (args) => <ControlledPagination {...args} />,
};
