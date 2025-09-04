export default function DevelopmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-20">
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
                icon: '🌐',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Mobile Apps',
                description: 'Native and cross-platform mobile applications for iOS and Android.',
                icon: '📱',
                color: 'from-green-500 to-emerald-500'
              },
              {
                title: 'API Development',
                description: 'RESTful and GraphQL APIs designed for performance and scalability.',
                icon: '🔌',
                color: 'from-purple-500 to-indigo-500'
              },
              {
                title: 'Cloud Solutions',
                description: 'Scalable cloud infrastructure and deployment solutions.',
                icon: '☁️',
                color: 'from-orange-500 to-red-500'
              },
              {
                title: 'Database Design',
                description: 'Optimized database architecture for performance and data integrity.',
                icon: '🗄️',
                color: 'from-teal-500 to-cyan-500'
              },
              {
                title: 'DevOps & CI/CD',
                description: 'Automated deployment pipelines and infrastructure management.',
                icon: '⚙️',
                color: 'from-gray-600 to-gray-800'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <div className="p-6">
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
                      <div key={techIndex} className="bg-gray-100 rounded-lg py-2 px-3">
                        <span className="text-sm font-medium text-gray-700">{tech}</span>
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
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
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