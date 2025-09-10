import { Palette, Tag, Monitor, Smartphone, Wrench, Zap } from 'lucide-react';
import Image from 'next/image';

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Design Excellence</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Crafting beautiful, user-centered designs that elevate user experiences and drive engagement
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Design Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'UI/UX Design',
                description: 'Creating intuitive and visually appealing user interfaces that enhance user satisfaction.',
                icon: Palette,
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/20 to-accent/10'
              },
              {
                title: 'Brand Identity',
                description: 'Developing cohesive brand identities that resonate with your target audience.',
                icon: Tag,
                image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=200&fit=crop&crop=center',
                color: 'from-secondary/20 to-secondary/10'
              },
              {
                title: 'Web Design',
                description: 'Designing responsive, modern websites that perform across all devices.',
                icon: Monitor,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/15 to-accent/5'
              },
              {
                title: 'Mobile Design',
                description: 'Crafting mobile-first designs optimized for touch interactions and small screens.',
                icon: Smartphone,
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center',
                color: 'from-secondary/15 to-secondary/5'
              },
              {
                title: 'Design Systems',
                description: 'Building scalable design systems that ensure consistency across products.',
                icon: Wrench,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/10 to-accent/5'
              },
              {
                title: 'Prototyping',
                description: 'Creating interactive prototypes to validate design concepts before development.',
                icon: Zap,
                image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=center',
                color: 'from-secondary/10 to-secondary/5'
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} to-transparent`}></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Design Process */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Design Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Research', description: 'Understanding user needs and business goals' },
                { step: '02', title: 'Ideation', description: 'Brainstorming creative solutions and concepts' },
                { step: '03', title: 'Design', description: 'Creating wireframes, mockups, and prototypes' },
                { step: '04', title: 'Testing', description: 'Validating designs with real users' }
              ].map((process, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{process.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600 text-sm">{process.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Design Tools & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer',
                'Photoshop', 'Illustrator', 'After Effects', 'Cinema 4D', 'Blender', 'Miro'
              ].map((tool, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-secondary/10 transition-colors group">
                  <div className="text-lg font-semibold text-gray-900 group-hover:text-secondary transition-colors">{tool}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}