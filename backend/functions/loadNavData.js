
export async function loadNavData() {
    const warbandResponse = await fetch('http://backend:3000/api/warbands/all')
    const warbands = await warbandResponse.json()

    const deckResponse = await fetch('http://backend:3000/api/nemesis-decks/all')
    const decks = await deckResponse.json()

    return {
        warbands,
        decks
    }
}