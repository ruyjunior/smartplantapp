import { fetchData } from "@/query/counts/data";
import ComponentCard from "@/components/common/ComponentCard";
import CardCounts from "./cardCounts";

export default async function CardMachine({ idmachine }: { idmachine: string }) {
    const counts = await fetchData(idmachine);
    const types = counts.reduce((acc, count) => acc.includes(count.tag) ? acc : [...acc, count.tag], [] as string[]);
    return (
        <div className="flex flex-wrap">
            {types.map((type) => (
                <CardCounts key={type} counts={counts} type={type}  />
            ))}
        </div>
    )
}