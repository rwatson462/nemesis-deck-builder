
export default function createSlug(warbandName) {
  return warbandName.toLowerCase().replaceAll(' ','+')
}
