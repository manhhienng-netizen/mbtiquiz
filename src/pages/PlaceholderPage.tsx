interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: '#FFFBEB',
        fontFamily: '"Be Vietnam Pro", system-ui, sans-serif',
      }}
    >
      <h1
        className="text-2xl font-semibold text-stone-800"
        style={{ fontFamily: '"Lexend", system-ui, sans-serif' }}
      >
        {title}
      </h1>
      <p className="mt-3 text-stone-500">Coming soon</p>
    </div>
  )
}
