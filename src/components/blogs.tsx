'use client'
import { useEffect, useRef, useState } from "react";
import { FaMedium } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

interface MediumPost {
    id: string;
    title: string;
    description: string;
    link: string;
    pubDate: string | null;
}

const MediumPosts = () => {
    const [posts, setPosts] = useState<MediumPost[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const POSTS_PER_PAGE = 3;

    useEffect(() => {
        // Set initial page based on viewport width
        const initialPage = window.innerWidth >= 1024 ? 2 : 1; // >= 1024px = "PC view" (Tailwind lg)
        setPage(initialPage);

        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/medium');
                if (!response.ok) throw new Error('Failed to fetch Medium posts');

                const data: MediumPost[] = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching Medium posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
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

    const visiblePosts = posts.slice(0, page * POSTS_PER_PAGE);
    const hasMore = visiblePosts.length < posts.length;

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '';

        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return '';

        return d.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <section id="blogs" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                    <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
                        Writing
                    </h2>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Blogs & random thoughts.
                    </h3>
                </div>
                <a
                    href="https://medium.com/@ppriyankuu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-zinc-400 hover:text-white inline-flex items-center gap-1 group transition-colors self-start sm:self-auto"
                >
                    <span>Read all on Medium</span>
                    <HiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading && posts.length === 0 ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-zinc-950/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 animate-pulse space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-16 bg-zinc-800 rounded"></div>
                                <div className="h-3 w-20 bg-zinc-800/60 rounded"></div>
                            </div>
                            <div className="h-5 w-4/5 bg-zinc-800 rounded"></div>
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-zinc-800/60 rounded"></div>
                                <div className="h-3 w-3/4 bg-zinc-800/60 rounded"></div>
                            </div>
                            <div className="h-4 w-20 bg-zinc-800/80 rounded pt-2"></div>
                        </div>
                    ))
                ) : visiblePosts.length > 0 ? (
                    visiblePosts.map((post) => (
                        <a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-zinc-950/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:bg-zinc-900/40"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-1.5 text-zinc-400">
                                        <FaMedium className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">Medium</span>
                                    </div>
                                    {post.pubDate && (
                                        <span className="text-xs text-zinc-500">
                                            {formatDate(post.pubDate)}
                                        </span>
                                    )}
                                </div>

                                <h4 className="text-base font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2 leading-snug">
                                    {post.title}
                                </h4>

                                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-6">
                                    {post.description || 'No description available'}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-zinc-800/50 flex items-center justify-between text-xs font-medium text-zinc-400 group-hover:text-zinc-200">
                                <span>Read article</span>
                                <HiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-indigo-400" />
                            </div>
                        </a>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                        {loading ? 'Loading posts...' : 'No posts found.'}
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
                        aria-label="Load more posts"
                        className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-200 disabled:opacity-50 shadow-sm"
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                )}
                {page > 1 && (
                    <button
                        onClick={handleLoadLess}
                        aria-label="Load fewer posts"
                        className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition-all duration-200 shadow-sm"
                    >
                        Show Less
                    </button>
                )}
            </div>

            {/* Extra posts note */}
            {posts.length === 10 && (
                <div className="text-center pt-2 text-zinc-400 text-xs sm:text-sm">
                    <p className="mb-3">
                        Showing recent posts from Medium feed.
                    </p>
                    <a
                        href="https://medium.com/@ppriyankuu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition"
                    >
                        <span>View All on Medium</span>
                        <HiArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            )}
        </section>
    );
};

export default MediumPosts;
