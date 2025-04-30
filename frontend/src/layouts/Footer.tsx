export default function Footer() {
    return (
        <footer className="border-t mt-12 py-6 px-4 text-sm text-gray-600 bg-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© {new Date().getFullYear()} Booking App — Built by Bilal Benyoussef </p>
                <div className="flex gap-4 items-center">
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="https://github.com/Bilalben23/airbnb-clone" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
