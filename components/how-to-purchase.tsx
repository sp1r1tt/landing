import { ShoppingCart, CreditCard, Download } from "lucide-react"

export default function HowToPurchase() {
  const steps = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-primary" />,
      title: "Select Your Beats",
      description: 'Browse the store, select the beat you\'d like and click "ADD"',
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary" />,
      title: "Securely Checkout",
      description: "Proceed to checkout and make payment via PayPal or Card",
    },
    {
      icon: <Download className="w-12 h-12 text-primary" />,
      title: "Download Your Beat",
      description: "Receive your beat & contract to your email inbox and download",
    },
  ]

  return (
    <section className="py-20 bg-black" id="how-to-purchase">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">HOW TO PURCHASE</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-secondary rounded-lg">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

