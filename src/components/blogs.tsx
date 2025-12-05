'use client'
import { useEffect, useRef, useState } from "react";

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

    const handleScrollToSection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        targetId: string
    ) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth",
            });
        }
    };


    return (
        <section
            id="blogs"
            className="bg-neutral-900 text-white p-4 md:p-8 lg:p-12 border-2 border-red-400 rounded-2xl my-4 overflow-hidden"
        >
            <div className="container mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-lexend text-center mb-6 md:mb-8">
                    Medium Blogs.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {visiblePosts.length > 0 ? (
                        visiblePosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-neutral-800 border-2 border-indigo-400 rounded-2xl p-4 md:p-6 flex flex-col h-full relative min-h-[200px]"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    {post.pubDate && (
                                        <p className="text-xs md:text-sm text-gray-400 mb-2">
                                            {formatDate(post.pubDate)}
                                        </p>
                                    )}
                                    <p className="text-sm md:text-base line-clamp-3 mb-12">
                                        {post.description || 'No description available'}
                                    </p>
                                </div>
                                <div className="absolute bottom-6 left-4">
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-teal-700 text-white px-4 py-2 rounded-full hover:bg-indigo-800 text-sm md:text-base"
                                    >
                                        Read on Medium
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400">
                            {loading ? 'Loading posts...' : 'No posts found.'}
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
                            aria-label="Load more posts"
                            className="border-2 text-white px-6 py-3 rounded-full hover:bg-white hover:border-black hover:text-black disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    )}
                    {page > 1 && (
                        <button
                            onClick={handleLoadLess}
                            aria-label="Load fewer posts"
                            className="border-2 text-white px-6 py-3 rounded-full hover:bg-white hover:border-black hover:text-black"
                        >
                            Load Less
                        </button>
                    )}
                </div>

                {/* Extra posts note */}
                {posts.length === 10 && (
                    <div className="text-center mt-10 text-gray-300">
                        <p className="mb-4">
                            Only the latest 10 are shown here — but there are more.
                        </p>

                        <button
                            onClick={(e) => handleScrollToSection(e, "social")}
                            className="border-2 text-white px-6 py-3 rounded-full hover:bg-white hover:text-black hover:border-black transition"
                        >
                            View More on Medium
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default MediumPosts;
