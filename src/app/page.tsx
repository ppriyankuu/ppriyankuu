import Header from '@/components/header';
import Skills from '@/components/skills';
import Repos from '@/components/repos';
import SocialLinks from '@/components/social-links';
import Intro from '@/components/intro';
import Education from '@/components/education';

const Home = () => {
  return (
  <div className="min-h-screen bg-dark-bg text-white font-lexend">
      <Header />
      <main className="container mx-auto py-12 px-4 xl:px-8">
        <Intro />
        <Skills />
        <Repos />
        <Education />
        <SocialLinks />
      </main>
    </div>
  );
};

export default Home;
