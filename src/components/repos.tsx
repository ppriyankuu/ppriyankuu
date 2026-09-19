'use client';
import { useEffect, useState, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import { HiArrowUpRight, HiArrowTopRightOnSquare } from 'react-icons/hi2';

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
  "chunx",
  "d1rect",
  "codebits",
  "rent",
  "terwmser",
  "godkv",
  "refacto",
  "easymod",
  "container-playground",
  "stocky",
  "system-monitor",
  "secret-speak",
  "ppriyankuu",
  "vault",
  "seiban",
  "3d-renderer",
];
const TO_BE_HIDDEN_REPOS: string[] = [
  "cms",
  "db-replication",
  "file-share-backend",
  "IBM-repo",
  "file-upload-api",
  "doc",
  "goofinAround",
  "Recipe-social-app",
  "tiny.link",
  "chat-ws-server",
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
    <section id="repos" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
            Code & Projects
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Things I&apos;ve built.
          </h3>
        </div>
        <a
          href="https://github.com/ppriyankuu?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm text-zinc-400 hover:text-white inline-flex items-center gap-1 group transition-colors self-start sm:self-auto"
        >
          <span>View all on GitHub</span>
          <HiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading && repos.length === 0 ? (
          // Skeleton Loading States
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-950/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 animate-pulse space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800"></div>
                <div className="h-5 w-32 bg-zinc-800 rounded"></div>
              </div>
              <div className="h-3 w-24 bg-zinc-800/60 rounded"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-zinc-800/60 rounded"></div>
                <div className="h-3 w-4/5 bg-zinc-800/60 rounded"></div>
              </div>
              <div className="flex gap-2 pt-4">
                <div className="h-8 flex-1 bg-zinc-800/80 rounded-xl"></div>
                <div className="h-8 flex-1 bg-zinc-800/80 rounded-xl"></div>
              </div>
            </div>
          ))
        ) : visibleRepos.length > 0 ? (
          visibleRepos.map((repo) => (
            <div
              key={repo.id}
              className="group relative bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:bg-zinc-900/40"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors flex-shrink-0">
                      <FaGithub className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors truncate">
                      {repo.name}
                    </h4>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View code for ${repo.name}`}
                    title="GitHub repo"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors flex-shrink-0"
                  >
                    <HiArrowTopRightOnSquare className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-zinc-500 mb-3">
                  Updated {formatDate(repo.updated_at)}
                </p>

                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                  {repo.description || "No description provided."}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/50 mt-auto">
                {repo.topics && repo.topics.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 text-[11px] rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 font-mono"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-center gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    View Code
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 px-3 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-xs font-medium text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
            No repositories found.
          </div>
        )}
      </div>

      <div
        ref={buttonsRef}
        className="flex items-center justify-center gap-3 pt-4"
      >
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            aria-label="Load more repositories"
            className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-200 disabled:opacity-50 shadow-sm"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
        {page > 1 && (
          <button
            onClick={handleLoadLess}
            aria-label="Load fewer repositories"
            className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-200 shadow-sm"
          >
            Show Less
          </button>
        )}
      </div>
    </section>
  );
};

export default Repos;
