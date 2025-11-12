export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground section-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-sm flex items-center justify-center">
                <span className="text-primary font-bold text-sm">G</span>
              </div>
              <span className="font-bold">Grow Essence</span>
            </div>
            <p className="text-sm opacity-80">Premium, plant-powered serum for stronger, thicker, fuller hair.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/product" className="opacity-80 hover:opacity-100">
                  Overview
                </a>
              </li>
              <li>
                <a href="/product" className="opacity-80 hover:opacity-100">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#benefits" className="opacity-80 hover:opacity-100">
                  Benefits
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm opacity-80">Premium, plant-powered serum for stronger, thicker, fuller hair.</p>
        </div>
      </div>
    </footer>
  )
}
