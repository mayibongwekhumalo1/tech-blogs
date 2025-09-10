import { Globe, Smartphone, Plug, Cloud, Database, Settings } from 'lucide-react';
import Image from 'next/image';

export default function DevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-white to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary to-teal-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Development Services</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Building robust, scalable, and high-performance applications with modern technologies
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Development Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Web Development',
                description: 'Full-stack web applications built with modern frameworks and best practices.',
                icon: Globe,
                image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/20 to-accent/10'
              },
              {
                title: 'Mobile Apps',
                description: 'Native and cross-platform mobile applications for iOS and Android.',
                icon: Smartphone,
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center',
                color: 'from-secondary/20 to-secondary/10'
              },
              {
                title: 'API Development',
                description: 'RESTful and GraphQL APIs designed for performance and scalability.',
                icon: Plug,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/15 to-accent/5'
              },
              {
                title: 'Cloud Solutions',
                description: 'Scalable cloud infrastructure and deployment solutions.',
                icon: Cloud,
                image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=200&fit=crop&crop=center',
                color: 'from-secondary/15 to-secondary/5'
              },
              {
                title: 'Database Design',
                description: 'Optimized database architecture for performance and data integrity.',
                icon: Database,
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/10 to-accent/5'
              },
              {
                title: 'DevOps & CI/CD',
                description: 'Automated deployment pipelines and infrastructure management.',
                icon: Settings,
                image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=200&fit=crop&crop=center',
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

          {/* Tech Stack */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { category: 'Frontend', technologies: ['React', 'Next.js', 'Vue.js', 'Angular'] },
                { category: 'Backend', technologies: ['Node.js', 'Python', 'Go', 'Java'] },
                { category: 'Database', technologies: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL'] },
                { category: 'Cloud', technologies: ['AWS', 'Vercel', 'Netlify', 'Docker'] }
              ].map((stack, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{stack.category}</h3>
                  <div className="space-y-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="bg-secondary/10 hover:bg-accent/20 rounded-lg py-2 px-3 transition-colors">
                        <span className="text-sm font-medium text-gray-700 hover:text-secondary">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Process */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Development Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Planning', description: 'Requirements analysis and project planning' },
                { step: '02', title: 'Development', description: 'Agile development with regular iterations' },
                { step: '03', title: 'Testing', description: 'Comprehensive testing and quality assurance' },
                { step: '04', title: 'Deployment', description: 'Smooth deployment and maintenance' }
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
        </div>
      </div>
    </div>
  );
}