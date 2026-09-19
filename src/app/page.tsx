import Header from '@/components/header';
import Skills from '@/components/skills';
import Repos from '@/components/repos';
import SocialLinks from '@/components/social-links';
import Intro from '@/components/intro';
import Education from '@/components/education';
import Blogs from '@/components/blogs';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans relative selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Subtle top ambient glow */}
      <div className="pointer-events-none fixed inset-0 flex justify-center z-0 overflow-hidden">
        <div className="h-[420px] w-[700px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl -top-32 relative"></div>
      </div>

      <Header />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 space-y-20 sm:space-y-28">
        <Intro />
        <Skills />
        <Repos />
        <Blogs />
        <Education />
        <SocialLinks />
      </main>
    </div>
  );
};

export default Home;
