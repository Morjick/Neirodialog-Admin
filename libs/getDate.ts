export const getDateFromPg = (date: string): string => {
  try {
    const pgDate = date.split('T')[0]

    return pgDate.split('-').reverse().join('.')
  } catch {
    return new Date(date).toLocaleString('ru')
  }
}
