import moment from "moment";
import { Division } from "./types/Division";

export class TournamentRecord {
    Id: number;
    SeasonCode: string;
    Division: Division;
    TournamentNumber: number;
    TournamentLocation: string;
    TournamentDetails: string;

    date() {
        return moment(this.TournamentDetails, ['DDMMMMY hh:mm:ss a', 'MMMMDDY hh:mm:ss a']).toDate()
    }
}

