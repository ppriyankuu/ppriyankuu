import Header from '@/components/header';
import Skills from '@/components/skills';
import Repos from '@/components/repos';
import SocialLinks from '@/components/social-links';
import Intro from '@/components/intro';
import Education from '@/components/education';
import Blogs from '@/components/blogs';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-lexend xl:px-8">
      <Header />
      <main className="container mx-auto py-12 px-4 md:px-0">
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
