import { NemesisDecks } from "../../../data/NemesisDecks";
import createSlug from "../../../functions/createSlug";

export default function AllWarbands(_, response) {
    response.status(200).json(
        NemesisDecks.map(deck => ({
            name: deck.name,
            faction: deck.faction,
            url: `/nemesis-decks/${createSlug(deck.name)}`
        }))
    )
}
