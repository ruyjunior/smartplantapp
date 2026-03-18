import { Event } from "@/query/events/definitions";

export default function CardEvents({ events, type }: { events: Event[], type: string }) {
    const value = events[0].value.toString();

    let bg = "";
    let text = "";
    let label = "";

    if (value === "1") {
        bg = "bg-green-100 dark:bg-green-900";
        text = "text-green-700 dark:text-green-300";
        label = "ON";
    } else if (value === "0") {
        bg = "bg-red-100 dark:bg-red-900";
        text = "text-red-700 dark:text-red-300";
        label = "OFF";
    } else {
        bg = "bg-gray-100 dark:bg-gray-800";
        text = "text-gray-700 dark:text-gray-300";
        label = value;
    }

    return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-xl ${bg}`}>
            <span className="text-xs text-gray-500 uppercase tracking-wide">
                {type}
            </span>

            <span className={`text-lg font-bold ${text}`}>
                {label}
            </span>
        </div>
    );
}