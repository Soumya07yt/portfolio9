import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal } from 'lucide-react';
import axios from 'axios';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/achievements');
        setAchievements(response.data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        // Fallback data
        setAchievements([
          {
            id: 1,
            title: 'Best Developer Award 2023',
            description: 'Recognized for outstanding contribution to the development team and delivering high-quality solutions.',
            date: '2023-12',
            category: 'Award',
          },
          {
            id: 2,
            title: 'Open Source Contributor',
            description: 'Contributed to multiple open-source projects with over 1000+ stars on GitHub.',
            date: '2023-08',
            category: 'Achievement',
          },
          {
            id: 3,
            title: 'Hackathon Winner',
            description: 'First place in the Annual Tech Hackathon for building an innovative AI-powered solution.',
            date: '2023-06',
            category: 'Competition',
          },
          {
            id: 4,
            title: 'Certified AWS Solutions Architect',
            description: 'Successfully obtained AWS Solutions Architect certification demonstrating cloud expertise.',
            date: '2023-03',
            category: 'Certification',
          },
        ]);
      }
    };

    fetchAchievements();
  }, []);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'award':
        return Trophy;
      case 'achievement':
        return Star;
      case 'competition':
        return Medal;
      case 'certification':
        return Award;
      default:
        return Award;
    }
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-yellow-500 to-orange-500',
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-teal-500',
    ];
    return gradients[index % gradients.length];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <section id="achievements" className="section py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium mb-4"
          >
            Recognition
          </motion.span>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Achievements & <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">Awards</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Milestones and recognitions that mark my journey in the world of technology and development.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {achievements.map((achievement, index) => {
            const IconComponent = getIcon(achievement.category);
            const gradient = getGradient(index);
            
            return (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent size={24} className="text-white" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-3 py-1 bg-gradient-to-r ${gradient} bg-opacity-20 border border-current rounded-full text-xs font-medium`}>
                        {achievement.category}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatDate(achievement.date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {achievement.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <IconComponent size={48} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Awards Won', value: '5+', icon: Trophy },
            { label: 'Certifications', value: '8+', icon: Award },
            { label: 'Open Source', value: '20+', icon: Star },
            { label: 'Recognition', value: '15+', icon: Medal },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${getGradient(index)} rounded-xl mb-4 group-hover:shadow-lg transition-shadow`}
              >
                <stat.icon size={24} className="text-white" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                className="text-3xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>
              
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;