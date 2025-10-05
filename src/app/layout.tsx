import './globals.css'   // tu archivo Tailwind
export const metadata = { title: 'Weather Odds', description: 'NASA Space Apps' }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}