import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Skills = () => {
    const { vibe } = useTheme();
    const features = [
        {
            category: "Firmware & Embedded",
            skills: ["C/C++", "Arduino", "Espressif (ESP32)", "Raspberry Pi", "ROS", "Robotics"]
        },
        {
            category: "Hardware Design",
            skills: ["PCB Design", "Circuit Design", "Analog Logic", "2D Laser Cutting", "3D Design (AutoCAD/ThinkerCAD)"]
        },
        {
            category: "Software Integration",
            skills: ["Python", "Java/Kotlin", "React", "React Native", "Machine Learning (YOLOv8)", "TensorFlow/PyTorch"]
        }
    ];

    return (
        <section id="skills" className="py-20 container mx-auto px-6">
            <div className="flex items-center mb-12">
                <span className={`font-mono text-theme-accent text-xl mr-4`}>03.</span>
                <h2 className="text-2xl font-bold text-silver font-mono whitespace-nowrap">Technical Arsenal</h2>
                <div className={`h-[1px] bg-navy-deep/50 w-full ml-6 bg-gradient-to-r from-theme-accent/30 to-transparent`}></div>
            </div>

            <div className="flex justify-center">
                {/* Terminal Window Design */}
                <div className="w-full max-w-4xl bg-navy-deep border border-slate-700 rounded-lg shadow-2xl overflow-hidden font-mono text-sm">
                    {/* Terminal Header */}
                    <div className="bg-slate-800/50 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="ml-4 text-slate-400 text-xs">elmerio@workstation:~/skills</div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 md:p-10 space-y-6">
                        <div className="text-silver">
                            <span className="text-green-400">➜</span> <span className={`text-theme-accent`}>~</span> cat skills.json
                        </div>

                        <div className="text-yellow-100">
                            {'{'}
                        </div>

                        {features.map((feature, index) => (
                            <div key={index} className="ml-4 md:ml-8">
                                <span className={`text-theme-accent`}>"{feature.category}"</span>: [
                                <div className="ml-4 md:ml-8 flex flex-wrap gap-2">
                                    {feature.skills.map((skill, i) => (
                                        <span key={i} className="text-green-300">
                                            "{skill}"{i < feature.skills.length - 1 ? "," : ""}
                                        </span>
                                    ))}
                                </div>
                                ],
                            </div>
                        ))}

                        <div className="text-yellow-100">
                            {'}'}
                        </div>

                        <div className="text-silver animate-pulse">
                            <span className="text-green-400">➜</span> <span className={`text-theme-accent`}>~</span> <span className="inline-block w-2 h-4 bg-slate-400 align-middle ml-1"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
