import { fetchData } from "@/query/areas/data";
import { Plant } from "@/query/plants/definitions";
import CardArea from "./cardArea";
import ComponentCard from "@/components/common/ComponentCard";


export default async function CardPlant({ plant }: { plant: Plant }) {
    const areas = await fetchData(plant.id);

    return (
        <>
            {areas.map((area) => (
                <ComponentCard key={area.id} title={area.name} className="mb-4">
                    <CardArea key={area.id} idarea={area.id} />
                </ComponentCard>
            ))}
        </>
    )
}   
