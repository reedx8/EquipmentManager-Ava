'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import styles from '@/app/styles/home/todo.module.css';
import { MdAdd } from 'react-icons/md';
import supabase from '@/app/config/supabaseClient';

export default function Todo() {
    const [todoItems, setTodoItems] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    // fetch most recent todo items and limit to 3
    useEffect(() => {
        const fetchTodos = async () => {
            let { data, error } = await supabase
                .from('Todo')
                .select('id, title, due_date, store_name')
                .order('created_at', { ascending: false })
                .eq('type_id', 1) // type_id 1 is for todo items
                .limit(3);
            if (error) {
                setFetchError('Couldnt fetch todo items');
                console.log('Fetch Error: ', fetchError);
                return;
            }
            // get month in 2 digit form and day in 2 digit form
            // let month = dueDate.getMonth() + 1;
            // let day = dueDate.getDate();
            // setTodoItems()
            setTodoItems(data);
        };
        fetchTodos();
    });

    return (
        <div>
            <h1 className={styles.heading}>Todo</h1>
            <div className={styles.todoContainer}>
                <div className={styles.topBar}>
                    <button className={styles.addButton}>
                        <MdAdd />
                    </button>
                    {/* <p>0</p> */}
                </div>
                <div className={styles.todoItems}>
                    {fetchError && <p>{fetchError}</p>}
                    {todoItems.map((item) => (
                        <div key={item.id} className={styles.todoItem}>
                            <div className={styles.buttonAndTitle}>
                                {/* <button className={styles.doneButton}>0</button> */}
                                <div className={styles.todoTitle}>
                                    {item.title}
                                </div>
                                {item.store_name && (
                                    <div className={styles.storeName}>
                                        {item.store_name}
                                    </div>
                                )}
                            </div>
                            <div className={styles.todoDate}>
                                <p className={styles.dueTitle}>DUE</p>
                                <p className={styles.dueDate}>
                                    {item.due_date
                                        ? (
                                              new Date(
                                                  item.due_date
                                              ).getMonth() + 1
                                          ).toString() +
                                          '/' +
                                          new Date(item.due_date)
                                              .getDate()
                                              .toString()
                                        : '--'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
