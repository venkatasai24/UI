const About = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 lg:p-8 min-h-screen">
      <h1 className="text-2xl lg:text-3xl font-bold my-2">About Us</h1>
      <p className="text-lg lg:text-xl my-2">
        Welcome to our platform, where individuals can explore and share their
        experiences from various company roles across different colleges,
        universities, and branches. Our mission is to provide a comprehensive
        repository of real-world experiences to help students, professionals,
        and career-switchers make informed decisions about their career paths.
      </p>

      <hr className="my-4 border-white" />

      <h2 className="text-xl lg:text-2xl font-bold my-2">What We Offer</h2>
      <p className="text-lg lg:text-xl my-2">
        Our website offers a diverse range of experiences shared by users from
        all walks of life. Whether you're interested in software engineering
        internships, finance roles, or marketing positions, you'll find detailed
        accounts of job roles, interview processes, company cultures, and more.
      </p>

      <h3 className="text-lg lg:text-xl font-bold my-2">Explore</h3>
      <ul className="list-disc list-inside my-2">
        <li>
          Browse through a wide range of experiences in the Read Experiences
          section.
        </li>
        <li>Utilize the search bar to find specific topics or companies.</li>
        <li>Bookmark your favorite experiences for quick access later.</li>
        <li>
          Read blogs related to particular categories or tags by selecting those
          tags or categories.
        </li>
        <li>
          Click on the author's email in a blog to view their profile and
          explore all blogs written by them.
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">User Accounts</h3>
      <p className="text-lg lg:text-xl my-2">
        To contribute to the platform, users need to create an account. With an
        account, you can:
      </p>
      <ul className="list-disc list-inside my-2">
        <li>Create and share your own experiences to help others.</li>
        <li>
          Edit or delete your posts as needed to maintain accuracy and
          relevance.
        </li>
        <li>
          Manage your bookmarks and profile settings for a personalized
          experience.
        </li>
      </ul>

      <hr className="my-4 border-white" />

      <h2 className="text-xl lg:text-2xl font-bold my-2">Join Our Community</h2>
      <p className="text-lg lg:text-xl my-2">
        We invite you to join our community of learners, professionals, and
        enthusiasts. By sharing your experiences, insights, and knowledge, you
        can help others navigate their career journeys more effectively. Whether
        you're a student preparing for interviews, a professional seeking career
        advice, or someone looking to switch industries, your contributions can
        make a difference.
      </p>

      <p className="text-lg lg:text-xl my-2">
        Thank you for being a part of our platform. Together, we can build a
        valuable resource for everyone.
      </p>
    </div>
  );
};

export default About;
