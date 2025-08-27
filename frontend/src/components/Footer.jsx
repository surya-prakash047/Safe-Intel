export default function Footer() {
  return (
    <footer className="mt-16 border-t border-blue-100/60 bg-gradient-to-r from-blue-50/30 via-white to-blue-50/30 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent"></div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4 relative">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="font-semibold text-blue-700">Medical Device Intelligence</div>
          <div className="hidden sm:block text-slate-400">•</div>
          <div>© {new Date().getFullYear()} All rights reserved.</div>
        </div>
        <div className="flex gap-6">
          <a href="#home" className="hover:text-blue-700 transition-colors">Home</a>
          <a href="#device-info" className="hover:text-blue-700 transition-colors">Device Info</a>
          <a href="#faq" className="hover:text-blue-700 transition-colors">FAQ</a>
        </div>
      </div>
    </footer>
  )
}


