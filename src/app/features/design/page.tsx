export default function DesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
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
                icon: '🎨',
                color: 'from-pink-500 to-rose-500'
              },
              {
                title: 'Brand Identity',
                description: 'Developing cohesive brand identities that resonate with your target audience.',
                icon: '🏷️',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Web Design',
                description: 'Designing responsive, modern websites that perform across all devices.',
                icon: '💻',
                color: 'from-green-500 to-teal-500'
              },
              {
                title: 'Mobile Design',
                description: 'Crafting mobile-first designs optimized for touch interactions and small screens.',
                icon: '📱',
                color: 'from-purple-500 to-violet-500'
              },
              {
                title: 'Design Systems',
                description: 'Building scalable design systems that ensure consistency across products.',
                icon: '🔧',
                color: 'from-orange-500 to-red-500'
              },
              {
                title: 'Prototyping',
                description: 'Creating interactive prototypes to validate design concepts before development.',
                icon: '⚡',
                color: 'from-indigo-500 to-purple-500'
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
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                  <div className="text-lg font-semibold text-gray-900">{tool}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}