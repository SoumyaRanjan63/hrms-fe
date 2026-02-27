export default function Header() {
  return (
    <header className="h-16 shrink-0 flex items-center justify-end px-6 bg-white border-b border-gray-200 shadow-sm max-md:h-14 max-md:px-4">
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-gray-200 shrink-0"
          aria-hidden={true}
        />
      </div>
    </header>
  )
}
