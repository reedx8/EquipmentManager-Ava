'use client'
import { useEffect, useState } from 'react'
import React from "react";
import styles from '../styles/needsrepair.module.css'
import { CompactTable } from '@table-library/react-table-library/compact';
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import supabase from '../config/supabaseClient'
const theme = useTheme(getTheme());
const key = 'Composed Table';

/* 
mock data (nodes[] and columns[])
*/
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
    const [fetchError, setFetchError] = useState(null);
    const [items, setItems] = useState(null);
    const data = { nodes };
    const pagination = usePagination(items, {
        state: {
          page: 0,
          size: 3,
        },
        onChange: onPaginationChange,
    });

    useEffect(() => {
        const fetchItems = async () => {
            const {data, error} = await supabase
                .from('Equipment')
                .select('id, Next_Repair_Date, Store_Name, Name, Reason')
                .eq('Needs_Repair', 'TRUE');
            
            if (error) {
                setFetchError('ERROR: Couldnt fetch needs repair items')
                setItems(null);
                console.log("Fetch Error: ", fetchError);
            }
            if (data) {
                setItems(data)
                setFetchError(null);
            }
        }
        fetchItems();
    }, [items])

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
            {fetchError && (<p>{fetchError}</p>) }
            {items && (
                <Table data={data} theme={theme}>
                    {(tableList) => (
                        <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>Store Name</HeaderCell>
                                <HeaderCell>Repair Date</HeaderCell>
                                <HeaderCell>Name</HeaderCell>
                                <HeaderCell>Reason</HeaderCell>
                            </HeaderRow>
                        </Header>
                            <Body>
                                {items.map((item) => (
                                    <Row key={item.id} item={item}>
                                        <Cell>{item.Store_Name}</Cell>
                                        {/* <Cell>{"1/1/2020"}</Cell> */}
                                        {/* <Cell>{item.Next_Repair_Date}</Cell> */}
                                        <Cell>
                                            {new Date(item.Next_Repair_Date).toLocaleDateString('en-US', {timezone: 'PST'})}
                                        </Cell>
                                        <Cell>{item.Name}</Cell>
                                        <Cell>{item.Reason}</Cell>
                                    </Row>
                                ))}
                            </Body>
                        </>
                    )}
                </Table>
            )}
        </div>
    )
}