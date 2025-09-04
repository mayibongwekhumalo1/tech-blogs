export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Digital Marketing</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Strategic marketing solutions that drive growth, engagement, and measurable results
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Marketing Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'SEO Optimization',
                description: 'Improve search rankings and drive organic traffic to your website.',
                icon: '🔍',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                title: 'Content Marketing',
                description: 'Create compelling content that engages audiences and builds authority.',
                icon: '📝',
                color: 'from-green-500 to-teal-500'
              },
              {
                title: 'Social Media',
                description: 'Build brand presence and engage with audiences across social platforms.',
                icon: '📱',
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'PPC Advertising',
                description: 'Targeted pay-per-click campaigns that deliver immediate results.',
                icon: '🎯',
                color: 'from-red-500 to-orange-500'
              },
              {
                title: 'Email Marketing',
                description: 'Personalized email campaigns that nurture leads and drive conversions.',
                icon: '📧',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                title: 'Analytics & Reporting',
                description: 'Data-driven insights and comprehensive performance reporting.',
                icon: '📊',
                color: 'from-yellow-500 to-orange-500'
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

          {/* Marketing Strategy */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Marketing Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Strategy', description: 'Develop comprehensive marketing strategies' },
                { step: '02', title: 'Implementation', description: 'Execute campaigns across multiple channels' },
                { step: '03', title: 'Optimization', description: 'Monitor performance and optimize for results' },
                { step: '04', title: 'Reporting', description: 'Provide detailed analytics and insights' }
              ].map((approach, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{approach.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{approach.title}</h3>
                  <p className="text-gray-600 text-sm">{approach.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Marketing Tools */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Marketing Tools & Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                'Google Analytics', 'Google Ads', 'Facebook Ads', 'Mailchimp', 'HubSpot', 'SEMrush',
                'Ahrefs', 'Canva', 'Hootsuite', 'Buffer', 'Moz', 'Hotjar'
              ].map((tool, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
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