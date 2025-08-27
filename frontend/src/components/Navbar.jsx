import { useState } from 'react'
function Anchor({ href, children, onClick }) {
  return (
    <a href={href} onClick={onClick} className="cursor-pointer text-slate-600 hover:text-blue-700 transition-colors duration-200">
      {children}
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#device-info', label: 'Device Info' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/80 border-b border-blue-100/60 shadow-sm shadow-blue-600/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="font-bold text-xl text-blue-700 tracking-tight">
          Safe<span className="text-slate-700"> Intel</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map(item => (
            <Anchor key={item.href} href={item.href}>{item.label}</Anchor>
          ))}
        </nav>

        <button aria-label="Toggle menu" className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors" onClick={() => setOpen(v => !v)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M3.75 6.75a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-blue-100/60 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {navItems.map(item => (
              <Anchor key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span className="block py-2">{item.label}</span>
              </Anchor>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}


