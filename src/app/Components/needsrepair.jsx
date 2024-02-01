import React from "react";
import styles from '../styles/needsrepair.module.css'
import { CompactTable } from '@table-library/react-table-library/compact';

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
];
  
  const COLUMNS = [
    { label: 'Store', renderCell: (item) => item.location },
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


export default function NeedsRepair(){
    const data = { nodes };

    return (
        <div className={styles.main}>
            <h1>Needs Repair</h1>
            <CompactTable columns={COLUMNS} data={data} />
        </div>
    )
}