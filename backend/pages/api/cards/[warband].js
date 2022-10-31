import { Cards } from "../../../data/cards";
import createSlug from "../../../functions/createSlug";

export default function handler(request, response) {
    const faction = request.query?.warband
    response.status(200).json({cards: Cards.filter(card => createSlug(card.warband) === faction)})
}