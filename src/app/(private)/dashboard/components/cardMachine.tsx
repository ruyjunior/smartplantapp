import { fetchData } from "@/query/counts/data";
import ComponentCard from "@/components/common/ComponentCard";
import CardCounts from "./cardCounts";

export default async function CardMachine({ idmachine }: { idmachine: string }) {
    const counts = await fetchData(idmachine);
    const types = counts.reduce((acc, count) => acc.includes(count.tag) ? acc : [...acc, count.tag], [] as string[]);
    const typesOrderedAlphabetically = types.sort();

    return (
        <div className="flex flex-wrap">
            {typesOrderedAlphabetically.map((type) => {                        
                const countsOfType = counts.filter((count) => count.tag === type);
                return (
                    <CardCounts key={type} counts={countsOfType} type={type}  />
                )
            })}
        </div>
    )
}