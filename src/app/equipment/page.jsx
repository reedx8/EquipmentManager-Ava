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
import { IoIosSwap, IoIosAddCircleOutline } from 'react-icons/io';
import supabase from '../config/supabaseClient';
import AddEquipmentModal from '../Components/addequipmentmodal';
import SwapModal from '../Components/swapmodal';
import EditEquipmentModal from '../Components/editequipmentmodal';
import DeleteEquipmentModal from '../Components/deleteequipmentmodal';
import Sidebar from '../Components/sidebar';
import HeaderBar from '../Components/header';
import { IoMdAdd } from 'react-icons/io';
import globalTableTheme from '../config/theme';

export default function Equipment() {
    const [data, setData] = useState(null); // Initial data from backend
    const [fetchError, setFetchError] = useState(null); // fetch error from supabase
    const [filtered, setFiltered] = useState(null); // tables data after search and location input
    const [location, setLocation] = useState(''); // store name, ie location, from drop down menu
    const [search, setSearch] = useState(''); // search field input
    const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);
    const [showSwapModal, setShowSwapModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentItemDetails, setCurrentItemDetails] = useState(null);
    // const [loading, setLoading] = useState(true);
    const theme = useTheme(globalTableTheme);

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

    function openModal(modalType) {
        switch (modalType) {
            case 'add':
                setShowAddEquipmentModal(true);
                break;
            case 'swap':
                setShowSwapModal(true);
                break;
            case 'edit':
                setShowEditModal(true);
                break;
            case 'delete':
                setShowDeleteModal(true);
                break;
            default:
                console.log('Invalid modal type');
        }
    }
    function closeModal(modalType) {
        switch (modalType) {
            case 'add':
                setShowAddEquipmentModal(false);
                break;
            case 'swap':
                setShowSwapModal(false);
                break;
            case 'edit':
                setShowEditModal(false);
                break;
            case 'delete':
                setShowDeleteModal(false);
                break;
            default:
                console.log('Invalid modal type');
        }
    }

    async function handleDeleteEquipment(id) {
        // setShowDeleteModal(true);
        console.log('delete button clicked ');
        console.log('id: ' + id);

        try {
            const { data, error } = await supabase
                .from('Equipment')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }
            setCurrentItemDetails(data);
            // setShowDeleteModal(true);
            openModal('delete');
        } catch (error) {
            alert('Error fetching equipment details: ' + error.message);
        }
    }

    async function handleEditEquipment(id) {
        try {
            const { data, error } = await supabase
                .from('Equipment')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            setCurrentItemDetails(data);
            // setShowEditModal(true);
            openModal('edit');
        } catch (error) {
            alert('Error fetching equipment details: ' + error.message);
        }

        /*
        const itemDetails = data.nodes.find((item) => item.id === id);
        setCurrentItemDetails(itemDetails);
        setShowEditModal(true);
        console.log('hello');
        */
    }

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
        // setLoading(false);
    }

    // fetch all equipment from backend on first mount only
    useEffect(() => {
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
        <>
            <Sidebar />
            <HeaderBar />
            <div className={styles.pageContent}>
                <section className={styles.topInfo}>
                    <div className={styles.infoTextCard}>
                        <p>31 Ava Roasteria</p>
                        <p>12 Revel</p>
                        <p>4 DoorDash</p>
                        <p>4 Grubhub</p>
                        <p>4 Uber Eats</p>
                    </div>
                    <div className={styles.infoTextCard}>
                        <p>20 Hall</p>
                        <p>15 Barrows</p>
                        <p>17 Kruse</p>
                        <p>12 Orenco</p>
                        <p>10 Bakery</p>
                        <p>6 Office</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>
                            <h3>Most Repairs</h3>
                        </div>
                        <div className={styles.cardInfo}>
                            <p className={styles.cardNumber}>4</p>
                            <p className={styles.cardItem}>
                                Espresso Machine (Hall)
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>
                            <h3>Highest Cost</h3>
                        </div>
                        <div className={styles.cardInfo}>
                            <p className={styles.cardNumber}>$282</p>
                            <p className={styles.cardItem}>
                                Refrigerator (Barrows)
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.headerRow}>
                        <div>
                            <h1 className={styles.title}>All Equipment</h1>
                        </div>
                        <div className={styles.btnSection}>
                            <button
                                className={styles.swapBtn}
                                type='button'
                                onClick={() => openModal('swap')}
                                // onClick={handleSwapEquipment}
                            >
                                <IoIosSwap size={20} />
                                Swap
                            </button>
                            <button
                                className={styles.addEquipBtn}
                                type='button'
                                onClick={() => openModal('add')}
                                // onClick={handleAddEquipment}
                            >
                                <IoMdAdd size={20} />
                                Add
                            </button>
                            {/* {showAddEquipmentModal && (
                            <AddEquipmentModal closeModal={handleCloseModal} />
                        )} */}
                        </div>
                    </div>
                    {fetchError && <p>{fetchError}</p>}
                    {data && (
                        <>
                            <div className={styles.tableBar}>
                                <form>
                                    <input
                                        type='reset'
                                        value='Clear selection'
                                        className={styles.clearBtn}
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
                                            <option value='barrows'>
                                                Barrows
                                            </option>
                                            <option value='kruse'>Kruse</option>
                                            <option value='orenco'>
                                                Orenco
                                            </option>
                                        </optgroup>
                                        <optgroup label='Other locations'>
                                            <option value='bakery'>
                                                Bakery
                                            </option>
                                            <option value='office'>
                                                Office
                                            </option>
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
                                                <HeaderCell>
                                                    Location
                                                </HeaderCell>
                                                <HeaderCell>
                                                    Total Cost
                                                </HeaderCell>
                                                <HeaderCell>
                                                    Provider
                                                </HeaderCell>
                                                <HeaderCell></HeaderCell>
                                            </HeaderRow>
                                        </Header>
                                        <Body>
                                            {allItems.map((item) => (
                                                <Row key={item.id} item={item}>
                                                    <Cell>{item.Name}</Cell>
                                                    <Cell>
                                                        {item.Store_Name}
                                                    </Cell>
                                                    <Cell>
                                                        ${item.Total_Cost}
                                                    </Cell>
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
                                                                onClick={() =>
                                                                    handleEditEquipment(
                                                                        item.id
                                                                    )
                                                                }
                                                            />
                                                            <MdDelete
                                                                className={
                                                                    styles.deleteBtn
                                                                }
                                                                onClick={() =>
                                                                    handleDeleteEquipment(
                                                                        item.id
                                                                    )
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
                                                className={
                                                    styles.paginationButtons
                                                }
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
                                                    pagination.fns.onSetPage(
                                                        index
                                                    )
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
                {showAddEquipmentModal && (
                    <AddEquipmentModal
                        closeModal={closeModal}
                        refreshEquipment={fetchAllEquipment}
                    />
                )}
                {showSwapModal && <SwapModal closeModal={closeModal} />}
                {showEditModal && (
                    <EditEquipmentModal
                        closeModal={closeModal}
                        itemDetails={currentItemDetails}
                        refreshEquipment={fetchAllEquipment}
                    />
                )}
                {showDeleteModal && (
                    <DeleteEquipmentModal
                        closeModal={closeModal}
                        itemDetails={currentItemDetails}
                        refreshEquipment={fetchAllEquipment}
                    />
                )}
            </div>
        </>
    );
}
