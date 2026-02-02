import { Count } from "@/query/counts/definitions";
import Badge from "./BadgeValue";

export default async function CardCounts({ counts, type }: { counts: Count[], type: string }) {
    {
        const countsOfType = counts.filter((count) => count.tag === type);
        //console.log("Counts of type: ", countsOfType);

        return (
            <div className="flex flex-wrap gap-2 mr-2">
                <Badge>
                    <div className="flex items-center gap-2 py-2">
                        <Badge >
                            {type}
                        </Badge>
                        <Badge >
                            {countsOfType[0].value}
                        </Badge>
                    </div>
                </Badge>

            </div>
        )
    }
}