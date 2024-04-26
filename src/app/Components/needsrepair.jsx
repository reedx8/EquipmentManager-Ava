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
import supabase from '../config/supabaseClient';
// const theme = useTheme(getTheme());
const key = 'Composed Table';

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
    const theme = useTheme(getTheme());

    // Delete when done with testing:
    function onPaginationChange(action, state) {
        console.log(action, state);
    }

    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase
                .from('Equipment')
                .select('id, Next_Repair_Date, Store_Name, Name, Reason')
                .eq('Status_id', 9); // 9 = Needs Repair
            // .eq('Needs_Repair', 'TRUE');

            if (error) {
                setFetchError('ERROR: Couldnt fetch needs repair nodes');
                setNodes(null);
                console.log('Fetch Error: ', fetchError);
            }
            if (data) {
                setNodes(data);
                setFetchError(null);
            }
        };
        fetchItems();
    }, [nodes]);

    return (
        <div className={styles.main}>
            <h1 className={styles.title}>Needs Repair</h1>
            {fetchError && <p>{fetchError}</p>}
            {nodes && (
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
                                        <HeaderCell>Store Name</HeaderCell>
                                        <HeaderCell>Repair Date</HeaderCell>
                                        <HeaderCell>Name</HeaderCell>
                                        <HeaderCell>Reason</HeaderCell>
                                    </HeaderRow>
                                </Header>
                                <Body>
                                    {allItems.map((item) => (
                                        <Row key={item.id} item={item}>
                                            <Cell>{item.Store_Name}</Cell>
                                            {/* <Cell>{"1/1/2020"}</Cell> */}
                                            {/* <Cell>{item.Next_Repair_Date}</Cell> */}
                                            <Cell>
                                                {new Date(
                                                    item.Next_Repair_Date
                                                ).toLocaleDateString('en-US', {
                                                    timezone: 'PST',
                                                })}
                                            </Cell>
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
                                        onClick={() =>
                                            pagination.fns.onSetPage(index)
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
