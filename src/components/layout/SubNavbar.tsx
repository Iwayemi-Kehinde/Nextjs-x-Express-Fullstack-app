// "use client"
// import { useRef, useState, useEffect } from "react";

// const SubNavbar = () => {
//   const categories = [
//     "All",
//     "Electronics",
//     "Fashion",
//     "Home & Kitchen",
//     "Beauty",
//     "Sports",
//     "Toys",
//     "Automotive",
//     "Books",
//     "Health",
//     "Groceries",
//     "Office Supplies",
//     "Pet Supplies",
//   ];

//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(false);

//   // Check scroll position dynamically
//   const checkScroll = () => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const { scrollLeft, scrollWidth, clientWidth } = container;
//     setShowLeft(scrollLeft > 10);
//     setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
//   };

//   useEffect(() => {
//     checkScroll();
//     const container = scrollRef.current;
//     if (container) {
//       container.addEventListener("scroll", checkScroll);
//     }
//     window.addEventListener("resize", checkScroll);

//     return () => {
//       container?.removeEventListener("scroll", checkScroll);
//       window.removeEventListener("resize", checkScroll);
//     };
//   }, []);

//   return (
//     <div className="relative w-full border-t border-gray-200 bg-white">
//       {/* Left Arrow */}
//       {showLeft && (
//         <button
//           onClick={() =>
//             scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })
//           }
//           className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1.5 hover:bg-blue-50 z-10 transition"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-600"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </button>
//       )}

//       {/* Scrollable Categories */}
//       <div
//         ref={scrollRef}
//         className="flex space-x-3 px-10 py-3 text-sm text-gray-700 whitespace-nowrap overflow-x-auto scroll-smooth no-scrollbar"
//       >
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             className="px-4 py-1.5 border border-blue-400 text-blue-600 bg-blue-50/40 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       {showRight && (
//         <button
//           onClick={() =>
//             scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })
//           }
//           className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1.5 hover:bg-blue-50 z-10 transition"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-600"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };

// export default SubNavbar;
