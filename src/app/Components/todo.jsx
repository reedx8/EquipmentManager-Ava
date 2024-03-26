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

export default function Todo() {
    return (
        <div>
            <h1>Todo</h1>
            <p>Coming soon...</p>
        </div>
    );
}
