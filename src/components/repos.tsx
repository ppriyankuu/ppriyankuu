'use client'
import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

const Repos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchedPages, setFetchedPages] = useState<number[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/ppriyankuu/repos?page=${page}&per_page=6`
        );
        const data: Repo[] = await response.json();
        setRepos(prev => [...prev, ...data]);
        setFetchedPages(prev => [...prev, page]);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!fetchedPages.includes(page)) {
      fetchRepos();
    }
  }, [page, fetchedPages]);

  const handleLoadMore = () => setPage(prev => prev + 1);
  const handleLoadLess = () => setPage(prev => Math.max(1, prev - 1));

  const visibleRepos = repos.slice(0, page * 6);

  return (
    <section id="repos" className="bg-neutral-900 text-white p-4 md:p-8 lg:p-12 border-2 border-red-400 rounded-2xl my-4">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-lexend text-center mb-6 md:mb-8">
          GitHub Repositories.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleRepos.map((repo) => (
            <div key={repo.id} className="bg-neutral-800 border-2 border-indigo-400 rounded-2xl p-4 md:p-6 flex flex-col h-full relative min-h-[200px]">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {repo.name}
                </h3>
                <p className="text-sm md:text-base line-clamp-3 mb-12">
                  {repo.description || 'No description available'}
                </p>
              </div>
              
              <div className="absolute bottom-6 left-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-700 text-white px-4 py-2 rounded-full hover:bg-indigo-800 text-sm md:text-base"
                >
                  View Repo
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="border-2 text-white px-6 py-3 rounded-full hover:bg-white hover:border-black hover:text-black transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>

          {page > 1 && (
            <button
              onClick={handleLoadLess}
              className="border-2 text-white px-6 py-3 rounded-full hover:bg-white hover:border-black hover:text-black transition duration-300"
            >
              Load Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Repos;