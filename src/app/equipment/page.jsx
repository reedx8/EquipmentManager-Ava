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
import { MdDelete, MdEdit, MdAddCircle } from 'react-icons/md';
import supabase from '../config/supabaseClient';
const theme = useTheme(getTheme());

export default function Equipment() {
    const [data, setData] = useState(null); // Initial data from backend
    const [fetchError, setFetchError] = useState(null); // fetch error from supabase
    const [filtered, setFiltered] = useState(null); // tables data after search and location input
    const [location, setLocation] = useState(''); // store name, ie location, from drop down menu
    const [search, setSearch] = useState(''); // search field input
    // const tableData = { nodes }; // React-table-library requires/looks for a "nodes" array in the object passed into <Table> component

    // For testing using search keyword to filter data returned in table. Refactor:
    /*
    let tableData2 = { nodes };
    if (search !== '') {
        tableData2.nodes = nodes.filter((item) =>
            item.Name.toLowerCase().includes(search.toLowerCase())
        );
    }
    if (location !== '') {
        tableData2.nodes = nodes.filter((item) =>
            item.Store_Name.toLowerCase().includes(location.toLowerCase())
        );
    }
    */

    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 5,
        },
        onChange: onPaginationChange,
    });

    // Delete when done with testing:
    function onPaginationChange(action, state) {
        console.log(action, state);
    }

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    function handleLocationSelect(event) {
        setLocation(event.target.value);
        // console.log(event.target.value);
    }

    function handleReset() {
        setLocation('');
        setSearch('');
        // console.log(location);
    }
    function handleAddEquipment() {
        console.log('Add Equipment button clicked');
    }

    // fetch all equipment from backend on first mount only
    useEffect(() => {
        async function fetchAllEquipment() {
            const { data, error } = await supabase
                .from('Equipment')
                .select('id, Name, Store_Name, Total_Cost, Provider_Name');

            if (error) {
                setData(null);
                setFiltered(null);
                setFetchError('ERROR: Couldnt fetch all equipment');
                console.log(error);
            }
            if (data) {
                setData({ nodes: data }); // data needs to be in a nodes prop for react-table-library
                setFiltered({ nodes: data });
                // console.log(data.nodes);
                setFetchError(null);
            }
        }
        fetchAllEquipment();
    }, []);

    // Update table data with location and/or search field input
    // only when search or location state is changed
    useEffect(() => {
        if (data !== null) {
            let filteredData = data.nodes.filter((item) =>
                item.Name.toLowerCase().includes(search.toLowerCase())
            );
            filteredData = filteredData.filter((item) =>
                item.Store_Name.toLowerCase().includes(location.toLowerCase())
            );
            setFiltered({ nodes: filteredData });
        }
    }, [search, location]);

    return (
        <div className={styles.pageContent}>
            <section>
                <div className={styles.headerRow}>
                    <h1 className={styles.title}>All Equipment</h1>
                    <button
                        className={styles.addEquipBtn}
                        type='button'
                        onClick={handleAddEquipment}
                    >
                        <MdAddCircle size={20} />
                        Add Equipment
                    </button>
                </div>
                {fetchError && <p>{fetchError}</p>}
                {data && (
                    <>
                        <div className={styles.tableBar}>
                            <form>
                                <input
                                    type='reset'
                                    value='Clear selection'
                                    className={styles.tableBarChild}
                                    onClick={handleReset}
                                />
                                <label htmlFor='locations'></label>
                                <select
                                    name='locations'
                                    id='locations'
                                    onChange={handleLocationSelect}
                                    className={styles.tableBarChild}
                                    defaultValue='default'
                                >
                                    <option
                                        value='default'
                                        // defaultValue='default'
                                        disabled
                                        // hidden
                                    >
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
                            </form>

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
                            data={filtered}
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
                                            <HeaderCell></HeaderCell>
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
                                                <Cell>
                                                    <div
                                                        className={
                                                            styles.editDeleteColumn
                                                        }
                                                    >
                                                        <MdEdit
                                                            className={
                                                                styles.editBtn
                                                            }
                                                        />
                                                        <MdDelete
                                                            className={
                                                                styles.deleteBtn
                                                            }
                                                        />
                                                    </div>
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
                                    .getPages(filtered.nodes)
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
