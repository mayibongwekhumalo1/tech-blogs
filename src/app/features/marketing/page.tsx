import { Search, FileText, Share2, Target, Mail, BarChart3 } from 'lucide-react';
import Image from 'next/image';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary to-red-700 text-white py-20">
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
                icon: Search,
                image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/20 to-accent/10'
              },
              {
                title: 'Content Marketing',
                description: 'Create compelling content that engages audiences and builds authority.',
                icon: FileText,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&crop=center',
                color: 'from-secondary/20 to-secondary/10'
              },
              {
                title: 'Social Media',
                description: 'Build brand presence and engage with audiences across social platforms.',
                icon: Share2,
                image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/15 to-accent/5'
              },
              {
                title: 'PPC Advertising',
                description: 'Targeted pay-per-click campaigns that deliver immediate results.',
                icon: Target,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center',
                color: 'from-secondary/15 to-secondary/5'
              },
              {
                title: 'Email Marketing',
                description: 'Personalized email campaigns that nurture leads and drive conversions.',
                icon: Mail,
                image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=400&h=200&fit=crop&crop=center',
                color: 'from-accent/10 to-accent/5'
              },
              {
                title: 'Analytics & Reporting',
                description: 'Data-driven insights and comprehensive performance reporting.',
                icon: BarChart3,
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center',
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
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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