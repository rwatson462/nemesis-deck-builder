import { Warbands } from "../../../data/Warbands";
import createSlug from "../../../functions/createSlug";

export default function handler(request, response) {
    const warband = Warbands.find(warband => createSlug(warband.name) === request.query.name)
    response.status(200).json(warband)
}
