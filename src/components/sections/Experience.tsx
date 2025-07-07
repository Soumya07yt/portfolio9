import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';
import axios from 'axios';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  current: boolean;
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/experience');
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experience:', error);
        // Fallback data
        setExperiences([
          {
            id: 1,
            title: 'Senior Full Stack Developer',
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            start_date: '2022-01',
            end_date: '',
            description: 'Led development of scalable web applications using React, Node.js, and PostgreSQL. Mentored junior developers and implemented CI/CD pipelines.',
            current: true,
          },
          {
            id: 2,
            title: 'Frontend Developer',
            company: 'Digital Agency',
            location: 'New York, NY',
            start_date: '2020-06',
            end_date: '2021-12',
            description: 'Developed responsive web applications and collaborated with design teams to create pixel-perfect user interfaces using React and TypeScript.',
            current: false,
          },
          {
            id: 3,
            title: 'Junior Web Developer',
            company: 'StartupXYZ',
            location: 'Austin, TX',
            start_date: '2019-03',
            end_date: '2020-05',
            description: 'Built and maintained company website and internal tools. Gained experience in full-stack development and agile methodologies.',
            current: false,
          },
        ]);
      }
    };

    fetchExperience();
  }, []);

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="section py-20">
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
            className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-4"
          >
            My Journey
          </motion.span>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Work <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Experience</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            My professional journey and the experiences that have shaped my career in software development.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-red-500 hidden md:block"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-gray-900 hidden md:block"></div>

                <div className="md:ml-20">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {experience.title}
                        </h3>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-400">
                          <div className="flex items-center">
                            <Building size={16} className="mr-2 text-orange-400" />
                            <span className="font-medium">{experience.company}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2 text-orange-400" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center mt-4 md:mt-0">
                        <Calendar size={16} className="mr-2 text-orange-400" />
                        <span className="text-gray-400 font-medium">
                          {formatDate(experience.start_date)} - {experience.current ? 'Present' : formatDate(experience.end_date)}
                        </span>
                        {experience.current && (
                          <span className="ml-3 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      {experience.description}
                    </p>

                    {/* Skills/Technologies used in this role could be added here */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {/* Example skills - you could add this to your database schema */}
                      {index === 0 && ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-full text-xs font-medium text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {index === 1 && ['React', 'TypeScript', 'Sass', 'Figma'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-full text-xs font-medium text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {index === 2 && ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-full text-xs font-medium text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="pointer"
          >
            <Calendar className="mr-2" size={20} />
            Download Full Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;