import React from "react";
import styles from '../styles/needsrepair.module.css'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";

const theme = useTheme(getTheme());
const nodes = [
    {
        id: '0',
        location: 'Hall',
        deadline: new Date(2024, 11, 12),
        name: "Printer",
        reason: 'Doesnt turn on',
    },
    {
        id: '1',
        location: 'Orenco',
        deadline: new Date(2024, 3, 2),
        name: "Espresso Machine",
        reason: 'Other',
    },
    {
        id: '2',
        location: 'Kruse',
        deadline: new Date(2024, 5, 24),
        name: "Tablet",
        reason: 'Fails to charge',
      },
    {
        id: '3',
        location: 'Bakery',
        deadline: new Date(2025, 5, 24),
        name: "Refrigerator",
        reason: 'Door broken',
    },
    {
        id: '4',
        location: 'Office',
        deadline: new Date(2025, 2, 20),
        name: "Computer",
        reason: 'Keyboard broken',
    },

];
  
  const COLUMNS = [
    { label: 'Location', renderCell: (item) => item.location },
    {
      label: 'Repair Date',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Name', renderCell: (item) => item.name },
    { label: 'Reason', renderCell: (item) => item.reason },
];

// Delete when done with testing:
function onPaginationChange(action, state) {
    console.log(action, state);
}


export default function NeedsRepair(){
    const data = { nodes };
    const pagination = usePagination(data, {
        state: {
          page: 0,
          size: 3,
        },
        onChange: onPaginationChange,
      });

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Needs Repair</h1>
            <CompactTable columns={COLUMNS} data={data} theme={theme} pagination={pagination} />
            <div className={styles.paginationBar}>
                <div>
                    Page:{" "}
                    {pagination.state.getPages(data.nodes).map((_, index) => (
                        <button
                            className={styles.paginationButtons}
                            key={index}
                            type="button"
                            style={{
                                fontWeight: pagination.state.page == index ? "bold": "normal",
                            }}
                            onClick={() => pagination.fns.onSetPage(index)}
                        >
                            {index+1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}