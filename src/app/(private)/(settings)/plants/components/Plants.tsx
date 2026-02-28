import { fetchDataPlants } from "@/query/plants/data";
import PlantCard from "./PlantCard";
import Areas from "./Areas";

export default async function Plants() {
  const plants = await fetchDataPlants();
  return (
    <div>
      {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
}