import { setHours, setMinutes, format, addMinutes } from 'date-fns'

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0) // set start time to 09:00
  const endTime = setMinutes(setHours(date, 21), 0) // set end time to 21:00
  const intervalInMinutes = 45
  const timeList: string[] = []

  let currentTime = startTime

  while (currentTime <= endTime) {
    if (
      date.getDate() === new Date().getDate() &&
      currentTime.getHours() <= new Date().getHours()
    ) {
      currentTime = addMinutes(currentTime, intervalInMinutes)
      continue
    }
    timeList.push(format(currentTime, 'HH:mm'))
    currentTime = addMinutes(currentTime, intervalInMinutes)
  }

  return timeList
}
