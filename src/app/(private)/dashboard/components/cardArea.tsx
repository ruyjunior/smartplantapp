import { fetchData } from "@/query/machines/data";
import CardMachine from "./cardMachine";
import ComponentCard from "@/components/common/ComponentCard";

export default async function CardArea({ idarea }: { idarea: string }) {
    const machines = await fetchData(idarea);

    return (
        <>
            {machines.map((machine) => (
                <ComponentCard key={machine.id} title={machine.name} className="mb-4">
                    <CardMachine key={machine.id} idmachine={machine.id} />
                </ComponentCard>
            ))}
        </>
    )
}