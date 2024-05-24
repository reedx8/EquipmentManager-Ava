'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import styles from '../styles/needsrepair.module.css';
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
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
// import supabase from '../config/supabaseClient';
import globalTableTheme from '../config/theme';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function NeedsRepair() {
    const [fetchError, setFetchError] = useState(null);
    const [nodes, setNodes] = useState(null);
    const tableData = { nodes };
    const pagination = usePagination(tableData, {
        state: {
            page: 0,
            size: 3,
        },
        onChange: onPaginationChange,
    });
    const theme = useTheme(globalTableTheme);

    // Delete when done with testing:
    function onPaginationChange(action, state) {
        console.log(action, state);
    }
    const fetchItems = async () => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await fetch('/api/needsrepair');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNodes(data);
            setFetchError(null);
        } catch (error) {
            setFetchError('ERROR: Couldnt fetch needs repair nodes');
            setNodes(null);
            console.log('Fetch Error: ', fetchError);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);
    // }, [nodes]);

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Needs Repair</h1>
            {fetchError && <p>{fetchError}</p>}
            {!nodes && !fetchError ? (
                <Skeleton
                    // count={1}
                    height={125}
                    borderRadius={0.5}
                />
            ) : (
                <NeedsRepairTable
                    nodes={nodes}
                    tableData={tableData}
                    pagination={pagination}
                    theme={theme}
                />
            )}
        </div>
    );
}

function NeedsRepairTable({ nodes, tableData, pagination, theme }) {
    return (
        <>
            <Table
                data={tableData}
                theme={theme}
                pagination={pagination}
                className={styles.table}
            >
                {(allItems) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>Location</HeaderCell>
                                <HeaderCell>Item</HeaderCell>
                                <HeaderCell>Reason</HeaderCell>
                            </HeaderRow>
                        </Header>
                        <Body>
                            {allItems.map((item) => (
                                <Row key={item.id} item={item}>
                                    <Cell>{item.Store_Name}</Cell>
                                    <Cell>{item.Name}</Cell>
                                    <Cell>{item.Reason}</Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>
            <div className={styles.paginationBar}>
                <div>
                    Page:{' '}
                    {pagination.state
                        .getPages(tableData.nodes)
                        .map((_, index) => (
                            <button
                                className={styles.paginationButtons}
                                key={index}
                                type='button'
                                style={{
                                    fontWeight:
                                        pagination.state.page == index
                                            ? 'bold'
                                            : 'normal',
                                }}
                                onClick={() => pagination.fns.onSetPage(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                </div>
            </div>
        </>
    );
}
