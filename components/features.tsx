import { Download, FileCheck, Music, Shield } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Download className="w-6 h-6" />,
      title: "Instant Download",
      description: "Get your beats immediately after purchase",
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "High Quality Audio",
      description: "Professional grade audio files",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No Voice Tags",
      description: "Clean, untagged beats ready for use",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Signed Agreement",
      description: "Legal documentation included",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">All licenses include:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6">
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

