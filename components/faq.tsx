"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Are the beats still tagged when I purchase a license?",
    answer: "No, once you purchase a license, you'll receive untagged versions of the beats.",
  },
  {
    question: "Will I own the beat once I purchase it from your store?",
    answer:
      "You'll receive a non-exclusive license to use the beat according to the terms of your chosen license package.",
  },
  {
    question: "Which payment methods do you accept?",
    answer: "We accept PayPal and all major credit cards for secure payments.",
  },
  {
    question: "Can I download the files directly after I make the payment?",
    answer: "Yes, you'll receive instant access to download your files after payment confirmation.",
  },
  {
    question: "I'm looking for a beat but I can't find it in your Beat Store?",
    answer: "Contact us and we'll help you find the beat you're looking for or create a custom one.",
  },
  {
    question: "How do I purchase beats?",
    answer:
      "Simply browse our store, add beats to cart, and proceed to checkout. You'll receive download links instantly.",
  },
  {
    question: "What are track-outs/stems?",
    answer:
      "Track-outs/stems are individual elements of the beat (drums, melody, etc.) provided separately for mixing flexibility.",
  },
  {
    question: "What leasing option is best for me?",
    answer:
      "Choose based on your distribution needs. Starter for beginners, Unlimited for growing artists, Pro for serious projects.",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 bg-secondary" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

