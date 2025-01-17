export const formatDate = (date: Date | string): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);

    // Remove the comma and add a period before the day
    return formattedDate.replace(',', '').replace(/ (\d+)$/, '.$1');
};