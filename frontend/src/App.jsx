import Navbar from './components/Navbar.jsx'
import Landing from './components/Landing.jsx'
import DeviceForm from './components/DeviceForm.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 text-slate-800 relative">
      {/* Subtle blue accent lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-200/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-200/30 to-transparent"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <main id="home" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Landing />
          <section id="device-info" className="py-10 sm:py-14 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-blue-50/20 rounded-3xl -mx-4"></div>
            <div className="relative">
              <DeviceForm />
            </div>
          </section>
          <section id="faq" className="py-10 sm:py-14">
            <FAQ />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

