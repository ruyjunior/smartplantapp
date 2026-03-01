import { fetchDataPlants } from "@/query/plants/data";
import PlantCard from "./PlantCard";
import Areas from "./Areas";
import ComponentCard from "@/components/common/ComponentCard";


export default async function Plants() {
  const plants = await fetchDataPlants();
  return (
    plants.map((plant) => (
      <div key={plant.id}>
        <ComponentCard
          title={"Plant"}
          className="w-full mt-4"
        >
          <PlantCard plant={plant} />
          <ComponentCard
            title={"Areas"}
            className="w-full mt-4"
          >
            <Areas plant={plant} />

          </ComponentCard>
        </ComponentCard>
      </div>
    ))
  );
}