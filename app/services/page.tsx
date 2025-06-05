import { PageHeader } from "@/components/ui/page-header"
import { FeatureCard } from "@/components/ui/feature-card"
import { Code, Palette, Search, Smartphone, Globe, Zap } from "lucide-react"

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        description="Comprehensive web development solutions to help your business thrive online"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="w-6 h-6 text-blue-600" />}
              title="Custom Web Development"
              description="Tailored web applications built with React, Next.js, and modern technologies to meet your specific business requirements."
            />

            <FeatureCard
              icon={<Smartphone className="w-6 h-6 text-blue-600" />}
              title="Responsive Design"
              description="Mobile-first designs that provide optimal viewing experiences across all devices and screen sizes."
            />

            <FeatureCard
              icon={<Palette className="w-6 h-6 text-blue-600" />}
              title="UI/UX Design"
              description="Beautiful, intuitive interfaces designed to enhance user experience and drive conversions."
            />

            <FeatureCard
              icon={<Search className="w-6 h-6 text-blue-600" />}
              title="SEO Optimization"
              description="Search engine optimization to improve your website's visibility and organic traffic."
            />

            <FeatureCard
              icon={<Globe className="w-6 h-6 text-blue-600" />}
              title="E-commerce Solutions"
              description="Complete online store development with secure payment processing and inventory management."
            />

            <FeatureCard
              icon={<Zap className="w-6 h-6 text-blue-600" />}
              title="Performance Optimization"
              description="Speed optimization and performance tuning to ensure fast loading times and smooth user experiences."
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get in touch with us to discuss your requirements and receive a custom quote.
          </p>
        </div>
      </section>
    </>
  )
}
