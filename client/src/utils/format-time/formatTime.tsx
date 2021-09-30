import formatDistance from 'date-fns/formatDistance';

export const setTimeFormat = (date: string) => {
    let newDate = new Date(date);
    return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds() + ':' + newDate.getMilliseconds()
}

export const convertTime = (time: string | undefined) => {
    if (typeof time === 'string') {
        const date = new Date(time);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}`
    }

}

export const calculateDistance = (time: string | undefined) => {
    if (typeof time === 'string') {
        const date = new Date(time);
        return formatDistance(
            new Date(date),
            new Date(),
            {includeSeconds: true, addSuffix: true}
        )
    }
}
