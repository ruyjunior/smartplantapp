import { Area } from "@/query/areas/definitions";
import MachineCard from "./MachineCard";
import { fetchDataMachines } from "@/query/machines/data";

export default async function Machines({ area }: { area: Area }) {
const machines = await fetchDataMachines(area.id);
  return (
    <div>
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}