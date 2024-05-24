'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './schedule.module.css';
import Sidebar from '../Components/sidebar';
import HeaderBar from '../Components/header';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, set } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import supabase from '@/app/config/supabaseClient';
import { IoMdAdd } from 'react-icons/io';
// import { MdDelete } from 'react-icons/md';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AddEventModal from '../Components/schedule/addeventmodal';
import ViewEventModal from '../Components/schedule/vieweventmodal';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// Schedule page
export default function Schedule() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [viewEventModal, setViewEventModal] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const { data, error } = await supabase
            .from('Events')
            .select('id, title, date, comments')
            .gte('date', oneMonthAgo.toISOString());
        // .is('date', null);

        if (error) {
            setLoading(false);
            setError(error);
            console.log(error);
            throw error;
        }

        if (data) {
            setEvents(
                data.map((event) => {
                    return {
                        id: event.id,
                        title: event.title,
                        start: new Date(event.date),
                        end: new Date(event.date),
                        comments: event.comments,
                    };
                })
            );
            setLoading(false);
            setError(null);
        }
    };
    const onSelectEvent = (event) => {
        // console.log(event);
        setSelectedEvent(event);
        setViewEventModal(true);
    };

    // Change the calendar view of the calendar optimally
    // by memoizing the function
    const onNewView = useCallback(
        (view) => {
            setCurrentView(view);
        },
        [setCurrentView]
    );

    const onNavigate = useCallback(
        (date, view, action) => {
            setCurrentDate(date);
        },
        [setCurrentDate]
    );

    /* Each render could potentially generate a new reference to 
    an events array, even if the content is identical, leading to
    unnecessary re-renders of the calendar. This ensures that unless the
     events data changes, the same function and resulting array are used, reducing 
    unnecessary recalculations and re-renders of your calendar component. */
    const memoizedEvents = useMemo(() => events, [events]);

    // const memoizedEvents = useMemo(() => {
    //     return events.map((ev) => ({
    //         ...ev,
    //         start: new Date(ev.start),
    //         end: new Date(ev.start),
    //     }));
    // }, [events]);

    return (
        <>
            <Sidebar />
            <HeaderBar />
            <div className={styles.pageContent}>
                <section className={styles.manageEventSection}>
                    {/* <button className={styles.deleteEventButton}>
                        <MdDelete />
                        Delete
                    </button> */}
                    <button
                        className={styles.addEventButton}
                        onClick={() => setShowAddEventModal(true)}
                    >
                        <IoMdAdd />
                        Add Event
                    </button>
                </section>
                {error && <p>{error.message}</p>}
                {loading && (
                    <section className={styles.skeletonSection}>
                        <Skeleton height={'100%'} />
                    </section>
                )}
                {!loading && !error && (
                    <section className={styles.calendarSection}>
                        <Calendar
                            view={currentView}
                            localizer={localizer}
                            date={currentDate}
                            // events={events}
                            events={memoizedEvents}
                            startAccessor='start'
                            endAccessor='end'
                            style={{
                                height: '100%',
                                fontSize: '0.9rem',
                            }}
                            // onNavigate={(date, view, action) => {
                            //     setCurrentDate(date);
                            // }}
                            onNavigate={onNavigate}
                            onSelectEvent={onSelectEvent}
                            onView={onNewView}
                        />
                    </section>
                )}
                {showAddEventModal && (
                    <AddEventModal
                        showModal={setShowAddEventModal}
                        refreshPage={fetchEvents}
                    />
                )}
                {viewEventModal && (
                    <ViewEventModal
                        showModal={setViewEventModal}
                        event={selectedEvent}
                    />
                )}
            </div>
        </>
    );
}
