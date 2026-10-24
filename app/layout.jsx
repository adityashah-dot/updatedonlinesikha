import '../src/index.css';

export const metadata = {
  title: 'Online Siksha - LPU Online Degrees & Admissions Portal',
  description: 'UGC-entitled online degree programs, fee structures, scholarships, and admissions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#f9f9ff] text-[#111c2d] antialiased selection:bg-[#d5e3ff] selection:text-[#001b3c]">
        {children}
      </body>
    </html>
  );
}
