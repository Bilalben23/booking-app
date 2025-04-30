import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="mt-10 mx-auto max-w-xl text-center text-red-600 bg-red-100 border border-red-300 p-4 rounded-md flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span>{message}</span>
        </div>
    );
}
