"use client";
import Image from "next/image";
import Post from "../post/post.jsx";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

export default function DepartmentPage(props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [visibleCount, setVisibleCount] = useState(6);

  const PostsDetails = {
    post1: {
      image: "/hackitpic.png",
      title: "DataHack",
      description:
        "Join us for DataHack, an exciting hackathon where innovation meets data! Collaborate, create, and compete to build groundbreaking solutions using data-driven insights. Whether you're a coder, designer, or data enthusiast, DataHack is your platform to shine. Don't miss out on this opportunity to network, learn, and showcase your skills. Register now and be part of the data revolution!",
      likes: 25,
      comments: 8,
      author: "John Doe",
      authorImage: "/hackitpic.png",
      publishedDate: "2024-06-01",
      department: "Technology",
      userImage: "/hackitpic.png",
    },
    post2: {
      image: "/hackitpic.png",
      title: "DataHack",
      description:
        "Join us for DataHack, an exciting hackathon where innovation meets data! Collaborate, create, and compete to build groundbreaking solutions using data-driven insights. Whether you're a coder, designer, or data enthusiast, DataHack is your platform to shine. Don't miss out on this opportunity to network, learn, and showcase your skills. Register now and be part of the data revolution!",
      likes: 25,
      comments: 8,
      author: "John Doe",
      authorImage: "/hackitpic.png",
      publishedDate: "2024-06-01",
      department: "Technology",
      userImage: "/hackitpic.png",
    },
    post3: {
      image: "/hackitpic.png",
      title: "DataHack",
      description:
        "Join us for DataHack, an exciting hackathon where innovation meets data! Collaborate, create, and compete to build groundbreaking solutions using data-driven insights. Whether you're a coder, designer, or data enthusiast, DataHack is your platform to shine. Don't miss out on this opportunity to network, learn, and showcase your skills. Register now and be part of the data revolution!",
      likes: 25,
      comments: 8,
      author: "John Doe",
      authorImage: "/hackitpic.png",
      publishedDate: "2024-06-01",
      department: "Technology",
      userImage: "/hackitpic.png",
    },
    post4: {
      image: "/hackitpic.png",
      title: "DataHack",
      description:
        "Join us for DataHack, an exciting hackathon where innovation meets data! Collaborate, create, and compete to build groundbreaking solutions using data-driven insights. Whether you're a coder, designer, or data enthusiast, DataHack is your platform to shine. Don't miss out on this opportunity to network, learn, and showcase your skills. Register now and be part of the data revolution!",
      likes: 25,
      comments: 8,
      author: "John Doe",
      authorImage: "/hackitpic.png",
      publishedDate: "2024-06-01",
      department: "Technology",
      userImage: "/hackitpic.png",
    },
    post5: {
      image: "/hackitpic.png",
      title: "DataHack",
      description:
        "Join us for DataHack, an exciting hackathon where innovation meets data! Collaborate, create, and compete to build groundbreaking solutions using data-driven insights. Whether you're a coder, designer, or data enthusiast, DataHack is your platform to shine. Don't miss out on this opportunity to network, learn, and showcase your skills. Register now and be part of the data revolution!",
      likes: 25,
      comments: 8,
      author: "John Doe",
      authorImage: "/hackitpic.png",
      publishedDate: "2024-06-01",
      department: "Technology",
      userImage: "/hackitpic.png",
    },
    post6: {
      image: "/hackitpic.png",
      title: "DataHack",
      description:
        "Join us for DataHack, an exciting hackathon where innovation meets data! Collaborate, create, and compete to build groundbreaking solutions using data-driven insights. Whether you're a coder, designer, or data enthusiast, DataHack is your platform to shine. Don't miss out on this opportunity to network, learn, and showcase your skills. Register now and be part of the data revolution!",
      likes: 25,
      comments: 8,
      author: "John Doe",
      authorImage: "/hackitpic.png",
      publishedDate: "2024-06-01",
      department: "Technology",
      userImage: "/hackitpic.png",
    },
    post7: {
      image: "/hackitpic.png",
      title: "DataHack",
      description:
        "Join us for DataHack, an exciting hackathon where innovation meets data! Collaborate, create, and compete to build groundbreaking solutions using data-driven insights. Whether you're a coder, designer, or data enthusiast, DataHack is your platform to shine. Don't miss out on this opportunity to network, learn, and showcase your skills. Register now and be part of the data revolution!",
      likes: 25,
      comments: 8,
      author: "John Doe",
      authorImage: "/hackitpic.png",
      publishedDate: "2024-06-01",
      department: "Technology",
      userImage: "/hackitpic.png",
    },
  };
  const postKeys = Object.keys(PostsDetails);
  const visiblePosts = postKeys.slice(0, visibleCount);

  const handleExploreMore = () => {
    setVisibleCount(postKeys.length);
  };

  const Posts = (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-5 md:gap-10 justify-center items-center mt-10 px-4 md:px-20">
      {visiblePosts.map((key) => (
        <Post
          key={key}
          image={PostsDetails[key].image}
          title={PostsDetails[key].title}
          description={PostsDetails[key].description}
          likes={PostsDetails[key].likes}
          comments={PostsDetails[key].comments}
          author={PostsDetails[key].author}
          authorImage={PostsDetails[key].authorImage}
          publishedDate={PostsDetails[key].publishedDate}
          department={PostsDetails[key].department}
          userImage={PostsDetails[key].userImage}
        />
      ))}
    </div>
  );
  return (
    <div
      className={`w-full pt-20 px-4 md:px-10 h-auto space-y-10 overflow-x-hidden transition-colors duration-300 ${
        isDark ? "bg-dark-blue" : "bg-white"
      }`}
    >
      <div className="flex items-center flex-wrap justify-center md:justify-start">
        {props.departmentIcon ? (
          <div
            className={`text-5xl ${isDark ? "text-white" : "text-dark-blue"}`}
          >
            {props.departmentIcon}
          </div>
        ) : (
          <Image src={props.departmentImage} alt="Dev" height={60} width={60} />
        )}
        <span
          className={`ml-4 text-3xl md:text-4xl font-semibold text-center ${
            isDark ? "text-white" : "text-dark-blue"
          }`}
        >
          {props.departmentName}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 md:gap-20">
        {Posts}
        {postKeys.length > visibleCount && (
          <button
            onClick={handleExploreMore}
            className={`group flex items-center text-lg border px-12 py-2 rounded-full cursor-pointer transition-all duration-300 ${
              isDark
                ? "text-white border-white hover:bg-white hover:text-dark-blue hover:px-16"
                : "text-dark-blue border-dark-blue hover:bg-dark-blue hover:text-white hover:px-16"
            }`}
          >
            Explore More
            <span className="ml-4 flex items-center transition-all duration-300 w-[15px] opacity-100 group-hover:w-0 group-hover:ml-0 group-hover:opacity-0 overflow-hidden">
              <Image
                src="/leftdownarrow.svg"
                alt="arrow"
                width={15}
                height={15}
                className={`min-w-[15px] ${!isDark ? "invert" : ""}`}
              />
            </span>
          </button>
        )}
      </div>
      <div>
        <div
          className={`font-medium mb-6 text-center flex flex-col md:flex-row gap-2 justify-center items-center ${
            isDark ? "text-white" : "text-dark-blue"
          }`}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-lg text-md w-full md:w-52 max-w-[300px]
              text-black bg-white border border-dark-blue focus:outline-none focus:ring-2 focus:ring-dark-blue"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer w-full md:w-auto max-w-[300px]">
            Sign Up
          </button>
        </div>
        <div
          className={`border ${isDark ? "border-gray-500" : "border-gray-300"}`}
        ></div>
        <div className="flex gap-4 justify-center mt-4 mb-4">
          <a href="https://www.instagram.com/cse.club/" target="_blank">
            <Image
              src={isDark ? "/instagramwhite.svg" : "/instagram.svg"}
              alt="Instagram"
              width={30}
              height={30}
              className="hover:scale-110"
            />
          </a>
          <a
            href="https://www.facebook.com/club.scientifique.esi"
            target="_blank"
          >
            <Image
              src={isDark ? "/facebookwhite.svg" : "/facebook.svg"}
              alt="Facebook"
              width={30}
              height={30}
              className="hover:scale-110"
            />
          </a>
          <a href="https://x.com/CSESI_Club" target="_blank">
            <Image
              src={isDark ? "/xwhite.svg" : "/x.svg"}
              alt="Twitter"
              width={30}
              height={30}
              className="hover:scale-110"
            />
          </a>
          <a href="https://www.linkedin.com/company/cse-club/" target="_blank">
            <Image
              src={isDark ? "/linkedinwhite.svg" : "/linkedin.svg"}
              alt="LinkedIn"
              width={30}
              height={30}
              className="hover:scale-110"
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCHgeF6ELJW0Pt1vYoAomCig"
            target="_blank"
          >
            <Image
              src={isDark ? "/youtubewhite.svg" : "/youtube.svg"}
              alt="YouTube"
              width={30}
              height={30}
              className="hover:scale-110"
            />
          </a>
        </div>
        <p
          className={`pb-2 flex justify-center text-[11px] font-light ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Copyright &copy; <span>{new Date().getFullYear()}</span>&nbsp;Club
          Scientifique de l'ESI. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
