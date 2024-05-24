/* This file contains functions to fetch data from the server */

// Fetch all store names from the 'Stores' table
export async function fetchStores() {
    try {
        const response = await fetch('/api/stores');
        if (!response.ok) {
            throw new Error('Failed to fetch stores');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch stores', error);
        throw error;
    }
}

// Fetch all statuses from the 'Statuses' table
export async function fetchStatuses() {
    try {
        const response = await fetch('/api/statuses');
        if (!response.ok) {
            throw new Error('Failed to fetch statuses');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch statuses', error);
        throw error;
    }
}

// Fetch all equipment types from the 'Equip_Type' table
export async function fetchEquipTypes() {
    try {
        const response = await fetch('/api/equipType');
        if (!response.ok) {
            throw new Error('Failed to fetch equipment types');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch equipment types', error);
        throw error;
    }
}

// Fetch all providers from the 'Providers' table (todo?)
export async function fetchProviders() {
    try {
        const response = await fetch('/api/providers');
        if (!response.ok) {
            throw new Error('Failed to fetch providers');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch providers', error);
        throw error;
    }
}

export async function fetchEventTypes() {
    try {
        const response = await fetch('/api/eventType');
        if (!response.ok) {
            throw new Error('Failed to fetch event types');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch event types', error);
        throw error;
    }
}
