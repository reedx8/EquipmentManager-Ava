'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import styles from './equipment.module.css';
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
const theme = useTheme(getTheme());

export default function Equipment() {
    const [search, setSearch] = useState('');
    const [nodes, setNodes] = useState(null); // react-table-library requires data to be in a "nodes" object
    const [fetchError, setFetchError] = useState(null);
    const [location, setLocation] = useState('');
    const tableData = { nodes }; // React-table-library requires/looks for a "nodes" array in the object passed into <Table> component

    // For testing using search keyword to filter nodes returned in table. Refactor:
    let tableData2 = { nodes };
    if (search !== '') {
        tableData2.nodes = nodes.filter((item) =>
            item.Name.toLowerCase().includes(search.toLowerCase())
        );
    }

    const pagination = usePagination(tableData, {
        state: {
            page: 0,
            size: 5,
        },
        onChange: onPaginationChange,
    });

    /*
    const doGet = React.useCallback(async (params) => {
        set
    })
    */

    // Delete when done with testing:
    function onPaginationChange(action, state) {
        console.log(action, state);
    }

    function handleSearch(event) {
        setSearch(event.target.value);
    }
    function handleLocationSelect(event) {
        setLocation(event.target.value);
        console.log(event.target.value);
    }

    useEffect(() => {
        async function fetchAllEquipment() {
            const { data, error } = await supabase
                .from('Equipment')
                .select('id, Name, Store_Name, Total_Cost, Provider_Name');

            if (error) {
                setItems(null);
                setFetchError('ERROR: Couldnt fetch all equipment');
                console.log(error);
            }
            if (data) {
                setNodes(data);
                // console.log(data);
                setFetchError(null);
            }
        }
        fetchAllEquipment();
    }, [nodes]);

    return (
        <div className={styles.pageContent}>
            <section>
                <h1 className={styles.title}>Equipment</h1>
                {fetchError && <p>{fetchError}</p>}
                {nodes && (
                    <>
                        <div className={styles.tableBar}>
                            <label htmlFor='locations'></label>
                            <select
                                name='locations'
                                id='locations'
                                onChange={handleLocationSelect}
                                className={styles.tableBarChild}
                            >
                                <option value='placeholder'>
                                    Select location...
                                </option>
                                <optgroup label='Stores'>
                                    <option value='hall'>Hall</option>
                                    <option value='barrows'>Barrows</option>
                                    <option value='kruse'>Kruse</option>
                                    <option value='orenco'>Orenco</option>
                                </optgroup>
                                <optgroup label='Other locations'>
                                    <option value='bakery'>Bakery</option>
                                    <option value='office'>Office</option>
                                </optgroup>
                            </select>

                            <label htmlFor='search'>
                                {/* Search by name:{' '} */}
                                <input
                                    id={styles.searchField}
                                    type='text'
                                    value={search}
                                    onChange={handleSearch}
                                    placeholder='Search by name'
                                    className={styles.tableBarChild}
                                />
                            </label>
                        </div>
                        <Table
                            data={tableData2}
                            theme={theme}
                            pagination={pagination}
                        >
                            {(allItems) => (
                                <>
                                    <Header>
                                        <HeaderRow>
                                            <HeaderCell>Name</HeaderCell>
                                            <HeaderCell>Location</HeaderCell>
                                            <HeaderCell>Total Cost</HeaderCell>
                                            <HeaderCell>Provider</HeaderCell>
                                        </HeaderRow>
                                    </Header>
                                    <Body>
                                        {allItems.map((item) => (
                                            <Row key={item.id} item={item}>
                                                <Cell>{item.Name}</Cell>
                                                <Cell>{item.Store_Name}</Cell>
                                                <Cell>${item.Total_Cost}</Cell>
                                                <Cell>
                                                    {item.Provider_Name}
                                                </Cell>
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
                                    .getPages(tableData2.nodes)
                                    .map((_, index) => (
                                        <button
                                            className={styles.paginationButtons}
                                            key={index}
                                            type='button'
                                            style={{
                                                fontWeight:
                                                    pagination.state.page ==
                                                    index
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
            </section>
        </div>
    );
}
