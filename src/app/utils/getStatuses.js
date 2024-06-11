/**
 * Returns the status string given the status number
 * @param {number} status - The status number of the equipment
 */
const getStatus = (status) => {
    switch (status) {
        case 1:
            return 'On Floor';
        case 2:
            return 'In Storage';
        case 3:
            return 'Under Maintenance';
        case 4:
            return 'Being Repaired';
        case 5:
            return 'Decommissioned';
        case 6:
            return 'For Sale';
        case 7:
            return 'Lost';
        case 8:
            return 'Stolen';
        case 9:
            return 'Needs Repair';
        case 10:
            return 'Awaiting Reassignment';
        case 14:
            return 'Repair Scheduled';
        default:
            return 'Unknown';
    }
};

export default getStatus;
