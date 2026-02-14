'use client';
import { useEffect, useState, useRef } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  updated_at: string;
  topics?: string[];
}

interface StarredRepo {
  name: string;
  owner: { login: string };
}

const SECONDARY_PICKS: string[] = [
  "terwmser",
  "godkv",
  "refacto",
  "vault",
  "easymod",
  "container-playground",
  "stocky",
  "system-monitor",
  "chat-ws-server",
  "secret-speak",
  "ppriyankuu",
  "db-replication",
  "file-share-backend",
  "seiban",
  "file-upload-api",
  "3d-renderer",
];
const TO_BE_HIDDEN_REPOS: string[] = [
  "cms",
  "IBM-repo",
  "doc",
  "goofinAround",
];

const Repos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const sortRepos = (list: Repo[], favoriteNames: string[]) => {
    const favoriteSet = new Set(favoriteNames);

    const orderMap: Record<string, number> = {};
    SECONDARY_PICKS.forEach((name, idx) => {
      orderMap[name] = idx;
    });

    return [...list]
      .filter((repo) => !TO_BE_HIDDEN_REPOS.includes(repo.name))
      .sort((a, b) => {
        const aFav = favoriteSet.has(a.name);
        const bFav = favoriteSet.has(b.name);

        // 1) starred repos first
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;

        // 2) both starred → homepage first
        if (aFav && bFav) {
          const aHasSite = !!a.homepage?.trim();
          const bHasSite = !!b.homepage?.trim();

          if (aHasSite && !bHasSite) return -1;
          if (!aHasSite && bHasSite) return 1;
        }

        // 3) non-starred → secondary picks ordering
        if (!aFav && !bFav) {
          const aOrder = orderMap[a.name] ?? Number.MAX_SAFE_INTEGER;
          const bOrder = orderMap[b.name] ?? Number.MAX_SAFE_INTEGER;

          if (aOrder !== bOrder) return aOrder - bOrder;
        }

        // 4) fallback: alphabetical
        return a.name.localeCompare(b.name);
      });
  };

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const [reposRes, starredRes] = await Promise.all([
          fetch(`https://api.github.com/users/ppriyankuu/repos?per_page=100`, {
            headers: {
              Accept: "application/vnd.github.mercy-preview+json",
            }
          }),
          fetch(`https://api.github.com/users/ppriyankuu/starred?per_page=100`),
        ]);

        if (!reposRes.ok || !starredRes.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const reposData: Repo[] = await reposRes.json();
        const starredData: StarredRepo[] = await starredRes.json();

        const favoriteNames = starredData
          .filter((repo) => repo.owner?.login === "ppriyankuu")
          .map((repo) => repo.name);

        setRepos(sortRepos(reposData, favoriteNames));
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleLoadLess = () => {
    setPage((prev) => Math.max(1, prev - 1));

    requestAnimationFrame(() => {
      if (buttonsRef.current) {
        const buttonsRect = buttonsRef.current.getBoundingClientRect();
        const offsetTop = buttonsRect.top + window.scrollY;
        const viewportHeight = window.innerHeight;

        const scrollToPosition = Math.max(
          0,
          offsetTop - viewportHeight + buttonsRect.height + 100
        );

        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth',
        });
      }
    });
  };

  const visibleRepos = repos.slice(0, page * 6);
  const hasMore = visibleRepos.length < repos.length;

  const formatDate = (isoDate: string | null | undefined) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

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
            visibleRepos.map((repo) => (
              <div
                key={repo.id}
                className={`bg-neutral-800 border-2 border-indigo-400 rounded-2xl p-4 md:p-6 flex flex-col h-full relative min-h-[120px]`}
              >
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    {repo.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 mb-2">
                    Updated {formatDate(repo.updated_at)}
                  </p>
                  <p className="text-sm md:text-base line-clamp-3 mb-4">
                    {repo.description || 'No description available'}
                  </p>
                </div>

                {repo.topics && repo.topics.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-0 mb-12 cursor-default select-none">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 text-xs md:text-sm border-[1.9px] border-gray-500 rounded-full text-indigo-300 mouse-"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className='h-9'></div>
                )}

                <div className="absolute bottom-5 left-4 right-4 flex gap-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-700 text-white px-4 py-2 rounded-full hover:bg-indigo-800 text-sm md:text-base"
                  >
                    View Repo
                  </a>

                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-800 text-sm md:text-base"
                    >
                      Visit Site
                    </a>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              {loading ? 'Loading repos...' : 'No repositories found.'}
            </div>
          )}
        </div>
        <div
          ref={buttonsRef}
          className="flex flex-col md:flex-row gap-4 justify-center mt-8"
        >
          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              aria-label="Load more repositories"
              className="border-2 text-white px-6 py-3 rounded-full hover:bg-white hover:border-black hover:text-black disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
          {page > 1 && (
            <button
              onClick={handleLoadLess}
              aria-label="Load fewer repositories"
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
