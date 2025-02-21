export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-base font-bold mb-1">LCube AB</h3>
            <p className="text-sm">Stockholm</p>
            <p className="text-sm">Nyckeltal</p>
            <p className="text-sm">DUNS number search 507651581</p>
          </div>
          <div>
            <h3 className="text-base font-bold mb-1">Kontakta oss</h3>
            <p className="text-sm">
              <a href="https://www.linkedin.com/in/patriklindstrom64/" className="hover:text-[#4d7a3d]">
                [ LinkedIn ]
              </a>
            </p>
            <p className="text-sm">
              <a href="https://github.com/patriklindstrom" className="hover:text-[#4d7a3d]">
                [ Github ]
              </a>
            </p>
          </div>
          <div>
            <p className="mt-2 text-xs">
              &copy; {new Date().getFullYear()} LCube AB. All rights reserved.
            </p>
            <p className="text-xs text-gray-300">&copy; Emma Olsson</p>
          </div>
        </div>
      </div>
    </footer>
  );

}