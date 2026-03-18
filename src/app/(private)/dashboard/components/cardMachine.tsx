import ComponentCard from "@/components/common/ComponentCard";
import { fetchDataDevices } from "@/query/devices/data";
import CardDevices from "./cardDevices";

export default async function CardMachine({ idmachine }: { idmachine: string }) {
    const devices = await fetchDataDevices(idmachine);
    return (
        <div>
            {devices.map((device) => (
                <CardDevices device={device} key={device.id} />
            ))}
        </div>

    )
}