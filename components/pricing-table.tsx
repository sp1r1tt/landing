import { Check } from "lucide-react"

const plans = [
  {
    name: "STARTER",
    description: "MP3 + WAV",
    price: "39.00",
    features: [
      "Untagged MP3",
      "Untagged WAV",
      "Tracked-Out Stems",
      "Upload To Streaming Services",
      "Limited to 50,000 Streams",
      "Upload To Social Media",
      "1 Music Video",
      "Paid Performances",
      "YouTube Monetization",
      "Radio Airplay",
    ],
  },
  {
    name: "UNLIMITED",
    description: "MP3 + WAV Unlimited",
    price: "79.00",
    features: [
      "Untagged MP3",
      "Untagged WAV",
      "Tracked-Out Stems",
      "Upload To Streaming Services",
      "Unlimited Streams",
      "Upload To Social Media",
      "Unlimited Music Videos",
      "Paid Performances",
      "YouTube Monetization",
      "Radio Airplay",
    ],
  },
  {
    name: "UNLIMITED PRO",
    description: "MP3, WAV + Track Stems Unlimited",
    price: "149.00",
    features: [
      "Untagged MP3",
      "Untagged WAV",
      "Tracked-Out Stems",
      "Upload To Streaming Services",
      "Unlimited Streams",
      "Upload To Social Media",
      "Unlimited Music Videos",
      "Paid Performances",
      "YouTube Monetization",
      "Unlimited Radio Airplay",
    ],
  },
]

export default function PricingTable() {
  return (
    <section className="py-20 bg-secondary" id="pricing">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col p-6 bg-black rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold mb-6">
                <span className="text-sm align-top">$</span>
                {plan.price}
              </div>
              <ul className="flex-1 space-y-4 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

