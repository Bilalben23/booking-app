export default function Footer() {
    return (
        <footer className="border-t mt-12 py-8 px-4 text-sm text-gray-600 bg-gray-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-center md:text-left">
                    © {new Date().getFullYear()} <span className="font-semibold text-blue-600">Booking App</span> — Built by Bilal Benyoussef
                </p>
                <div className="flex gap-4 items-center">
                    <a href="#" className="hover:text-blue-600 transition-colors duration-200">Privacy</a>
                    <a href="#" className="hover:text-blue-600 transition-colors duration-200">Terms</a>
                    <a
                        href="https://github.com/Bilalben23/airbnb-clone"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors duration-200"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}
