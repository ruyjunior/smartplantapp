import { fetchDataAreas } from "@/query/areas/data";
import { Plant } from "@/query/plants/definitions";
import AreaCard from "./AreaCard";

export default async function Areas({ plant }: { plant: Plant }) {
const areas = await fetchDataAreas(plant.id);
  return (
    <div>
      {areas.map((area) => (
        <AreaCard key={area.id} area={area} />
      ))}
    </div>
  );
}