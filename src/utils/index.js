import dayjs from "dayjs"

export const formatTime = (time) => {
    return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
}