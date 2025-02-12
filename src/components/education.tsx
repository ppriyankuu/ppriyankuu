import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Education = () => {
    const educationDetails = [
        {
            title: 'Schooling',
            institution: 'Army Public School',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRW6wv3XbMavAlX4zVDaTq4tzOU_KWku7FSA&s',
            description: 'Completed my schooling at Army Public School.',
            url: 'https://en.wikipedia.org/wiki/Indian_Army_Public_Schools',
        },
        {
            title: "Bachelor's Degree",
            institution: 'Kaziranga University',
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.ambitionbox.com%2Fassets%2Fv2%2Fimages%2Frs%3Afit%3A1280%3A960%3Afalse%3Afalse%2FbG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL2themlyYW5nYS11bml2ZXJzaXR5LmpwZw.png&f=1&nofb=1&ipt=bd3dfe71fd083937c3eeb9c2733f7f6c1d2eec570ffa8a8c76628132ecd73aba&ipo=images',
            description: 'Pursued a degree in Computer Applications from Kaziranga University.',
            url: 'https://kzu.ac.in/',
        },
    ];

    return (
        <section id="education" className="bg-neutral-900 text-white p-6 rounded-xl mt-4 border-2 border-rose-400">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 font-lexend text-center">
                    Education.
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
                    {educationDetails.map((edu, index) => (
                        <Link
                            key={index}
                            href={edu.url} // Link to the respective website
                            target="_blank" // Open link in a new tab
                            rel="noopener noreferrer" // Security best practice for external links
                            className="border-2 border-indigo-400 rounded-xl p-6 flex-col flex items-center sm:items-start space-y-4 text-center sm:text-left bg-neutral-800 shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            <Image
                                src={edu.image}
                                alt={`${edu.title} at ${edu.institution}`}
                                width={144}
                                height={144}
                                className="rounded-full object-cover aspect-square border-4 border-yellow-500"
                            />

                            <div className="font-lexend">
                                <h3 className="text-lg sm:text-2xl font-bold">{edu.title}</h3>
                                <p className="text-base text-gray-300">{edu.institution}</p>
                                <p className="text-sm mt-2 font-geist-italic">{edu.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <h3 className="text-center text-sm font-lexend sm:text-base md:text-lg mt-6">
                    <span className="font-geist-italic">Never failed a test I didn&apos;t take.</span> 🧠📚
                </h3>
            </div>
        </section>
    );
};

export default Education;