import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Projects Completed', value: '50+', icon: Code },
    { label: 'Years Experience', value: '3+', icon: Globe },
    { label: 'Technologies', value: '20+', icon: Database },
    { label: 'Happy Clients', value: '30+', icon: Smartphone },
  ];

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

  return (
    <section id="about" className="section py-20 bg-gray-800/50">
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
            className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4"
          >
            Get to know me
          </motion.span>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            I'm a passionate full-stack developer with a love for creating beautiful, functional, and user-centered digital experiences. With expertise in modern web technologies, I bring ideas to life through code.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold mb-6">Passionate Developer</h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I specialize in building modern web applications using cutting-edge technologies. 
                My journey in software development started with a curiosity about how things work, 
                and it has evolved into a passion for creating solutions that make a difference.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. I believe 
                in continuous learning and staying up-to-date with the latest industry trends.
              </p>
              
              <p>
                My goal is to write clean, efficient code that not only works well but is also 
                maintainable and scalable. I enjoy collaborating with teams and bringing creative 
                ideas to life through technology.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-4 pt-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <h4 className="font-semibold text-blue-400">Frontend</h4>
                <p className="text-sm text-gray-400">React, TypeScript, Tailwind CSS</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <h4 className="font-semibold text-purple-400">Backend</h4>
                <p className="text-sm text-gray-400">Node.js, Express, Python</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <h4 className="font-semibold text-green-400">Database</h4>
                <p className="text-sm text-gray-400">PostgreSQL, MongoDB, SQLite</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <h4 className="font-semibold text-pink-400">Tools</h4>
                <p className="text-sm text-gray-400">Git, Docker, AWS, Vercel</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="About"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
            </div>
            
            {/* Floating Card */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Currently available for projects</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4 group-hover:shadow-lg transition-shadow"
              >
                <stat.icon size={24} className="text-white" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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

export default About;