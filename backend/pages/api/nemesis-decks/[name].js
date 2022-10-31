import { NemesisDecks } from "../../../data/NemesisDecks";
import createSlug from "../../../functions/createSlug";

export default function handler(request, response) {
    const deck = NemesisDecks.find(deck => createSlug(deck.name) === request.query.name)
    response.status(200).json(deck)
}
