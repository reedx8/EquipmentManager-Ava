'use client';
import { useState, useEffect } from 'react';
import styles from './expenses.module.css';
import globalTableTheme from '@/app/config/theme';
import { useTheme } from '@table-library/react-table-library/theme';
import Sidebar from '@/app/Components/sidebar';
import HeaderBar from '@/app/Components/header';
import { MdDelete, MdEdit, MdOutlineMenuOpen } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import {
    Table,
    Header,
    HeaderRow,
    Body,
    Row,
    HeaderCell,
    Cell,
} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import supabase from '@/app/config/supabaseClient';
import InvoiceCard from '@/app/Components/expenses/invoicecard';

export default function Expenses() {
    const [invoices, setInvoices] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const theme = useTheme(globalTableTheme);

    useEffect(() => {
        async function fetchInvoices() {
            const { data, error } = await supabase
                .from('Invoices')
                .select('*, Providers: provider_id (name)');
            // .eq('Providers.id', 'Invoices.provider_id');

            if (error) {
                setFetchError('Couldnt fetch invoices');
                console.log('Fetch Error: ', fetchError);
                return;
            }
            setInvoices({ nodes: data });
            setFetchError(null);
            console.log('invoices: ', data);
        }
        fetchInvoices();
        // console.log('invoices: ', invoices);
    }, [fetchError]);

    const pagination = usePagination(invoices, {
        state: {
            page: 0,
            size: 10,
        },
        // onChange: onPaginationChange,
    });

    return (
        <>
            <Sidebar />
            <HeaderBar />
            <div className={styles.pageContent}>
                <section className={styles.topCards}>
                    <InvoiceCard type='count' />
                    <InvoiceCard type='costliestItem' />
                    <InvoiceCard type='mostServiced' />
                    <InvoiceCard type='costliestStore' />
                </section>
                <section className={styles.invoiceTable}>
                    {fetchError && <p>{fetchError}</p>}
                    <div className={styles.tableActions}>
                        <button
                            className={styles.addInvoiceBtn}
                            type='button'
                            // onClick={() => openModal('add')}
                        >
                            <IoMdAdd size={20} />
                            Add Invoice
                        </button>
                    </div>
                    {invoices && (
                        <Table data={invoices} theme={theme}>
                            {(allInvoices) => (
                                <>
                                    <Header>
                                        <HeaderRow>
                                            <HeaderCell>Invoice #</HeaderCell>
                                            <HeaderCell>Date</HeaderCell>
                                            <HeaderCell>Provider</HeaderCell>
                                            <HeaderCell>Amount</HeaderCell>
                                            <HeaderCell></HeaderCell>
                                        </HeaderRow>
                                    </Header>
                                    <Body>
                                        {allInvoices.map((invoice) => (
                                            <Row
                                                key={invoice.id}
                                                item={invoice}
                                            >
                                                <Cell>
                                                    #{invoice.invoice_num}
                                                </Cell>
                                                <Cell>
                                                    {invoice.issue_date
                                                        ? new Date(
                                                              invoice.issue_date
                                                          ).toLocaleDateString()
                                                        : '--'}
                                                </Cell>
                                                <Cell>
                                                    {invoice.Providers
                                                        ? invoice.Providers.name
                                                        : 'N/A'}
                                                </Cell>
                                                <Cell>${invoice.total}</Cell>
                                                <Cell>
                                                    <div
                                                        className={
                                                            styles.rowActionsColumn
                                                        }
                                                    >
                                                        <MdDelete
                                                            className={
                                                                styles.deleteBtn
                                                            }
                                                        />
                                                        <MdEdit
                                                            className={
                                                                styles.editBtn
                                                            }
                                                        />
                                                        <MdOutlineMenuOpen
                                                            className={
                                                                styles.viewBtn
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
                    )}
                </section>
            </div>
        </>
    );
}
