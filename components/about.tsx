import Image from 'next/image';

export default function About() {
  return (
    <section className="py-20 bg-black" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Image src="/placeholder.svg" height={60} width={200} alt="9AM Logo" className="mx-auto mb-8" />
          <p className="text-gray-300 mb-8">
            9AM is a German producer duo, composed of producer JLN and DJ/producer DJ Noize. JLN is producing Pop and
            R&amp;B music since 2003, while Noize is DJ&apos;ing Hip Hop music since 1999. Since 2013 they work together under
            the name 9AM.
          </p>
          <a
            href="#player"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full transition-colors"
          >
            Shop For Trap Beats
          </a>
        </div>
      </div>
    </section>
  )
}