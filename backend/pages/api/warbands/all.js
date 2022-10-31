import { Warbands } from "../../../data/Warbands";
import createSlug from "../../../functions/createSlug";

export default function AllWarbands(_, response) {
    response.status(200).json(
        Warbands.map(warband => ({
            name: warband.name,
            faction: warband.faction,
            url: `/warbands/${createSlug(warband.name)}`
        }))
    )
}
