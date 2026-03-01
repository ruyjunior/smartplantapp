import { fetchDataAreas } from "@/query/areas/data";
import { Plant } from "@/query/plants/definitions";
import AreaCard from "./AreaCard";
import ComponentCard from "@/components/common/ComponentCard";
import Machines from "./Machines";

export default async function Areas({ plant }: { plant: Plant }) {
  const areas = await fetchDataAreas(plant.id);
  return (
    areas.map((area) => (
      <div key={area.id}>
        <AreaCard key={area.id} area={area} />
        <ComponentCard title={"Machines"} className="w-full mt-4">
          <Machines area={area} />
        </ComponentCard>
      </div>
    )));
}        