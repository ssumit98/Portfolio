import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const Timeline = ({ experience, education }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 1000,
    });

    if (experience && education) {
      const experienceData = experience.map(item => ({
        ...item,
        type: 'experience',
        mainTitle: item.title,
        subTitle: item.company,
      }));
      const educationData = education.map(item => ({
        ...item,
        type: 'education',
        mainTitle: item.degree,
        subTitle: item.institution,
      }));

      const combinedData = [...experienceData, ...educationData].sort((a, b) => {
        const aYear = parseInt(a.period.split(' - ')[1] === 'Present' ? new Date().getFullYear() : a.period.split(' - ')[1]);
        const bYear = parseInt(b.period.split(' - ')[1] === 'Present' ? new Date().getFullYear() : b.period.split(' - ')[1]);
        return bYear - aYear;
      });

      setTimelineData(combinedData);
    }
  }, [experience, education]);

  const Icon = ({ type }) => {
    if (type === 'experience') {
      return <Briefcase className="w-6 h-6 text-white" />;
    }
    return <GraduationCap className="w-6 h-6 text-white" />;
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%] py-20" id="timeline">
      <div className="text-center mb-12">
        <h2
          data-aos="fade-down"
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          My Journey
        </h2>
        <p data-aos="fade-up" className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          A timeline of my professional and educational milestones.
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#6366f1]/50 to-[#a855f7]/50 rounded-full"></div>
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`mb-8 flex justify-between items-center w-full ${
              index % 2 === 0 ? 'flex-row-reverse' : ''
            }`}
          >
            <div className="w-5/12"></div>
            <div className="z-10">
              <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#a855f7] flex items-center justify-center">
                <Icon type={item.type} />
              </div>
            </div>
            <div className="w-5/12">
              {activeIndex === index ? (
                <div
                  className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-6 transform transition-all duration-500 hover:shadow-[#6366f1]/20 hover:scale-105"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{item.mainTitle}</h3>
                  <p className="text-indigo-400 font-semibold mb-3">{item.subTitle}</p>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{item.period}</span>
                  </div>
                  {item.responsibilities && (
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      {item.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <button
                    onClick={() => handleToggle(index)}
                    className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-[#6366f1]/50 transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a855f7]"
                  >
                    {(() => {
                      const parts = item.period.split(' - ');
                      const startYear = parts[0].split(' ').pop();
                      const endYear = parts[1] === 'Present' ? 'Present' : parts[1].split(' ').pop();
                      return `${startYear} - ${endYear}`;
                    })()}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
