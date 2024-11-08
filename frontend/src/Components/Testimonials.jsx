import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// SectionTitle Component
const SectionTitle = ({ preTitle, title, children }) => {
  return (
    <div className="mb-12 text-center">
      <h4 className="text-lg font-semibold text-indigo-600 uppercase">
        {preTitle}
      </h4>
      <h2 className="mt-2 text-3xl font-bold text-white">{title}</h2>
      <p className="mt-4 text-lg text-white">{children}</p>
    </div>
  );
};

// Testimonials Component
export const Testimonials = () => {
  return (
    <div className="px-14">
      <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonials are a great way to increase brand trust and awareness. Use
        this section to highlight your popular customers.
      </SectionTitle>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <TestimonialCard
          quote="It was an exhilarating experience to pull and push the cash. To get the cash in form of credits."
          name="Shushma Rajit"
          title="Chief Technical Officer at Credify Pro"
          image="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser1.71c84e11.jpg&w=48&q=75"
        />
        <TestimonialCard
          quote="The platform made it easy to upload my documents and receive personalized insights that helped me understand my financial standing better."
          name="Riya Sharma"
          title="Entrepreneur"
          image="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser2.33ea1ca7.jpg&w=48&q=75"
        />
        <TestimonialCard
          quote="Extremely satisfied with the service, much recommended to all newcomers in the finance sector."
          name="Gabrielle Winn"
          title="Co-founder of Acme Inc"
          image="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser3.b804ab99.jpg&w=48&q=75"
        />
      </div>
    </div>
  );
};

// TestimonialCard Component with Animation and Overflow Handling
const TestimonialCard = ({ quote, name, title, image }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col justify-between w-full h-full bg-gray-600 px-14 rounded-2xl py-14 dark:bg-trueGray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
      transition={{ duration: 0.5 }}
    >
      {/* Quote Text */}
      <p className="text-2xl leading-normal text-white">{quote}</p>
      <Avatar image={image} name={name} title={title} />
    </motion.div>
  );
};

// Avatar Component
function Avatar({ image, name, title }) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <img
          src={image}
          width="40"
          height="40"
          alt="Avatar"
          className="object-cover"
        />
      </div>
      <div>
        <div className="text-xl text-indigo-300 font-medium">{name}</div>
        <div className="text-gray-600 dark:text-white">{title}</div>
      </div>
    </div>
  );
}

// Mark Component (optional)
function Mark({ children }) {
  return (
    <mark className="text-white bg-white rounded-md ring-white ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
      {children}
    </mark>
  );
}

export default Testimonials;
