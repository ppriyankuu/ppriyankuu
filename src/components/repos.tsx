'use client';
import { useEffect, useState, useRef } from 'react';

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

  // Create a ref for the buttons container
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://api.github.com/users/ppriyankuu/repos?page=${page}&per_page=6`
        );
        const data: Repo[] = await response.json();
        setRepos((prev) => [...prev, ...data]); // Append new repos to the existing list
        setFetchedPages((prev) => [...prev, page]); // Mark the page as fetched
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    // Fetch repos only if the current page hasn't been fetched yet
    if (!fetchedPages.includes(page)) {
      fetchRepos();
    }
  }, [page, fetchedPages]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleLoadLess = () => {
    setPage((prev) => Math.max(1, prev - 1));

    // Scroll to the buttons container smoothly after reducing the page
    setTimeout(() => {
      if (buttonsRef.current) {
        const buttonsRect = buttonsRef.current.getBoundingClientRect();
        const offsetTop = buttonsRect.top + window.scrollY; // Absolute position of the buttons
        const viewportHeight = window.innerHeight;

        // Calculate the scroll position so that the buttons are near the bottom of the screen
        const scrollToPosition = offsetTop - viewportHeight + buttonsRect.height + 100; // Add some padding

        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth',
        });
      }
    }, 100); // Small delay to ensure the DOM updates before scrolling
  };

  const visibleRepos = repos.slice(0, page * 6);

  return (
    <section
      id="repos"
      className="bg-neutral-900 text-white p-4 md:p-8 lg:p-12 border-2 border-red-400 rounded-2xl my-4 overflow-hidden"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-lexend text-center mb-6 md:mb-8">
          GitHub Repositories.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visibleRepos.length > 0 ? (
            visibleRepos.map((repo, index) => (
              <div
                key={repo.id}
                className={`bg-neutral-800 border-2 border-indigo-400 rounded-2xl p-4 md:p-6 flex flex-col h-full relative min-h-[200px]`}
              >
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
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No repositories found.
            </div>
          )}
        </div>
        {/* Buttons Container */}
        <div
          ref={buttonsRef} // Attach the ref here
          className="flex flex-col md:flex-row gap-4 justify-center mt-8"
        >
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="border-2 text-white px-6 py-3 rounded-full hover:bg-white hover:border-black hover:text-black disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
          {page > 1 && (
            <button
              onClick={handleLoadLess}
              className="border-2 text-white px-6 py-3 rounded-full hover:bg-white hover:border-black hover:text-black"
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