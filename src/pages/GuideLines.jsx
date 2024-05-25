import React from "react";

const GuideLines = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 lg:p-8 min-h-screen">
      <h1 className="text-2xl lg:text-3xl font-bold my-2">Guidelines</h1>
      <p className="text-lg lg:text-xl my-2">
        Welcome to our platform! To ensure your experience submission is both
        helpful and easy to read, please follow these guidelines.
      </p>

      <hr className="my-4 border-white" />

      <h2 className="text-xl lg:text-2xl font-bold my-2">
        Markdown Properties
      </h2>
      <p className="text-lg lg:text-xl my-2">
        When writing your submission, you can use the following markdown
        properties:
      </p>

      <h3 className="text-lg lg:text-xl font-bold my-2">Text Formatting</h3>
      <ul className="list-disc list-inside my-2">
        <li>
          Bold Text : <code>**bold text**</code> or <code>__bold text__</code>
        </li>
        <li>
          Italic Text : <code>*italic text*</code> or <code>_italic text_</code>
        </li>
        <li>
          Bold and Italic Text : <code>***bold and italic text***</code>
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">Links</h3>
      <ul className="list-disc list-inside my-2">
        <li>
          [Links:](https://www.example.com) <code>[Link text](URL)</code>
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">Code</h3>
      <ul className="list-disc list-inside my-2">
        <li>
          Inline Code : <code> `inline code` </code>
        </li>
        <li>
          Code Blocks : <code>```console.log('Hello, world!');```</code>
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">Lists</h3>
      <ul className="list-disc list-inside my-2">
        <li>
          Bullet Lists : <code>-</code> or <code>*</code> followed by a space
        </li>
        <li>
          Numbered Lists : <code>1.</code> followed by a space
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">Quotes</h3>
      <ul className="list-disc list-inside my-2">
        <li>
          Quotes : <code>{`> `}</code> followed by a space
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">Tables</h3>
      <pre className="bg-gray-400 p-2 rounded my-2">
        <code>
          {`| Header 1 | Header 2 |
| -------- | -------- |
| Row 1    | Data     |
| Row 2    | More Data|`}
        </code>
      </pre>

      <hr className="my-4 border-white" />

      <h2 className="text-xl lg:text-2xl font-bold my-2">
        Writing Your Experience
      </h2>
      <p className="text-lg lg:text-xl my-2">
        When sharing your experience, please include the following sections:
      </p>

      <h3 className="text-lg lg:text-xl font-bold my-2">
        Company and Role Details
      </h3>
      <ul className="list-disc list-inside my-2">
        <li>
          <b>Company Name :</b> The name of the company where you had the
          experience.
        </li>
        <li>
          <b>Role :</b> The position you held (e.g., Software Engineer Intern,
          Full-time Data Scientist).
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">
        No. of Rounds and Compensation
      </h3>
      <ul className="list-disc list-inside my-2">
        <li>
          <b>No. of Rounds :</b> Total number of interview or assessment rounds.
        </li>
        <li>
          <b>Stipend/CTC :</b> Mention the stipend for internships or CTC for
          full-time roles.
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">
        Detailed Round Breakdown
      </h3>
      <h4 className="text-lg lg:text-xl font-bold my-2">
        Round 1 : Initial Screening
      </h4>
      <ul className="list-disc list-inside my-2">
        <li>
          <b>Type :</b> (e.g., Phone interview, Online test)
        </li>
        <li>
          <b>Details :</b> A brief description of what this round involved.
        </li>
      </ul>

      <h4 className="text-lg lg:text-xl font-bold my-2">
        Round 2 : Technical Interview
      </h4>
      <ul className="list-disc list-inside my-2">
        <li>
          <b>Type :</b> (e.g., Coding interview, Whiteboard session)
        </li>
        <li>
          <b>Details :</b> Information about the questions asked, topics
          covered, and your experience.
        </li>
      </ul>

      <h4 className="text-lg lg:text-xl font-bold my-2">
        Round 3 : HR Interview
      </h4>
      <ul className="list-disc list-inside my-2">
        <li>
          <b>Type :</b> (e.g., Behavioral interview, Culture fit assessment)
        </li>
        <li>
          <b>Details :</b> Insights into the HR questions, scenarios discussed,
          etc.
        </li>
      </ul>

      <p className="text-lg lg:text-xl my-2">
        <i>(Add more rounds as necessary)</i>
      </p>

      <h3 className="text-lg lg:text-xl font-bold my-2">Categories and Tags</h3>
      <p className="text-lg lg:text-xl my-2">
        Categories and tags are used to classify your submission and make it
        easier for others to find relevant information. When adding tags and
        categories to your submission, please follow these guidelines:
      </p>
      <ul className="list-disc list-inside my-2">
        <li>Ensure strict comma separation between each category and tag.</li>
        <li>
          Extra spaces before or after categories and tags are not mandatory, as
          they will be trimmed automatically.
        </li>
        <li>
          Example : <code>category1,category2,category3</code> or{" "}
          <code>tag1,tag2,tag3</code>
        </li>
        <li>
          Use categories to group your submission into broader sections, such as
          "Technical Interviews" or "HR Interviews".
        </li>
        <li>Use tags to describe key topics and themes of your submission.</li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">Tips and Tricks</h3>
      <p className="text-lg lg:text-xl my-2">
        Share any tips and tricks that helped you during the preparation and the
        interview process. This could include:
      </p>
      <ul className="list-disc list-inside my-2">
        <li>
          <b>Preparation Tips :</b> How you prepared for the interviews.
        </li>
        <li>
          <b>Common Pitfalls :</b> Mistakes to avoid.
        </li>
        <li>
          <b>Best Practices :</b> Dos and Don'ts during the interview.
        </li>
      </ul>

      <h3 className="text-lg lg:text-xl font-bold my-2">Resources Followed</h3>
      <p className="text-lg lg:text-xl my-2">
        Provide a list of resources that you found useful during your
        preparation. This might include:
      </p>
      <ul className="list-disc list-inside my-2">
        <li>
          <b>Books :</b> Mention any relevant books.
        </li>
        <li>
          <b>Websites :</b> List any websites or online platforms.
        </li>
        <li>
          <b>Courses :</b> Include any courses or certifications you took.
        </li>
        <li>
          <b>Others :</b> Any other resources like study groups, mock
          interviews, etc.
        </li>
      </ul>

      <hr className="my-4 border-white" />

      <p className="text-lg lg:text-xl my-2">
        We hope these guidelines help you craft a detailed and useful experience
        submission. Happy sharing!
      </p>

      <p className="text-lg lg:text-xl my-2">
        Thank you for contributing to our community!
      </p>
    </div>
  );
};

export default GuideLines;
