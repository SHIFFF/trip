import dayjs from "dayjs"

export function formatMonthDay(date, formatStr = "MM月DD日"){
    return dayjs(date).format(formatStr)
}

// 获取两个日期的时间差
export function getDiffDays(startDate, endDate){
    return dayjs(endDate).diff(startDate, "day")
}