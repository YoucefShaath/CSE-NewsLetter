import Image from "next/image";
import Post from "../post/post.jsx";
export default function DepartmentPage(props) {
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
  };
  const Posts = (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-5 md:gap-10 justify-center items-center mt-10 px-4 md:px-20">
      {Object.keys(PostsDetails).map((key) => (
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
    <div className="bg-dark-blue w-full pt-10 px-4 md:px-10 h-auto space-y-10 overflow-x-hidden">
      <div className="flex items-center flex-wrap justify-center md:justify-start">
        <Image src={props.departmentImage} alt="Dev" height={60} width={60} />
        <span className="ml-4 text-white text-3xl md:text-4xl font-semibold text-center">
          {props.departmentName}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 md:gap-20">
        {Posts}
        <button className="group text-white flex items-center text-lg border border-white px-12 py-2 rounded-full cursor-pointer hover:bg-white hover:text-dark-blue hover:px-16 transition-all duration-300">
          Explore More
          <span className="ml-4 flex items-center transition-all duration-300 w-[15px] opacity-100 group-hover:w-0 group-hover:ml-0 group-hover:opacity-0 overflow-hidden">
            <Image
              src="/leftdownarrow.svg"
              alt="arrow"
              width={15}
              height={15}
              className="min-w-[15px]"
            />
          </span>
        </button>
      </div>
      <div>
        <div className="text-white font-medium mb-6 text-center flex flex-col md:flex-row gap-2 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-lg text-black bg-white text-md w-full md:w-52 max-w-[300px]"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer w-full md:w-auto max-w-[300px]">
            Sign Up
          </button>
        </div>
        <div className="border border-gray-500"></div>
        <div className="flex gap-4 justify-center mt-4 mb-4">
          <a href="https://www.instagram.com/cse.club/" target="_blank">
            <Image
              src="/instagramwhite.svg"
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
              src="/facebookwhite.svg"
              alt="Facebook"
              width={30}
              height={30}
              className="hover:scale-110"
            />
          </a>
          <a href="https://x.com/CSESI_Club" target="_blank">
            <Image
              src="/xwhite.svg"
              alt="Twitter"
              width={30}
              height={30}
              className="hover:scale-110"
            />
          </a>
          <a href="https://www.linkedin.com/company/cse-club/" target="_blank">
            <Image
              src="/linkedinwhite.svg"
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
              src="/youtubewhite.svg"
              alt="YouTube"
              width={30}
              height={30}
              className="hover:scale-110"
            />
          </a>
        </div>
        <p className="text-gray-400 pb-2 flex justify-center text-[11px] font-light">
          Copyright &copy; <span>{new Date().getFullYear()}</span>&nbsp;Club
          Scientifique de l'ESI. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
